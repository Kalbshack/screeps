var roomMain = require('room.main');

module.exports.loop = function () {
    for(let name in Game.rooms)
    {
        //console.log(name);
        roomMain.loop(name);
    }
};