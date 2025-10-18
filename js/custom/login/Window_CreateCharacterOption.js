function Window_CreateCharacterOption(rect, options) {
    Window_Selectable.call(this, rect);
    // options: [{ type: 'text', value: 'Body' }, { type: 'image', src: 'img/face.png', width: 32, height: 32 }, ...]
    this._options = options || [];
    this.refresh();
    this.select(0);
}

Window_CreateCharacterOption.prototype = Object.create(Window_Selectable.prototype);
Window_CreateCharacterOption.prototype.constructor = Window_CreateCharacterOption;

Window_CreateCharacterOption.prototype.maxItems = function () {
    return this._options.length;
};

Window_CreateCharacterOption.prototype.itemHeight = function () {
    return 36; // Adjust as needed for your UI
};

Window_CreateCharacterOption.prototype.drawItem = function (index) {
    const option = this._options[index];
    if (!option) return;
    const rect = this.itemRect(index);

    if (option.type === 'text') {
        this.drawText(option.value, rect.x, rect.y, rect.width, 'left');
    } else if (option.type === 'image') {
        const bitmap = ImageManager.loadNormalBitmap(option.src);
        this.contents.blt(bitmap, 0, 0, option.width, option.height, rect.x, rect.y);
    }
};

Window_CreateCharacterOption.prototype.refresh = function () {
    this.contents.clear();
    for (let i = 0; i < this.maxItems(); i++) {
        this.drawItem(i);
    }
};
