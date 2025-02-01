import { DataInput } from '../io/input';
import { DataOutput } from '../io/output';
import { Json, JsonValue } from '../json';
import { NbtTag } from './base';
import { NbtType } from './type';

export class NbtDouble extends NbtTag {
  private readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  public override getId() {
    return NbtType.Double;
  }

  public override equals(other: NbtTag) {
    return other.isDouble() && this.value === other.value;
  }

  public override getAsNumber() {
    return this.value;
  }

  public override toString() {
    if (Number.isInteger(this.value)) {
      return this.value.toFixed(1);
    }
    return this.value.toString();
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
    output.writeDouble(this.value);
  }

  public static create() {
    return new NbtDouble(0);
  }

  public static fromJson(value: JsonValue) {
    return new NbtDouble(Json.readNumber(value) ?? 0);
  }

  public static fromBytes(input: DataInput) {
    const value = input.readDouble();
    return new NbtDouble(value);
  }
}

NbtTag.register(NbtType.Double, NbtDouble);
