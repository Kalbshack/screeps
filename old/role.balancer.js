var roleBalancer = (function (creep) {
    
    var checkForStorage = function(creep){
        var storage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_STORAGE
            }
        });
        return storage;
    };
    
    var deliverTo = function(creep)
    {
        var target = Game.getObjectById(creep.memory.target);
        switch (creep.transfer(target, RESOURCE_ENERGY))
        {
            case OK:
                //checkForStorage(creep);
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target);
                break;
        }
    };
    
    
    var getContainer = function(creep)
    {
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER
            }
        });
        var myID;
        for(let name in containers)
        {
            if(!_.filter(Game.creeps, (fCreep) =>
                fCreep.memory.role == "balancer"
                && fCreep.room.name == creep.room.name
                && fCreep.memory.myContainer == containers[name].id
            ).length)
            {
                creep.memory.myContainer = containers[name].id
            }
        }
    };
    
    var initCreep = function(creep)
    {
        if(creep.memory.myContainer == undefined || creep.memory.myContainer == "")
        {
            getContainer(creep);
        }
        creep.memory.init = true;
    };
    
    var doAction = function(creep){
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER
            }
        });

        if(creep.carry.energy < creep.carryCapacity) {
            //Find Containers/Storages to draw energy from
            
            containers.sort(function(a,b){
                return b.store.energy - a.store.energy
            });
            
            if(creep.withdraw(containers[0], RESOURCE_ENERGY, (creep.carryCapacity - creep.carry.energy)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
            }
        }
        else
        {
            //Deliver energy to containers/storages with low energy

            containers.sort(function(a,b){
                return a.store.energy - b.store.energy
            });
            
            if(containers[0].store.energy > containers[0].storeCapacity / 2 && checkForStorage(creep).length)
            {
                target = checkForStorage(creep)[0];
            }
            else
            {
                target = containers[0];
            }

            creep.memory.target = target.id;
            deliverTo(creep);
        }
    };
    
    var doNewAction = function(creep){
        if(creep.carry.energy < creep.carryCapacity)
        {
            var myContainer = Game.getObjectById(creep.memory.myContainer);
            if(creep.room.storage)
            {
                if(myContainer!= null && myContainer.store.energy < myContainer.storeCapacity / 2)
                {
                    creep.memory.source = creep.room.storage.id;
                    creep.memory.target = myContainer.id;
                }
                else
                {
                    creep.memory.source = myContainer.id;
                    creep.memory.target = creep.room.storage.id;
                }
            }
            else
            {
                
            }
            
            var src = Game.getObjectById(creep.memory.source);
            if(creep.withdraw(src, RESOURCE_ENERGY, (creep.carryCapacity - creep.carry.energy)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(src);
            }
            
            
            
        }
        else
        {
            //Deliver energy to containers/storages with low energy
            var target = Game.getObjectById(creep.memory.target);
            
            switch (creep.transfer(target, RESOURCE_ENERGY))
            {
                case OK:
                    //checkForStorage(creep);
                    creep.memory.target = "";
                    creep.memory.source = "";
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(target);
                    break;
            }
        }
    };
    
    var moveToDest = function(creep){
        creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.destRoom)));
    };
    
    return {
        run: function(creep) {
            if(!creep.memory.init)
            {
                initCreep(creep);
            }
            
            if(creep.room.name == creep.memory.destRoom)
            {
                //doAction(creep);
                doNewAction(creep);
            }else{
                moveToDest(creep);
            }
        }
    };
})();

module.exports = roleBalancer;