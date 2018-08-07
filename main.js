var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleTowers = require('role.towers');

module.exports.loop = function () {

	if(1 == 1) {
		var towers = require('role.towers');
		roleTowers.run(towers);
	}

	for(var name in Memory.creeps) {
		if(!Game.creeps[name]) {
			delete Memory.creeps[name];
		}
	}
	
	var miner = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
	var hauler = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
	var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var fixer = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
		
    if(miner.length < 1) {
        var newName = 'Miner' + Game.time;
        Game.spawns['Asylum'].spawnCreep([WORK,WORK,WORK,WORK,WORK], newName, {
			memory: {role: 'miner'}, directions: [BOTTOM_RIGHT]
		});
	}
		
    if(hauler.length < 2) {
        var newName = 'Hauler' + Game.time;
        Game.spawns['Asylum'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, //300 energy - road(2*(4*0.5-2)=0),road(2*(4*1-2)=4),road(2*(4*5-2)=36)
            {memory: {role: 'hauler', fullCarry: false}});
	}
			
    if(builder.length < 1) {
        var newName = 'Builder' + Game.time;
        Game.spawns['Asylum'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, //450 energy - road(2*(4*0.5-2)=0),road(2*(4*1-2)=4),road(2*(4*5-2)=36)
            {memory: {role: 'builder', fullCarry: false}});
	}
			
    if(upgrader.length < 1) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Asylum'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, //450 energy - road(2*(4*0.5-2)=0),road(2*(4*1-2)=4),road(2*(4*5-2)=36)
            {memory: {role: 'upgrader', fullCarry: false}});
    }
			
    if(fixer.length < 1) {
        var newName = 'Fixer' + Game.time;
        Game.spawns['Asylum'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, //450 energy - road(2*(4*0.5-2)=0),road(2*(4*1-2)=4),road(2*(4*5-2)=36)
            {memory: {role: 'fixer', fullCarry: false}});
    }
    
    if(Game.spawns['Asylum'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Asylum'].spawning.name];
        Game.spawns['Asylum'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Asylum'].pos.x + 1, 
            Game.spawns['Asylum'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
    }
}

