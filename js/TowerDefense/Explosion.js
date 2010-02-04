(function($, undefined)
{
    window.TowerDefense.Explosion = function(game, fontSize)
    {
        /* @const */var AnimationCoefficient = 0.02;
        /* @const */var FontScaleCoefficient = 1.01;

        var explosion = this;
        var alpha = 1.0;
        var fontScale = 1;
        
        if (fontSize === undefined) { fontSize = 12 }

        explosion.animationEnded = false;

        explosion.paint = function(context)
        {
            context.save();
            context.font = fontSize + 'pt Consolas';
            context.scale(fontScale, fontScale);
            animate(context);
            context.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
            context.fillText('Bam!!!', 40, 40);
            context.restore();
        };

        function animate(context)
        {
            if (alpha > 0 + AnimationCoefficient)
            {
                alpha -= AnimationCoefficient;
                fontScale *= FontScaleCoefficient;
                fontSize *= FontScaleCoefficient;
            }
            else
            {
                explosion.animationEnded = true;
            }
        }
    };

})(jQuery);