const Transferer: CreepRole = {
  name: 'transferer',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): Structure[] => {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) =>
        (
          structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN
        ) &&
        structure.energy < structure.energyCapacity
    })
  },

  work: (creep: Creep, target: CreepTargetObject): boolean => {
    let ret
    if (target instanceof Structure) {
      ret = creep.transfer(target, RESOURCE_ENERGY)
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

export default Transferer
