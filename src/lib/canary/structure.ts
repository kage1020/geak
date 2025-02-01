import { Json, JsonValue } from './json';
import { BlockState } from './block';
import { NbtCompound } from './tags/compound';
import { NbtInt } from './tags/int';
import { NbtString } from './tags/string';
import { NbtTag, NestedRecord } from './tags/tag';
import { NbtList } from './tags/list';
import { NbtEmpty } from './tags/empty';

export interface NbtStructureProperties extends NestedRecord<string, NbtTag> {
  DataVersion: NbtInt;
  author: NbtString | NbtEmpty;
  size: NbtList<NbtInt>;
  palette: NbtList<
    NbtCompound<{
      Name: NbtString;
      Properties: NbtCompound<{ [key in BlockState]: NbtString }> | NbtEmpty;
    }>
  >;
  palettes:
    | NbtList<
        NbtList<
          NbtCompound<{
            Name: NbtString;
            Properties: NbtCompound<{ [key in BlockState]: NbtString }> | NbtEmpty;
          }>
        >
      >
    | NbtEmpty;
  blocks: NbtList<
    NbtCompound<{
      state: NbtInt;
      pos: NbtList<NbtInt>;
      nbt: NbtCompound<{ [key: string]: NbtTag }> | NbtEmpty;
    }>
  >;
  entities: NbtList<
    NbtCompound<{
      pos: NbtList<NbtInt>;
      blockPos: NbtList<NbtInt>;
      nbt: NbtCompound<{ [key: string]: NbtTag }> | NbtEmpty;
    }>
  >;
}

export interface NbtStructureJson {
  DataVersion: number;
  author?: string;
  size: [number, number, number];
  palette: { Name: string; Properties?: { [key in BlockState]?: string } }[];
  palettes?: { Name: string; Properties?: { [key in BlockState]?: string } }[][];
  blocks: { state: number; pos: [number, number, number]; nbt?: { [key: string]: JsonValue } }[];
  entities: {
    pos: [number, number, number];
    blockPos: [number, number, number];
    nbt: { [key: string]: JsonValue };
  }[];
}

export class NbtStructure extends NbtCompound<NbtStructureProperties> {
  constructor(options: NbtStructureProperties) {
    super(options);
  }

  public toJson() {
    return NbtStructure.serialize(this.properties);
  }

  public static override fromJson<T extends NestedRecord<string, NbtTag> = NbtStructureProperties>(
    value: JsonValue
  ) {
    const s = Json.readObject<NbtStructureJson>(value);
    if (s === null) throw new Error('Unexpected value was given for NbtStructure');

    return new NbtStructure({
      DataVersion: NbtInt.fromJson(s.DataVersion ?? 0),
      author: s.author ? NbtString.fromJson(s.author) : NbtEmpty.fromJson(),
      size: NbtList.fromJson(s.size ?? [0, 0, 0]),
      palette: NbtList.fromJson(s.palette ?? []),
      palettes: s.palettes === undefined ? NbtEmpty.fromJson() : NbtList.fromJson(s.palettes),
      blocks: NbtList.fromJson(s.blocks ?? []),
      entities: NbtList.fromJson(s.entities ?? []),
    }) as unknown as NbtCompound<T>; // TODO: return NbtStructure instead of NbtCompound<T>
  }
}
