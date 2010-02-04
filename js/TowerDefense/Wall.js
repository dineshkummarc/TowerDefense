(function($, undefined)
{
    TowerDefense.newWall = function(game)
    {
        var wall = new TowerDefense.MapObject(game, 1);

        wall.paintObject = function(context)
        {
            var size = game.scale(wall.size());

            context.fillStyle = 'rgba(0, 0, 0, 0.6)';
            context.fillRect(0, 0, size, size);
        };

        return wall;
    };

})(jQuery);