const nexts = {
  idler: ['harvester', 'builder', 'rapairer', 'transferer', 'upgrader'],
  builder: ['harvester'],
  harvester: ['builder', 'rapairer', 'transferer', 'upgrader'],
  rapairer: ['harvester'],
  transferer: ['harvester'],
  upgrader: ['harvester'],
}

const priority = {
  idler: 9,
  builder: 3,
  harvester: 9,
  rapairer: 2,
  transferer: 1,
  upgrader: 2,
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
