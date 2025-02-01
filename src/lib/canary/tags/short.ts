import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtShort extends NbtTag {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const s = Json.readShort(value);
    if (s === null) throw new Error('Unexpected value was given for NbtShort');

    return new NbtShort(s);
  }
}
