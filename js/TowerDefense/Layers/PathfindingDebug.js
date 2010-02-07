(function(undefined)
{
    TowerDefense.Layer.pathfindingDebug = function(game, map, tower)
    {
        var layer = new TowerDefense.Layer(game);
        var path = null;
        
//        tower.x += 0.5;
//        tower.y += 0.5;
        
        layer.paint = function(context)
        {
            if (path && path.length)
            {
                context.save();
                
                context.beginPath();
                context.moveTo(game.scale(path[0].x + 0.5), game.scale(path[0].y + 0.5));
                
                for (var i = 1; i < path.length; i++)
                {
                    var x = game.scale(path[i].x + 0.5);
                    var y = game.scale(path[i].y + 0.5);
                    
                    context.lineTo(x, y);
                }
                
                context.lineWidth = 4;
                context.strokeStyle = 'blue';
                context.stroke();
                
                context.restore();
            }
        };
        
        layer.mouseup = function(x, y, e)
        {
            if (e.ctrlKey)
            {
                x = game.descale(x);
                y = game.descale(y);
 
                path = TowerDefense.aStar(map, new TowerDefense.Point(x, y), tower);
            }
        };
        
        return layer;
    };
    
})();