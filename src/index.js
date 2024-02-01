let deferredPrompt;

// Check if the browser supports service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((registration) => {
      console.log("SW Registered");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration Failed");
      console.log(error);
    });

  // Check if the app is already installed
  window.addEventListener("appinstalled", () => {
    console.log("App installed");
    hideInstallButton();
  });

  // Check if the beforeinstallprompt event occurs
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show install button only if the app is not installed
    if (!isAppInstalled()) {
      showInstallButton();
    }
  });
}

function isAppInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  );
}

function showInstallButton() {
  const installButton = document.getElementById("installButton");
  const acerAppDiv = document.querySelector(".acer-app");

  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    // Show the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
        hideInstallButton();
      } else {
        console.log("User dismissed the A2HS prompt");
      }

      // Clear the deferredPrompt variable
      deferredPrompt = null;
    });
  });

  if (isAppInstalled()) {
    hideInstallButton();
    acerAppDiv.style.display = "none";
  }
}

function hideInstallButton() {
  const installButton = document.getElementById("installButton");
  const acerAppDiv = document.querySelector(".acer-app");

  installButton.style.display = "none";
  acerAppDiv.style.display = "none";
}
