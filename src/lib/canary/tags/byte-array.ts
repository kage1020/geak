import { Json, JsonValue } from '../json';
import { NbtByte } from './byte';
import { NbtTag } from './tag';

export class NbtByteArray extends NbtTag {
  private readonly items: NbtByte[];

  constructor(items: NbtByte[]) {
    super();
    this.items = items;
  }

  public toJson() {
    return this.items.map((item) => item.toJson());
  }

  public static override fromJson(value: JsonValue) {
    const array = Json.readArray<NbtByte>(value);
    if (array === null) throw new Error('Unexpected value was given for NbtByteArray');

    return new NbtByteArray(array);
  }
}
