function Window_CharacterSelect(rect, characters) {
    this.initialize(rect, characters);
}

Window_CharacterSelect.prototype = Object.create(Window_Selectable.prototype);
Window_CharacterSelect.prototype.constructor = Window_CharacterSelect;

Window_CharacterSelect.prototype.initialize = function (rect, characters) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._characters = characters || [];
    this.refresh();
    this.select(0);
    this.activate();
};

Window_CharacterSelect.prototype.maxItems = function () {
    return 4;
};

Window_CharacterSelect.prototype.itemHeight = function () {
    return Graphics.boxHeight/4; // or 60, or higher if you want more space
};



Window_CharacterSelect.prototype.drawItem = function (index) {
    const character = this._characters[index];
    if (!character) return;
    const rect = this.itemRect(index);
    this.resetTextColor();

    // If slot is empty or missing face info, show "create new"
    if (!character || !character.faceName || character.faceIndex === undefined || character.faceIndex === null) {
        this.drawText("Create New", rect.x, rect.y + (rect.height/2), rect.width, "center");
        return;
    }

    // Face dimensions
    const faceWidth = 144;
    const faceHeight = 144;

    // Position face on the right side of the item
    const faceX = rect.x + rect.width - faceWidth - 12; // 12px padding from right edge
    const faceY = rect.y + (rect.height - faceHeight) / 2; // Vertically centered

    // Text positions
    const textLeft = rect.x + 12;
    const nameY = rect.y + 12; // Top padding
    const nameWidth = rect.width - faceWidth - 36;

    // Draw name and level on the same line
    const name = character.name;
    const levelText = `Lv ${character.level}`;
    const nameWidthActual = this.textWidth(name) + 24; // 24px space between name and level

    try {
        this.drawFace(character.faceName, character.faceIndex, faceX, faceY, faceWidth, faceHeight);

        // Draw name (left), then level (right after name)
        this.drawText(name, textLeft, nameY, nameWidth, "left");
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(levelText, textLeft + nameWidthActual, nameY, nameWidth - nameWidthActual, "left");

        // Draw class below name/level
        const classY = nameY + this.lineHeight();
        this.drawText(character.className, textLeft + nameWidthActual, classY, nameWidth, "left");

        const nextY = classY + this.lineHeight();
        this.drawText("Dev Purgatory", textLeft + nameWidthActual, nextY, nameWidth, "left");
    } catch (e) {
        this.drawText("character error", rect.x, rect.y, rect.width, "center");
    }
};


Window_CharacterSelect.prototype.character = function () {
    return this._characters[this.index()];
};

Window_CharacterSelect.prototype.setOkHandler = function (handler) {
    this.setHandler('ok', handler);
};

Window_CharacterSelect.prototype.setCancelHandler = function (handler) {
    this.setHandler('cancel', handler);
};

Window_CharacterSelect.prototype.isCreateNew = function () {
    const character = this.character();
    return !character || !character.faceName || character.faceIndex === undefined || character.faceIndex === null;
};


