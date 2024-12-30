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

const zoomSlider = document.getElementById("zoomSlider");
const zoomValue = document.getElementById("zoom-value");

// Store current speed and zoom value
let currentSpeed = speedSlider.value;
let currentZoom = zoomSlider.value;

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

// Update the current speed when the slider is changed
speedSlider.addEventListener('input', () => {
    currentSpeed = speedSlider.value;
    speedValue.textContent = currentSpeed;
    // Update Firebase with the speed (if required)
    sendOSCCommand('/OBSBOT/WebCam/General/SetSpeed', currentSpeed);
});

// Update the current zoom when the slider is changed
zoomSlider.addEventListener('input', () => {
    currentZoom = zoomSlider.value;
    zoomValue.textContent = currentZoom;
    // Send the zoom value via OSC command
    sendOSCCommand('/OBSBOT/WebCam/General/SetZoom', currentZoom);
});

// Handle button press and release for Gimbal movement
upButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalUp', currentSpeed));
upButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalUp', 0));

downButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalDown', currentSpeed));
downButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalDown', 0));

leftButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalLeft', currentSpeed));
leftButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalLeft', 0));

rightButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalRight', currentSpeed));
rightButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalRight', 0));

// Zoom buttons (Zoom Max/Min)
zoomMaxButton.addEventListener('click', () => {
    // Set zoom value to 100
    zoomSlider.value = 100;
    zoomValue.textContent = 100;
    // Send OSC command for Zoom Max
    sendOSCCommand('/OBSBOT/WebCam/General/SetZoomMax', 0);
});

zoomMinButton.addEventListener('click', () => {
    // Set zoom value to 0
    zoomSlider.value = 0;
    zoomValue.textContent = 0;
    // Send OSC command for Zoom Min
    sendOSCCommand('/OBSBOT/WebCam/General/SetZoomMin', 0);
});
