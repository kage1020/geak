import { StringReader } from '@/lib/nbt/string-reader';
import { NbtTag } from '@/lib/nbt/tags/base';
import { NbtByte } from '@/lib/nbt/tags/byte';
import { NbtByteArray } from '@/lib/nbt/tags/byte-array';
import { NbtCompound } from '@/lib/nbt/tags/compound';
import { NbtDouble } from '@/lib/nbt/tags/double';
import { NbtFloat } from '@/lib/nbt/tags/float';
import { NbtInt } from '@/lib/nbt/tags/int';
import { NbtIntArray } from '@/lib/nbt/tags/int-array';
import { NbtList } from '@/lib/nbt/tags/list';
import { NbtLong } from '@/lib/nbt/tags/long';
import { NbtLongArray } from '@/lib/nbt/tags/long-array';
import { NbtShort } from '@/lib/nbt/tags/short';
import { NbtString } from '@/lib/nbt/tags/string';
import { NbtType } from '@/lib/nbt/tags/type';

export class NbtParser {
  static DOUBLE_PATTERN_NOSUFFIX = new RegExp(
    '^[-+]?(?:[0-9]+[.]|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?$',
    'i'
  );
  static DOUBLE_PATTERN = new RegExp(
    '^[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?d$',
    'i'
  );
  static FLOAT_PATTERN = new RegExp('^[-+]?(?:[0-9]+[.]?|[0-9]*[.][0-9]+)(?:e[-+]?[0-9]+)?f$', 'i');
  static BYTE_PATTERN = new RegExp('^[-+]?(?:0|[1-9][0-9]*)b$', 'i');
  static LONG_PATTERN = new RegExp('^[-+]?(?:0|[1-9][0-9]*)l$', 'i');
  static SHORT_PATTERN = new RegExp('^[-+]?(?:0|[1-9][0-9]*)s$', 'i');
  static INT_PATTERN = new RegExp('^[-+]?(?:0|[1-9][0-9]*)$', 'i');

  static readTag(reader: StringReader): NbtTag {
    reader.skipWhitespace();
    if (!reader.canRead()) {
      throw reader.createError('Expected value');
    }
    const c = reader.peek();
    if (c === '{') {
      return NbtParser.readCompound(reader);
    } else if (c === '[') {
      if (
        reader.canRead(3) &&
        !StringReader.isQuotedStringStart(reader.peek(1)) &&
        reader.peek(2) === ';'
      ) {
        reader.expect('[', true);
        const start = reader.cursor;
        const d = reader.read();
        reader.skip();
        reader.skipWhitespace();
        if (!reader.canRead()) {
          throw reader.createError('Expected value');
        } else if (d === 'B') {
          return NbtParser.readArray(reader, NbtByteArray, NbtType.ByteArray, NbtType.Byte);
        } else if (d === 'L') {
          return NbtParser.readArray(reader, NbtLongArray, NbtType.LongArray, NbtType.Long);
        } else if (d === 'I') {
          return NbtParser.readArray(reader, NbtIntArray, NbtType.IntArray, NbtType.Int);
        } else {
          reader.cursor = start;
          throw reader.createError(`Invalid array type '${d}'`);
        }
      } else {
        return NbtParser.readList(reader);
      }
    } else {
      reader.skipWhitespace();
      const start = reader.cursor;
      if (StringReader.isQuotedStringStart(reader.peek())) {
        return new NbtString(reader.readQuotedString());
      } else {
        const value = reader.readUnquotedString();
        if (value.length === 0) {
          reader.cursor = start;
          throw reader.createError('Expected value');
        }
        try {
          if (NbtParser.FLOAT_PATTERN.test(value)) {
            const number = Number(value.substring(0, value.length - 1));
            return new NbtFloat(number);
          } else if (NbtParser.BYTE_PATTERN.test(value)) {
            const number = Number(value.substring(0, value.length - 1));
            return new NbtByte(Math.floor(number));
          } else if (NbtParser.LONG_PATTERN.test(value)) {
            const number = BigInt(value.substring(0, value.length - 1));
            return new NbtLong(number);
          } else if (NbtParser.SHORT_PATTERN.test(value)) {
            const number = Number(value.substring(0, value.length - 1));
            return new NbtShort(Math.floor(number));
          } else if (NbtParser.INT_PATTERN.test(value)) {
            const number = Number(value);
            return new NbtInt(Math.floor(number));
          } else if (NbtParser.DOUBLE_PATTERN.test(value)) {
            const number = Number(value.substring(0, value.length - 1));
            return new NbtDouble(number);
          } else if (NbtParser.DOUBLE_PATTERN_NOSUFFIX.test(value)) {
            const number = Number(value);
            return new NbtDouble(number);
          } else if (value.toLowerCase() === 'true') {
            return NbtByte.ONE;
          } else if (value.toLowerCase() === 'false') {
            return NbtByte.ZERO;
          }
        } catch {}
        return value.length === 0 ? NbtString.EMPTY : new NbtString(value);
      }
    }
  }

