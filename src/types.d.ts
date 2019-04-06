interface CreepMemory {
  type: string
  role: CreepRoleName
  target?: string
  retcode?: ScreepsReturnCode | void
}

interface CreepType {
  name: string
  body: (cost: number) => BodyPartConstant[]
}
type CreepTypeName =
  | 'general'

interface CreepRole {
  name: CreepRoleName
  jobs: (room: Room, terrian: RoomTerrain) => CreepTargetObject[]
  next: (creep: Creep) => CreepRoleName[] | void
  work: (creep: Creep, target: CreepTargetObject) => ScreepsReturnCode | void
}
type CreepRoleName =
  | 'idler'
  | 'builder'
  | 'harvester'
  | 'repairer'
  | 'transferer'
  | 'upgrader'
type CreepTargetObject =
  | ConstructionSite
  | Resource
  | Source
  | Structure
