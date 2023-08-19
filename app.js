import {
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from './firebaseConfig.js'

const signupemail = document.querySelector('#signupemail')
const signuppassword = document.querySelector('#signuppassword')
const signupbtn = document.querySelector('#signupbtn')
const loginemail = document.querySelector('#loginemail')
const loginpassword = document.querySelector('#loginpassword')
const loginbtn = document.querySelector('#loginbtn')
const signupfirstName = document.querySelector('#signupfirstName')
const signuplastName = document.querySelector('#signuplastName')


try {
    signupbtn.addEventListener('click', () => {
        createUserWithEmailAndPassword(auth, signupemail.value, signuppassword.value)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User is sign up Succesfully");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    })

} catch (error) {
    console.log(error);
}

try {
    loginbtn.addEventListener('click', () => {
        signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("User is logged in succesfully");
                location.href = './Dashbord/index.html'
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    })

} catch (error) {
    console.log(error.message);
}


