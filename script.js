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

// Import Firebase SDK
import firebase from "firebase/app";
import "firebase/database";

firebase.initializeApp(firebaseConfig);

// Reference to Firebase Realtime Database
const db = firebase.database();

// Function to update command in Firebase
function updateCommand(address, value) {
  const commandRef = db.ref('/commands');
  commandRef.set({
    address: address,
    value: value
  })
  .then(() => {
    console.log('Command updated successfully!');
  })
  .catch((error) => {
    console.error('Error updating command:', error);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get values from the form
  const addressInput = document.getElementById("addressInput").value;
  const valueInput = parseInt(document.getElementById("valueInput").value, 10);

  // Validate inputs (optional, but recommended)
  if (addressInput.trim() === "" || isNaN(valueInput)) {
    alert("Please enter a valid address and value.");
    return;
  }

  // Update the command in Firebase
  updateCommand(addressInput, valueInput);
}

// Event listener for form submission
document.getElementById("commandForm").addEventListener("submit", handleFormSubmit);

// Optional: You can also listen for changes from Firebase (if you want to display the last command)
const commandRef = db.ref('/commands');
commandRef.on('value', (snapshot) => {
  const command = snapshot.val();
  if (command) {
    console.log('Current command:', command);
    // Optionally display the current command in the GUI
    document.getElementById("currentCommand").textContent = `Last Command: ${command.address} - Value: ${command.value}`;
  }
});
