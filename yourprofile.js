import {
    auth,
    db,
    doc,
    serverTimestamp,
    collection,
    getDocs,
    getDoc,
    addDoc,
    onAuthStateChanged,
    signOut
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
                }).catch((error) => {
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

var publishBook = document.querySelector('#publishBook');
var textheading = document.querySelector('#textheading');
var textdata = document.querySelector('#textdata');



publishBook.addEventListener('click', async () => {
    console.log("Mein chal gya");
    if (textheading.value !== '' || textdata.value !== '') {
        onAuthStateChanged(auth, async (user) => {
            console.log("user logged in hai");
            if (user) {
                console.log(user.uid);
                try {
                    const docRef = await addDoc(collection(db, "blogpost"), {
                        publishBook: publishBook.value,
                        textheading: textheading.value,
                        authur: user.uid,
                        timestamp: serverTimestamp(),
                        time: new Date()
                    });
                    console.log("Document written with ID: ", docRef.id);
                    getdatafromuser();
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                location.href = './loginpage.html'
            }
        });
    }
})

var postdivhd = document.querySelector('.postdivhd');

async function getdatafromuser() {
    onAuthStateChanged(auth, async(user) => {
        if (user) {
            const uid = user.uid;
            const querySnapshot = await getDocs(collection(db, "blogpost"));
            querySnapshot.forEach((doc) => {
                if (doc.data().authur == uid) {
                    postdivhd.innerHTML += `<div class="postdivdashbord my-3 px-5 pt-5 pb-1  rounded shadow-sm d-flex flex-column">
                    <div class="postpersondiv d-flex">
                        <img width="60px" height="60px" class="rounded-3 imageofpost me-3" src="https://avatars.githubusercontent.com/u/121414309?v=4" alt="">
                        <div>
                            <h3>${doc.data().textheading}</h3>
                            <p>${doc.data().date} User name will come here</p>
                        </div>
                    </div>
                    <div class="maincontentofpost">
                        ${doc.data().textheading}
                    </div>
                    <div class="editdeletarea d-flex mt-5">
                        <p>Delete</p>
                        <p class="ms-4">Edit</p>
                    </div>
                </div>`
                }
            });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

getdatafromuser()