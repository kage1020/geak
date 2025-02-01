import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtString extends NbtTag {
  private readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  public toJson() {
    return this.value;
  }

  public static override fromJson(value: JsonValue) {
    const s = Json.readString(value);
    if (s === null) throw new Error('Unexpected value was given for NbtString');

    return new NbtString(s);
  }
}
