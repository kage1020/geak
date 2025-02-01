import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export type NbtLongPair = [number, number];

export class NbtLong extends NbtTag {
  private readonly value: NbtLongPair;

  constructor(value: NbtLongPair) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const l = Json.readPair<number, 2>(value);
    if (l === null) throw new Error('Unexpected value was given for NbtLong');

    return new NbtLong(l);
  }
}
