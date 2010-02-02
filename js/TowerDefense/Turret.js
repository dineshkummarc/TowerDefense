(function($, undefined)
{
    /**
     * A turret
     * @constructor
     */
    window.TowerDefense.Turret = function(x, y, w, h)
    {
        /* @const */ var RotateStepRad = (Math.PI / 45); // 4 degrees
        /* @const */ var PI     = Math.PI;
        /* @const */ var TwoPI  =    2*PI;
        /* @const */ var HalfPI =  0.5*PI;
    
        var turret = this;
    
        var targetAngle = 0;
        var currentAngle = 0;
        var currentAngleDelta = 0;
        
        function normalizeAngle(rads)
        {
            var result = rads % TwoPI;
            
            if (result < 0)
            {
                result += TwoPI;
            }
            
            return result;
        }
        
        function updateAngle()
        {
            if (Math.abs(currentAngle - targetAngle) >= Math.abs(currentAngleDelta))
            {
                currentAngle = normalizeAngle(currentAngle + currentAngleDelta);
            }
            else
            {
                currentAngle = targetAngle;
                currentAngleDelta = 0;
            }
        }
        
        turret.setTarget = function(tx, ty)
        {
            var dx = tx - x;
            var dy = ty - y;
            
            currentAngleDelta = RotateStepRad;
            
            targetAngle = Math.atan2(dy, dx);
            targetAngle = normalizeAngle(targetAngle);
            
            var totalDelta = normalizeAngle(targetAngle - currentAngle);
            
            if (totalDelta > PI)
            {
                currentAngleDelta = -RotateStepRad;
            }
        };
        
        turret.paint = function(context)
        {
            function dumpDebug()
            {
                function radToStr(rad)
                {
                    return ((rad / PI) * 180).toPrecision(4) + '\u00b0';
                }
            
                context.save();
                
                context.font = '12px Consolas';
                context.fillText("currentAngle: " + radToStr(currentAngle), 2, 12);
                context.fillText("targetAngle:  " + radToStr(targetAngle),  2, 24);

                context.restore();
            }
            
            function drawTurret()
            {
                context.save();
    
                context.translate(x, y);
                context.rotate(currentAngle);
                context.translate(-w/2, -h/2)
        
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(w, h/2);
                context.lineTo(0, h);
                context.lineTo(0, 0);
                context.closePath();

                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
                
                context.restore();
            }
            
            function drawCoveredArea()
            {
                context.save();
                
                context.beginPath();
                context.arc(x, y, 25);
                context.closePath();
                
                context.lineWidth = 1;
                context.strokeStyle = 'white';
                context.stroke();
                
                context.restore();
            }
            
            updateAngle();
            dumpDebug();
            
            drawTurret();
            drawCoveredArea();
            
        }
    };
    
})(jQuery);