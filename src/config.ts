const nexts = {
  idler: ['harvester', 'builder', 'transferer', 'upgrader'],
  builder: ['harvester'],
  harvester: ['builder', 'transferer', 'upgrader'],
  transferer: ['harvester'],
  upgrader: ['harvester'],
}

const ConfigOfLevel: {
  [key: number]: {
    creeps: number,
    nexts: { [key: string]: string[] }
  }
} = {
  0: { creeps: 0, nexts },
  1: { creeps: 4, nexts },
  2: { creeps: 6, nexts },
  3: { creeps: 6, nexts },
  4: { creeps: 6, nexts },
  5: { creeps: 6, nexts },
  6: { creeps: 6, nexts },
  7: { creeps: 6, nexts },
  8: { creeps: 6, nexts },
}

export default ConfigOfLevel
