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
    }  from './firebaseConfig.js'

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...
    } else {
        location.href = './index.html'
    }
  });