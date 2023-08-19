import {
    app,
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut,
    getDocs,
    collection
} from './firebaseConfig.js'

var checkifcurrentisloggedinornot = document.querySelectorAll('.checkifcurrentisloggedinornot');

onAuthStateChanged(auth, async (user) => {
    console.log("user logged in hai");
    if (user) {
        console.log("Login hai");
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
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
        // location.href = './index.html'
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

    var num = document.querySelector(".wanttopost");
    if (num) {
        num.addEventListener('click', () => {
            location.href = './yourprofile.html';
        });
    }
};


async function getuserdata() {

    var usergmailhd = document.querySelector('.usergmailhd')
    var usernamehdofpost = document.querySelector('.usernamehdofpost')
    var allfromhd = document.querySelector('.allfromhd')
    var postareahd = document.querySelector('.postareahd')
    console.log(postareahd);

    const docRef = doc(db, "users", localStorage.getItem('seeprofileofthis'));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data().signupFirstName);
        usergmailhd.innerHTML = docSnap.data().signupFirstName + " " + docSnap.data().signupLastName;
        usernamehdofpost.innerHTML = docSnap.data().signupEmail;
        allfromhd.innerHTML = `All From ${docSnap.data().signupEmail}`

        console.log(docSnap.data());
        const querySnapshot = await getDocs(collection(db, "blogpost"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (docSnap.id == doc.data().authur) {

                
                postareahd.innerHTML += `
                <div class="postdivdashbord postdivpostuser my-3 px-5 pt-5 pb-5  rounded shadow-sm d-flex flex-column">
                <div class="postpersondiv d-flex">
                <img width="60px" height="60px" class="rounded-3 imageofpost me-3" src="https://avatars.githubusercontent.com/u/121414309?v=4" alt="">
                <div>
                <h3>${doc.data().textheading}</h3>
                <p>${docSnap.data().time} - ${docSnap.data().signupFirstName + " " + docSnap.data().signupLastName}</p>
                </div>
                </div>
                <div class="maincontentofpost">
                ${doc.data().publishBook}
                </div>
                </div>`
            }
            
        })
        
        } else {
            console.log("No such document!");
        }
    // const querySnapshot = await getDocs(collection(db, "blogpost"));
    // querySnapshot.forEach((doc) => {
        // // console.log(`${doc.id} => ${doc.data()}`);


    // });

}
getuserdata();