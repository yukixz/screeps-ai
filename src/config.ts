import * as RoleBuilder from 'role/builder'
import * as RoleHarvester from 'role/harvester'
import * as RoleUpgrader from 'role/upgrader'

export const CreepRoles: {
    [key: string]: {
        body: BodyPartConstant[],
        amount: number[],
        priority: number,
        run: Function,
    }
} = {
    harvester: {
        run: RoleHarvester.run,
        body: [WORK, CARRY, MOVE],
        amount: [0, 1, 1, 1, 1, 1, 1, 1, 1],
        priority: 0,
    },
    builder: {
        run: RoleBuilder.run,
        body: [WORK, CARRY, MOVE],
        amount: [0, 0, 1, 1, 1, 1, 1, 1, 1],
        priority: 2,
    },
    upgrader: {
        run: RoleUpgrader.run,
        body: [WORK, CARRY, MOVE],
        amount: [0, 2, 2, 2, 2, 2, 2, 2, 2],
        priority: 1,
    },
}
