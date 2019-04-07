import { lookAtSourceJobs } from "utils/source";

const StaticHarvester: CreepRole = {
  name: 'staticharvester',
  allowed_types: ['static'],

  jobs: (room: Room, terrian: RoomTerrain): ICreepJob[] => {
    return lookAtSourceJobs(room)
      .filter(([j, m]) => m.standable && m.container && !m.static_on)
      .map(([j, m]) => j)
  },

  next: (creep: Creep): CreepRoleName[] | void => {
    return
  },

  work: (creep: Creep, job: ICreepJob): ScreepsReturnCode | void => {
    const { target, position: [x, y] } = job
    let retcode: ScreepsReturnCode | undefined
    if (target instanceof Source) {
      retcode = creep.harvest(target)
    }
    if (retcode === ERR_NOT_IN_RANGE) {
      retcode = creep.moveTo(x, y, { visualizePathStyle: { stroke: '#ffff00' } })
    }
    if (retcode === ERR_TIRED) {
      return OK
    }
    return retcode
  },
}

export default StaticHarvester
