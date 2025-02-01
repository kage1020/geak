import { JsonValue } from '../json';

export type Transform<T> = {
  [P in keyof T]: T[P] extends NbtTag<infer U> ? U : T[P];
};

export type NestedRecord<K extends PropertyKey, V> = {
  [key in K]: V | NestedRecord<K, V>;
};

export abstract class NbtTag<T = JsonValue> {
  public abstract toJson(): T;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static fromJson(value: JsonValue) {
    throw new Error('Not implemented');
  }
}
