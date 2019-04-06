const Harvester: CreepRole = {
  name: 'harvester',

  next: (creep: Creep): boolean => {
    return creep.carry.energy == creep.carryCapacity
  },

  jobs: (room: Room, terrian: RoomTerrain): Source[] => {
    const resutls: Source[] = []
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
    return resutls
  },

  work: (creep: Creep, target: CreepTargetObject): void => {
    if (!(target instanceof Source))
      throw new TypeError(`Argument 'target' must be Source`)
    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
    }
  },
}

export default Harvester
