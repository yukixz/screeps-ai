const Upgrader: CreepRole = {
  name: 'upgrader',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): StructureController[] => {
    return room.controller ? Array(2).fill(room.controller) : []
  },

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (!(target instanceof StructureController))
      throw new TypeError(`Argument 'target' must be StructureController`)
    if (creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
    }
  },
}

export default Upgrader
