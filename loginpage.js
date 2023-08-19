import {
    auth,
    signInWithEmailAndPassword,
} from './firebaseConfig.js'


const loginEmail = document.querySelector('#loginEmail')
const loginpassword = document.querySelector('#loginpassword')
const loginbtnhd = document.querySelector('#loginbtnhd')

loginbtnhd.addEventListener('click', () => {


    signInWithEmailAndPassword(auth, loginEmail.value, loginpassword.value)
        .then((userCredential) => {
            // Signed in
            
            const user = userCredential.user;
            location.href = './index.html'
            // ...
        })
        .catch((error) => {
            alert("Incorrect User email or Password")
        });
})