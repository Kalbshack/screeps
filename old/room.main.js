var globalHelp = require('global.help');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRepair = require('role.repair');
var roleBalancer = require('role.balancer');
var roleScout = require('role.scout');
var roleAttack = require('role.attack');
var roleHealer = require('role.healer');
var roleClaim = require('role.claimer');
var roleAbroadHarvester = require('role.abroadHarv');

var towerMain = require('tower.main');
var buildContructions = require('build.constructions');

var creepTypes = [
    {"body": [WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "role": "harvester", "amount": {"min": 3, "normal": 3, "max": 10}, "priority": 10.0},
    {"body": [HEAL,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "role": "healer", "amount": {"min": 0, "normal": 0, "max": 2}, "priority": 9.8},
    {"body": [ATTACK,ATTACK,ATTACK,MOVE], "role": "attacker", "amount": {"min": 0, "normal": 0, "max": 10}, "priority": 9.8},
    {"body": [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], "role": "repair", "amount": {"min": 1, "normal": 1, "max": 3}, "priority": 9.7},
    {"body": [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], "role": "miner", "amount": {"min": 2, "normal": 1, "max": 10}, "priority": 9.6},
    {"body": [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "role": "upgrader", "amount": {"min": 3, "normal": 1, "max": 5}, "priority": 9.0},
    {"body": [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "role": "abroadHarvester", "amount": {"min": 0, "normal": 4, "max": 5}, "priority": 8.0},
    {"body": [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], "role": "balancer", "amount": {"min": 0, "normal": 2, "max": 10}, "priority": 8.0},
    {"body": [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], "role": "builder", "amount": {"min": 4, "normal": 2, "max": 5}, "priority": 8.0},
    {"body": [MOVE,MOVE], "role": "scout", "amount": {"min": 0, "normal": 0, "max": 3}, "priority": 6.0},
    {"body": [CLAIM,MOVE,MOVE], "role": "claimer", "amount": {"min": 0, "normal": 0, "max": 5}, "priority": 5.0}
];
var creepModules = {
    "attacker": roleAttack,
    "balancer": roleBalancer,
    "builder": roleBuilder,
    "harvester": roleHarvester,
    "healer": roleHealer,
    "miner": roleMiner,
    "repair": roleRepair,
    "abroadHarvester": roleAbroadHarvester,
    "scout": roleScout,
    "claimer": roleClaim,
    "upgrader": roleUpgrader
};

var sources;

var sortCreepTypes = function(roomID)
{
    //console.log("###############");
   // console.log(roomID);
    
    creepTypes.sort(function(a, b)
    {
        return b.priority - a.priority;
    });
    
    for(let name in creepTypes)
    {
        if(creepTypes[name].role == "balancer" || creepTypes[name].role == "miner")
        {
            var containerAmount = Game.rooms[roomID].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.room.name == roomID);
                }
            }).length;
            
            //console.log(creepTypes[name].role + ": " + containerAmount);
            
            //console.log(creepTypes[name].role + " amount: " + creepTypes[name].amount.normal);
            if(containerAmount < 1)
            {
                creepTypes[name].amount.min = 0;
                creepTypes[name].amount.normal = 0;
            }
            else if(containerAmount < 2)
            {
                creepTypes[name].amount.normal = 0;
            }
            else
            {
                if(creepTypes[name].role == "balancer") creepTypes[name].amount.normal = containerAmount;
                //TODO: miner = source * 2
                if(creepTypes[name].role == "miner") creepTypes[name].amount.normal = 1;
            }
            //console.log(creepTypes[name].role + " amount: " + creepTypes[name].amount.normal);
        }
    }
};

