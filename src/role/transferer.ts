const Transferer: CreepRole = {
  name: 'transferer',

  reassign: (creep: Creep): string[] | void => {
    if (creep.carry.energy == 0) {
      return ['harvester']
    }
  },

  work: (creep: Creep): void => {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) =>
        (
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN
        ) &&
        structure.energy < structure.energyCapacity
    })
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
      }
    }
  },
}

export default Transferer
