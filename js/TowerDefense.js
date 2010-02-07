(function($, undefined)
{
    TowerDefense = function(canvas)
    {
        var game = this;
        var timerId = null;
        var context = canvas.getContext('2d');
        var $canvas = $(canvas);

        var mouseOver = false;
        var scale = 20.0;
        
        var map = null;
        var objectSelected = null;
        var objectBeingPlaced = null;

        var tower = TowerDefense.newTower(game);

        var background = TowerDefense.Layer.background(game);
        var explosions = TowerDefense.Layer.explosions(game);
        
        var layers = 
        [
            background, explosions
        ];

        // todo - refactor
        var path = [];

        function isRunning()
        {
            return timerId !== null;
        }

        function selectObject(obj)
        {
            if (objectSelected)
            {
                objectSelected.isSelected = false;
            }

            objectSelected = obj;
            
            if (objectSelected && objectSelected.isSelectable)
            {
                objectSelected.isSelected = true;
            }
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
            
            for (var i in map.objects)
            {
                map.objects[i].paint(context);
            }

            drawDebugPath();

            if (mouseOver && (objectBeingPlaced !== null))
            {
                objectBeingPlaced.paint(context);
            }
        }

        function onMouseMove(e)
        {
            if (isRunning())
            {
                var x = game.descale(e.offsetX);
                var y = game.descale(e.offsetY);

                if (objectBeingPlaced !== null)
                {
                    var size = objectBeingPlaced.size();
                    
                    if ((x + size <= map.width) &&
                        (y + size <= map.height))
                    {
                        objectBeingPlaced.x(x);
                        objectBeingPlaced.y(y);
                        
                        objectBeingPlaced.isPlaceholderValid = map.isEmpty(x, y, size, size);
                    }
                                    
                    return;
                }
                
                var objectUnderMouse = map.at(x, y);
                
                if (objectUnderMouse && objectUnderMouse.isSelectable)
                {
                    $canvas.css('cursor', 'pointer');
                }
                else
                {
                    $canvas.css('cursor', 'auto');
                }

                for (var i in map.objects)
                {
                    if (map.objects[i].setTarget instanceof Function)
                    {
                        map.objects[i].setTarget(x, y);
                    }
                }
            }
        }

        function onMouseUp(e)
        {
            if (objectBeingPlaced !== null)
            {
                if (objectBeingPlaced.isPlaceholderValid)
                {
                    map.addObject(objectBeingPlaced);

                    objectBeingPlaced.isPlaceholder = false;
                    objectBeingPlaced = null;
                }
            }
            else
            {
                var x = game.descale(e.offsetX);
                var y = game.descale(e.offsetY);

                selectObject(map.at(x, y));
                
                if (!objectSelected)
                {
                    var to = tower.location();
                    
                    to.x += tower.size() / 2;
                    to.y += tower.size() / 2;
                    
                    path = TowerDefense.aStar(map, new TowerDefense.Point(x, y), to);
                }
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
            obj.isPlaceholder = true;
            obj.isPlaceholderValid = true;

            objectBeingPlaced = obj;
        };
        
        game.canvas = canvas;
        game.mouseOver = false;
        
        var descaledWidth = game.descale(canvas.width);
        var descaledHeight = game.descale(canvas.height);
        
        tower.x(2);
        tower.y(descaledHeight - 6);
        
        map = new TowerDefense.Map(descaledWidth, descaledHeight);
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