(function($, undefined)
{
    window.TowerDefense.Explosion = function(game)
    {
        /* @const */var AnimationCoeficient = 0.02;
        
        var explosion = this;

        var alpha = 0.1;
        var endAnimation = false;

        explosion.AnimationEnded = false;

        explosion.paint = function(context)
        {
            var size = game.scale(1);
            context.fillStyle = 'rgba(0, 0, 0, ' + alpha + ')';
            context.font = "32pt Arial";
            context.fillText("Bam!!!", 40, 40);
            animate();
        };

        function animate()
        {
            if (alpha < 1 && !endAnimation)
            {
                alpha += AnimationCoeficient;
            }
            else if (alpha > 1 && !endAnimation)
            {
                endAnimation = true;
                alpha -= AnimationCoeficient;
            }
            else if (alpha > 0 && endAnimation)
            {
                alpha -= AnimationCoeficient;
            }
            else
            {
                explosion.AnimationEnded = true;
            }
        }
    };

})(jQuery);