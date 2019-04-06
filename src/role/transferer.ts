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

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (!(target instanceof Structure))
      throw new TypeError(`Argument 'target' must be Structure`)
    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
    }
  },
}

export default Transferer
