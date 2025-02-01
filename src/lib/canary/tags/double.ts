import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtDouble extends NbtTag {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const d = Json.readDouble(value);
    if (d === null) throw new Error('Unexpected value was given for NbtDouble');

    return new NbtDouble(d);
  }
}
