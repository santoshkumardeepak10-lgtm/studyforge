// ======================================================
// STUDYFORGE FIREBASE AUTHENTICATION
// ======================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {
    apiKey: "AIzaSyBDRJgCd3X-tGxddbJ_XnuvcIb6VoJDE5A",
    authDomain: "studyforge-5049d.firebaseapp.com",
    projectId: "studyforge-5049d",
    storageBucket: "studyforge-5049d.firebasestorage.app",
    messagingSenderId: "817969982200",
    appId: "1:817969982200:web:a95fc8395a1a5089eb690d",
    measurementId: "G-3BSP1C938M"
};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ======================================================
// ELEMENTS
// ======================================================

const authModal =
    document.getElementById("authModal");

const loginBtn =
    document.getElementById("loginBtn");

const authClose =
    document.getElementById("authClose");

const loginView =
    document.getElementById("loginView");

const signupView =
    document.getElementById("signupView");

const showSignup =
    document.getElementById("showSignup");

const showLogin =
    document.getElementById("showLogin");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const loginMessage =
    document.getElementById("loginMessage");

const signupMessage =
    document.getElementById("signupMessage");

const accountMenu =
    document.getElementById("accountMenu");

const accountBtn =
    document.getElementById("accountBtn");

const accountDropdown =
    document.getElementById("accountDropdown");

const accountEmail =
    document.getElementById("accountEmail");

const logoutBtn =
    document.getElementById("logoutBtn");

const forgotPasswordBtn =
    document.getElementById("forgotPasswordBtn");


// ======================================================
// OPEN LOGIN MODAL
// ======================================================

loginBtn.addEventListener("click", () => {

    clearMessages();

    loginView.style.display = "block";
    signupView.style.display = "none";

    authModal.classList.add("show");

});


// ======================================================
// CLOSE MODAL
// ======================================================

authClose.addEventListener("click", () => {

    authModal.classList.remove("show");

});


// Close when clicking outside box

authModal.addEventListener("click", (event) => {

    if (event.target === authModal) {

        authModal.classList.remove("show");

    }

});


// ======================================================
// LOGIN → SIGNUP
// ======================================================

showSignup.addEventListener("click", () => {

    clearMessages();

    loginView.style.display = "none";
    signupView.style.display = "block";

});


// ======================================================
// SIGNUP → LOGIN
// ======================================================

showLogin.addEventListener("click", () => {

    clearMessages();

    signupView.style.display = "none";
    loginView.style.display = "block";

});


// ======================================================
// LOGIN
// ======================================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearMessages();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const submitButton =
        document.getElementById("loginSubmit");

    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        showMessage(
            loginMessage,
            "Login successful! Welcome back. 🎉",
            "success"
        );

        setTimeout(() => {

            authModal.classList.remove("show");

        }, 800);

    }

    catch (error) {

        showMessage(
            loginMessage,
            getFriendlyError(error),
            "error"
        );

    }

    finally {

        submitButton.disabled = false;
        submitButton.textContent = "Login";

    }

});


// ======================================================
// SIGN UP
// ======================================================

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearMessages();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;

    const submitButton =
        document.getElementById("signupSubmit");


    // Check passwords

    if (password !== confirmPassword) {

        showMessage(
            signupMessage,
            "Passwords do not match.",
            "error"
        );

        return;

    }


    if (password.length < 6) {

        showMessage(
            signupMessage,
            "Password must be at least 6 characters.",
            "error"
        );

        return;

    }


    submitButton.disabled = true;
    submitButton.textContent = "Creating account...";


    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        showMessage(
            signupMessage,
            "Account created successfully! 🎉",
            "success"
        );

        signupForm.reset();

        setTimeout(() => {

            authModal.classList.remove("show");

        }, 1000);

    }

    catch (error) {

        showMessage(
            signupMessage,
            getFriendlyError(error),
            "error"
        );

    }

    finally {

        submitButton.disabled = false;
        submitButton.textContent = "Create Account";

    }

});


// ======================================================
// FORGOT PASSWORD
// ======================================================

forgotPasswordBtn.addEventListener("click", async () => {

    clearMessages();

    const email =
        document.getElementById("loginEmail").value.trim();


    if (!email) {

        showMessage(
            loginMessage,
            "Enter your email address first.",
            "error"
        );

        return;

    }


    try {

        await sendPasswordResetEmail(
            auth,
            email
        );

        showMessage(
            loginMessage,
            "Password reset email sent. Check your inbox. 📧",
            "success"
        );

    }

    catch (error) {

        showMessage(
            loginMessage,
            getFriendlyError(error),
            "error"
        );

    }

});


// ======================================================
// ACCOUNT DROPDOWN
// ======================================================

accountBtn.addEventListener("click", () => {

    accountDropdown.classList.toggle("show");

});


// Close dropdown if clicking elsewhere

document.addEventListener("click", (event) => {

    if (
        !accountMenu.contains(event.target)
    ) {

        accountDropdown.classList.remove("show");

    }

});


// ======================================================
// LOGOUT
// ======================================================

logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        accountDropdown.classList.remove("show");

    }

    catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

});


// ======================================================
// AUTH STATE
// ======================================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        // User logged in

        loginBtn.style.display = "none";

        accountMenu.style.display = "block";

        accountEmail.textContent =
            user.email || "Signed-in user";

    }

    else {

        // User logged out

        loginBtn.style.display = "block";

        accountMenu.style.display = "none";

        accountDropdown.classList.remove("show");

        accountEmail.textContent = "";

    }

});


// ======================================================
// MESSAGE FUNCTIONS
// ======================================================

function showMessage(
    element,
    message,
    type
) {

    element.textContent = message;

    element.className =
        "auth-message show " + type;

}


function clearMessages() {

    loginMessage.textContent = "";
    loginMessage.className = "auth-message";

    signupMessage.textContent = "";
    signupMessage.className = "auth-message";

}


// ======================================================
// FIREBASE ERROR TRANSLATOR
// ======================================================

function getFriendlyError(error) {

    const code = error?.code || "";

    switch (code) {

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/email-already-in-use":
            return "This email is already registered. Try logging in.";

        case "auth/weak-password":
            return "Password is too weak. Use at least 6 characters.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/user-not-found":
            return "No account was found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Check your internet connection.";

        default:
            return error?.message ||
                "Something went wrong. Please try again.";

    }

  }
