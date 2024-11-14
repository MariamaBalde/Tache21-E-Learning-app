import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged in:", user);
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
}