(function(undefined)
{
    TowerDefense.Layer.explosions = function(game)
    {
        /* @const */ var MaxAge = 16;
        /* @const */ var ScaleFactor = 6;
        
        var layer = new TowerDefense.Layer(game);
        var explosions = [];

        function rgba(r, g, b, a)
        {
            return 'rgba(' + r.toFixed() + ', ' +
                             g.toFixed() + ', ' +
                             b.toFixed() + ', ' +
                             a.toFixed(2) + ')';
        }

        layer.addExplosion = function(x, y)
        {
            explosions.push(
            {
                x: x,
                y: y,
                age: 0
            });
        };

        layer.update = function()
        {
            explosions = explosions.filter(function(expl) 
            {
                expl.age += 1/MaxAge;
                return expl.age < 1.0;
            });
        };

        layer.paint = function(context)
        {
            context.save();
            context.font = '14pt "Arial Black", sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            explosions.forEach(function(expl)
            {
                context.save();
                
                context.translate(expl.x, expl.y);
                context.scale(1+expl.age, 1+expl.age);
                context.translate(-expl.age, -expl.age);
                
                context.fillStyle = rgba(0, 0, 0, 1-expl.age);
                context.fillText("BAAAM!", 0, 0);
                
                context.restore();
            });
            
            context.restore();
        };
        
        return layer;
    };
    
})();