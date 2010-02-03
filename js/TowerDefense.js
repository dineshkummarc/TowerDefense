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
        bgcontext.strokeStyle = 'rgba(0, 0, 0, 0.4)'
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
        var objectBeingPlaced = null;
        
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
            
            for (var w in map.weapons)
            {
                map.weapons[w].paint(context);
            }
            
            if (mouseOver && (objectBeingPlaced !== null))
            {
                objectBeingPlaced.paint(context);
            }
        }
        
        function onMouseMove(e)
        {
            if (objectBeingPlaced !== null)
            {
                var x = game.descale(e.offsetX);
                var y = game.descale(e.offsetY);
                
                objectBeingPlaced.x(x);
                objectBeingPlaced.y(y);
                
                objectBeingPlaced.isPlaceholderValid = 
                    map.isEmpty(x, y, objectBeingPlaced.size(), objectBeingPlaced.size());
                
                return;
            }

            for (var w in map.weapons)
            {
                map.weapons[w].setTarget(game.descale(e.offsetX), game.descale(e.offsetY));
            }
        }
        
        function onMouseUp(e)
        {
            if ((objectBeingPlaced !== null) && (objectBeingPlaced.isPlaceholderValid))
            {
                map.addWeapon(objectBeingPlaced);
                
                objectBeingPlaced.isPlaceholder = false;
                objectBeingPlaced = null;
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