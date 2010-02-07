(function($, undefined)
{
    TowerDefense = function(canvas)
    {
        var game = this;
        var timerId = null;
        var context = canvas.getContext('2d');
        var $canvas = $(canvas);

        var scale = 20.0;
        
        var map = new TowerDefense.Map(40, 30);
        var tower = TowerDefense.newTower(game);

        tower.x(2);
        tower.y(24);
        map.addObject(tower);

        var backgroundLayer = TowerDefense.Layer.background(game, canvas.width, canvas.height);
        var explosionsLayer = TowerDefense.Layer.explosions(game);
        var mapLayer        = TowerDefense.Layer.map(game, map);
        
        var pathfinderLayer = TowerDefense.Layer.pathfindingDebug(game, map, tower.center());
        
        var layers = 
        [
            backgroundLayer, 
            explosionsLayer, 
            mapLayer 
            
            ,pathfinderLayer
        ];

        function isRunning()
        {
            return timerId !== null;
        }

        function mainLoop()
        {
            for (var i in layers)
            {
                layers[i].update();
                layers[i].paint(context);
            }
        }

        function onMouseMove(e)
        {
            if (isRunning())
            {
                layers.forEach(function(layer) 
                {
                    layer.mousemove(e.offsetX, e.offsetY, e);
                });
            }
        }

        function onMouseUp(e)
        {
            if (isRunning())
            {
                layers.forEach(function(layer) 
                {
                    layer.mouseup(e.offsetX, e.offsetY, e);
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
            explosionsLayer.addExplosion(Math.random() * canvas.width, Math.random() * canvas.height);
        };

        game.beginPlaceObject = function(obj)
        {
            mapLayer.beginPlaceObject(obj);
        };
        
        game.mouseOver = false;
        
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