(function(undefined)
{
    function createBackground(width, height, scale)
    {
        var bgcanvas = document.createElement('canvas');

        bgcanvas.width = width;
        bgcanvas.height = height;

        var bgcontext = bgcanvas.getContext('2d');
        
        bgcontext.fillStyle = '#c7e2a4';
        bgcontext.fillRect(0, 0, width, height);

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

    TowerDefense.Layer.background = function(game, width, height)
    {
        var layer = new TowerDefense.Layer(game);
        var bgcanvas = null;

        layer.paint = function(context)
        {
            if (bgcanvas === null)
            {
                bgcanvas = createBackground(width, height, game.scale(1));
            }
            
            context.drawImage(bgcanvas, 0, 0);
        };
        
        layer.rescale = function()
        {
            bgcanvas = null;
        };
        
        return layer;
    };
    
})();