(function($, undefined)
{
    window.TowerDefense.Turret = function(context, x, y, w, h)
    {
        var turret = this;
    
        function calcAngle()
        {
            if ((turret.targetX !== undefined) &&
                (turret.targetY !== undefined))
            {
                var dx = x - turret.targetX;
                var dy = y - turret.targetY;
                
                turret.angle = Math.atan2(dy, dx) - Math.PI/2;
            }
        }
    
        turret.angle = 0;
        turret.paint = function()
        {
            calcAngle();
            
            context.save();

            context.translate(x, y);
            context.rotate(turret.angle);
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

            if ((turret.targetX !== undefined) &&
                (turret.targetY !== undefined))
            {
                context.save();
                context.fillStyle = 'black'
                context.fillRect(turret.targetX - 3, turret.targetY - 3, 6, 6);
                context.restore();
            }
        }
    };
    
})(jQuery);