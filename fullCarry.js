var fullCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {
	
        if(creep.memory.fullCarry == true && creep.carry.energy == 0) {
            creep.memory.fullCarry = false;
        }
        else if (creep.memory.fullCarry == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.fullCarry = true;
        }
        
        const targetSource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        const largeStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE
                        && s.store.energy > creep.carryCapacity
        });
        const extCheck = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_EXTENSION 
							&& i.energy < i.energyCapacity
        });
        const refillCarryFromSource = function(fillFromSource) {
			if(fillFromSource) {
				if(creep.pickup(fillFromSource) == ERR_NOT_IN_RANGE) {
					creep.moveTo(fillFromSource);
				}
			}
        }
        const refillCarryFromStorage = function(fillFromStorage) {
            creep.moveTo(fillFromStorage);
            creep.withdraw(fillFromStorage, RESOURCE_ENERGY);
        }
		
        if(creep.memory.role !== 'hauler') {
            if(creep.memory.fullCarry == false) {               
				if (creep.pos.getRangeTo(targetSource) > creep.pos.getRangeTo(largeStorage)) { 
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