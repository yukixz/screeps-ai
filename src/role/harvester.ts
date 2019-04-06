const Harvester: CreepRole = {
  name: 'harvester',

  reassign: (creep: Creep): string[] | void => {
    if (creep.carry.energy == creep.carryCapacity) {
      return ['builder', 'transferer', 'upgrader']
    }
  },

  work: (creep: Creep): void => {
    const sources = creep.room.find(FIND_SOURCES)
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
    }
  },
}

export default Harvester
