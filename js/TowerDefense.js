(function($, undefined)
{
    function createBackground(width, height, scale)
    {
        var bgcanvas = document.createElement('canvas');

        bgcanvas.width = width;
        bgcanvas.height = height;

        var bgcontext = bgcanvas.getContext('2d');

        for (var x = 0; x <= width; x += scale)
        {
            bgcontext.moveTo(x, 0);
            bgcontext.lineTo(x, height);
        }

        for (var y = 0; y <= height; y += scale)
        {
            bgcontext.moveTo(0, y);
            bgcontext.lineTo(width, y);
        }

        bgcontext.lineWidth = 1;
        bgcontext.strokeStyle = '#bed499'
        bgcontext.stroke();

        return bgcanvas;
    }

    window.TowerDefense = function(canvas)
    {
        var game = this;
        var context = canvas.getContext('2d');
        var $canvas = $(canvas);

        var mouseOver = false;
        var scale = 20.0;
        var bg =
        {
            canvas: null,
            scale: 0
        };

        var map = null;
        var objectSelected = null;
        var objectBeingPlaced = null;

        var explosions = [];

        function selectObject(obj)
        {
            if (objectSelected !== null)
            {
                objectSelected.isSelected = false;
            }

            objectSelected = obj;

            if (objectSelected !== null)
            {
                objectSelected.isSelected = true;
            }
        }

        function drawBackground()
        {
            if (bg.scale != scale)
            {
                bg.scale = scale;
                bg.canvas = createBackground(canvas.width, canvas.height, scale);
            }

            context.drawImage(bg.canvas, 0, 0);
        }

        function mainLoop()
        {
            context.clearRect(0, 0, canvas.width, canvas.height);

            drawBackground();

            for (var i in map.objects)
            {
                map.objects[i].paint(context);
            }

            drawExplosions()

            if (mouseOver && (objectBeingPlaced !== null))
            {
                objectBeingPlaced.paint(context);
            }
        }

        function drawExplosions()
        {
            var activeExplosions = [];
            for (var i in explosions)
            {
                if (!explosions[i].animationEnded)
                {
                    activeExplosions.push(explosions[i]);
                }
            }
            explosions = activeExplosions;

            for (var i in explosions)
            {
                explosions[i].paint(context);
            }
        }

        function onMouseMove(e)
        {
            var x = game.descale(e.offsetX);
            var y = game.descale(e.offsetY);

            if (objectBeingPlaced !== null)
            {
                var size = objectBeingPlaced.size();

                objectBeingPlaced.x(x);
                objectBeingPlaced.y(y);

                objectBeingPlaced.isPlaceholderValid = map.isEmpty(x, y, size, size);

                return;
            }

            if (map.at(x, y))
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

        game.beginPlaceObject = function(obj)
        {
            obj.isPlaceholder = true;
            obj.isPlaceholderValid = true;

            objectBeingPlaced = obj;
        };

        game.addExplosion = function(obj)
        {
            explosions.push(obj);
        };

        map = new TowerDefense.Map(game, game.descale(canvas.width), game.descale(canvas.height));

        $canvas.hover(
            function() { mouseOver = true; },
            function() { mouseOver = false; }
        );

        $canvas.mousemove(onMouseMove);
        $canvas.mouseup(onMouseUp);

        window.setInterval(mainLoop, 33);
    };

})(jQuery);