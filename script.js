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
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Button references
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// OSC Control Function
function sendOSCCommand(address, value) {
    const command = {
        address: address,
        value: value
    };
    // Save to Firebase (or send OSC command via backend)
    const commandRef = database.ref('commands');
    commandRef.set(command);  // Update Firebase with the current command
}

// Handle button press and release
upButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalUp', 20));
upButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalUp', 0));

downButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalDown', 20));
downButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalDown', 0));

leftButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalLeft', 20));
leftButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalLeft', 0));

rightButton.addEventListener('mousedown', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalRight', 20));
rightButton.addEventListener('mouseup', () => sendOSCCommand('/OBSBOT/WebCam/General/SetGimbalRight', 0));
