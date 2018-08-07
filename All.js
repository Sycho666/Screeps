Game.spawns['Spawn1'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );
	
	
	
module.exports = {
    run: function(creep) {
        if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if(creep.memory.working == true) {
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0
        })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            }
        }
        else {
            var EnergyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                || s.structureType == STRUCTURE_EXTENSION)
                                && s.energy < s.energyCapacity
        })
            if(creep.transfer(EnergyStructures) == ERR_NOT_IN_RANGE) {
                creep.moveTo(EnergyStructures)
            }
        }
    }
};


/**
 * @param {number|object} x
 * @param {number} [y]
 * @param {string} [roomName]
 * @returns {RoomPosition|boolean}
 */
var getRoomPosition = function (x, y, roomName) {
    if (!x) return false;

    if (typeof x == 'object') {
        var object = x;

        x = object.x;
        y = object.y;
        roomName = object.roomName || object.room;
    }

    return new RoomPosition(x, y, roomName);
};

global.pos = getRoomPosition;

// Usage:
creep.memory.target = creep.room.find(FIND_SOURCES)[0];

creep.moveTo(pos(creep.memory.target));