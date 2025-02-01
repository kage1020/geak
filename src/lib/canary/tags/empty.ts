import { NbtTag } from './tag';

export class NbtEmpty extends NbtTag {
  private readonly value = null;

  constructor() {
    super();
  }

  public toJson() {
    return null;
  }

  public static override fromJson() {
    return new NbtEmpty();
  }
}
