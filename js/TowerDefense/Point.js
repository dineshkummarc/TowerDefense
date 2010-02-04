(function(undefined)
{
    TowerDefense.Point = function(x, y)
    {
        this.x = x;
        this.y = y;
    }
    
    TowerDefense.Point.prototype.toString = function()
    {
        return this.x.toString() + ";" + this.y.toString();
    };
})();