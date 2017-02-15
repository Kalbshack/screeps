var roleBuilder = {

    run: function(creep) {
        if(creep.memory.destRoom == creep.room.name)
        {
    
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('collecting');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('building');
            }
    
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }else
                {
                    if(false)
                    {
                        var dest = 'W31S46';
                        if(creep.room.name != dest){
                            //console.log(creep.room.findExitTo(dest));
                            //console.log(creep.pos.findClosestByPath(creep.room.findExitTo(dest)));
                            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)));
                        }
                        else
                        {
                            //console.log("in dest room");
                            creep.moveTo(11, 16);
                        }
                    }
                    else
                    {
                        creep.moveTo(Game.flags[creep.room.name + "_Rest"]);
                    }
                }
            }
            else {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER
                    }
                });
                
                if(sources.length > 0)
                {
                    sources.sort(function(a, b)
                    {
                        return creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b)
                    });
                    if(creep.withdraw(sources[0], RESOURCE_ENERGY, (creep.carryCapacity - creep.carry.energy)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
                else
                {
                    var sources = creep.room.find(FIND_SOURCES);
                    var source = creep.pos.findClosestByPath(sources);
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }
        else
        {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.destRoom)));
            //console.log(creep.name + " moves to next room: " + creep.memory.destRoom);
            //console.log(creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest))));
        }
    }
};

module.exports = roleBuilder;