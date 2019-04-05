import _ from 'lodash'
import { ErrorMapper } from 'utils/ErrorMapper'
import { CreepPerRole } from 'config'
import * as RoleBuilder from 'role/builder'
import * as RoleHarvester from 'role/harvester'
import * as RoleUpgrader from 'role/upgrader'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`)

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  // const creeps: Creep[] = room.find(FIND_MY_CREEPS)
  // const spwans: StructureSpawn[] = room.find(FIND_MY_SPAWNS)
  // const structures: Structure[] = room.find(FIND_MY_STRUCTURES)

  // Automatically spawn creeps to meet requirement
  const idleSpawns = _.filter(Game.spawns, (spawn) => spawn.spawning == null)
  const roleCount = _.countBy(Game.creeps, 'memory.role')
  for (const spawn of idleSpawns) {
    for (const [role, required] of Object.entries(CreepPerRole)) {
      if (roleCount[role] == null) roleCount[role] = 0
      if (roleCount[role] < required) {
        console.log(`Spawn creep ${role} for ${roleCount[role]} < ${required}`)
        spawn.spawnCreep([WORK, CARRY, MOVE], `${role}-${Date.now()}`, {
          memory: {
            role: role,
            working: false,
          }
        })
        roleCount[role]++
        break
      }
    }
  }

  // Creeps work
  for (const [name, creep] of Object.entries(Game.creeps)) {
    RoleHarvester.run(creep)
    // if (creep.memory.role == 'builder') {
    //   RoleBuilder.run(creep)
    // }
    // if (creep.memory.role == 'harvester') {
    //   RoleHarvester.run(creep)
    // }
    // if (creep.memory.role == 'upgrader') {
    //   RoleUpgrader.run(creep)
    // }
  }
})
