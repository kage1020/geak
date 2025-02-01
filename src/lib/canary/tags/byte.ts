import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtByte extends NbtTag {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const b = Json.readByte(value);
    if (b === null) throw new Error('Unexpected value was given for NbtByte');

    return new NbtByte(b);
  }
}
