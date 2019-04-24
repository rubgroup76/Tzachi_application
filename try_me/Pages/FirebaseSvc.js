import firebase from 'firebase';
import uuid from 'uuid';

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAaOru1nkIHU-IQ5kmmLhBYJ-S3lqKYebo",
        authDomain: "tzachi-project.firebaseapp.com",
        databaseURL: "https://tzachi-project.firebaseio.com",
        projectId: "tzachi-project",
        storageBucket: "tzachi-project.appspot.com",
        messagingSenderId: "750629653434"
      });
     }
     else {
        console.log("firebase apps already running...")
  }}

login = async(user, success_callback, failed_callback) => {
    console.log("logging in"); 
    const output = await firebase.auth()
       .signInWithEmailAndPassword(user.email, user.password)
     .then(success_callback, failed_callback);
  }

  observeAuth = () =>
  firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

onAuthStateChanged = user => {
  if (!user) {
    try {
      this.login(user);
    } catch ({ message }) {
      console.log("Failed:" + message);
    }
  } else {
    console.log("Reusing auth...");
  }
};

  createAccount = async (user) => {
    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
    .then(function() {
      var userf = firebase.auth().currentUser;
      userf.updateProfile({ displayName: user.name})
      .then(function() {
        alert("User " + user.name + " was created successfully.");
      }, function(error) {
        console.warn("Error update displayName.");
      });
    }, function(error) {
      console.error("got error:" + error.message);
      alert("Create account failed.");
    });
  }

  uploadImage = async uri => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref('avatar').child(uuid.v4());
      const task = ref.put(blob);
      return new Promise((resolve, reject) => {
        task.on('state_changed', () => { }, reject, 
          () => resolve(task.snapshot.downloadURL));
      });
    } catch (err) {
      console.log('uploadImage error: ' + err.message); 
    }
  }

  updateAvatar = (url) => {
    //await this.setState({ avatar: url });
    var userf = firebase.auth().currentUser;
    if (userf != null) {
      userf.updateProfile({ avatar: url})
      .then(function() {
        console.log("Updated avatar successfully. url:" + url);
        alert("Avatar image is saved successfully.");
      }, function(error) {
        console.warn("Error update avatar.");
        alert("Error update avatar. Error:" + error.message);
      });
    } else {
      console.log("can't update avatar, user is not login.");
      alert("Unable to update avatar. You must login first.");
    }
  }

  onLogout = user => {
    firebase.auth().signOut().then(function() {
      console.log("Sign-out successful.");
    }).catch(function(error) {
      console.log("An error happened when signing out");
    });
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('Messages');
  }

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {_id, timestamp, text, user};
    return message;
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {text, user, createdAt: this.timestamp, };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }


}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;