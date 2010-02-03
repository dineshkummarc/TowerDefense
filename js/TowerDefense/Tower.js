(function($, undefined)
{
    TowerDefense.newTower = function(game)
    {
        var tower = new TowerDefense.MapObject(game, 4);
        
        tower.paintObject = function(context)
        {
            context.fillStyle = 'black'
            context.fillRect(0, 0, game.scale(tower.size()), game.scale(tower.size()));
        };
        
        return tower;
    };
    
})(jQuery);