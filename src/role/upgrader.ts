const Upgrader: CreepRole = {
  name: 'upgrader',

  reassign: (creep: Creep): string[] | void => {
    if (creep.carry.energy == 0) {
      return ['harvester']
    }
  },

  work: (creep: Creep): void => {
    if (creep.room.controller == null)
      return
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } })
    }
  },
}

export default Upgrader
