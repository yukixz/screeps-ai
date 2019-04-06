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

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (false) { }
    else if (target instanceof Source) {
      if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
      }
    }
    else if (target instanceof StructureContainer) {
      if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
      }
    }
    else {
      throw new TypeError(`Argument 'target' must NOT be ${target.constructor.name}`)
    }
  },
}

export default Harvester
