(function($, undefined)
{
    TowerDefense.Map = function(width, height)
    {
        var map = this;
        var places = [];
        
        places.length = (width * height);
        
        map.width = width;
        map.height = height;
        map.objects = [];
        
        function get(x, y)
        {
            if (x < 0 || y < 0)
            {
                return undefined;
            }
            
            return places[y*width + x];
        }
        
        function set(x, y, value)
        {
            places[y*width + x] = value;
        }
        
        function enumArea(left, top, width, height, callback)
        {
            for (var y = top; y < (top + height); y++)
            {
                for (var x = left; x < (left + width); x++)
                {
                    var value = get(x, y);
                    
                    if (callback(value, x, y) === false)
                    {
                        return;
                    }
                }
            }
        }
        
        map.at = function(ptOrX, y)
        {
            if (ptOrX && ptOrX.x && (y === undefined))
            {
                return get(ptOrX.x, ptOrX.y);
            }
            
            return get(ptOrX, y);
        };
        
        map.isEmpty = function(left, top, width, height)
        {
            var result = true;
            
            enumArea(left, top, width, height, function(content)
            {
                if (content)
                {
                    result = false;
                    return false;
                }
            });
            
            return result;
        };
        
        map.addObject = function(obj)
        {
            var left = obj.x();
            var top = obj.y();
            
            var size = obj.size();
            
            if (map.isEmpty(left, top, size, size))
            {
                enumArea(left, top, size, size, function(content, x, y)
                {
                    set(x, y, obj);
                });
                
                map.objects.push(obj);
                return true;
            }
            
            return false;
        };
    };
    
})(jQuery);