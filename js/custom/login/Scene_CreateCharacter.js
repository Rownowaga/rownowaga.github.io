function Scene_CreateCharacter() {
    Scene_MenuBase.call(this);
}
Scene_CreateCharacter.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CreateCharacter.prototype.constructor = Scene_CreateCharacter;

Scene_CreateCharacter.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_CreateCharacter.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);

    this.createWindowLayer();

    // Horizontal tab window
    const horizTabNames = ["Body 1", "Body 2", "Body 3"];
    const horizTabRect = new Rectangle(0, 0, 400, 60);
    this._bodyWindow = new Window_TabMenu_Horiz(horizTabRect, horizTabNames);
    this.addWindow(this._bodyWindow);
    this._bodyWindow.setHandler('ok', this.onBodyOk.bind(this));
    this._bodyWindow.activate();
    this._bodyWindow.refresh();

    // Vertical tab window
    const vertTabNames = ["Face", "Front Hair", "Rear Hair", "Beard", "Ears", "Eyes", "Eyebrows", "Nose", "Mouth", "Markings", "Beast Ears", "Tail", "Wing", "Clothing", "Cloak", "Accessory 1", "Accessory 2", "Glasses"];
    const vertTabRect = new Rectangle(0, horizTabRect.height, 200, Graphics.boxHeight - 100);
    this._partWindow = new Window_TabMenu_Vert(vertTabRect, vertTabNames, false);
    this.addWindow(this._partWindow);
    this._partWindow.setHandler('ok', this.onPartOk.bind(this));
    this._partWindow.refresh();
    this._partWindow.hide(); // Hide initially
};

//Body Window
Scene_CreateCharacter.prototype.onBodyOk = function () {
    const tabIndex = this._bodyWindow.index();
    console.log("Tab changed to:", tabIndex);

    // Show and activate the part window
    this._partWindow.show();
    this._partWindow.activate();
};


//Part Window
Scene_CreateCharacter.prototype.onPartOk = function () {
    const partIndex = this._partWindow.index();
    const bodyIndex = this._bodyWindow.index();

    // Remove previous image window if it exists
    if (this._partImageWindow) {
        this.removeChild(this._partImageWindow);
        this._partImageWindow = null;
    }

    // Get image file names for the selected part
    const partImageNames = this.getImagesForPart(partIndex);

    // Load images, then show the window
    this.loadImagesForPart(bodyIndex, partIndex, partImageNames, (bitmaps) => {
        // Create and show the new image window
        const imageWindowRect = new Rectangle(
            this._partWindow.x + this._partWindow.width + 10,
            this._partWindow.y,
            200,
            400
        );
        // Pass the loaded bitmaps or image names as needed by your Window_TabMenu_Vert
        this._partImageWindow = new Window_TabMenu_Vert(imageWindowRect, null, true, partImageNames, bitmaps);
        this.addWindow(this._partImageWindow);
        this._partImageWindow.show();
        this._partImageWindow.activate();
    });
};



