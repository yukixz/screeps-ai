const priority = {
  idler: 9,
  builder: 3,
  harvester: 9,
  repairer: 2,
  transferer: 1,
  upgrader: 4,
}

const ConfigOfLevel: {
  [key: number]: {
    creeps: number,
    priority: { [key: string]: number }
  }
} = {
  0: { creeps: 0, priority },
  1: { creeps: 4, priority },
  2: { creeps: 8, priority },
  3: { creeps: 8, priority },
  4: { creeps: 8, priority },
  5: { creeps: 8, priority },
  6: { creeps: 8, priority },
  7: { creeps: 8, priority },
  8: { creeps: 8, priority },
}

export default ConfigOfLevel