var spawnCreeps = function(roomID, spawnName)
{
    sortCreepTypes(roomID);

    //console.log("############" + roomID + "##########");
    
    for(let name in creepTypes)
    {
        //console.log(creepTypes[name].role);
        //TODO: Fix attacker spawn
        if(creepTypes[name].role == "attacker" || creepTypes[name].role == "claimer" || creepTypes[name].role == "abroadHarvester")
        {
            var num = _.filter(Game.creeps, (creep) => creep.memory.role == creepTypes[name].role).length;
        }
        else
        {
            var num = _.filter(Game.creeps, (creep) => creep.memory.role == creepTypes[name].role && creep.room.name == roomID).length;
        }
        
        //console.log(creepTypes[name].role + ": " + num);
        var creepAmount;
        var containerAmount = Game.rooms[roomID].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.room.name == roomID);
            }
        }).length;
        var body;
        
        
        
        if((Game.rooms[roomID].energyCapacityAvailable > 700 || containerAmount >= 2) && Game.rooms[roomID].storage && !(_.filter(Game.creeps, (creep) => creep.room.name == roomID).length < 5))
        {
            creepAmount = "normal";
            body = creepTypes[name].body
        }
        else
        {
            creepAmount = "min";
            body = globalHelp.getUnique(creepTypes[name].body);
        }
        //if(creepTypes[name].role == "balancer" && roomID == "W31S47") console.log(creepTypes[name].role + " (" + num + "/" + creepTypes[name].amount[creepAmount] + "): " + (num < creepTypes[name].amount[creepAmount]));
        //if(creepTypes[name].role == "miner"    && roomID == "W31S47") console.log(creepTypes[name].role + " (" + num + "/" + creepTypes[name].amount[creepAmount] + "): " + (num < creepTypes[name].amount[creepAmount]));
        
        //console.log(roomID + "spawn mode: " + creepAmount);
        
        //console.log(creepTypes[name].role + ": " + num + "/" + creepTypes[name].amount[creepAmount]);
        if(num < creepTypes[name].amount[creepAmount])
        {
            if(Game.spawns[spawnName].canCreateCreep(body) == 0)
            {
                var cName = creepTypes[name].role.substring(0,3) + "_" + (Math.floor(Math.random() * 65534) + 1);
                if(name != "abroadHarvester")
                {
                    var tmpRoom = roomID;
                }else
                {
                    var tmpRoom = "W88S4";
                }
                var newName = Game.spawns[spawnName].createCreep(body, cName, {role: creepTypes[name].role, destRoom: tmpRoom});
                if(name == "abroadHarvester")
                {
                    Game.creeps[newName].memory.targetRoom = "W88S4";
                }
                console.log('spawn new ' + creepTypes[name].role + ': ' + newName);
                console.log('spawn new ' + Game.creeps[newName].memory.role + ': ' + newName);
            }
            break;
        }
    }
};

