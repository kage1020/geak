export const BlockStates = [
  'north',
  'west',
  'south',
  'east',
  'up',
  'facing',
  'extended',
  'snowy',
  'waterlogged',
  'level',
  'hanging',
  'power',
  'enabled',
  'axis',
  'half',
  'shape',
  'hinge',
  'open',
  'type',
  'mode',
] as const;

export type BlockState = (typeof BlockStates)[number];
