import { NbtTag } from './base';
import { NbtType } from './type';

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

  public override toJson() {
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
