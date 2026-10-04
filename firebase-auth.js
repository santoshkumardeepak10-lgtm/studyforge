// ============================================
// STUDYFORGE - FIREBASE AUTH + FIRESTORE
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyBDRJgCd3X-tGxddbJ_XnuvcIb6VoJDE5A",
  authDomain: "studyforge-5049d.firebaseapp.com",
  projectId: "studyforge-5049d",
  storageBucket: "studyforge-5049d.firebasestorage.app",
  messagingSenderId: "817969982200",
  appId: "1:817969982200:web:a95fc8395a1a5089eb690d",
  measurementId: "G-3BSP1C938M"
};


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// ============================================
// GET ELEMENTS
// ============================================

const authModal = document.getElementById("authModal");

const loginBtn = document.getElementById("loginBtn");

const accountMenu = document.getElementById("accountMenu");

const accountBtn = document.getElementById("accountBtn");

const accountDropdown = document.getElementById("accountDropdown");

const accountEmail = document.getElementById("accountEmail");

const logoutBtn = document.getElementById("logoutBtn");

const closeAuth = document.getElementById("closeAuth");

const loginView = document.getElementById("loginView");

const signupView = document.getElementById("signupView");

const showSignup = document.getElementById("showSignup");

const showLogin = document.getElementById("showLogin");

const loginForm = document.getElementById("loginForm");

const signupForm = document.getElementById("signupForm");

const resetPassword = document.getElementById("resetPassword");


// ============================================
// OPEN LOGIN MODAL
// ============================================

if (loginBtn) {

  loginBtn.addEventListener("click", () => {

    if (authModal) {

      authModal.style.display = "flex";

      if (loginView) loginView.style.display = "block";

      if (signupView) signupView.style.display = "none";

    }

  });

}


// ============================================
// CLOSE MODAL
// ============================================

if (closeAuth) {

  closeAuth.addEventListener("click", () => {

    if (authModal) {
      authModal.style.display = "none";
    }

  });

}


// ============================================
// SWITCH TO SIGNUP
// ============================================

if (showSignup) {

  showSignup.addEventListener("click", (event) => {

    event.preventDefault();

    if (loginView) loginView.style.display = "none";

    if (signupView) signupView.style.display = "block";

  });

}


// ============================================
// SWITCH TO LOGIN
// ============================================

if (showLogin) {

  showLogin.addEventListener("click", (event) => {

    event.preventDefault();

    if (signupView) signupView.style.display = "none";

    if (loginView) loginView.style.display = "block";

  });

}


// ============================================
// SIGN UP
// ============================================

if (signupForm) {

  signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const emailInput = document.getElementById("signupEmail");

    const passwordInput = document.getElementById("signupPassword");

    const confirmInput = document.getElementById("signupConfirmPassword");

    if (!emailInput || !passwordInput || !confirmInput) {
      return;
    }

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    const confirmPassword = confirmInput.value;


    // Password confirmation

    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;

    }


    // Password length

    if (password.length < 6) {

      alert("Password must be at least 6 characters.");

      return;

    }


    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );


      const user = userCredential.user;


      // ========================================
      // CREATE FIRESTORE USER PROFILE
      // ========================================

      await setDoc(
        doc(db, "users", user.uid),
        {

          email: user.email,

          points: 0,

          quizzesCompleted: 0,

          studyTime: 0,

          createdAt: serverTimestamp()

        }
      );


      alert("Account created successfully!");

      signupForm.reset();


      if (authModal) {
        authModal.style.display = "none";
      }


    } catch (error) {

      alert(getFirebaseError(error.code));

    }

  });

}


// ============================================
// LOGIN
// ============================================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const emailInput = document.getElementById("loginEmail");

    const passwordInput = document.getElementById("loginPassword");


    if (!emailInput || !passwordInput) {
      return;
    }


    const email = emailInput.value.trim();

    const password = passwordInput.value;


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      alert("Login successful!");


      loginForm.reset();


      if (authModal) {
        authModal.style.display = "none";
      }


    } catch (error) {

      alert(getFirebaseError(error.code));

    }

  });

}


// ============================================
// FORGOT PASSWORD
// ============================================

if (resetPassword) {

  resetPassword.addEventListener("click", async (event) => {

    event.preventDefault();


    const emailInput = document.getElementById("loginEmail");


    if (!emailInput) {
      return;
    }


    const email = emailInput.value.trim();


    if (!email) {

      alert("Please enter your email address first.");

      return;

    }


    try {

      await sendPasswordResetEmail(
        auth,
        email
      );


      alert(
        "Password reset email sent. Check your inbox."
      );


    } catch (error) {

      alert(getFirebaseError(error.code));

    }

  });

}


// ============================================
// ACCOUNT DROPDOWN
// ============================================

if (accountBtn) {

  accountBtn.addEventListener("click", () => {

    if (!accountDropdown) {
      return;
    }


    if (accountDropdown.style.display === "block") {

      accountDropdown.style.display = "none";

    } else {

      accountDropdown.style.display = "block";

    }

  });

}


// ============================================
// LOGOUT
// ============================================

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    try {

      await signOut(auth);

      if (accountDropdown) {
        accountDropdown.style.display = "none";
      }

      alert("Logged out successfully.");

    } catch (error) {

      alert(getFirebaseError(error.code));

    }

  });

}


// ============================================
// AUTH STATE
// ============================================

onAuthStateChanged(auth, (user) => {

  if (user) {

    // USER LOGGED IN

    if (loginBtn) {
      loginBtn.style.display = "none";
    }

    if (accountMenu) {
      accountMenu.style.display = "block";
    }

    if (accountEmail) {
      accountEmail.textContent = user.email;
    }

  } else {

    // USER LOGGED OUT

    if (loginBtn) {
      loginBtn.style.display = "inline-flex";
    }

    if (accountMenu) {
      accountMenu.style.display = "none";
    }

    if (accountDropdown) {
      accountDropdown.style.display = "none";
    }

  }

});


// ============================================
// FIREBASE ERROR MESSAGES
// ============================================

function getFirebaseError(code) {

  switch (code) {

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";

    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return "Something went wrong. Please try again.";

  }

}
