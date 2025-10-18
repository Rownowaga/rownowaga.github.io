function Window_TabMenu_Horiz(rect, tabNames) {

    this._tabNames = tabNames || [];

    Window_Selectable.call(this, rect);
    this.select(0);
}

Window_TabMenu_Horiz.prototype = Object.create(Window_Selectable.prototype);
Window_TabMenu_Horiz.prototype.constructor = Window_TabMenu_Horiz;

Window_TabMenu_Horiz.prototype.maxItems = function () {
    return this._tabNames.length;
};

Window_TabMenu_Horiz.prototype.maxCols = function () {
    return this._tabNames.length;
};

Window_TabMenu_Horiz.prototype.itemWidth = function () {
    return Math.floor(this.width / this.maxCols());
};

Window_TabMenu_Horiz.prototype.itemHeight = function () {
    return 36;
};

Window_TabMenu_Horiz.prototype.drawItem = function (index) {
    const rect = this.itemRect(index);
    this.drawText(this._tabNames[index], rect.x, rect.y, rect.width, 'center');
};

Window_TabMenu_Horiz.prototype.refresh = function () {
    this.contents.clear();
    for (let i = 0; i < this.maxItems(); i++) {
        this.drawItem(i);
    }
};

