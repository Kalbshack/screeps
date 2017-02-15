var roleUpgrader = {

    working: function(creep) {

            if(creep.memory.mySource == undefined || creep.memory.mySource == "")
            {
                var sources = creep.room.find(FIND_SOURCES);
                var container = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 400;
                    }
                });
                var rcl = creep.room.controller;
                //console.log(creep.name);
                if(rcl.pos.findClosestByPath(container) != undefined && rcl.pos.findClosestByPath(container) != null && rcl.pos.findClosestByPath(container).store.energy >= creep.carryCapacity)
                {
                    creep.memory.mySourceID = rcl.pos.findClosestByPath(container).id;
                }
                else
                {
                    //console.log(JSON.stringify(rcl.pos.findClosestByPath(sources)));
                    //console.log(JSON.stringify(rcl));
                    if(rcl.pos.findClosestByPath(sources) != null)
                    {
                        creep.memory.mySourceID = rcl.pos.findClosestByPath(sources).id;
                    }
                    else
                    {
                        creep.memory.mySourceID = rcl.pos.findClosestByRange(sources).id;
                    }
                    
                }
            }
            
            
            
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('collecting');
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
                creep.say('upgrading');
            }
            
            
    
            if(creep.memory.upgrading) {
                
                switch(creep.upgradeController(creep.room.controller))
                {
                    case OK:
                        creep.memory.mySource = "";
                        break;
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(creep.room.controller, {reusePath: 5});
                        break;
                }
            }
            else
            {
                if(creep.memory.mySourceID)
                {
                    var source = Game.getObjectById(creep.memory.mySourceID);
                    if(source.structureType == STRUCTURE_CONTAINER)
                    {
                        if(creep.withdraw(source, RESOURCE_ENERGY, (creep.carryCapacity - creep.carry.energy)) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {reusePath: 5});
                        }
                    }
                    else
                    {
                        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {reusePath: 5});
                        }
                    }
                }
            }
    }
};

module.exports = roleUpgrader;
            
            