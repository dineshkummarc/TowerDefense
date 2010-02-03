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
        bgcontext.strokeStyle = 'black'
        bgcontext.globalAlpha = 0.4;
        bgcontext.stroke();
        
        return bgcanvas;
    }
    
    window.TowerDefense = function(canvas, map)
    {
        var game = this;
        var context = canvas.getContext('2d');
        
        var bgcanvas;
        
        var scale = 15;
        var turrets = [];
        
        function drawBackground()
        {
            if (!bgcanvas)
            {
                bgcanvas = createBackground(canvas.width, canvas.height, scale);
            }
            
            context.drawImage(bgcanvas, 0, 0);
        }

        function mainLoop()
        {
            game.scale = scale;
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            drawBackground();
            
            for (var t in turrets)
            {
                turrets[t].paint(context);
            }
        }
        
        function onMouseMove(e)
        {
            for (var t in turrets)
            {
                turrets[t].setTarget(e.offsetX, e.offsetY);
            }
        }
        
        game.beginPlaceObject = function(size, range, callback)
        {
        };
        
        game.run = function(fps)
        {
            if (!fps || (fps < 10) || (fps > 100))
            {
                fps = 30;
            }
            
            turrets.push(new TowerDefense.Turret(game, 17, 17, 2, 10));
            turrets.push(new TowerDefense.Turret(game, 32, 22, 2, 10));
            turrets.push(new TowerDefense.Turret(game, 38, 9, 2, 3));
            
            $(canvas).mousemove(onMouseMove);
            window.setInterval(mainLoop, 1000/fps);
        };
    };
    
})(jQuery);