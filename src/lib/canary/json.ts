import { Transform } from './tags/tag';

export type Tuple<T, L extends number, R extends unknown[] = []> = R['length'] extends L
  ? R
  : Tuple<T, L, [...R, T]>;

export type Entries<T> = (keyof T extends infer U
  ? U extends keyof T
    ? [U, T[U]]
    : never
  : never)[];

export type JsonValue =
  | null
  | string
  | number
  | boolean
  | JsonValue[]
  | { [key: string]: JsonValue };

export class Json {
  static entries<T extends object>(obj: T) {
    return Object.entries(obj) as Entries<T>;
  }

  static fromEntries<T>(entries: Entries<T>) {
    return Object.fromEntries(entries) as T;
  }

  static reduce<T>(
    obj: Entries<T>,
    reducer: (acc: Transform<T>, entry: Entries<T>[number]) => Transform<T>
  ) {
    return obj.reduce(reducer, {} as Transform<T>);
  }

  static readBoolean(obj: JsonValue) {
    return typeof obj === 'boolean' ? obj : null;
  }

  static readByte(obj: JsonValue) {
    return typeof obj === 'number' && -128 <= obj && obj <= 127 ? obj : null;
  }

  static readShort(obj: JsonValue) {
    return typeof obj === 'number' && -32768 <= obj && obj <= 32767 ? obj : null;
  }

  static readInt(obj: JsonValue) {
    return typeof obj === 'number' && Number.isInteger(obj) ? obj : null;
  }

  static readFloat(obj: JsonValue) {
    return typeof obj === 'number' ? obj : null;
  }

  static readDouble(obj: JsonValue) {
    return typeof obj === 'number' ? obj : null;
  }

  static readPair<T, U extends number>(obj: JsonValue) {
    if (!Array.isArray(obj)) return null;

    return obj as Tuple<T, U>;
  }

  static readString(obj: JsonValue) {
    return typeof obj === 'string' ? obj : null;
  }

  static readObject<T = object>(obj: JsonValue) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
      ? (obj as Partial<T>)
      : null;
  }

  static readRecord<T = Record<string, JsonValue>>(obj: JsonValue) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj) ? (obj as T) : null;
  }

  static readMap<T>(obj: JsonValue) {
    const root = Json.readObject<T>(obj) ?? {};
    return new Map(Object.entries<T>(root));
  }

  static readArray<T>(obj: JsonValue) {
    return Array.isArray(obj) ? (obj as T[]) : null;
  }
}
