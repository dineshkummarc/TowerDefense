(function($, undefined)
{
    TowerDefense = function(canvas)
    {
        var game = this;
        var timerId = null;
        var context = canvas.getContext('2d');
        var $canvas = $(canvas);

        var scale = 20.0;
        
        var objectBeingPlaced = null;

        var map = new TowerDefense.Map(40, 30);
        var tower = TowerDefense.newTower(game);

        var background = TowerDefense.Layer.background(game);
        var explosions = TowerDefense.Layer.explosions(game);
        var mapLayer   = TowerDefense.Layer.map(game, map);
        
        var layers = 
        [
            background, explosions, mapLayer
        ];

        // todo - refactor
        var path = [];

        function isRunning()
        {
            return timerId !== null;
        }


        function drawDebugPath()
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
                    
                    console.log('lineTo(' + x + ',' + y + ')');
                    context.lineTo(x, y);
                }
                
                context.lineWidth = 4;
                context.strokeStyle = 'pink';
                context.stroke();
                
                context.restore();
            }
        }

        function mainLoop()
        {
            for (var i in layers)
            {
                layers[i].update();
                layers[i].paint(context);
            }
            
            drawDebugPath();
        }

        function onMouseMove(e)
        {
            if (isRunning())
            {
                layers.forEach(function(layer) 
                {
                    layer.mousemove(e.offsetX, e.offsetY);
                });
            }
        }

        function onMouseUp(e)
        {
            if (isRunning())
            {
                layers.forEach(function(layer) 
                {
                    layer.mouseup(e.offsetX, e.offsetY);
                });
            }
        }

        game.scale = function(n)
        {
            return n * scale;
        };

        game.descale = function(n)
        {
            return Math.floor(n / scale);
        };
        
        game.setCursor = function(cursor)
        {
            $canvas.css('cursor', cursor || 'auto');
        };

        game.pause = function()
        {
            if (isRunning())
            {
                window.clearInterval(timerId);
                timerId = null;
                
                context.save();
                context.fillStyle = 'rgba(0, 0, 0, 0.7)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                
                context.font = 'bold 24pt sans-serif';
                context.fillStyle = 'white';

                context.textAlign = 'center';
                context.textBaseline = 'middle';
                
                context.fillText("PAUSED", canvas.width / 2, canvas.height / 2, canvas.width);
                context.restore();
            }
        };

        game.run = function()
        {
            if (!isRunning())
            {
                timerId = window.setInterval(mainLoop, 33);
            }
        }

        game.addExplosion = function()
        {
            explosions.addExplosion(Math.random() * canvas.width, Math.random() * canvas.height);
        };

        game.beginPlaceObject = function(obj)
        {
            mapLayer.beginPlaceObject(obj);
        };
        
        game.canvas = canvas;
        game.mouseOver = false;
        
        tower.x(2);
        tower.y(24);
        map.addObject(tower);

        $canvas.hover(
            function() { game.mouseOver = true; },
            function() { game.mouseOver = false; }
        );

        $canvas.mousemove(onMouseMove);
        $canvas.mouseup(onMouseUp);

        game.run();
    };

    TowerDefense.Layer = function(game)
    {
        this.game = game;
        
        this.update = function()
        {
        };
        
        this.paint = function(context)
        {
        };
        
        this.mousemove = function(x, y)
        {
        };
        
        this.mouseup = function(x, y)
        {
        };
        
        this.rescale = function()
        {
        };
    };

})(jQuery);