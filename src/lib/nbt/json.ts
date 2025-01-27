export type JsonValue = null | string | number | boolean | { [x: string]: JsonValue } | JsonValue[];

export class Json {
  static readNumber(obj: unknown) {
    return typeof obj === 'number' ? obj : undefined;
  }

  static readInt(obj: unknown) {
    return typeof obj === 'number' ? Math.floor(obj) : undefined;
  }

  static readString(obj: unknown) {
    return typeof obj === 'string' ? obj : undefined;
  }

  static readBoolean(obj: unknown) {
    return typeof obj === 'boolean' ? obj : undefined;
  }

  static readObject(obj: JsonValue | undefined): { [x: string]: JsonValue | undefined } | undefined;
  static readObject(obj: unknown): { [x: string]: unknown } | undefined;
  static readObject(obj: unknown) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
      ? (obj as { [key: string]: unknown })
      : undefined;
  }

  static readArray<T>(obj: JsonValue | undefined, parser: (obj?: JsonValue) => T): T[] | undefined;
  static readArray<T>(obj: JsonValue | undefined): (JsonValue | undefined)[] | undefined;
  static readArray<T>(obj: unknown, parser: (obj: unknown) => T): T[] | undefined;
  static readArray<T>(obj: unknown, parser?: (obj: any) => T) {
    if (!Array.isArray(obj)) return undefined;
    if (!parser) return obj;
    return obj.map((el) => parser(el));
  }

  static readPair<T>(obj: unknown, parser: (obj?: unknown) => T): [T, T] | undefined {
    if (!Array.isArray(obj)) return undefined;
    return [0, 1].map((i) => parser(obj[i])) as [T, T];
  }

  static readMap<T>(obj: JsonValue | undefined, parser: (obj?: JsonValue) => T): { [x: string]: T };
  static readMap<T>(obj: unknown, parser: (obj: unknown) => T): { [x: string]: T };
  static readMap<T>(obj: unknown, parser: (obj: any) => T) {
    const root = Json.readObject(obj) ?? {};
    return Object.fromEntries(Object.entries(root).map(([k, v]) => [k, parser(v)]));
  }

  static compose<T, U>(
    obj: unknown,
    parser: (obj: unknown) => T | undefined,
    mapper: (result: T) => U
  ) {
    const result = parser(obj);
    return result ? mapper(result) : undefined;
  }

  static readEnum<T extends string>(obj: unknown, values: readonly T[]): T {
    if (typeof obj !== 'string') return values[0];
    if (values.includes(obj as T)) return obj as T;
    return values[0];
  }
}
