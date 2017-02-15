var roomSizeX = 48;
var roomSizeY = 48;



var globalHelp = {
    getSpawnP: function(roomName)
    {
        var posPosition = Array();
        var spawnCnt = 0;
        var roomSources = Game.rooms[roomName].find(FIND_SOURCES);
        
        for(var x = 2; x < roomSizeX; x++)
        {
            for(var y = 2; y < roomSizeY; y++)
            {
                var surr = Game.rooms[roomName].lookAtArea(y - 2, x - 2, y + 2, x + 2, true);
                var numPlain = surr.filter((terr) => (terr.type == 'terrain' && terr.terrain == 'plain')).length;
                if(numPlain == 25)
                {
                    posPosition.push({'pos': new RoomPosition(x, y, roomName)});
                }
            }
        }
        
        var globalX = 0;
        var globalY = 0;
        for(var i=0; i<roomSources.length; i++)
        {
            globalX += roomSources[i].pos.x;
            globalY += roomSources[i].pos.y;
        }
        globalX = Math.round(globalX/roomSources.length);
        globalY = Math.round(globalY/roomSources.length);
        var sourceMiddle = new RoomPosition(globalX, globalY, roomName);
        console.log("global point: (" + globalX + ", " + globalY + ")");
        console.log(JSON.stringify(posPosition[0].pos));
        console.log(JSON.stringify(roomSources[0].pos));
        console.log("optimal range point: " + JSON.stringify(sourceMiddle.findClosestByRange(posPosition)));
        console.log("optimal path point: " + JSON.stringify(sourceMiddle.findClosestByPath(posPosition)));
        //posPosition.findClosestByRange(sourceMiddle);
        
        
        
        
        
        console.log("possible positions: " + posPosition.length);
        for(var i=0; i<posPosition.length; i++)
        {
            //Game.rooms["sim"].createFlag(posPosition[i].x, posPosition[i].y, "pS_" + spawnCnt, COLOR_PURPLE);
            //Game.flags[i].remove();
            //spawnCnt++;
            //console.log(JSON.stringify(posPosition[i]));
        }
        for(var i=0; i<Game.flags.length; i++)
        {
            //Game.flags[i].remove();
        }
    },
    getUnique: function(arr)
    {
        var unique = [];
        for(var i=0; i<arr.length; i++)
        {
            var isUnique = true;
            for(var j=0; j<unique.length; j++)
            {
                if(arr[i] == unique[j])
                {
                    
                    isUnique = false;
                }
            }
            if(isUnique) unique.push(arr[i]);
            
            
        }
        return unique;
    }
};

module.exports = globalHelp;