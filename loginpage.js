import {
    app,
    auth,
    db,
    storage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc,
    setDoc,
    serverTimestamp,
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    limit,
    deleteDoc,
    addDoc,
    updateDoc,
    onAuthStateChanged,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    signOut
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