var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {	

		var fullCarry = require('role.fullCarry');
		fullCarry.run(creep);
		
		if(creep.memory.fullCarry == true) {

			const targetBuild = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			
			if (targetBuild){
				if(creep.build(targetBuild) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targetBuild, {visualizePathStyle: {stroke: '#0bea22'}});
				}			
			} else {				
				var roleFixer = require('role.fixer');
				roleFixer.run(creep);
			}
		}
	}
};

module.exports = roleBuilder;