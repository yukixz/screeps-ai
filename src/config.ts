// 0: Excludes from role priority
const role_priority: Record<CreepRoleName, number> = {
  builder: 3,
  harvester: 9,
  idler: 9,
  repairer: 2,
  staticharvester: 0,
  transferer: 1,
  upgrader: 8,
}

// 0: Excludes from type priority
const type_priority: Record<CreepTypeName, number> = {
  general: 1,
  static: 2,
}

const ConfigOfLevel: {
  [key: number]: {
    creeps: Record<CreepTypeName, number>
    role_priority: Record<CreepRoleName, number>
    type_priority: Record<CreepTypeName, number>
  }
} = {
  0: { creeps: { general: 0, static: 0 }, role_priority, type_priority },
  1: { creeps: { general: 4, static: 0 }, role_priority, type_priority },
  2: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
  3: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
  4: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
  5: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
  6: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
  7: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
  8: { creeps: { general: 8, static: 4 }, role_priority, type_priority },
}

export default ConfigOfLevel
