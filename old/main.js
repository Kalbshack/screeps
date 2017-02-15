var roomMain = require('room.main');
var globalTryout = require('global.tryout');
//Test123

module.exports.loop = function () {
    
    for(let name in Game.creeps)
    {
        if(Game.creeps[name].memory.destRoom != "W31S47" && Game.creeps[name].memory.destRoom != "W31S46")
        {
            //creep.memory.destRoom = "W31S47";
            //var creep = Game.creeps[name];
            //console.log(name + "(" + creep.memory.role + "): " + creep.suicide());
        }
        
    }
    //##########RUN_MODULES######################
    //console.log(JSON.stringify(Game.rooms));
    for(let name in Game.rooms)
    {
        roomMain.loop(name);
        //console.log(JSON.stringify(_.filter(Game.creeps, (creep) => creep.memory.destRoom == undefined).length));
        //globalTryout.loop();
        
        //buildContructions.build(Game.rooms[name]);
        //console.log(name);
        //Game.getObjectById("58745e2a5536d37a38f7cd0f").attack(Game.getObjectById("587b920067baafb820c348e7"));
    }
    
    
    
    //roomMain.loop("W31S46");

}
