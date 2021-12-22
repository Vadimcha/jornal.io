const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBIt004MBqkeI4b7pz24oYpurHiyUaNil8",
    authDomain: "basr-d0079.firebaseapp.com",
    databaseURL: "https://basr-d0079-default-rtdb.firebaseio.com",
    projectId: "basr-d0079",
    storageBucket: "basr-d0079.appspot.com",
    messagingSenderId: "250883445973",
    appId: "1:250883445973:web:c200dd55f9dfd739e0fe5c",
    measurementId: "G-3M0ZDER1R6"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
db.settings({ timestampInSnapshots: true, merge: true });
var user = window.localStorage.getItem('emailForSignIn');
var exitcol = db.collection("Выходы").doc(user);
$('.nadpis').css('visibility', 'hidden');

firebase.auth().onAuthStateChanged(
    function(user) {
        if (user) {
            var emailVerified = user.emailVerified;
            var email = user.email;
            if (emailVerified == true) {} else {
                $('.nadpis').css('visibility', 'visible');
                document.getElementById("ad").setAttribute('onclick', 'return false');
                auth.currentUser.sendEmailVerification()
                    .then(() => {
                        console.log('Ок');
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                    });
            }
        } else {
            $("#vinfo").html('Перезайдите в аккаунт');
            $('.nadpis').css('visibility', 'visible');
            document.getElementById("ad").setAttribute('onclick', 'return false');
            document.getElementById("vinfo").setAttribute('href', './index');
            console.log("No user found")
        }
    }
);
db.collection("Выходы").doc(user).onSnapshot((doc) => {
    if (doc.data().veryfied == false) {
        $("#tt").html(doc.data().vrema_uxoda);
        $("#dt").html(doc.data().data_uxoda);
        $("#wt").html(doc.data().kuda);
    } else {
        $("#tt").html("-");
        $("#dt").html("-");
        $("#wt").html("-");
    }
});
document.getElementById('check').onclick = function() { db.collection('Выходы').doc(user).update({ veryfied: true }); }