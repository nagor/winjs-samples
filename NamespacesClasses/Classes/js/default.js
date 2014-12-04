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

            // Robot
            //var robot = new Robotics.Robot("Robot 1");
            //robotContainer.innerHTML = robot.toHTML();

            //turnOnButton.addEventListener("click", function () {
            //    robot.turnOn();
            //    robotContainer.innerHTML = robot.toHTML();
            //});

            //turnOffButton.addEventListener("click", function () {
            //    robot.turnOff();
            //    robotContainer.innerHTML = robot.toHTML();
            //});

            // DogRobot
            var dogRobot = new Robotics.DogRobot("Rex");
            dogRobotContainer.innerHTML = dogRobot.toHTML();

            dogRobotTurnOnButton.onclick = function () {
                dogRobot.turnOn();
                dogRobotContainer.innerHTML = dogRobot.toHTML();
            };

            dogRobotTurnOffButton.onclick = function () {
                dogRobot.turnOff();
                dogRobotContainer.innerHTML = dogRobot.toHTML();
            };

            dogRobotBarkButton.onclick = function () {
                dogRobot.bark();
                dogRobotContainer.innerHTML = dogRobot.toHTML();
            };

            // CleaningRobot
            var cleaningRobot = new Robotics.CleaningRobot("Rosey");
            cleaningRobotContainer.innerHTML = cleaningRobot.toHTML();

            cleaningRobotTurnOnButton.onclick = function () {
                cleaningRobot.turnOn();
                cleaningRobotContainer.innerHTML = cleaningRobot.toHTML();
            };

            cleaningRobotTurnOffButton.onclick = function () {
                cleaningRobot.turnOff();
                cleaningRobotContainer.innerHTML = cleaningRobot.toHTML();
            };

            cleaningRobotCleanButton.onclick = function () {
                cleaningRobot.clean();
                cleaningRobotContainer.innerHTML = cleaningRobot.toHTML();
            };
            
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