var roomMain = {
 
    
    loop: function(roomID)
    {
        
        //Set Miner Source;
        sources = Game.rooms[roomID].find(FIND_SOURCES);
        
        if(Memory.lastGameTick == undefined) Memory.lastGameTick = Game.time;
        
        if((Game.time - Memory.lastGameTick) > 5 && roomID == "W88S3")
        {
            sortCreepTypes(roomID);
            console.log("energy available: " + Game.rooms[roomID].energyAvailable);
            
            var ttlCreeps = Game.rooms[roomID].find(FIND_MY_CREEPS);
            ttlCreeps.sort(function(a, b) {return a.ticksToLive - b.ticksToLive});
            for(var i=0; i<ttlCreeps.length; i++)
            {
                if(ttlCreeps[i].ticksToLive < 500) console.log("Next creep decay: " + ttlCreeps[i].name + "(" + ttlCreeps[i].ticksToLive + ") " +  ttlCreeps[i].memory.role);
            }
            
            Memory.lastGameTick = Game.time;
        }
        
        
        
        

        
    
        var roomSources = Game.rooms[roomID].find(FIND_SOURCES);
        roomSources.sort(function(a, b) {
            return b.energy - a.energy
        });
        
        for(var i=0; i<roomSources.length; i++)
        {
            var nummSCreeps = roomSources[i].pos.findInRange(FIND_MY_CREEPS, 5, {filter:(c) => c.memory.role == "miner"}).length;
            
            //console.log("Creeps: " + JSON.stringify(roomSources[i].pos.findInRange(FIND_MY_CREEPS, 200, {filter:(c) => c.memory.role == "miner"})));
            //console.log(Memory.cnt + ": " + JSON.stringify(roomSources[i]));
        }
        
        var containers = Game.rooms[roomID].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER
            }
        });
    
    
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
        
        var hasSpawn;
        var mainSpawnName = Game.rooms[roomID].find(FIND_STRUCTURES, {
            filter: (s) =>
            {
                return s.structureType == STRUCTURE_SPAWN;
            }
        });
        
        if(mainSpawnName.length > 0 && mainSpawnName[0].owner.username == "Kalbshack") 
        {
            hasSpawn = true;
            mainSpawnName = mainSpawnName[0].name;
        }
        
        if(hasSpawn)
        {
            spawnCreeps(roomID, mainSpawnName);
            
            /*
            if(miners.length < (sources.length * 2)) {
                //console.log('requestung miner');
                if(Game.spawns[mainSpawnName].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]) == 0)
                {
                    sources.sort(function(a, b) {
                       return Game.spawns[mainSpawnName].pos.getRangeTo(a) - Game.spawns[mainSpawnName].pos.getRangeTo(b);
                    });
                    
                    for(var i=0; i<sources.length; i++)
                    {
                        var sourceCreeps = _.filter(Game.creeps, (creep) => creep.memory.collectSource == sources[i].id);
                        if(sourceCreeps.length < 2)
                        {
                            //var newName = "test";
                            var newName = Game.spawns[mainSpawnName].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'miner', collectSource: sources[i].id});
                            console.log('Spawning new miner: ' + " for " + sources[i].id + " " + newName);
                            return;
                        }
                    }
                }
            }
            */
        }
        else
        {
            
            mainSpawnName = Game.rooms["W88S3"].find(FIND_STRUCTURES, {
                filter: (s) =>
                {
                    return s.structureType == STRUCTURE_SPAWN;
                }
            });
            mainSpawnName = mainSpawnName[0].name;
            
            var abroadRepair = _.filter(Game.creeps, (creep) =>(creep.memory.role == 'repair' && creep.memory.destRoom == roomID));
            var abroadBuild = _.filter(Game.creeps, (creep) =>(creep.memory.role == 'builder' && creep.memory.destRoom == roomID));
            var abroadUpgrader = _.filter(Game.creeps, (creep) =>(creep.memory.role == 'upgrader' && creep.memory.destRoom == roomID));
            
            if(abroadRepair.length < 0) {
                //console.log("spawn me an abroad repair");
                if(Game.spawns[mainSpawnName].canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE]) == 0)
                {
                    var newName = Game.spawns[mainSpawnName].createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'repair', destRoom: roomID});
                    console.log('Spawning new abroadRepaird: ' + newName);
                }
            }
            
            if(abroadBuild.length < 0) {
                //console.log("spawn me an abroad repair");
                if(Game.spawns[mainSpawnName].canCreateCreep([WORK,CARRY,MOVE,MOVE]) == 0)
                {
                    var newName = Game.spawns[mainSpawnName].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder', destRoom: roomID});
                    console.log('Spawning new abroadBuild: ' + newName);
                }
            }
            
            if(abroadBuild.length < 0) {
                //console.log("spawn me an abroad repair");
                if(Game.spawns[mainSpawnName].canCreateCreep([WORK,CARRY,MOVE,MOVE]) == 0)
                {
                    var newName = Game.spawns[mainSpawnName].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', destRoom: roomID});
                    console.log('Spawning new abroadUpgrader: ' + newName);
                }
            }
            
        }
        
        //##########RUN_MODULES######################
        if(roomID == "W31S47" || roomID == "W31S46" || roomID == "W88S3" || roomID == "sim") buildContructions.build(roomID);
        
        for(var name in Game.creeps) {
            //console.log(name);
            var creep = Game.creeps[name];
            //console.log(creep.memory.role);
            creepModules[creep.memory.role].run(creep);
        }
        var tower = Game.rooms[roomID].find(FIND_STRUCTURES, {
            filter: (s) =>
            {
                return s.structureType == STRUCTURE_TOWER;
            }
        });
        
        for(let name in tower)
        {
            towerMain.run(tower[name]);
        }
    }
};


module.exports = roomMain;