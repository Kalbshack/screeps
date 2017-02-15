var creepHarvester = require('creep.harvester');
var creepUpgrader = require('creep.upgrader');

var creepMain = {

    run: function(creep) {
        if(creep.memory.destRoom == undefined || creep.room.name == creep.memory.destRoom)
        {
            if(creep.memory.role == "harvester")
            {
                creepHarvester.working(creep);
            }
            else if(creep.memory.role == "upgrader")
            {
                creepUpgrader.working(creep);
            }
        }
        else
        {
            creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.destRoom)), {reusePath: 5});
        }
    }
};

module.exports = creepMain;