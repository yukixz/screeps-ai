const Upgrader: CreepRole = {
  name: 'upgrader',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): StructureController[] => {
    return room.controller ? Array(2).fill(room.controller) : []
  },

  work: (creep: Creep, target: CreepTargetObject): boolean => {
    let ret
    if (target instanceof StructureController) {
      ret = creep.upgradeController(target)
    }
    if (ret === ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
      return true
    }
    if (ret == null)
      throw new TypeError(`Argument 'target' must NOT be ${target.constructor.name}`)
    return ret === OK
  },
}

export default Upgrader
