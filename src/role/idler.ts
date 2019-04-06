const Idler: CreepRole = {
  name: 'idler',

  jobs: (room: Room, terrian: RoomTerrain): ConstructionSite[] => {
    return []
  },

  next: (creep: Creep): CreepRoleName[] | void => {
    return ['harvester']
  },

  work: (creep: Creep, target: CreepTargetObject): ScreepsReturnCode | void => {
    return OK
  },
}

export default Idler
