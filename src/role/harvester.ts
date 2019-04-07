import { CreepJob } from 'utils/creep'
import { lookAtSourceJobs } from "utils/source";

const Harvester: CreepRole = {
  name: 'harvester',

  jobs: (room: Room, terrian: RoomTerrain): ICreepJob[] => {
    return [
      ...room.find(FIND_STRUCTURES, {
        filter: s =>
          s.structureType === STRUCTURE_CONTAINER &&
          s.store[RESOURCE_ENERGY] >= 100,
      })
        .map(s => new CreepJob(s)),

      ...lookAtSourceJobs(room)
        .filter(([j, m]) => m.standable && !m.static_on)
        .map(([j, m]) => j),
    ]
  },

  next: (creep: Creep): CreepRoleName[] | void => {
    if (creep.carry.energy === creep.carryCapacity) {
      return ['builder', 'repairer', 'transferer', 'upgrader']
    }
  },

  work: (creep: Creep, job: ICreepJob): ScreepsReturnCode | void => {
    const { target } = job
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
