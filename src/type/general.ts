const GeneralType: CreepType = {
  name: 'general',

  body: (cost: number): BodyPartConstant[] => {
    let avail: BodyPartConstant[] = [MOVE, WORK, CARRY]
    let body: BodyPartConstant[] = []
    let body_cost: number = 0
    for (let i = 0; i < 100; i++) {
      const p = avail[i % 3]
      if (body_cost + BODYPART_COST[p] <= cost) {
        body.push(p)
        body_cost += BODYPART_COST[p]
      }
      else break
    }
    return body
  },
}

export default GeneralType
