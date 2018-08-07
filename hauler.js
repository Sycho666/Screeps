var roleHauler = {

    run: function(creep) {

        var fullCarry = require('role.fullCarry');
        fullCarry.run(creep);

        const checkExtensions = _.filter(Game.structures, (i) => (i.structureType == STRUCTURE_EXTENSION) && i.energy < i.energyCapacity);
        const checkSpawn = _.filter(Game.structures, (i) => (i.structureType == STRUCTURE_SPAWN) && i.energy < i.energyCapacity);
        const checkTowers = _.filter(Game.structures, (i) => (i.structureType == STRUCTURE_TOWER) && i.energy < i.energyCapacity);
        const checkStorage = _.filter(Game.structures, (i) => (i.structureType == STRUCTURE_STORAGE) && i.store.energy < i.storeCapacity);
        const checkContainer = _.filter(Game.structures, (i) => (i.structureType == STRUCTURE_CONTAINER) && i.store.energy < i.storeCapacity);
        const fillClosest = function(fillTheStuff) {
            creep.moveTo(creep.pos.findClosestByRange(fillTheStuff), {visualizePathStyle: {stroke: '#ffffff'}});
            creep.transfer(creep.pos.findClosestByRange(fillTheStuff), RESOURCE_ENERGY);
        }

        switch(creep.memory.fullCarry = true) {
            case checkExtensions.length > 0:
                fillClosest(checkExtensions);
                break;
            case checkSpawn.length > 0:
                fillClosest(checkSpawn);
                break;
            case checkTowers.length > 0:
                fillClosest(checkTowers);
                break;
            case checkStorage.length > 0:
                fillClosest(checkStorage);
                break;
            case checkContainer.length > 0:
                fillClosest(checkContainer);
                break;
            default:
                //console.log('test');
        }
    }
};

module.exports = roleHauler;