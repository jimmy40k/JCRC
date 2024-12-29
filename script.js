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
const database = firebase.database();

// Handle form submission
const form = document.getElementById("commandForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const value = parseInt(document.getElementById("value").value, 10);

    // Write command to Firebase
    firebase.database().ref("/commands").set({
        address: address,
        value: value
    }).then(() => {
        document.getElementById("status").innerText = "Command sent successfully!";
    }).catch((error) => {
        document.getElementById("status").innerText = "Error sending command: " + error;
    });
});