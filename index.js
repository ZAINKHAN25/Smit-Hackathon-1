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

};


var postareahd = document.querySelector('.postareahd')
getdatafromblog();

async function getdatafromblog() {
    const querySnapshot = await getDocs(collection(db, "blogpost"));

    querySnapshot.forEach(async (doc2) => {
        console.log(doc2.data().authur);
        const docRef = doc(db, "users", doc2.data().authur);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            postareahd.innerHTML += `
  <div class="postdivdashbord my-3 px-5 pt-5 pb-1  rounded shadow-sm d-flex flex-column">
      <div class="postpersondiv d-flex">
          <img width="60px" height="60px" class="rounded-3 imageofpost me-3" src="./assests/avatarr.webp" alt="">
          <div>
              <h3>${doc2.data().textheading}</h3>
              <p>${timeAgo(doc2.data().time)} <b>${docSnap.data().signupFirstName} ${docSnap.data().signupLastName}</b></p>
          </div>
      </div>
      <div class="maincontentofpost">
          ${doc2.data().textheading}
      </div>
      <div class="editdeletarea d-flex mt-5">
          <p onclick="getdataisgood('${doc2.data().authur}')" class='onclickpage'>See All from this</p>
      </div>
  </div>`;
        } else {
            console.log("No such document!");
        }
    });
}

function getdataisgood(uid) {
    JSON.stringify(localStorage.setItem("seeprofileofthis", `${uid}`));
    location.href = './postuser.html'
}
window.getdataisgood = getdataisgood;


function timeAgo(timestamp) {
    const currentTime = new Date().getTime();
    const postTime = timestamp.toMillis(); // Assuming `timestamp` is a Firestore Timestamp object
  
    const timeDifference = currentTime - postTime;
  
    const seconds = timeDifference / 1000;
    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds ago`;
    }
  
    const minutes = seconds / 60;
    if (minutes < 60) {
      return `${Math.floor(minutes)} minute${Math.floor(minutes) !== 1 ? 's' : ''} ago`;
    }
  
    const hours = minutes / 60;
    if (hours < 24) {
      return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? 's' : ''} ago`;
    }
  
    const days = hours / 24;
    if (days < 30) {
      return `${Math.floor(days)} day${Math.floor(days) !== 1 ? 's' : ''} ago`;
    }
  
    const months = days / 30;
    if (months < 12) {
      return `${Math.floor(months)} month${Math.floor(months) !== 1 ? 's' : ''} ago`;
    }
  
    const years = months / 12;
    return `${Math.floor(years)} year${Math.floor(years) !== 1 ? 's' : ''} ago`;
  }
  