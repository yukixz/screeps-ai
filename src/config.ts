// 0: Excludes from priority system
// 1-9: priority
const priority: { [key in CreepRoleName]: number } = {
  idler: 9,
  builder: 3,
  harvester: 9,
  repairer: 2,
  staticharvester: 0,
  transferer: 1,
  upgrader: 8,
}

const ConfigOfLevel: {
  [key: number]: {
    creeps: number,
    priority: { [key in CreepRoleName]: number }
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
