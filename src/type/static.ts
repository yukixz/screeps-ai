const StaticType: CreepType = {
  name: 'static',

  body: (cost: number): BodyPartConstant[] => {
    let body: BodyPartConstant[] = [MOVE]
    let body_cost: number = 0
    for (let i = 0; i < 100; i++) {
      const p = WORK
      if (body_cost + BODYPART_COST[p] <= cost) {
        body.push(p)
        body_cost += BODYPART_COST[p]
      }
      else break
    }
    return body
  },
}

export default StaticType
