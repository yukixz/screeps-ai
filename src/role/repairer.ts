const Repairer: CreepRole = {
  name: 'repairer',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): CreepTargetObject[] => {
    return [
      ...room.find(FIND_STRUCTURES, { filter: obj => obj.hits < obj.hitsMax * 0.50 }),
    ]
  },

  work: (creep: Creep, target: CreepTargetObject): boolean => {
    let ret
    if (target instanceof Structure) {
      ret = creep.repair(target)
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

export default Repairer
