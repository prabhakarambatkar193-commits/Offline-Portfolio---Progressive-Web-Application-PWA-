// Register Service Worker

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("service-worker.js")

            .then(function (registration) {

                console.log("Service Worker Registered Successfully!");

                console.log("Scope:", registration.scope);

            })

            .catch(function (error) {

                console.log("Service Worker Registration Failed:", error);

            });

    });

}


// Check Internet Connection

window.addEventListener("online", function () {

    console.log("You are back online!");

});

window.addEventListener("offline", function () {

    console.log("You are now offline!");

});