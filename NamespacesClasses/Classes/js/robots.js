/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" /> 
/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />

(function () {

    var Robot = WinJS.Class.define(function (name) {
        // Constructor
        this.name = name;
        this.typeName = Robot.TypeName;
    }, {
        // Instance members
        status: "idle",
        _isOn: false,
        isOn: {
            get: function () {
                return this._isOn;
            },
            set: function (value) {
                this._isOn = value;
            },
        },
        turnOn: function () {
            this.isOn = true;
        },
        turnOff: function () {
            this.isOn = false;
            this.status = "off";
        },
        toHTML: function () {
            var html = '';
            html = '<div class="robot">'
                    + '<div class="content">'
                        + '<div class="name">' + this.name + '</div>'
                        + '<div class="typeName">' + this.typeName + '</div>'
                    + '</div>'
                    + '<div class="status">' + this.status + '</div>';
            if (this.isOn) {
                html += ' <div class="on"></div>';
            }
            else {
                html += ' <div class="off"></div>';
            }
            html += '</div>';
            return html;
        },

    }, {
        // Static members
        TypeName: "Generic Robot"
    });

    var dogRobot = WinJS.Class.derive(Robot, function (name) {
        // Constructor
        Robot.call(this, name);
        this.typeName = dogRobot.TypeName;
    }, {
        // Instance members
        bark: function () {
            this.status = "Bark! Bark! Bark!";
        },

        turnOn: function () {
            Robot.prototype.turnOn.call(this);
            this.bark();
        },
    }, {
        // Static members
        TypeName: "Dog Robot"
    });


    var cleaningRobot = WinJS.Class.derive(Robot, function (name) {
        // Constructor
        Robot.call(this, name);
        this.typeName = cleaningRobot.TypeName;
    }, {
        // Instance members
        clean: function () {
            this.status = "cleaning";
        }
    }, {
        // Static members
        TypeName: "Cleaning Robot"
    });

    WinJS.Namespace.define("Robotics", {
        DogRobot: dogRobot,
        CleaningRobot: cleaningRobot
    });


})();