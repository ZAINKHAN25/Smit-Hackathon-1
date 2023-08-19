import {
    auth,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    signOut,
    updateDoc,
    ref,
    storage,
    uploadBytesResumable,
    getDownloadURL,
    setDoc
} from './firebaseConfig.js'

let imgsrc;
let useruid;
var checkifcurrentisloggedinornot = document.querySelectorAll('.checkifcurrentisloggedinornot');

onAuthStateChanged(auth, async (user) => {
    console.log("user logged in hai");
    if (user) {
        console.log("Login hai");
        const uid = user.uid;
        useruid = uid;
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

        updatepassbtn.addEventListener('click', async () => {
            const docRef = doc(db, "users", useruid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data().signupEmail);
                console.log(docSnap.data().signupFirstName);
                console.log(docSnap.data().signupLastName);
                console.log(docSnap.data().signuppassword);
                console.log(docSnap.data().userprofile);
                
                var {signupEmail: secondname, signuppassword: secondsecondname} = docSnap.data()
                try {
                    console.log(imgsrc || '');
                    // await fooonetwo();
                    // if (imgsrc) {
                    //     await setDoc(doc(db, "users", useruid), {
                    //         signupEmail: secondname,
                    //         signupFirstName: updateprofilefirstname.value,
                    //         signupLastName: updateprofilelastname.value,
                    //         signuppassword: secondsecondname,
                    //         userprofile: imgsrc
                    //     });
                    // } else {
                    //     await setDoc(doc(db, "users", useruid), {
                    //         signupEmail: secondname,
                    //         signupFirstName: updateprofilefirstname.value,
                    //         signupLastName: updateprofilelastname.value,
                    //         signuppassword: secondsecondname
                    //     });
                    // }
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            } else {
                console.log("No such document!");
            }

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

    }
});

// code to upload files on storagea
async function fooonetwo() {

    var imagefile = document.querySelector('#updateimagebtn')
    const storageRef = ref(storage, `image/${imagefile.files[0].name}`);
    console.log(imagefile.files[0].name);

    const uploadTask = uploadBytesResumable(storageRef, imagefile.files[0]);

    uploadTask.on('state_changed',
        (snapshot) => {

            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                imgsrc = downloadURL;
            });
        }
    );
}
