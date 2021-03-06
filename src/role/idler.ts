const Idler: CreepRole = {
  name: 'idler',
  allowed_types: ['general'],

  jobs: (room: Room, terrian: RoomTerrain): ICreepJob[] => {
    return []
  },

  next: (creep: Creep): CreepRoleName[] | void => {
    return ['harvester']
  },

  work: (creep: Creep, target: ICreepJob): ScreepsReturnCode | void => {
    return OK
  },
}

export default Idler
