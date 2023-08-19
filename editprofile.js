import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut,
    updateDoc
} from './firebaseConfig.js'

var checkifcurrentisloggedinornot = document.querySelectorAll('.checkifcurrentisloggedinornot');

onAuthStateChanged(auth, async (user) => {
    console.log("user logged in hai");
    if (user) {
        console.log("Login hai");
        const uid = user.uid;
        console.log(checkifcurrentisloggedinornot[0]);

        checkifcurrentisloggedinornot[0].innerHTML = ''
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            checkifcurrentisloggedinornot[0].innerHTML = `<span class="logoutbtnrouteragainnagain">Logout <span class='ms-3'>${docSnap.data().signupFirstName} ${docSnap.data().signupLastName}</span></span>`
            fooone()
        } else {
            console.log("No such document!");
        }
        // ...
    } else {
        location.href = './loginpage.html'
        checkifcurrentisloggedinornot[0].innerHTML = ''
        checkifcurrentisloggedinornot[0].innerHTML = '<span class="loginrouteragainnagain">Login</span>'
        fooone()
    }
});

const fooone = () => {
    var logout = document.querySelector('.logoutbtnrouteragainnagain');
    var login = document.querySelector('.loginrouteragainnagain');

    // Rest of your code for attaching event listeners
    if (logout) {
        logout.addEventListener('click', () => {
            var one = confirm("Are you sure you want to logout")
            console.log("Logout Hogya");
            if (one == true) {
                signOut(auth).then(() => {
                    // Sign-out successful.
                }).catch((error) => {
                    // An error happened.
                });
            }
        });
    }

    if (login) {
        login.addEventListener('click', () => {
            location.href = './loginpage.html';
        });
    }
};


var updateprofilefirstname = document.querySelector('#updateprofilefirstname')
var updateprofilelastname = document.querySelector('#updateprofilelastname')
var updatepassbtn = document.querySelector('#updatepassbtntwo')
console.log(updatepassbtn);

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const washingtonRef = doc(db, "users", uid);
        
        updatepassbtn.addEventListener('click', async()=>{
            await updateDoc(washingtonRef, {
                signupFirstName: updateprofilefirstname.value,
                signupLastName :updateprofilelastname.value
            });
        })
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            updateprofilefirstname.value = docSnap.data().signupFirstName;
            updateprofilelastname.value = docSnap.data().signupLastName;
        } else {
            console.log("No such document!");
        }
    } else {
        // User is signed out
        // ...
    }
});