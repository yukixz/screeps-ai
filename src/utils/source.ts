import { CreepJob } from 'utils/creep'

type SourceJobMark = {
  standable: boolean
  container: boolean
  static_on: boolean
}

let cache: [CreepJob, SourceJobMark][]
let cache_tick = 0

export function lookAtSourceJobs(room: Room): [CreepJob, SourceJobMark][] {
  if (Game.time === cache_tick)
    return cache
  const results: [CreepJob, SourceJobMark][] = []

  const sources = room.find(FIND_SOURCES)
  for (const source of sources) {
    const locations = room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.y + 1)
    for (const y in locations) {
      for (const x in locations[y]) {
        let mark: SourceJobMark = {
          standable: false,
          container: false,
          static_on: false,
        }
        for (const loc of locations[y][x]) {
          if (loc.type === LOOK_TERRAIN && loc.terrain === 'plain')
            mark.standable = true
          if (loc.type === LOOK_STRUCTURES && loc.structure && loc.structure.structureType === STRUCTURE_CONTAINER)
            mark.container = true
          if (loc.type === LOOK_CREEPS && loc.creep && loc.creep.memory.role === 'staticharvester')
            mark.static_on = true
        }
        results.push([new CreepJob(source, [parseInt(x), parseInt(y)]), mark])
      }
    }
  }

  cache = results
  cache_tick = Game.time
  return results
}
