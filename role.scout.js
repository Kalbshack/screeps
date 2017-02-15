var roleScout = (function (creep) {
    
    var privateMethod = function(creep)
    {
        
    };
    
    return {
        run: function(creep) {
            var dest = 'W31S46';
            if(creep.room.name != dest){
                creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo(dest)));
            }
            else
            {
                //console.log("in dest room");
                creep.moveTo(20,20);
            }
        }
    };
})();

module.exports = roleScout;