const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore();

//const firebase = require('firebase');
//admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.addUserMessages = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event =>{
        const messageKey = event.data.key;
        const messageValue =  event.data.val();

        admin.database().ref(`user-messages/${messageValue.userFormId}/${messageValue.userToId}`)
                .child(messageKey).set(1);
        admin.database().ref(`user-messages/${messageValue.userToId}/${messageValue.userFromId}`)
                .child(messageKey).set(1);        
    })

// Reference to the Firebase RealTime database key


//   ////////////////////////////
//   //Cloud Function to check for real-time database updates
// ///////////////////////
// exports.onUserStatusChanged = functions.database
//   .ref('/status/{userId}') // Reference to the Firebase RealTime database key
//   .onUpdate(event => {
//     const usersRef = firestore.collection('/profiles'); // Create a reference to the Firestore Collection
  
//     return event.data.ref.once('value')
//       .then(statusSnapshot => snapShot.val()) // Get the latest value from the Firebase Realtime database
//       .then(status => {
//         // check if the value is 'offline'
//         if (status === 'offline') {
//           // Set the Firestore's document's online value to false
//           usersRef
//             .doc(event.params.userId)
//             .set({
//               online: false
//             }, { merge: true });
//             return;
//         }
//         else{
//           throw new Error("Profile doesn't exist");
//         }
//       })
//   });

// ///////////////////////////////////////////////////////////
// /////////////////Set Online Status in both Firestore and the Old Real Time Database
// const firestoreDb = firebase.firestore();
// const oldRealTimeDb = firebase.database();

// const usersRef = firestoreDb.collection('/profiles'); // Get a reference to the Users collection;
// const onlineRef = oldRealTimeDb.ref('.info/connected'); // Get a reference to the list of connections

// onlineRef.on('value', snapshot => {
//   // Set the Firestore User's online status to true
//   usersRef
//     .doc(userId)
//     .set({
//       online: true,
//     }, { merge: true});  
  
//   // Let's also create a key in our real-time database
//   // The value is set to 'online'
//   oldRealTimeDb.ref(`/status/${userId}`).set('online');
// });

// //////////////////////////////////////////////////////////////
// ////////Setting up the onDisconnect Hook




// onlineRef.on('value', snapshot => {
//   oldRealTimeDb
//     .ref(`/status/${userId}`)
//     .onDisconnect() // Set up the disconnect hook
//     .set('offline') // The value to be set for this key when the client disconnects
//     .then(() => {
//         // Set the Firestore User's online status to true
//         usersRef
//           .doc(userId)
//           .set({
//             online: true,
//           }, { merge: true});  

//         // Let's also create a key in our real-time database
//         // The value is set to 'online'
//         oldRealTimeDb.ref(`/status/${userId}`).set('online');
//         return ;
//         //throw new Error("Profile doesn't exist");
//     }).catch(e =>{
//       console.log(e)
//     });
    
  
// });


// /////////////////////////////////
// ////Marking a user as online
// const usersRef1 = db.collection('/profiles'); // Get a reference to the profiles collection;

// // Set the specific user's online status to true
// usersRef1
//   .doc(userId)
//   .set({
//     online: true,
//   }, {
//     merge: true
//   });
