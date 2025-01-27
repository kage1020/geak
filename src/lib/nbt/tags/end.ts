import { JsonValue } from '@/lib/nbt/json';
import { NbtTag } from '@/lib/nbt/tags/base';
import { NbtType } from '@/lib/nbt/tags/type';

export class NbtEnd extends NbtTag {
  public static readonly INSTANCE = new NbtEnd();

  private constructor() {
    super();
  }

  public override getId() {
    return NbtType.End;
  }

  public override equals(other: NbtTag): boolean {
    return other.isEnd();
  }

  public override toString() {
    return 'END';
  }

  public override toPrettyString() {
    return this.toString();
  }

  public override toSimplifiedJson() {
    return null;
  }

  public override toJson(): JsonValue {
    return null;
  }

  public override toBytes() {}

  public static create() {
    return NbtEnd.INSTANCE;
  }

  public static fromJson() {
    return NbtEnd.INSTANCE;
  }

  public static fromBytes() {
    return NbtEnd.INSTANCE;
  }
}

NbtTag.register(NbtType.End, NbtEnd);
