
interface CreepMemory {
  type: string
  role: string
  // working: boolean
  target?: string
}


interface CreepType {
  name: CREEPTYPE
  allowed_roles: string[]
  body: (cost: number) => BodyPartConstant[]
}
type CREEPTYPE =
  | CREEPROLE_GENERAL
type CREEPROLE_GENERAL = 'general'


interface CreepRole {
  name: CREEPROLE
  reassign: (creep: Creep) => string[] | void
  // jobs: (room: Room, terrian: Terrain) => RoomObject[]
  work: (creep: Creep) => void
}
type CREEPROLE =
  | CREEPROLE_BUILDER
  | CREEPROLE_HARVESTER
  | CREEPROLE_TRANSFERER
  | CREEPROLE_UPGRADER
type CREEPROLE_BUILDER = 'builder'
type CREEPROLE_HARVESTER = 'harvester'
type CREEPROLE_TRANSFERER = 'transferer'
type CREEPROLE_UPGRADER = 'upgrader'
