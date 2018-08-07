var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {	
	
		var fullCarry = require('role.fullCarry');
		
		fullCarry.run(creep)
		
		if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
		}
	}	
};

module.exports = roleUpgrader;