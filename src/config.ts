const nexts = {
  idler: ['harvester'],
  builder: ['harvester'],
  harvester: ['builder', 'repairer', 'transferer', 'upgrader'],
  repairer: ['harvester'],
  transferer: ['harvester'],
  upgrader: ['harvester'],
}

const priority = {
  idler: 9,
  builder: 3,
  harvester: 9,
  repairer: 2,
  transferer: 1,
  upgrader: 3,
}

const ConfigOfLevel: {
  [key: number]: {
    creeps: number,
    nexts: { [key: string]: string[] },
    priority: { [key: string]: number }
  }
} = {
  0: { creeps: 0, nexts, priority },
  1: { creeps: 4, nexts, priority },
  2: { creeps: 8, nexts, priority },
  3: { creeps: 8, nexts, priority },
  4: { creeps: 8, nexts, priority },
  5: { creeps: 8, nexts, priority },
  6: { creeps: 8, nexts, priority },
  7: { creeps: 8, nexts, priority },
  8: { creeps: 8, nexts, priority },
}

export default ConfigOfLevel
