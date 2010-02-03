(function($, undefined)
{
    window.TowerDefense.newTurret = function(game, size, range)
    {
        /* @const */ var PI     = Math.PI;
        /* @const */ var TwoPI  =    2*PI;
        /* @const */ var HalfPI =  0.5*PI;

        /* @const */ var RotateStepRad = (Math.PI / 30); // 6 degrees
    
        var turret = new TowerDefense.Weapon(game, size, range);
    
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
            if (turret.isInRange(tx, ty))
            {
                var dx = tx - turret.x();
                var dy = ty - turret.y();
                
                currentAngleDelta = RotateStepRad;
                
                targetAngle = Math.atan2(dy, dx);
                targetAngle = normalizeAngle(targetAngle);
                
                var totalDelta = normalizeAngle(targetAngle - currentAngle);
                
                if (totalDelta > PI)
                {
                    currentAngleDelta = -RotateStepRad;
                }
            }
        };
        
        turret.paintWeapon = function(context)
        {
            function drawTurretBase()
            {
                context.beginPath();
                context.arc(0, 0, game.scale(size*0.4), 0, TwoPI);
                context.closePath();

                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();
            }
            
            function drawTurret()
            {
                context.save();
                context.rotate(currentAngle);
                context.translate(game.scale(-size/2), game.scale(-size/2))

                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.strokeRect(game.scale(size*0.25), 
                                   game.scale(size*0.4), 
                                   game.scale(size*0.75), 
                                   game.scale(size*0.2));
                context.restore();
            }
            
            updateAngle();            
            drawTurretBase();
            drawTurret();
        }
        
        return turret;
    };
    
})(jQuery);