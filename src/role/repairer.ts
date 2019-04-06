const Rapairer: CreepRole = {
  name: 'rapairer',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == 0
  },

  jobs: (room: Room, terrian: RoomTerrain): CreepTargetObject[] => {
    return [
      ...room.find(FIND_STRUCTURES, { filter: obj => obj.hits < obj.hitsMax * 0.50 }),
    ]
  },

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (false) { }
    else if (target instanceof Structure) {
      if (creep.repair(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
      }
    }
    else {
      throw new TypeError(`Argument 'target' must NOT be ${target.constructor.name}`)
    }
  },
}

export default Rapairer
