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

  work: (creep: Creep, target: CreepTargetObject): boolean => {
    let ret
    if (target instanceof ConstructionSite) {
      ret = creep.build(target)
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

export default Builder
