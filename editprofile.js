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
    getDownloadURL
} from './firebaseConfig.js';

document.addEventListener('DOMContentLoaded', () => {
    let imgsrc;
    let useruid;
    const checkifcurrentisloggedinornot = document.querySelectorAll('.checkifcurrentisloggedinornot');
    const profileImage = document.querySelector('.imgofprofile');

    onAuthStateChanged(auth, async (user) => {
        console.log("user logged in hai");
        if (user) {
            console.log("Login hai");
            const uid = user.uid;
            useruid = uid;
            console.log(checkifcurrentisloggedinornot[0]);

            checkifcurrentisloggedinornot[0].innerHTML = '';
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                checkifcurrentisloggedinornot[0].innerHTML = `<span class="logoutbtnrouteragainnagain">Logout <span class='ms-3'>${docSnap.data().signupFirstName} ${docSnap.data().signupLastName}</span></span>`;
                fooone();
            } else {
                console.log("No such document!");
            }

            // Update profile image source based on imgsrc
            if (docSnap.data().userprofile) {
                profileImage.src = docSnap.data().userprofile;
            } else {
                profileImage.src = "./assests/avatarr.webp";
            }
        } else {
            location.href = './loginpage.html';
            checkifcurrentisloggedinornot[0].innerHTML = '';
            checkifcurrentisloggedinornot[0].innerHTML = '<span class="loginrouteragainnagain">Login</span>';
            fooone();
        }
    });

    const fooone = () => {
        // ... (Your existing logout and login event listeners)
    };

    const updateprofilefirstname = document.querySelector('#updateprofilefirstname');
    const updateprofilelastname = document.querySelector('#updateprofilelastname');
    const imgofprofile = document.querySelector('.imgofprofile'); // Changed the selector to class
    const updatepassbtn = document.querySelector('#updatepassbtntwo');
    const updateimagebtn = document.querySelector('#updateimagebtn');

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;

            // Attach event listener to update button
            updatepassbtn.addEventListener('click', async () => {
                const docRef = doc(db, "users", useruid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { signupEmail, signuppassword } = docSnap.data();
                    const updatedData = {
                        signupEmail,
                        signupFirstName: updateprofilefirstname.value,
                        signupLastName: updateprofilelastname.value,
                        signuppassword
                    };

                    if (imgsrc) {
                        updatedData.userprofile = imgsrc;
                    }

                    try {
                        await updateDoc(docRef, updatedData);
                        console.log("Profile updated successfully.");
                        location.href = './index.html'
                    } catch (error) {
                        console.error("Error updating profile:", error);
                    }
                } else {
                    console.log("No such document!");
                }
            });

            // Event listener for image upload
            updateimagebtn.addEventListener('change', async (event) => {
                const imgofprofile2 = document.querySelector('.updatepassbtn')
                if (!imgofprofile2) {
                    console.log("No image selected.");
                    return;
                }

                console.log(imgofprofile2.files[0]);
                const storageRef = ref(storage, `image/${imgofprofile2.files[0].name}`);
                const uploadTask = uploadBytesResumable(storageRef, imgofprofile2.files[0]);

                uploadTask.on('state_changed',
                    // ... (Your existing state_changed event listener)
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(storageRef);
                            imgsrc = downloadURL;
                            console.log("Image uploaded successfully:", imgsrc);

                            // Update profile image src after uploading
                            profileImage.src = imgsrc;
                        } catch (error) {
                            console.error("Error getting download URL:", error);
                        }
                    }
                );
            });

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                updateprofilefirstname.value = docSnap.data().signupFirstName;
                updateprofilelastname.value = docSnap.data().signupLastName;
                imgofprofile.src = docSnap.data().userprofile || './assests/avatarr.webp'; // Changed the default source
            } else {
                console.log("No such document!");
            }
        } else {
            // Handle user not logged in
        }
    });

    // ... (Rest of your existing code)
});
