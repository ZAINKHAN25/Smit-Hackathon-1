import {
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc
} from './firebaseConfig.js';


var signupFirstName = document.querySelector('#signupFirstName');
var signupLastName = document.querySelector('#signupLastName');
var signupEmail = document.querySelector('#signupEmail');
var signuppassword = document.querySelector('#signuppassword');
var signuprepeatpassword = document.querySelector('#signuprepeatpassword');
var signupbtnhd = document.querySelector('#signupbtnhd');



signupbtnhd.addEventListener("click", () => {
    if (
        signupFirstName.value == '' || signupLastName.value == '' || signupEmail.value == '' || signuppassword.value == '' || signuprepeatpassword.value == '') {
        alert("Please fill this form completely")
    }
    else {
        if (signuppassword.value == signuprepeatpassword.value) {

            createUserWithEmailAndPassword(auth, signupEmail.value, signuppassword.value)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    await setDoc(doc(db, "users", user.uid), {
                        signupFirstName: signupFirstName.value,
                        signupLastName: signupLastName.value,
                        signupEmail: signupEmail.value,
                        signuppassword: signuppassword.value
                    });
                    location.href = './loginpage.html';
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });

        }
        else {
            alert("Your Password and Repeat Password is not corrrectly")
        }
    }
})

