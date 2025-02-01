import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtBoolean extends NbtTag {
  private readonly value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const b = Json.readBoolean(value);
    if (b === null) throw new Error('unexpected value was given for NbtBoolean');

    return new NbtBoolean(b);
  }
}
