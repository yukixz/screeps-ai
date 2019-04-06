
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


interface CreepRole {
  name: string
  next: (creep: Creep) => boolean
  jobs: (room: Room, terrian: RoomTerrain) => CreepTargetObject[]
  work: (creep: Creep, target: CreepTargetObject) => void
}
type CreepTargetObject =
  | ConstructionSite
  | Source
  | Structure
