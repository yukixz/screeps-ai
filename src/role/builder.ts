const Builder: CreepRole = {
  name: 'builder',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): ConstructionSite[] => {
    return room.find(FIND_CONSTRUCTION_SITES)
  },

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (!(target instanceof ConstructionSite))
      throw new TypeError(`Argument 'target' must be ConstructionSite`)
    if (creep.build(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
    }
  },
}

export default Builder
