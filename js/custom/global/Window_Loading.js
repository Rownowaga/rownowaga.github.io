function Window_Loading(rect, text) {
    this._loadingText = text || "Loading...";
    this._spinnerIndex = 0;
    this._spinnerChars = ['|', '/', '-', '\\'];
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
    this._updateSpinner = this.updateSpinner.bind(this);
    this._spinnerInterval = setInterval(this._updateSpinner, 100);
}

Window_Loading.prototype = Object.create(Window_Base.prototype);
Window_Loading.prototype.constructor = Window_Loading;

Window_Loading.prototype.refresh = function () {
    this.contents.clear();
    const text = this._loadingText;
    const spinner = this._spinnerChars[this._spinnerIndex];
    // Draw text centered
    this.drawText(text, 0, 0, this.contentsWidth(), 'center');
    // Draw spinner below text, centered
    this.drawText(spinner, 0, this.lineHeight(), this.contentsWidth(), 'center');
};

Window_Loading.prototype.updateSpinner = function () {
    this._spinnerIndex = (this._spinnerIndex + 1) % this._spinnerChars.length;
    this.refresh();
};

Window_Loading.prototype.close = function () {
    Window_Base.prototype.close.call(this);
    clearInterval(this._spinnerInterval);
};

Window_Loading.prototype.hide = function () {
    Window_Base.prototype.hide.call(this);
    clearInterval(this._spinnerInterval);
};
