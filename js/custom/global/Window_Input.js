function Window_Input(text, censorInput, rect) {
    this.initialize(text, censorInput, rect);
}

Window_Input.prototype = Object.create(Window_Base.prototype);
Window_Input.prototype.constructor = Window_Input;

Window_Input.prototype.initialize = function (text, censorInput, rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._displayText = text || '';
    this._censorInput = !!censorInput;
    this._userInput = '';
    this._error = '';
    this.refresh();
    this.activate();
};


Window_Input.prototype.refresh = function () {
    this.contents.clear();
    const w = this.contents.width;
    // Draw the provided text parameter at the top
    this.drawText(this._displayText, 0, 0, w, 'center');
    // Draw the user input below
    const inputY = 48;
    let displayInput = this._censorInput
        ? '*'.repeat(this._userInput.length)
        : this._userInput;
    this.drawText(displayInput + '_', 0, inputY, w, 'center');
};

Window_Input.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this.active) {
        this.processInput();
    }
};

Window_Input.prototype.processInput = function () {
    // Handle backspace
    if (Input.isRepeated('backspace')) {
        if (this._userInput.length > 0) {
            this._userInput = this._userInput.slice(0, -1);
            this.refresh();
        }
        return;
    }
    // Handle character input
    const inputChar = this.getInputCharacter();
    if (inputChar && this._userInput.length < 16) {
        this._userInput += inputChar;
        this.refresh();
    }
};

Window_Input.prototype.getInputCharacter = function () {
    // 0-9, A-Z
    for (let i = 48; i <= 90; i++) {
        if (Input.isTriggered(String.fromCharCode(i))) {
            return String.fromCharCode(i);
        }
    }
    // a-z
    for (let i = 97; i <= 122; i++) {
        if (Input.isTriggered(String.fromCharCode(i))) {
            return String.fromCharCode(i);
        }
    }
    // Common symbols
    const symbols = ['-', '_', '.', '@'];
    for (const sym of symbols) {
        if (Input.isTriggered(sym)) {
            return sym;
        }
    }
    return null;
};

Window_Input.prototype.activate = function () {
    Window_Base.prototype.activate.call(this);
    if (!this._inputListener) {
        this._inputListener = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this._inputListener);
    }
};

Window_Input.prototype.deactivate = function () {
    Window_Base.prototype.deactivate.call(this);
    if (this._inputListener) {
        window.removeEventListener('keydown', this._inputListener);
        this._inputListener = null;
    }
};

Window_Input.prototype.onKeyDown = function (event) {
    if (!this.active) return;

    // Handle backspace
    if (event.key === "Backspace") {
        if (this._userInput.length > 0) {
            this._userInput = this._userInput.slice(0, -1);
            this.refresh();
        }
        event.preventDefault();
        return;
    }

    // Handle Enter (optional: you can add a handler here)
    if (event.key === "Enter") {
        if (typeof this._okHandler === "function") {
            this._okHandler(this._userInput);
        }
        event.preventDefault();
        return;
    }

    // Accept only visible characters
    if (event.key.length === 1 && this._userInput.length < 16) {
        this._userInput += event.key;
        this.refresh();
        event.preventDefault();
    }
};

Window_Input.prototype.setOkHandler = function (handler) {
    this._okHandler = handler;
};