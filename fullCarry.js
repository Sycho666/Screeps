var fullCarry = {

    run: function(creep) {
	
        if(creep.memory.fullCarry == true && creep.carry.energy == 0) {
            creep.memory.fullCarry = false;
        }
        else if (creep.memory.fullCarry == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.fullCarry = true;
        }
        
        const targetSource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        const container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
                        && s.store.energy < creep.carryCapacity
        });
        const largeStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE
                        && s.store.energy > creep.carryCapacity
        });
        const extCheck = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_EXTENSION 
							&& i.energy < i.energyCapacity
        });
        const refillCarryFromSource = function(fillFromSource) {
            creep.moveTo(fillFromSource);
            creep.pickup(fillFromSource);
        }
        const refillCarryFromContainer = function(fillFromContainer) {
            creep.moveTo(fillFromContainer);
            creep.withdraw(fillFromContainer, RESOURCE_ENERGY);
        }
        const refillCarryFromStorage = function(fillFromStorage) {
            creep.moveTo(fillFromStorage);
            creep.withdraw(fillFromStorage, RESOURCE_ENERGY);
        }

        if(creep.memory.role !== 'hauler') {
            if(creep.memory.fullCarry == false && extCheck == 0) {
                if (creep.pos.getRangeTo(targetSource) > creep.pos.getRangeTo(container)) {                        
                    refillCarryFromContainer(container);
                } else if (creep.pos.getRangeTo(targetSource) > creep.pos.getRangeTo(largeStorage)) {  
                    refillCarryFromStorage(largeStorage);
                } else {                    
                    refillCarryFromSource(targetSource);
                } 
            } else if(creep.memory.fullCarry == false) {
                if (creep.pos.getRangeTo(targetSource) > creep.pos.getRangeTo(container)) {  
                    refillCarryFromContainer(container);
                } else if (creep.pos.getRangeTo(targetSource) > creep.pos.getRangeTo(largeStorage)) { 
                    refillCarryFromStorage(largeStorage);
                } else {                    
                    creep.moveTo(16, 43);
                } 
            }             
        } else if(creep.memory.role == 'hauler' && creep.memory.fullCarry == false) {
            refillCarryFromSource(targetSource);
        }
    }
};

module.exports = fullCarry;