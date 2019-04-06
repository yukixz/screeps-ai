import _ from 'lodash'
import { ErrorMapper } from 'utils/ErrorMapper'

import GeneralType from 'type/general'
import Builder from 'role/builder'
import Harvester from 'role/harvester'
import Transferer from 'role/transferer'
import Upgrader from 'role/upgrader'
import ConfigOfLevel from 'config'

const CreepRoles: { [key: string]: CreepRole } = {}
for (const role of [Builder, Harvester, Transferer, Upgrader]) {
  CreepRoles[role.name] = role
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`******** Game tick: ${Game.time} ********`)

  // Automatically delete memory
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  // Constants
  const room: Room = Object.values(Game.rooms)[0]
  const terrian: RoomTerrain = room.getTerrain()
  const creeps: Creep[] = room.find(FIND_MY_CREEPS)
  const spwans: StructureSpawn[] = room.find(FIND_MY_SPAWNS)
  const room_level: number = _.get(room, ['controller', 'level'], 0)
  const config = ConfigOfLevel[room_level]

  // Search room for available jobs
  const jobs_by_role: { [key: string]: CreepTargetObject[] } = {}
  for (const [role_name, role] of Object.entries(CreepRoles)) {
    jobs_by_role[role_name] = role.jobs(room, terrian)
  }

  // Scan all creeps' roles
  const creeps_avail: Creep[] = []
  const creeps_by_role: { [key: string]: Creep[] } = {}
  for (const creep of creeps) {
    const role = CreepRoles[creep.memory.role]
    if (role.next(creep)) {
      creeps_avail.push(creep)
    }
    else {
      if (creeps_by_role[role.name] == null)
        creeps_by_role[role.name] = []
      creeps_by_role[role.name].push(creep)
    }
  }

  // Scan lacks of creeps' roles
  const creeps_lacks: [string, CreepTargetObject][] = []
  for (const [role_name, role_jobs] of Object.entries(jobs_by_role)) {
    const role_creeps = (creeps_by_role[role_name] || []).slice()
    for (const job of role_jobs) {
      const i = role_creeps.findIndex(creep => creep.memory.target === job.id)
      if (i >= 0) {
        role_creeps.splice(i, 1)
      }
      else {
        creeps_lacks.push([role_name, job])
      }
    }
    for (const creep of role_creeps) {
      creep.memory.role = 'idler'
      creeps_avail.push(creep)
    }
  }

  // Reassign creeps' roles
  for (const [role_name, job] of creeps_lacks) {
    const idx = creeps_avail.findIndex((creep) =>
      (config.nexts[creep.memory.role] || []).includes(role_name))
    if (idx >= 0) {
      const creep = creeps_avail.splice(idx, 1)[0]
      console.log(`Reassign creep:${creep.name} role:${creep.memory.role} to new role:${role_name} target:${job.id}`)
      creep.memory.role = role_name
      creep.memory.target = job.id
    }
  }

  // Spawn new `idler/general` creeps to meet creep amount
  if (config.creeps > creeps.length) {
    for (const [spawn, role_name] of _.zip(
      spwans.filter(spawn => spawn.spawning == null),
      Array(config.creeps - creeps.length).fill('idler'),
    )) {
      if (spawn == null || role_name == null)
        break
      const type = GeneralType
      const name = Date.now().toString(16)
      const cost = room.energyCapacityAvailable
      console.log(`Spawn new creep:${name} with spawn:${spawn.name} cost:${cost} type:${type.name} role:${role_name}`)
      spawn.spawnCreep(type.body(cost), name, {
        memory: {
          type: type.name,
          role: role_name,
        }
      })
    }
  }

  // Send work commands to creeps
  for (const creep of creeps) {
    const role_name = creep.memory.role
    const role = CreepRoles[role_name]
    const target = Game.getObjectById(creep.memory.target) as CreepTargetObject
    role.work(creep, target)
  }
})
