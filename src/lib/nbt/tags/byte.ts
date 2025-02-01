import { DataInput } from '../io/input';
import { DataOutput } from '../io/output';
import { Json, JsonValue } from '../json';
import { NbtTag } from './base';
import { NbtType } from './type';

export class NbtByte extends NbtTag {
  public static readonly ZERO = new NbtByte(0);
  public static readonly ONE = new NbtByte(1);
  private readonly value: number;

  constructor(value: number | boolean) {
    super();
    this.value = typeof value === 'number' ? value : value ? 1 : 0;
  }

  public override getId() {
    return NbtType.Byte;
  }

  public override equals(other: NbtTag) {
    return other.isByte() && this.value === other.value;
  }

  public override getAsNumber() {
    return this.value;
  }

  public override toString() {
    return this.value.toFixed() + 'b';
  }

  public override toPrettyString() {
    return this.toString();
  }

  public override toSimplifiedJson() {
    return this.value;
  }

  public override toJson() {
    return this.value;
  }

  public override toBytes(output: DataOutput) {
    output.writeByte(this.value);
  }

  public static create() {
    return NbtByte.ZERO;
  }

  public static fromJson(value: JsonValue) {
    return new NbtByte(Json.readInt(value) ?? 0);
  }

  public static fromBytes(input: DataInput) {
    const value = input.readByte();
    return new NbtByte(value);
  }
}

NbtTag.register(NbtType.Byte, NbtByte);
