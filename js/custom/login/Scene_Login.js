function Scene_Login() {
    this.initialize.apply(this, arguments);
}

Scene_Login.prototype = Object.create(Scene_Base.prototype);
Scene_Login.prototype.constructor = Scene_Login;

Scene_Login.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Login.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createWindowLayer(); //A layer needs to be added to the Scene before adding windows
    this.createLoginWindow();
};

Scene_Login.prototype.createLoginWindow = function () {
    const width = 400;
    const height = 200;
    const x = (Graphics.boxWidth - width) / 2;
    const y = (Graphics.boxHeight - height) / 2;
    const rect = new Rectangle(x, y, width, height);
    this._usernameWindow = new Window_Input("Username", false, rect);
    //this._usernameWindow.setHandler('ok', this.onLoginOk.bind(this));
    this.addWindow(this._usernameWindow);
    this._usernameWindow.activate();

    // Password window (initially hidden)
    this._passwordWindow = new Window_Input("Password", true, rect);
    this.addWindow(this._passwordWindow);
    this._passwordWindow.hide();
    this._passwordWindow.deactivate();

    // Save input, hide username, show password
    this._usernameWindow.setOkHandler((input) => {
        this._username = input; // Save to scene variable
        this._usernameWindow.hide();
        this._usernameWindow.deactivate();
        this._passwordWindow.show();
        this._passwordWindow.activate();
    });

    // Optionally, handle password submission
    this._passwordWindow.setOkHandler((input) => {
        this._password = input; // Save to scene variable

        this._passwordWindow.deactivate();
        this._passwordWindow.hide();

        const characters = [
            { name: "Dude", faceName: "Actor1", faceIndex: 0, level: 10, className: "Swordsman" },
            { name: "Bro", faceName: "Actor1", faceIndex: 2, level: 20, className: "Bandit" },
            { name: "Guy", faceName: "Actor1", faceIndex: 3, level: 30, className: "Priest" },
            { }
        ];

        characters.forEach(char => {
            if (char.faceName) ImageManager.loadFace(char.faceName); //Pre-load faces
        });

        Scene_CharacterSelect.characterList = characters;
        SceneManager.goto(Scene_CharacterSelect, characters);
        /*
        // Example: Send credentials to server
        //const url = "https://your-login-server.com/api/login"; // Replace with your actual endpoint
        const url = "0.0.0.0"; // Replace with your actual endpoint
        const payload = {
            username: this._username,
            password: this._password
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                // Handle server response
                if (data.success) {
                    // Login successful, proceed to next scene
                    SceneManager.goto(Scene_Login, {});
                } else {
                    // Show error (you can use setError on the password window)
                    this._passwordWindow.setError("Login failed: " + (data.message || "Invalid credentials"));
                    this._passwordWindow.activate();
                }
            })
            .catch(error => {
                // Network or server error
                this._passwordWindow.setError("Network error. Please try again.");
                this._passwordWindow.activate();
                console.error(error);
            });*/
    });
};


Scene_Login.prototype.onLoginOk = function () {
    /*if (this._usernameWindow.isValid()) {
        SceneManager.goto(Scene_Title); // Proceed to title or next scene
    } else {
        this._usernameWindow.activate();
        this._usernameWindow.setError('Invalid credentials!');
    }*/
};
