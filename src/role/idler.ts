const Idler: CreepRole = {
  name: 'idler',

  next: (creep: Creep): boolean => {
    return true
  },

  jobs: (room: Room, terrian: RoomTerrain): ConstructionSite[] => {
    return []
  },

  work: (creep: Creep, target: CreepTargetObject): void => {
    return
  },
}

export default Idler
