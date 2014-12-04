/// <reference path="//Microsoft.WinJS.2.0/js/ui.js" /> 
/// <reference path="//Microsoft.WinJS.2.0/js/base.js" />

(function () {

    var robot = WinJS.Class.define(function (name, containerElement) {
        // Constructor
        this.name = name;
        this.typeName = "Generic Robot";
        this._containerElement = containerElement;
        this.render();
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
            this.status = "on";
            this.render();
            this.dispatchEvent("turnedOn", { name: this.name });
        },
        turnOff: function () {
            this.isOn = false;
            this.status = "off";
            this.render();
            this.dispatchEvent("turnedOff", { name: this.name });
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
        render: function () {
            this._containerElement.innerHTML = this.toHTML();
        }

    }, {
        // Static members
    });

    WinJS.Class.mix(robot, WinJS.Utilities.eventMixin);
    WinJS.Class.mix(robot, WinJS.Utilities.createEventProperties("turnedOn", "turnedOff"));

    var turningMixin = {
        startRotating: function () {
            this.rotationAngle = 0;
            var robot = this;
            setInterval(function () {
                robot.rotationAngle += 10;
                robot._containerElement.style.transform = "rotate(" + robot.rotationAngle + "deg)";
                robot._containerElement.style.transformOrigin = "75px 75px";
            }, 50);
        },
    };

    var movingMixin = {
        startMoving: function () {
            this.rotationAngle = 0;
            var robot = this;
            var movingForward = true;
            robot.marginTop = 0;
            robot.marginLeft = 0;
            setInterval(function () {
                if (movingForward) {
                    robot.marginLeft += 5;
                }
                else {
                    robot.marginLeft -= 5;
                }
                if (robot.marginLeft > 400) {
                    movingForward = false;
                }
                else if (robot.marginLeft < 0) {
                    movingForward = true;
                }
                robot._containerElement.style.marginLeft = robot.marginLeft + "px";
            }, 50);
        },
    };

    var turningRobot = WinJS.Class.derive(robot, function (name, containerElement) {
        // Constructor
        robot.call(this, name, containerElement);
        this.typeName = "Turning robot";
        this.render();
    }, {
        // Instance members
    });

    var turningMovingRobot = WinJS.Class.derive(robot, function (name, containerElement) {
        // Constructor
        robot.call(this, name, containerElement);
        this.typeName = "Turning & moving robot";
        this.render();
    }, {
        // Instance members
    });

    WinJS.Class.mix(turningRobot, turningMixin);
    WinJS.Class.mix(turningMovingRobot, turningMixin, movingMixin);


    WinJS.Namespace.define("Robotics", {
        TurningRobot: turningRobot,
        TurningMovingRobot: turningMovingRobot,
    });


})();