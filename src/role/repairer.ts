import { CreepJob } from 'utils/creep'

const Repairer: CreepRole = {
  name: 'repairer',
  allowed_types: ['general'],

  jobs: (room: Room, terrian: RoomTerrain): ICreepJob[] => {
    return room.find(FIND_STRUCTURES, {
      filter: obj => obj.hits < obj.hitsMax * 0.80
    })
      .map(s => new CreepJob(s))
  },

  next: (creep: Creep): CreepRoleName[] | void => {
    if (creep.carry.energy == 0) {
      return ['harvester']
    }
    if (creep.memory.retcode !== OK && creep.carry.energy > 0) {
      return ['builder', 'repairer', 'transferer', 'upgrader']
    }
  },

  work: (creep: Creep, job: ICreepJob): ScreepsReturnCode | void => {
    const { target } = job
    let retcode: ScreepsReturnCode | undefined
    if (target instanceof Structure) {
      retcode = creep.repair(target)
    }
    if (retcode === ERR_NOT_IN_RANGE) {
      retcode = creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } })
    }
    if (retcode === ERR_TIRED) {
      return OK
    }
    return retcode
  },
}

export default Repairer
