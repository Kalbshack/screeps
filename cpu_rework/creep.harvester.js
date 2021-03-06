var roleHarvester = {

    working: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            //if(creep.carry.energy == 0) {    
            if(creep.memory.drainSource == undefined || creep.memory.drainSource == "")
            {

                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 400;
                    }
                });
                //console.log(container.room);

                console.log((container));
                //console.log((container != null && container.store.energy > 400));
                
                if(container != null && container.store.energy > 400)
                {
                    creep.memory.drainSource = container.id;
                    creep.memory.sourceType = "container";
                }
                else if(creep.room.storage != null && creep.room.storage.store[RESOURCE_ENERGY] > 400)
                {
                    creep.memory.drainSource = creep.room.storage.id;
                    creep.memory.sourceType = "storage";
                }
                else
                {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);
                    creep.memory.drainSource = source.id;
                    creep.memory.sourceType = "source";
                }
            }
            
            if(creep.memory.sourceType == "source")
            {
                if(creep.harvest(Game.getObjectById(creep.memory.drainSource)) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(Game.getObjectById(creep.memory.drainSource));
                }
            }
            if(creep.memory.sourceType == "container" || creep.memory.sourceType == "storage")
            {
                switch(creep.withdraw(Game.getObjectById(creep.memory.drainSource), RESOURCE_ENERGY, (creep.carryCapacity - creep.carry.energy))){
                    case OK:
                        if(creep.carry.energy == 0) creep.memory.drainSource = "";
                        break;
                    case ERR_NOT_ENOUGH_RESOURCES:
                        creep.memory.drainSource = "";
                        break;
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(Game.getObjectById(creep.memory.drainSource), {reusePath: 5});
                        break;
                }
            }
        }
        else
        {
            
            
            var target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION
                        || structure.structureType == STRUCTURE_SPAWN
                        || structure.structureType == STRUCTURE_EXTENSION)
                        && structure.energy < structure.energyCapacity;
                    }
            });
            target = creep.pos.findClosestByPath(target, {
                
            });
            //target = Game.getObjectById("58745e2a5536d37a38f7cd0f");
            if(target) {
                switch(creep.transfer(target, RESOURCE_ENERGY))
                {
                    case OK:
                        if(creep.carry.energy == 0)
                        {
                            creep.memory.drainSource = "";
                        }
                        //TODO: remove
                        creep.memory.drainSource = "";
                        break;
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(target, {reusePath: 5});
                        break;
                }
            }
            else
            {
                creep.moveTo(Game.flags[creep.room.name + "_Rest"], {reusePath: 5});
            }
        }
    }
};

module.exports = roleHarvester;