  static readCompound(reader: StringReader) {
    reader.expect('{', true);
    const properties = new Map<string, NbtTag>();
    reader.skipWhitespace();
    while (reader.canRead() && reader.peek() !== '}') {
      const start = reader.cursor;
      reader.skipWhitespace();
      if (!reader.canRead()) {
        throw reader.createError('Expected key');
      }
      const key = reader.readString();
      if (key.length === 0) {
        reader.cursor = start;
        throw reader.createError('Expected key');
      }
      reader.expect(':', true);
      const value = NbtParser.readTag(reader);
      properties.set(key, value);
      if (!NbtParser.hasElementSeparator(reader)) {
        break;
      }
      if (!reader.canRead()) {
        throw reader.createError('Expected key');
      }
    }
    reader.expect('}', true);
    return new NbtCompound(properties);
  }

  static readList(reader: StringReader) {
    reader.expect('[', true);
    reader.skipWhitespace();
    if (!reader.canRead()) {
      throw reader.createError('Expected value');
    }
    const items: NbtTag[] = [];
    let type = NbtType.End;
    while (reader.peek() !== ']') {
      const start = reader.cursor;
      const value = NbtParser.readTag(reader);
      const valueId = value.getId();
      if (type === NbtType.End) {
        type = valueId;
      } else if (valueId !== type) {
        reader.cursor = start;
        throw reader.createError(`Can't insert ${NbtType[valueId]} into list of ${NbtType[type]}`);
      }
      items.push(value);
      if (!NbtParser.hasElementSeparator(reader)) {
        break;
      }
      if (!reader.canRead()) {
        throw reader.createError('Expected value');
      }
    }
    reader.expect(']', true);
    return new NbtList(items, type);
  }

  static readArray<D>(
    reader: StringReader,
    factory: { new (data: D[]): NbtTag },
    arrayId: NbtType,
    childId: NbtType
  ) {
    const data: D[] = [];
    while (reader.peek() !== ']') {
      const entry = NbtParser.readTag(reader);
      if (entry.getId() !== childId) {
        throw reader.createError(`Can't insert ${NbtType[entry.getId()]} into ${NbtType[arrayId]}`);
      }
      data.push((entry.isLong() ? entry.getAsPair() : entry.getAsNumber()) as unknown as D);
      if (!NbtParser.hasElementSeparator(reader)) {
        break;
      }
      if (!reader.canRead()) {
        throw reader.createError('Expected value');
      }
    }
    reader.expect(']');
    return new factory(data);
  }

  static hasElementSeparator(reader: StringReader) {
    reader.skipWhitespace();
    if (reader.canRead() && reader.peek() === ',') {
      reader.skip();
      reader.skipWhitespace();
      return true;
    } else {
      return false;
    }
  }
}
