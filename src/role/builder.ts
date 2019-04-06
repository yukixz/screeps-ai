const Builder: CreepRole = {
  name: 'builder',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): CreepTargetObject[] => {
    return [
      ...room.find(FIND_CONSTRUCTION_SITES),
    ]
  },

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (false) { }
    else if (target instanceof ConstructionSite) {
      if (creep.build(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
      }
    }
    else {
      throw new TypeError(`Argument 'target' must NOT be ${target.constructor.name}`)
    }
  },
}

export default Builder
