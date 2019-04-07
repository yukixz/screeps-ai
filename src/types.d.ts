interface CreepMemory {
  type: CreepTypeName
  role: CreepRoleName
  job?: {
    id: string
    target: string
    position: [number, number]
  }
  retcode?: ScreepsReturnCode | void
}

interface CreepType {
  name: CreepTypeName
  body: (cost: number) => BodyPartConstant[]
}
type CreepTypeName =
  | 'general'
  | 'static'

interface CreepRole {
  name: CreepRoleName
  allowed_types: CreepTypeName[]
  jobs: (room: Room, terrian: RoomTerrain) => ICreepJob[]
  next: (creep: Creep) => CreepRoleName[] | void
  work: (creep: Creep, job: ICreepJob) => ScreepsReturnCode | void
}
type CreepRoleName =
  | 'idler'
  | 'builder'
  | 'harvester'
  | 'repairer'
  | 'staticharvester'
  | 'transferer'
  | 'upgrader'

interface ICreepJob {
  id: string
  target: CreepJobTarget
  position: [number, number]
}
type CreepJobTarget =
  | ConstructionSite
  | Resource
  | Source
  | Structure
