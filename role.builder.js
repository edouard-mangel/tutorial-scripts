var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var target = Game.getObjectById(Memory.buildTarget);
            if (_.filter(Game.constructionSites).length == 0 ) {
                creep.say("🚧 Up_Ctrl");
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
            else if(creep.build( target ) == ERR_NOT_IN_RANGE) {
                creep.moveTo( target , {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if(creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES), {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;