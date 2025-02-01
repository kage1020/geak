import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtInt extends NbtTag {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const i = Json.readInt(value);
    if (i === null) throw new Error('Unexpected value was given for NbtInt');

    return new NbtInt(i);
  }
}
