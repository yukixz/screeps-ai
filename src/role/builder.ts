const Builder: CreepRole = {
  name: 'builder',

  reassign: (creep: Creep): string[] | void => {
    if (creep.carry.energy == 0) {
      return ['harvester']
    }
  },

  work: (creep: Creep): void => {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES)
    if (targets.length > 0) {
      if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
      }
    }
  },
}

export default Builder
