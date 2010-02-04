(function($, undefined)
{
    TowerDefense.aStar = function(map, from, to)
    {
        var Point = TowerDefense.Point;
        
        function Node(parent, point)
        {
            this.parent = parent;
            
            this.point = point;
            this.value = (point.y * map.width) + point.x;
            
            this.f = 0;
            this.g = 0;
        }
        
        function distance(from, to)
        {
            return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y));
        }
        
        function findSuccessors(x, y)
        {
            var n = y-1;
            var s = y+1;
            var w = x-1;
            var e = x+1;
        
            var maxx = map.width;
            var maxy = map.height;
        
            var north = (n >= 0)   && !map.at(x, n) ? new Point(x, n) : null;
            var south = (s < maxy) && !map.at(x, s) ? new Point(x, s) : null;
            var west  = (w >= 0)   && !map.at(w, y) ? new Point(w, y) : null;
            var east  = (e < maxx) && !map.at(e, y) ? new Point(e, y) : null;
            
            var results = []
            
            if (north)
            {
                results.push(north);
                
                if (east && !map.at(e, n)) results.push(new Point(e, n));
                if (west && !map.at(w, n)) results.push(new Point(w, n));
            }
            
            if (south)
            {
                results.push(south);
                
                if (east && !map.at(e, s)) results.push(new Point(e, s));
                if (west && !map.at(w, s)) results.push(new Point(w, s));
            }
            
            if (west) results.push(west);
            if (east) results.push(east);
            
            return results;
        }
        
        var start = new Node(null, from);
        var goal = new Node(null, to);
        
        var open = [ start ];
        var closed = [];
        
        var astar = new Array(map.width * map.height);
        
        while (open.length > 0)
        {
            var max = astar.length;
            var min = -1;
            
            for (var i = 0; i < open.length; i++)
            {
                if (open[i].f < max)
                {
                    max = open[i].f;
                    min = i;
                }
            }
            
            var node = open.splice(min, 1)[0];
            
            if (node.value == goal.value)
            {
                var result = [];
                
                do
                {
                    result.push(node.point);
                    node = node.parent;
                }
                while (node.parent);
                
                
                result.reverse();
                
                for (var i in result)
                {
                    console.log(result[i].toString());
                }
                
                return result;
            }
            else
            {
                var successors = findSuccessors(node.point.x, node.point.y);
                
                for (var s in successors)
                {
                    var candidate = new Node(node, successors[s]);
                    
                    if (!astar[candidate.value])
                    {
                        candidate.g = node.g      + distance(successors[s], node.point);
                        candidate.f = candidate.g + distance(successors[s], goal.point);
                        
                        open.push(candidate);
                        astar[candidate.value] = true;
                    }
                }
                
                closed.push(node);
            }
            
        }
    };
    
})(jQuery);