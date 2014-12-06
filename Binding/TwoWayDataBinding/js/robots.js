/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" /> 
/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />

(function () {

    var robot = WinJS.Class.define(function (name) {
        // Constructor
        this.name = name;
        this.typeName = "Generic Robot";
    }, {
        // Instance members
        _status: "idle",
        status: {
            get: function () {
                return this._status;
            },
            set: function (value) {
                if (this._status !== value) {
                    this._status = value;
                    this.notify("status", value);
                }
            }
        },
        _isOn: false,
        isOn: {
            get: function () {
                return this._isOn;
            },
            set: function (value) {
                this._isOn = value;
                this.notify("isOn", value);
            },
        },
        turnOn: function () {
            this.isOn = true;
            this.status = "on";
            this.notify("status", this.status);
        },
        turnOff: function () {
            this.isOn = false;
            this.status = "off";
            this.notify("status", this.status);
        }
    }, {
        // Static members
    });

    WinJS.Class.mix(robot, WinJS.Binding.observableMixin);

    var robotIsOnToClassNameConverter = WinJS.Binding.converter(function (value) {
        if (value) {
            return "on";
        }
        else {
            return "off";
        }
    });

    WinJS.Namespace.define("Robotics", {
        Robot: robot,
        RobotClassNameConverter: robotIsOnToClassNameConverter
    });


})();