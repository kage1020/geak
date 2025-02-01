import { Json, JsonValue } from '../json';
import { NbtTag, NestedRecord, Transform } from './tag';

export class NbtCompound<T extends NestedRecord<string, NbtTag>> extends NbtTag<Transform<T>> {
  public readonly properties: T;

  constructor(properties: T = {} as T) {
    super();
    this.properties = properties;
  }

  public static serialize<T extends NestedRecord<string, NbtTag>>(value: T): Transform<T> {
    return Json.reduce(Json.entries(value), (acc, [key, value]) => ({
      ...acc,
      [key]: value instanceof NbtTag ? value.toJson() : NbtCompound.serialize(value),
    }));
  }

  public toJson() {
    return NbtCompound.serialize(this.properties);
  }

  public static override fromJson<T extends NestedRecord<string, NbtTag>>(value: JsonValue) {
    const c = Json.readRecord<T>(value);
    if (c === null) throw new Error('Unexpected value was given for NbtCompound');

    return new NbtCompound<T>(c);
  }
}
