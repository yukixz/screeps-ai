export class CreepJob implements ICreepJob {
  public target: CreepJobTarget
  public position: [number, number]

  constructor(target: CreepJobTarget | string, posistion?: [number, number]) {
    if (typeof target === 'string') {
      target = Game.getObjectById(target) as CreepJobTarget
    }
    this.target = target
    this.position = posistion || [target.pos.x, target.pos.y]
  }

  get id(): string {
    return [this.target.id, ...this.position].join('|')
  }
}
