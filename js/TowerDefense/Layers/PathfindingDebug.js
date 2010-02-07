(function(undefined)
{
    TowerDefense.Layer.pathfindingDebug = function(game, map, tower)
    {
        var layer = new TowerDefense.Layer(game);
        var data = null;
        var path = null;
        
//        tower.x += 0.5;
//        tower.y += 0.5;
        
        layer.paint = function(context)
        {
            function paintG()
            {
                context.save();
                context.font = 'bold 10pt Calibri, sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = 'white';
                
                for (var y = 0; y < map.height; y++)
                {
                    for (var x = 0; x < map.width; x++)
                    {
                        var n = data[y*map.width+x];
                        
                        if (n)
                        {
                            context.fillText(n.f.toFixed(), game.scale(x+0.5), game.scale(y+0.5));
                        }                        
                    }
                }
                
                context.restore();
            }

            function paintPath()
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
        
            if (path && path.length)
            {
                paintPath();
            }
            
            if (data)
            {
                paintG();
            }
        
        };
        
        layer.mouseup = function(x, y, e)
        {
            if (e.ctrlKey)
            {
                x = game.descale(x);
                y = game.descale(y);
 
                var result = TowerDefense.aStar(map, new TowerDefense.Point(x, y), tower);
                path = result.path;
                data = result.data;
            }
        };
        
        return layer;
    };
    
})();