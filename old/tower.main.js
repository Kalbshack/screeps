var towerMain = (function()
{
    return {
        run: function(tower)
        {
            //var invaders = Game.tower.room.find(FIND_HOSTILE_CREEPS);
            var invader = tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if(invader != null)
            {
                tower.attack(invader);
            }
        }
    }
})();

module.exports = towerMain;