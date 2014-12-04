// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            // TurningRobot
            var turningRobot = new Robotics.TurningRobot("Spinner", turningRobotContainer);

            turningRobotTurnOnButton.addEventListener("click", function () {
                turningRobot.turnOn();
            });

            turningRobotTurnOffButton.addEventListener("click", function () {
                turningRobot.turnOff();
            });

            turningRobotRotateButton.addEventListener("click", function () {
                turningRobot.startRotating();
            });

            // TurningMovingRobot
            var turningMovingRobot = new Robotics.TurningMovingRobot("Runner", turningMovingRobotContainer);
            //robotContainer.innerHTML = robot.toHTML();

            turningMovingRobotTurnOnButton.addEventListener("click", function () {
                turningMovingRobot.turnOn();
            });

            turningMovingRobotTurnOffButton.addEventListener("click", function () {
                turningMovingRobot.turnOff();
            });

            turningMovingRobotRotateButton.addEventListener("click", function () {
                turningMovingRobot.startRotating();
            });

            turningMovingRobotMoveButton.addEventListener("click", function () {
                turningMovingRobot.startMoving();
            });

            // Subscribe to the events of the robots
            turningRobot.addEventListener("turnedOn", function (event) {
                listener1Message.innerText = event.detail.name + " has been turned on";
                event.stopImmediatePropagation();
            });

            turningRobot.addEventListener("turnedOn", function (event) {
                listener2Message.innerText = event.detail.name + " has been turned on";
            });

            turningRobot.addEventListener("turnedOff", function (event) {
                listener1Message.innerText = event.detail.name + " has been turned off";
            });

            turningRobot.addEventListener("turnedOff", function (event) {
                listener2Message.innerText = event.detail.name + " has been turned off";
            });

            turningMovingRobot.onturnedOn = function (event) {
                listener1Message.innerText = event.detail.name + " has been turned on";
            }

            turningMovingRobot.onturnedOff = function (event) {
                listener1Message.innerText = event.detail.name + " has been turned off";
            }
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
