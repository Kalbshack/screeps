var roleRepair = {

    run: function(creep) {
        var target;
        if(creep.memory.repairing && creep.carry.energy == 0)
        {
            creep.memory.repairing = false;
            creep.say("collecting");
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.repairing = true;
            creep.say("repairing");
        }
        
        if(creep.memory.destRoom == undefined || creep.room.name == creep.memory.destRoom)
        {
            if(creep.memory.repairing)
            {
                if(creep.memory.target == undefined || creep.memory.target == "")
                {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.hits < structure.hitsMax) && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART;
                            }
                    });
                    //console.log(JSON.stringify(targets));
                    if(targets.length > 0)
                    {
                        targets.sort(function(a, b)
                        {
                            return a.hits/a.hitsMax - b.hits/b.hitsMax;
                        });
                        creep.memory.target = targets[0].id;
                        
                        if(creep.room.name == "W31S47") console.log(JSON.stringify(targets));
                        console.log("(" + targets[0].pos.x + ", " + targets[0].pos.y + "): " + targets[0].hits);
                    }
                    else
                    {
                        creep.memory.target = "";
                    }
                }
                    
                if(creep.memory.target != "") {
                    target = Game.getObjectById(creep.memory.target);
                    //TODO entfernen
                        //target = Game.getObjectById("5872914b81ed5000759250f0");

                    if(target.hits != target.hitsMax)
                    {
                        if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    } else creep.memory.target = "";
                }
                else
                {
                    creep.moveTo(Game.flags[creep.room.name + "_Rest"]);
                }
            }
            else
            {
                var sources = creep.pos.findClosestByPath(FIND_SOURCES);
    
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
        }
        else
        {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.destRoom)));
        }
    }
};

module.exports = roleRepair;