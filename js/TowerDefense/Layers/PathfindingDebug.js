(function(undefined)
{
    TowerDefense.Layer.pathfindingDebug = function(game, map, tower)
    {
        var layer = new TowerDefense.Layer(game);
        var canvas = null;
        var data = null;
        
        function createCanvas()
        {
            var cnvs = document.createElement('canvas');
            cnvs.width = game.scale(map.width);
            cnvs.height = game.scale(map.height);
            
            var ctx = cnvs.getContext('2d');
            
            function paintG()
            {
                ctx.save();
                ctx.font = 'bold 10pt Calibri, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'white';
                
                for (var y = 0; y < map.height; y++)
                {
                    for (var x = 0; x < map.width; x++)
                    {
                        var n = data.data[y*map.width+x];
                        
                        if (n)
                        {
                            ctx.fillText(n.g.toFixed(), game.scale(x+0.5), game.scale(y+0.5));
                        }                        
                    }
                }
                
                ctx.restore();
            }

            function paintPath()
            {
                ctx.save();
                
                ctx.beginPath();
                ctx.moveTo(game.scale(data.path[0].x + 0.5), game.scale(data.path[0].y + 0.5));
                
                for (var i = 1; i < data.path.length; i++)
                {
                    var x = game.scale(data.path[i].x + 0.5);
                    var y = game.scale(data.path[i].y + 0.5);
                    
                    ctx.lineTo(x, y);
                }
                
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'blue';
                ctx.stroke();
                
                ctx.restore();
            }            
        
            if (data.path && data.path.length)
            {
                paintPath();
            }
            
            if (data.data)
            {
                paintG();
            }
                    
            return cnvs;
        }
        
        layer.rescale = function()
        {
            data = null;
        };        
        
        layer.paint = function(context)
        {
            if (canvas === null)
            {
                canvas = createCanvas();
            }
            
            context.drawImage(canvas, 0, 0);
        };
        
        layer.mouseup = function(x, y, e)
        {
            if (e.ctrlKey)
            {
                x = game.descale(x);
                y = game.descale(y);
 
                data = TowerDefense.aStar(map, new TowerDefense.Point(x, y), tower);
                canvas = null;
            }
        };
        
        return layer;
    };
    
})();