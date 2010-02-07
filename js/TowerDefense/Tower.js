(function($, undefined)
{
    TowerDefense.newTower = function(game)
    {
        var tower = new TowerDefense.MapObject(game, 4);

        tower.isTower = true;        
        tower.isSelectable = false;
        tower.paintObject = function(context)
        {
            context.fillStyle = 'black'
            context.fillRect(0, 0, game.scale(tower.size()), game.scale(tower.size()));
        };
        
        return tower;
    };
    
})(jQuery);