import { Json, JsonValue } from '../json';
import { NbtLong } from './long';
import { NbtTag } from './tag';

export class NbtLongArray extends NbtTag {
  private readonly items: NbtLong[];

  constructor(items: NbtLong[]) {
    super();
    this.items = items;
  }

  public toJson() {
    return this.items.map((item) => item.toJson());
  }

  public static override fromJson(value: JsonValue) {
    const array = Json.readArray<NbtLong>(value);
    if (array === null) throw new Error('Unexpected value was given for NbtLongArray');

    return new NbtLongArray(array);
  }
}
