var roleFixer = {

    run: function(creep) {	

		var fullCarry = require('role.fullCarry');
		fullCarry.run(creep);
		
		if(creep.memory.fullCarry == true) {
			
			const repairTower = creep.room.find(FIND_STRUCTURES, {
					filter: (i) => i.structureType == STRUCTURE_TOWER
								&& i.hits < i.hitsMax
			});
			const repairContainer = creep.room.find(FIND_STRUCTURES, {
					filter: (i) => i.structureType == STRUCTURE_CONTAINER
								&& (i.hits < (i.hitsMax * 0.8))
			});
			const repairStorage = creep.room.find(FIND_STRUCTURES, {
					filter: (i) => i.structureType == STRUCTURE_STORAGE
								&& (i.hits < (i.hitsMax * 0.8))
			});		
			const repairRampart = creep.room.find(FIND_STRUCTURES, {
					filter: (i) => i.structureType == STRUCTURE_RAMPART
								&& i.hits < (i.hitsMax / 3)
			});
			const repairWall = creep.room.find(FIND_STRUCTURES, {
					filter: (i) => i.structureType == STRUCTURE_WALL
								&& i.hits < (i.hitsMax / 3)
			});	
			const repairRoad = creep.room.find(FIND_STRUCTURES, {
					filter: (i) => i.structureType == STRUCTURE_ROAD
								&& i.hits < i.hitsMax
			});		
			
			switch(creep.memory.fullCarry == true) {
				case repairTower.length > 1:
					//console.log(repairTower);
					if(creep.repair(creep.pos.findClosestByRange(repairTower)) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.pos.findClosestByRange(repairTower), {visualizePathStyle: {stroke: '#FF8C00'}});
					}
					break;
				case repairContainer.length > 1:
					//console.log(repairContainer);
					if(creep.repair(creep.pos.findClosestByRange(repairContainer)) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.pos.findClosestByRange(repairContainer), {visualizePathStyle: {stroke: '#FF8C00'}});
					}
					break;
				case repairStorage.length > 1:
					//console.log(repairStorage);
					if(creep.repair(creep.pos.findClosestByRange(repairStorage)) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.pos.findClosestByRange(repairStorage), {visualizePathStyle: {stroke: '#FF8C00'}});
					}
					break;
				case repairRampart.length > 1:
					//console.log(repairRampart);
					if(creep.repair(creep.pos.findClosestByRange(repairRampart)) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.pos.findClosestByRange(repairRampart), {visualizePathStyle: {stroke: '#FF8C00'}});
					}
					break;
				case repairWall.length > 1:
					//console.log(repairWall);
					if(creep.repair(creep.pos.findClosestByRange(repairWall)) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.pos.findClosestByRange(repairWall), {visualizePathStyle: {stroke: '#FF8C00'}});
					}
					break;
				default:
					//console.log(repairRoad);
					if(creep.repair(creep.pos.findClosestByRange(repairRoad)) == ERR_NOT_IN_RANGE) {
						creep.moveTo(creep.pos.findClosestByRange(repairRoad), {visualizePathStyle: {stroke: '#FF8C00'}});
					}
					break;
			}
		}
	}
};

module.exports = roleFixer;