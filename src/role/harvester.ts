const Harvester: CreepRole = {
  name: 'harvester',

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

  next: (creep: Creep): CreepRoleName[] | void => {
    if (creep.carry.energy === creep.carryCapacity) {
      return ['builder', 'repairer', 'transferer', 'upgrader']
    }
  },

  work: (creep: Creep, target: CreepTargetObject): ScreepsReturnCode | void => {
    let retcode: ScreepsReturnCode | undefined
    if (target instanceof Source) {
      retcode = creep.harvest(target)
    }
    if (target instanceof StructureContainer) {
      retcode = creep.withdraw(target, RESOURCE_ENERGY)
    }
    if (retcode === ERR_NOT_IN_RANGE) {
      retcode = creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00' } })
    }
    if (retcode === ERR_TIRED) {
      return OK
    }
    return retcode
  },
}

export default Harvester
