import _ from 'lodash'
import { ErrorMapper } from 'utils/ErrorMapper'
import { CreepRoles } from 'config'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`******** Game tick: ${Game.time} ********`)

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name]
    }
  }

  // Constants
  const room: Room = Object.values(Game.rooms)[0]
  // const terrian: Terrain = room.getTerrain()
  const room_level: number = _.get(room, ['controller', 'level'], 0)
  const creeps: Creep[] = room.find(FIND_MY_CREEPS)
  const spwans: StructureSpawn[] = room.find(FIND_MY_SPAWNS)
  // const structures: Structure[] = room.find(FIND_MY_STRUCTURES)

  // Reassign creep role OR spawn new creep
  const creep_groups = _.groupBy(creeps, 'memory.role')
  const creeps_lack: string[] = []
  const creeps_addi: Creep[] = []
  for (const [role_name, role] of Object.entries(CreepRoles)) {
    const amount = role.amount[room_level]
    const creeps = creep_groups[role_name] || []
    if (creeps.length < amount) {
      creeps_lack.push(...Array(amount - creeps.length).fill(role_name))
    }
    if (creeps.length > amount) {
      creeps_addi.push(...creeps.splice(amount))
    }
  }
  const idle_spawns = spwans.filter(spawn => spawn.spawning == null)
  for (const role_name of creeps_lack) {
    const creep = creeps_addi.pop()
    if (creep) {
      creep.memory.role = role_name
      continue
    }
    const spawn = idle_spawns.pop()
    if (spawn) {
      spawn.spawnCreep([WORK, CARRY, MOVE], Date.now().toString(16), {
        memory: {
          role: role_name,
          working: false,
        }
      })
      continue
    }
  }

  // Send work commands to creeps
  for (const creep of creeps) {
    const role_name = creep.memory.role
    const role = CreepRoles[role_name]
    role.run(creep)
  }
})
