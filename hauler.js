var roleHauler = {
	
    /** @param {Creep} creep **/
    run: function(creep) {

        const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);   
        const container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });
        const fillClosest = function(fillTheStuff) {
            creep.moveTo(creep.pos.findClosestByRange(fillTheStuff), {visualizePathStyle: {stroke: '#ffffff'}});
            creep.transfer(creep.pos.findClosestByRange(fillTheStuff), RESOURCE_ENERGY);
        }      
        const checkExtensions = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => (i.structureType == STRUCTURE_EXTENSION ||
                            i.structureType == STRUCTURE_SPAWN ||
                            i.structureType == STRUCTURE_TOWER) && i.energy < i.energyCapacity
        });
        const checkStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_STORAGE
                        && i.store.energy < i.storeCapacity
        });     
        
        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if(container) {
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }

        if(checkExtensions.length > 0){
            fillClosest(checkExtensions);
        } else if(checkStorage.length > 0 && creep.carry.energy == creep.carryCapacity){
            fillClosest(checkStorage);
        }

        
    }
};

module.exports = roleHauler;