var roleAttack= (function (creep) {
    
    var privateMethod = function(creep)
    {
        
    };
    
    return {
        run: function(creep) {
            var dest = 'W31S45';
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
                var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                //target = spawn;
                //console.log(target.id);
                //console.log(target.name);
                //target = Game.getObjectById("5872cb9b4bceabbb3a46a942");
                if(target)
                {
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
                else
                {
                    //console.log("creep.moveTo(38, 23)");
                    creep.moveTo(38, 23);
                    //creep.moveTo(16, 46);
                }
                
                
            }
        }
    };
})();

module.exports = roleAttack;