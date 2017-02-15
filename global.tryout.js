var globalTryout = {
    loop: function()
    {
        //var creep = Game.creeps.Caroline;
        var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer')[0];
        //console.log(claimer.name);
        var creep = Game.creeps[claimer.name];
        if(creep.memory.role != undefined)
        {
            var dest = 'W31S46';
            if(creep.room.name != dest){
                //console.log(creep.room.findExitTo(dest));
                //console.log(creep.pos.findClosestByPath(creep.room.findExitTo(dest)));
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)));
            }
            else
            {
                //console.log(creep.claimController(creep.room.controller));
                if(true || creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    //console.log("in dest room");
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};
module.exports = globalTryout;