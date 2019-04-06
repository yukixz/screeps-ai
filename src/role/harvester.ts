const Harvester: CreepRole = {
  name: 'harvester',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == creep.carryCapacity
  },

  jobs: (room: Room, terrian: RoomTerrain): CreepTargetObject[] => {
    const resutls: CreepTargetObject[] = []
    const sources = room.find(FIND_SOURCES)
    for (const source of sources) {
      const { x, y } = source.pos
      for (const [dx, dy] of [
        [-1, -1],
        [-1, -0],
        [-1, +1],
        [-0, -1],
        [-0, +1],
        [+1, -1],
        [+1, -0],
        [+1, +1],
      ]) {
        if (terrian.get(x + dx, y + dy) === 0)
          resutls.push(source)
      }
    }
    const containers = room.find(FIND_STRUCTURES, {
      filter: s =>
        s.structureType === STRUCTURE_CONTAINER &&
        s.store[RESOURCE_ENERGY] >= 100,
    })
    resutls.push(...containers)
    return resutls
  },

  work: (creep: Creep, target: CreepTargetObject): boolean => {
    let ret
    if (target instanceof Source) {
      ret = creep.harvest(target)
    }
    if (target instanceof StructureContainer) {
      ret = creep.withdraw(target, RESOURCE_ENERGY)
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

export default Harvester
