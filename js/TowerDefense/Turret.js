(function($, undefined)
{
    window.TowerDefense.Turret = function(x, y, w, h)
    {
        var turret = this;
    
        var currentAngle = 0;
        var targetAngle = 0;
        
        function updateAngle()
        {
            var delta = Math.PI / 90; // 2 degrees

            if (Math.abs(currentAngle - targetAngle) > delta)
            {
                if (currentAngle > targetAngle)
                {
                    delta = -delta;
                }
                
                currentAngle += delta;
            }
            else
            {
                currentAngle = targetAngle;
            }
        }
        
        function dumpDebug(context)
        {
            function radToStr(rad)
            {
                return ((rad / Math.PI) * 180).toPrecision(4) + '\u00b0';
            }
        
            context.save();
            
            context.font = '12px Consolas';
            context.fillText("currentAngle: " + radToStr(currentAngle), 2, 12);
            context.fillText("targetAngle:  " + radToStr(targetAngle),  2, 24);

            context.restore();
        }
        
        turret.setTarget = function(targetX, targetY)
        {
            var dx = x - targetX;
            var dy = y - targetY;
            
            targetAngle = Math.atan2(dy, dx) - Math.PI/2;
        };
        
        turret.paint = function(context)
        {
            updateAngle();
            dumpDebug(context);
            
            context.save();

            context.translate(x, y);
            context.rotate(currentAngle);
            context.translate(-w/2, -h/2)

            context.beginPath();
            context.moveTo(0,   h);
            context.lineTo(w/2, 0);
            context.lineTo(w,   h);
            context.lineTo(0,   h);
            context.closePath();

            context.strokeStyle = '#ff0000';
            context.stroke();

            context.restore();
        }
    };
    
})(jQuery);