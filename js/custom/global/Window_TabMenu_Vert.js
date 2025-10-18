function Window_TabMenu_Vert(rect, tabNames, useImages = false, tabImages = []) {
    this._tabNames = tabNames || [];
    this._useImages = useImages;
    this._tabImages = tabImages || [];
    Window_Selectable.call(this, rect);
}

Window_TabMenu_Vert.prototype = Object.create(Window_Selectable.prototype);
Window_TabMenu_Vert.prototype.constructor = Window_TabMenu_Vert;

Window_TabMenu_Vert.prototype.maxItems = function () {
    return this._tabNames.length;
};

Window_TabMenu_Vert.prototype.maxCols = function () {
    return 1;
};

Window_TabMenu_Vert.prototype.itemWidth = function () {
    return this.width;
};

Window_TabMenu_Vert.prototype.itemHeight = function () {
    return 36;
};

Window_TabMenu_Vert.prototype.drawItem = function (index) {
    const rect = this.itemRect(index);
    if (this._useImages && this._tabImages[index]) {
        // Draw image centered in the item rect
        const bitmap = ImageManager.loadPicture(this._tabImages[index]);
        if (bitmap && bitmap.isReady()) {
            const x = rect.x + (rect.width - bitmap.width) / 2;
            const y = rect.y + (rect.height - bitmap.height) / 2;
            this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
        }
    } else {
        this.drawText(this._tabNames[index], rect.x, rect.y, rect.width, 'center');
    }
};

Window_TabMenu_Vert.prototype.refresh = function () {
    this.contents.clear();
    for (let i = 0; i < this.maxItems(); i++) {
        this.drawItem(i);
    }
};
