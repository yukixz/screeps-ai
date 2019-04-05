export function run(creep: Creep) {
    if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false
        creep.say('💎harvest')
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true
        creep.say('🚚transfer')
    }

    if (creep.memory.working) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity
            }
        })
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES)
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
        }
    }
}
