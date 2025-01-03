// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdlXlKIofoX2L_U_hvAVs3MW_arzb099o",
    authDomain: "jcrc-54aa0.firebaseapp.com",
    databaseURL: "https://jcrc-54aa0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jcrc-54aa0",
    storageBucket: "jcrc-54aa0.firebasestorage.app",
    messagingSenderId: "295890449842",
    appId: "1:295890449842:web:f137afcaa6a73e19e760ab"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const commandsRef = database.ref('commands');

// Helper to send commands to Firebase
function sendCommand(address, value) {
    commandsRef.set({ address, value });
}

// Directional buttons
document.getElementById("move-up").addEventListener("mousedown", () => {
    const speed = parseInt(document.getElementById("speed-slider").value);
    sendCommand("/OBSBOT/WebCam/General/SetGimbalUp", speed);
});
document.getElementById("move-up").addEventListener("mouseup", () => sendCommand("/OBSBOT/WebCam/General/SetGimbalUp", 0));

document.getElementById("move-down").addEventListener("mousedown", () => {
    const speed = parseInt(document.getElementById("speed-slider").value);
    sendCommand("/OBSBOT/WebCam/General/SetGimbalDown", speed);
});
document.getElementById("move-down").addEventListener("mouseup", () => sendCommand("/OBSBOT/WebCam/General/SetGimbalDown", 0));

document.getElementById("move-left").addEventListener("mousedown", () => {
    const speed = parseInt(document.getElementById("speed-slider").value);
    sendCommand("/OBSBOT/WebCam/General/SetGimbalLeft", speed);
});
document.getElementById("move-left").addEventListener("mouseup", () => sendCommand("/OBSBOT/WebCam/General/SetGimbalLeft", 0));

document.getElementById("move-right").addEventListener("mousedown", () => {
    const speed = parseInt(document.getElementById("speed-slider").value);
    sendCommand("/OBSBOT/WebCam/General/SetGimbalRight", speed);
});
document.getElementById("move-right").addEventListener("mouseup", () => sendCommand("/OBSBOT/WebCam/General/SetGimbalRight", 0));

// Zoom controls
document.getElementById("zoom-slider").addEventListener("input", () => {
    const zoomValue = parseInt(document.getElementById("zoom-slider").value);
    sendCommand("/OBSBOT/WebCam/General/SetZoom", zoomValue);
});

document.getElementById("zoom-max").addEventListener("click", () => {
    document.getElementById("zoom-slider").value = 100;
    sendCommand("/OBSBOT/WebCam/General/SetZoomMax", 100);
});

document.getElementById("zoom-min").addEventListener("click", () => {
    document.getElementById("zoom-slider").value = 0;
    sendCommand("/OBSBOT/WebCam/General/SetZoomMin", 0);
});

// Focus mode toggle
let isAutoFocus = true;
document.getElementById("toggle-focus").addEventListener("click", () => {
    isAutoFocus = !isAutoFocus;
    document.getElementById("toggle-focus").innerText = isAutoFocus ? "Switch to Manual Focus" : "Switch to Auto Focus";
    document.getElementById("manual-focus-control").style.display = isAutoFocus ? "none" : "block";
    sendCommand("/OBSBOT/WebCam/General/SetAutoFocus", isAutoFocus ? 1 : 0);
});

// Manual focus slider
document.getElementById("focus-slider").addEventListener("input", () => {
    const focusValue = parseInt(document.getElementById("focus-slider").value);
    sendCommand("/OBSBOT/WebCam/General/SetManualFocus", focusValue);
});

// New functionality to wake up the camera
document.getElementById("wake-up-camera").addEventListener("click", () => {
    // Send a dummy value to force Firebase to register the update (even if the value doesn't change)
    sendCommand("/OBSBOT/WebCam/General/WakeSleep", 0);  // Temporarily set to 0 (Sleep)
    
    // Quickly send the actual wake-up command (1)
    setTimeout(() => {
        sendCommand("/OBSBOT/WebCam/General/WakeSleep", 1);  // Wake command
    }, 100);  // Short delay to ensure Firebase registers the change
});
