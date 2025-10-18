function Scene_CharacterSelect() {
    this.initialize.apply(this, arguments);
}

Scene_CharacterSelect.prototype = Object.create(Scene_Base.prototype);
Scene_CharacterSelect.prototype.constructor = Scene_CharacterSelect;


Scene_CharacterSelect.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._characterList = Scene_CharacterSelect.characterList || [];
};


Scene_CharacterSelect.prototype.create = function () {
    Scene_Base.prototype.create.call(this);

    this.createWindowLayer(); //A layer needs to be added to the Scene before adding windows

    //Show loading window
    this._loadingWindow = new Window_Loading(new Rectangle((Graphics.boxWidth - 300) / 2,(Graphics.boxHeight - 100) / 2,300, 100), "Loading Characters...");
    this.addWindow(this._loadingWindow);

    //Preload faces and wait for them to load
    const bitmaps = [];
    this._characterList.forEach(char => {
        if (char.faceName) {
            const bitmap = ImageManager.loadFace(char.faceName);
            bitmaps.push(bitmap);
        }
    });

    //Wait for all bitmaps to be ready
    this._checkImagesLoaded(bitmaps);
};

Scene_CharacterSelect.prototype.createCharacterWindow = function () {
    //Scene_CharacterSelect width = 400;
    //const height = 300;
    //const x = (Graphics.boxWidth - width) / 2;
    //const y = (Graphics.boxHeight - height) / 2;
    const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._characterWindow = new Window_CharacterSelect(rect, this._characterList);
    this.addWindow(this._characterWindow);
    this._characterWindow.activate();

    this._characterWindow.setOkHandler(this.onCharacterOk.bind(this));
    this._characterWindow.setCancelHandler(this.onCharacterCancel.bind(this));
    this._characterWindow.refresh();

};

Scene_CharacterSelect.prototype.onCharacterOk = function () {
    if (this._characterWindow.isCreateNew()) {
        // Handle "Create New" option
        console.log("Create New selected");
        // Call your create new character logic here
        this.onCreateNewCharacter();
    } else {
        // Handle existing character selection
        const selected = this._characterWindow.character();
        console.log("Selected character:", selected);
        // Proceed to next scene or update game state as needed
    }
};

// Add this method to handle the create new logic
Scene_CharacterSelect.prototype.onCreateNewCharacter = function () {
    // Your logic for creating a new character
    // For example:
    SceneManager.push(Scene_CreateCharacter);
    //alert("Create New Character flow goes here!");
};

Scene_CharacterSelect.prototype.onCharacterCancel = function () {
    // Handle cancel, e.g.:
    SceneManager.goto(Scene_Title); // Or go back to previous scene
};

Scene_CharacterSelect.prototype._checkImagesLoaded = function (bitmaps) {
    if (bitmaps.every(bmp => bmp.isReady())) {
        // All images loaded, remove loading window and show character window
        this.removeChild(this._loadingWindow);
        this.createCharacterWindow();
    } else {
        // Check again next frame
        setTimeout(() => this._checkImagesLoaded(bitmaps), 50);
    }
};

