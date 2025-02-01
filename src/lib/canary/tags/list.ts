import { Json, JsonValue } from '../json';
import { NbtTag } from './tag';

export class NbtList<T extends NbtTag> extends NbtTag {
  private readonly items: T[];

  constructor(items: T[]) {
    super();
    this.items = items;
  }

  public toJson() {
    return this.items.map((item) => item.toJson());
  }

  public static override fromJson<T extends NbtTag>(value: JsonValue) {
    const array = Json.readArray<T>(value);
    if (array === null) throw new Error('Unexpected value was given for NbtList');

    return new NbtList<T>(array);
  }
}
