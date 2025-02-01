import { DataInput } from '../io/input';
import { DataOutput } from '../io/output';
import { JsonValue } from '../json';
import { NbtTag } from './base';
import { NbtType } from './type';

export class NbtString extends NbtTag {
  public static readonly EMPTY = new NbtString('');
  private readonly value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  public override getId() {
    return NbtType.String;
  }

  public override equals(other: NbtTag) {
    return other.isString() && this.value === other.value;
  }

  public getAsString() {
    return this.value;
  }

  public override toString() {
    return '"' + this.value.replace(/(\\|")/g, '\\$1') + '"';
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
    output.writeString(this.value);
  }

  public static create() {
    return NbtString.EMPTY;
  }

  public static fromJson(value: JsonValue) {
    return new NbtString(typeof value === 'string' ? value : '');
  }

  public static fromBytes(input: DataInput) {
    const value = input.readString();
    return new NbtString(value);
  }
}

NbtTag.register(NbtType.String, NbtString);
