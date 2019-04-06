
interface CreepMemory {
  type: string
  role: string
  target?: string
}


interface CreepType {
  name: string
  body: (cost: number) => BodyPartConstant[]
}
type CreepTypeName =
  | 'general'


interface CreepRole {
  name: string
  next: (creep: Creep) => boolean
  jobs: (room: Room, terrian: RoomTerrain) => CreepTargetObject[]
  work: (creep: Creep, target: CreepTargetObject) => boolean
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
