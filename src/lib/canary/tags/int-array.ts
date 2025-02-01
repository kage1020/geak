import { Json, JsonValue } from '../json';
import { NbtInt } from './int';
import { NbtTag } from './tag';

export class NbtIntArray extends NbtTag {
  private readonly items: NbtInt[];

  constructor(items: NbtInt[]) {
    super();
    this.items = items;
  }

  public toJson() {
    return this.items.map((item) => item.toJson());
  }

  public static override fromJson(value: JsonValue) {
    const array = Json.readArray<NbtInt>(value);
    if (array === null) throw new Error('Unexpected value was given for NbtIntArray');

    return new NbtIntArray(array);
  }
}
