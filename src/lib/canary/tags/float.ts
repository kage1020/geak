import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtFloat extends NbtTag {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const f = Json.readFloat(value);
    if (f === null) throw new Error('Unexpected value was given for NbtFloat');

    return new NbtFloat(f);
  }
}
