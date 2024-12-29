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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Button and control references
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

const zoomMaxButton = document.getElementById("zoomMax");
const zoomMinButton = document.getElementById("zoomMin");

const speedSlider = document.getElementById("speed");
const speedValue = document.getElementById("speed-value");

const zoomInput = document.getElementById("zoom");

// OSC Control Function
function sendOSCCommand(address, value) {
    const command = {
        address: address,
        value: value
    };
    // Save to Firebase (or send OSC command via backend)
    var commandRef = database.ref('commands');
    commandRef.set(command);  // Update Firebase with the current command
}

// Handle button press and release for Gimbal movement
upButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalUp', 20));
upButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalUp', 0));

downButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalDown', 20));
downButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalDown', 0));

leftButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalLeft', 20));
leftButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalLeft', 0));

rightButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalRight', 20));
rightButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalRight', 0));

// Speed control (Slider change)
speedSlider.addEventListener('input', () => {
    speedValue.textContent = speedSlider.value;
    // Send new speed value to Firebase (or backend)
    sendOSCCommand('/OBSBOT/WebCam/General/SetSpeed', speedSlider.value);
});

// Zoom buttons (Zoom Max/Min)
zoomMaxButton.addEventListener('click', () => sendOSCCommand('/OBSBOT/WebCam/General/SetZoomMax', 0));
zoomMinButton.addEventListener('click', () => sendOSCCommand('/OBSBOT/WebCam/General/SetZoomMin', 0));

// Zoom input (0-100)
zoomInput.addEventListener('change', () => {
    let zoomValue = zoomInput.value;
    if (zoomValue < 0) zoomValue = 0;
    if (zoomValue > 100) zoomValue = 100;
    sendOSCCommand('/OBSBOT/WebCam/General/SetZoom', zoomValue);
});
