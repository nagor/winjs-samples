// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;


    //Custom two-way binding initializer for declarative two-way binding
    WinJS.Namespace.define("Binding.Mode", {
        twoway: WinJS.Binding.initializer(function (source, sourceProps, target, targetProps) {
            // One-way binding
            WinJS.Binding.defaultBind(source, sourceProps, target, targetProps);
            target.onpropertychange = function () {
                // Two-way binding
                var targetValue = target[targetProps[0]];
                source[sourceProps[0]] = targetValue;
            }
        })
    });

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
            var robot = new Robotics.Robot("Bob");

            // Set up data binding
            WinJS.Binding.processAll(document.body, robot);

            robotTurnOnButton.addEventListener("click", function () {
                robot.turnOn();
            });

            robotTurnOffButton.addEventListener("click", function () {
                robot.turnOff();
            });
            
            //example of two-way binding in code
            textbox1.onpropertychange = function () {
                robot.status = textbox1.value;
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
