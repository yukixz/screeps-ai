import _ from 'lodash'
import { ErrorMapper } from 'utils/ErrorMapper'

import GeneralType from 'type/general'
import Builder from 'role/builder'
import Harvester from 'role/harvester'
import Transferer from 'role/transferer'
import Upgrader from 'role/upgrader'
import * as cfg from 'config'

const CreepRoleNameMap: { [key: string]: CreepRole } = {}
for (const role of [Builder, Harvester, Transferer, Upgrader]) {
  CreepRoleNameMap[role.name] = role
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
  const creeps: Creep[] = room.find(FIND_MY_CREEPS)
  const spwans: StructureSpawn[] = room.find(FIND_MY_SPAWNS)
  // const sources: Source[] = room.find(FIND_SOURCES)
  // const structures: Structure[] = room.find(FIND_MY_STRUCTURES)
  // const terrian: Terrain = room.getTerrain()
  const room_level: number = _.get(room, ['controller', 'level'], 0)
  const cfg_creeps = cfg.CreepsOfLevel[room_level]

  // Spawn new `harvester` creeps to meet creep amount
  if (cfg_creeps.amount > creeps.length) {
    for (const [spawn, role_name] of _.zip(
      spwans.filter(spawn => spawn.spawning == null),
      Array(cfg_creeps.amount - creeps.length).fill('harvester'),
    )) {
      if (spawn == null || role_name == null)
        break
      const name = Date.now().toString(16)
      const cost = room.energyCapacityAvailable
      const type = GeneralType
      console.log(`Spawn new creep:${name} with spawn:${spawn.name} cost:${cost} type:${type.name} role:${role_name}`)
      spawn.spawnCreep(type.body(cost), name, {
        memory: {
          type: type.name,
          role: role_name,
        }
      })
    }
  }

  // Scan all creeps' roles
  const creeps_avail: [Creep, string[]][] = []
  const creeps_roles: { [key: string]: Creep[] } = {}
  for (const creep of creeps) {
    const role = CreepRoleNameMap[creep.memory.role]
    const new_roles = role.reassign(creep)
    if (new_roles) {
      creeps_avail.push([creep, new_roles])
    }
    else {
      if (creeps_roles[role.name] == null)
        creeps_roles[role.name] = []
      creeps_roles[role.name].push(creep)
    }
  }

  // Scan lacks of creeps' roles
  const creeps_lacks: string[] = []
  for (const [role_name, role_amount] of Object.entries(cfg_creeps.roles)) {
    const role_creeps = creeps_roles[role_name] || []
    if (role_creeps.length < role_amount) {
      creeps_lacks.push(...Array(role_amount - role_creeps.length).fill(role_name))
    }
  }

  // Reassign creeps OR spawn new creep
  for (const role_name of creeps_lacks) {
    const idx = creeps_avail.findIndex(([creep, new_roles]) =>
      new_roles.includes(role_name))
    if (idx >= 0) {
      const [creep, new_roles] = creeps_avail.splice(idx, 1)[0]
      console.log(`Reassign creep:${creep.name} role:${creep.memory.role} to new role:${role_name}`)
      creep.memory.role = role_name
      continue
    }
  }

  // Send work commands to creeps
  for (const creep of creeps) {
    const role_name = creep.memory.role
    const role = CreepRoleNameMap[role_name]
    role.work(creep)
  }
})
