(function(undefined)
{
    TowerDefense.Layer.map = function(game, map)
    {
        var layer = new TowerDefense.Layer(game);
        var selected = null;
        var placeholder = null;

        function select(obj)
        {
            if (selected)
            {
                selected.isSelected = false;
            }

            selected = obj;
            
            if (selected)
            {
                selected.isSelected = selected.isSelectable;
            }
        }

        layer.beginPlaceObject = function(obj)
        {
            obj.isPlaceholder = true;
            obj.isPlaceholderValid = true;

            placeholder = obj;
        };

        layer.paint = function(context)
        {
            map.objects.forEach(function(obj) 
            {
                obj.paint(context)
            });
            
            if (game.mouseOver && (placeholder !== null))
            {
                placeholder.paint(context);
            }
        };
        
        layer.mousemove = function(x, y)
        {
            x = game.descale(x);
            y = game.descale(y);

            if (placeholder !== null)
            {
                var size = placeholder.size();
                
                if ((x + size <= map.width) &&
                    (y + size <= map.height))
                {
                    placeholder.x(x);
                    placeholder.y(y);
                    
                    placeholder.isPlaceholderValid = map.isEmpty(x, y, size, size);
                }
            }
            else
            {
                var objectUnderMouse = map.at(x, y);
                
                if (objectUnderMouse && objectUnderMouse.isSelectable)
                {
                    game.setCursor('pointer');
                }
                else
                {
                    game.setCursor();
                }
            }
            
            for (var i in map.objects)
            {
                if (map.objects[i].setTarget instanceof Function)
                {
                    map.objects[i].setTarget(x, y);
                }
            }
        };

        layer.mouseup = function(x, y)
        {
            x = game.descale(x);
            y = game.descale(y);

            if (placeholder !== null)
            {
                if (placeholder.isPlaceholderValid)
                {
                    map.addObject(placeholder);

                    placeholder.isPlaceholder = false;
                    placeholder = null;
                }
            }
            else
            {
                select(map.at(x, y));
            }
        }

        return layer;
    };
    
})();