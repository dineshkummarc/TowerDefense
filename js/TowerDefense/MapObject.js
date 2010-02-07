(function($, undefined)
{
    TowerDefense.MapObject = function(game, size, range)
    {
        /* @const */ var PI     = Math.PI;
        /* @const */ var TwoPI  =    2*PI;

        var self = this;
        var x, y;
        
        function xscaled()
        {
            return game.scale(self.x());
        }

        function yscaled()
        {
            return game.scale(self.y());
        }

        self.isPlaceholder = false;
        self.isPlaceholderValid = false;
        
        self.isSelected = false;
        self.isSelectable = true;

        self.isInRange = function(tx, ty)
        {
            if (range > 0)
            {
                var absdx = Math.abs(tx - self.x());
                var absdy = Math.abs(ty - self.y());

                return (Math.sqrt(absdx*absdx + absdy*absdy) <= range);
            }
            
            return false;
        };

        self.size = function()
        {
            return size;
        };

        self.location = function(newloc)
        {
            if (newloc !== undefined)
            {
                x = newloc.x;
                y = newloc.y;
            }
            
            return new TowerDefense.Point(x, y);
        };
        
        self.center = function()
        {
            var sizeHalf = size / 2;
            
            return new TowerDefense.Point(x + sizeHalf, y + sizeHalf);
        };

        self.x = function(newx)
        {
            if (newx !== undefined)
            {
                x = newx;
            }
            
            return x;
        };
        
        self.y = function(newy)
        {
            if (newy !== undefined)
            {
                y = newy;
            }
            
            return y;
        };

        self.paintPlaceholder = function(context)
        {
            var sz = game.scale(size);
            
            context.save();
            
            context.fillStyle = self.isPlaceholderValid ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
            context.fillRect(0, 0, sz, sz);

            context.strokeStyle = self.isPlaceholderValid ? 'green' : 'red';
            context.strokeRect(0, 0, sz, sz);                             
            
            context.restore();
        };

        self.paintRange = function(context)
        {
            context.beginPath();
            
            context.arc(game.scale(size/2),
                        game.scale(size/2), 
                        game.scale(range), 
                        0, TwoPI);
            
            context.closePath();
            
            context.lineWidth = 1;
            context.strokeStyle = self.isPlaceholderValid ? 'green' : 'red';
            context.stroke();
        };
        
        self.paintSelection = function(context)
        {
            var sz = game.scale(size);        
            var z = game.scale(0.4);

            context.beginPath();

            context.moveTo(0, z);
            context.lineTo(0, 0);
            context.lineTo(z, 0);

            context.moveTo(sz - z, 0);
            context.lineTo(sz,     0);
            context.lineTo(sz,     z);

            context.moveTo(sz,     sz - z);
            context.lineTo(sz,     sz);
            context.lineTo(sz - z, sz);

            context.moveTo(z, sz);
            context.lineTo(0, sz);
            context.lineTo(0, sz - z);
            
            context.lineWidth = 1;
            context.strokeStyle = 'white';
            context.stroke();
        };
        
        self.paintObject = function(context)
        {
        };
        
        self.paint = function(context)
        {
            context.save();
            context.translate(xscaled(), yscaled());
                    
            if (self.isPlaceholder)
            {
                self.paintPlaceholder(context);
            }
            else
            {
                self.paintObject(context);
            }
            
            if (self.isPlaceholder || self.isSelected)
            {
                self.paintRange(context);
            }
            
            if (self.isSelected)
            {
                self.paintSelection(context);
            }
            
            context.restore();
        };
    };
    
})(jQuery);