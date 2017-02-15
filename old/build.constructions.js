var buildContructions = {
    build: function(roomID)
    {
        //console.log("constructions: " + roomID);
        var room = Game.rooms[roomID];
        var roomSpawn = _.filter(Game.spawns, (spawn) => spawn.room.name == room.name);
        
        if(room.controller.level > 1)
        {
            var extension = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_EXTENSION
                }
            });
            
            

            if(extension.length < 4)
            {
                room.createConstructionSite(roomSpawn[0].pos.x - 1, roomSpawn[0].pos.y - 1, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 1, roomSpawn[0].pos.y - 1, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x - 1, roomSpawn[0].pos.y + 1, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 1, roomSpawn[0].pos.y + 1, STRUCTURE_EXTENSION);
                
            }
            if((extension.length < 8) && (extension.length >= 4))
            {
                room.createConstructionSite(roomSpawn[0].pos.x - 2, roomSpawn[0].pos.y, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 2, roomSpawn[0].pos.y, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x, roomSpawn[0].pos.y - 2, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x, roomSpawn[0].pos.y + 2, STRUCTURE_EXTENSION);
            }
            if((extension.length < 12) && (extension.length >= 8))
            {
                room.createConstructionSite(roomSpawn[0].pos.x - 2, roomSpawn[0].pos.y + 2, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x - 2, roomSpawn[0].pos.y - 2, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 2, roomSpawn[0].pos.y + 2, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 2, roomSpawn[0].pos.y - 2, STRUCTURE_EXTENSION);
            }
            if((extension.length < 16) && (extension.length >= 12))
            {
                room.createConstructionSite(roomSpawn[0].pos.x - 3, roomSpawn[0].pos.y + 1, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 3, roomSpawn[0].pos.y + 1, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x - 3, roomSpawn[0].pos.y - 1, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 3, roomSpawn[0].pos.y - 1, STRUCTURE_EXTENSION);
            }
            if((extension.length < 20) && (extension.length >= 16))
            {
                room.createConstructionSite(roomSpawn[0].pos.x - 4, roomSpawn[0].pos.y, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x, roomSpawn[0].pos.y - 4, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x + 4, roomSpawn[0].pos.y, STRUCTURE_EXTENSION);
                room.createConstructionSite(roomSpawn[0].pos.x, roomSpawn[0].pos.y + 4, STRUCTURE_EXTENSION);
            }
        }
    }
};

module.exports = buildContructions;