var roleTower = {

    run: function(towers) {	
	
		var myRoomName= 'W59S33'
		var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS); 
		var hostileHealers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, { 
			filter: (s) => (s.getActiveBodyparts(HEAL) > 0) }); 
		var hostileAttackers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, { 
			filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0 || s.getActiveBodyparts(RANGED_ATTACK) > 0) }); 
		var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS); 
		var activeTowers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, { 
			filter: { structureType: STRUCTURE_TOWER } }); 
		var healerHit = false; 

		if (hostileHealers.length > 0 && healerHit == false) { 
			activeTowers.forEach(activeTowers => tower.attack(hostileHealers[0])); 
			healerHit = true; 
			console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!"); 
		} else if (hostileAttackers.length > 0) { 
			activeTowers.forEach(tower => tower.attack(hostileAttackers[0])); 
			healerHit = false; 
			console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!"); 
		} else if (hostiles.length > 0) { 
			activeTowers.forEach(tower => tower.attack(hostiles[0])); 
			healerHit = false; 
			console.log("ALERT!!!! WE ARE UNDER ATTACK!!!!!"); 
		} if (hostiles.length === 0) { 
			for (let name in Game.creeps) { 
				var creep = Game.creeps[name]; 
				if (creep.hits < creep.hitsMax) {
					activeTowers.forEach(tower => tower.heal(creep)); 
					console.log("Tower is healing Creeps."); 
				}
			}
		}		 
    }
};

module.exports = roleTower;