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
    signOut,
    updateDoc,
    deleteDoc
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
            console.log(textheading);
            if (user) {
                console.log(user.uid);
                try {
                    const docRef = await addDoc(collection(db, "blogpost"), {
                        publishBook: textdata.value,
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
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log(user);
            const querySnapshot = await getDocs(collection(db, "blogpost"));
            querySnapshot.forEach(async(doc2) => {
                
                console.log(doc2.data().authur + "post ka banda");
                if (doc2.data().authur === user.uid) {
                    // copycode
                        const docRef = doc(db, "users", doc2.data().authur);
                        const docSnap = await getDoc(docRef);
                        console.log(docSnap.data());
                        postdivhd.innerHTML = '';
                        if (docSnap.exists()) {
                            console.log(doc2.data());
                            postdivhd.innerHTML += `<div class="postdivdashbord my-3 px-5 pt-5 pb-1  rounded shadow-sm d-flex flex-column">
                            <div class="postpersondiv d-flex">
                                <img width="60px" height="60px" class="rounded-3 imageofpost me-3" src=${docSnap.data().userprofile ||"./assests/avatarr.webp"} alt="">
                                <div>
                                    <h3>${doc2.data().textheading}</h3>
                                    <p>${timeAgo(doc2.data().time)} <b>${docSnap.data().signupFirstName} ${docSnap.data().signupLastName}</b></p>
                                </div>
                            </div>
                            <div class="maincontentofpost">
                                ${doc2.data().publishBook}
                            </div>
                            <div class="editdeletarea d-flex mt-5">
                                <p onclick="deletepostfoo('${doc2.id}')">Delete</p>
                                <p onclick="editmodalfoo('${doc2.id}', '${doc2.data().authur}', '${doc2.data().time}', '${doc2.data().timestamp}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="ms-4">Edit</p>
                            </div>
                        </div>`
                        }
                        // purana code
                }
                else{
                    console.log("Me nahi mila");
                }
            });
            // ...
        } else {
        }
    });
}

getdatafromuser()


async function editmodalfoo(para, author, time, timestamp) {
    console.log(para + "it is para kuch bhi");

    var modalbodyedit = document.querySelector('.modalbodyedit')
    var modalheadingedit = document.querySelector('.modalheadingedit');
    var editbtnuid = document.querySelector('.editbtnuid');

    const docRef = doc(db, "blogpost", para);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data());
        modalbodyedit.value = docSnap.data().publishBook;
        modalheadingedit.value = docSnap.data().textheading;
        editbtnuid.setAttribute('onclick', `editinfirestorefoo('${para}', '${author}', '${time}', '${timestamp}')`)
    } else {
        console.log("No such document!");
    }
    console.log(para);
}

async function editinfirestorefoo(uid, author, time, timestamp){
    var one = author
    var second = time
    var third = timestamp
    // console.log(uid, one, second , third);
    var modalbodyedit = document.querySelector('.modalbodyedit')
    var modalheadingedit = document.querySelector('.modalheadingedit');

    console.log(uid);
    const washingtonRef = doc(db, "blogpost", uid);
    await updateDoc(washingtonRef, {
    publishBook: modalbodyedit.value,
    textheading: modalheadingedit.value
    });
  
    location.reload();
}

window.editmodalfoo = editmodalfoo
window.deletepostfoo = deletepostfoo
window.editinfirestorefoo = editinfirestorefoo

async function deletepostfoo(uid){
    var one = confirm("Are you sure you want to delete this post")
    if(one == true){
        await deleteDoc(doc(db, "blogpost", uid));
        location.reload();
    }
}

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
  