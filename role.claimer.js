var roleClaim = (function (creep) {
    
    var action = "claim";
    
    var privateMethod = function(creep)
    {
        
    };
    
    return {
        run: function(creep) {
            var dest = 'W31S46';
            if(creep.room.name != dest){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)));
                //creep.moveTo(24, 4);
            }
            else
            {
                //creep.moveTo(24, 4);
                
                var spawn = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_SPAWN
                    }
                })[0];
                //var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var target = creep.room.controller;
                //target = spawn;
                console.log(target.id);
                //console.log(target.name);
                //target = Game.getObjectById("577b931d0f9d51615fa47af1");
                if(target)
                {
                    switch(action){
                        case "claim":
                            if(creep.claimController(target) == ERR_NOT_IN_RANGE) 
                            {
                                creep.moveTo(target);
                            }
                            break;
                        case "reserve":
                            if(creep.reserveController(target) == ERR_NOT_IN_RANGE) 
                            {
                                creep.moveTo(target);
                            }
                            break;
                    }
                    if(creep.attack(target) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(target);
                    }
                    else
                    {
                        console.log("target err: " + creep.attack(target));
                        creep.room.name
                    }
                }
            }
        }
    };
})();

module.exports = roleClaim;