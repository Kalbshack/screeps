var creepMain = require('creep.main');

var roomMain = {
    loop: function(roomID)
    {
        var harv = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester" && creep.room.name == roomID).length;
        var upgr = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader" && creep.room.name == roomID).length;
        var body = [WORK,CARRY,MOVE,MOVE];
        var spawnName = "W5N3_Spawn";
        
        var tmpRoom = roomID;
        if(harv < 4)
        {
            var cName = "harvester".substring(0,3) + "_" + (Math.floor(Math.random() * 65534) + 1);
            var newName = Game.spawns[spawnName].createCreep(body, cName, {role: "harvester", destRoom: tmpRoom});
        }
        else if(upgr < 6)
        {
            var cName = "upgrader".substring(0,3) + "_" + (Math.floor(Math.random() * 65534) + 1);
            var newName = Game.spawns[spawnName].createCreep(body, cName, {role: "upgrader", destRoom: tmpRoom});
        }
        
        
        for(let creep in Game.creeps)
        {
            console.log(creep);

            creepMain.run(Game.creeps[creep]);

        }
    }
};

module.exports = roomMain;