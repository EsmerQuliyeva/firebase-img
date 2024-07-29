import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBmWxLLdfP0h7ir6XEcn7DYsZE4pt-ZU18",
  authDomain: "chat-dbccd.firebaseapp.com",
  databaseURL: "https://chat-dbccd-default-rtdb.firebaseio.com",
  projectId: "chat-dbccd",
  storageBucket: "chat-dbccd.appspot.com",
  messagingSenderId: "159348335472",
  appId: "1:159348335472:web:46f0f5dbdf271de354a5b5",
  measurementId: "G-M7Z0J9XSPM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const fileInput = document.querySelector("#fileInput");
const btn = document.querySelector("#send-btn");
const status = document.querySelector("#status");

fileInput.addEventListener("change", (e) => {
  if (fileInput.files.length > 0) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
});

btn.addEventListener("click", () => {
  const file = fileInput.files[0];
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on("state_changed", (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    status.textContent = "Upload is" + progress + "% done";
  },
    (error) => {
      status.textContent = "Upload error" + error.message;
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        status.innerHTML = "upload successfull" + downloadURL;
      });
    });
});
