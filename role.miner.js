var roleMiner = {

    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            if(creep.memory.collectSource == undefined || creep.memory.collectSource == "")
            {
                var sources = Game.rooms[creep.room.name].find(FIND_SOURCES);
                for(var i=0; i<sources.length; i++)
                {
                    var sourceCreeps = _.filter(Game.creeps, (creep) => creep.memory.collectSource == sources[i].id);
                    if(sourceCreeps.length < 2)
                    {
                        creep.memory.collectSource = sources[i].id;
                    }
                }
            }
            var source = Game.getObjectById(creep.memory.collectSource);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            else
            {
                creep.memory.container = "";
            }
        }
        else {
            if(creep.memory.container == "")
            {
                var avContainer = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER);
                        }
                });
                avContainer.sort(function(a, b) {
                    return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b);
                });
                
                if(avContainer.length > 0) creep.memory.container = avContainer[0].id;
            }
            else
            {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER);
                        }
                });
                //console.log(JSON.stringify(targets[0]));

                if(creep.transfer(Game.getObjectById(creep.memory.container), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.container));
                }

            }
        }
    }
};

module.exports = roleMiner;