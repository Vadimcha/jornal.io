function create_accaunt() {
    var actionCodeSettings = {
        url: 'https://n0-n4-m3.github.io/journal/',
        handleCodeInApp: true,
        emailVerified: true
    };
    let emailin = document.getElementById("Emai").value;
    var password = document.getElementById("Passwor").value;
    var errorCode = ' ';
    if (emailin.indexOf('st') == 0) {
        firebase.auth().createUserWithEmailAndPassword(emailin, password)
            .then((userCredential) => {
                var data_uxoda = "-";
                var vrema_uxoda = "-";
                db.collection('Выходы').doc(emailin).set({});
                db.collection('Выходы').doc(emailin).update({ data_uxoda });
                db.collection('Выходы').doc(emailin).update({ vrema_uxoda });
                db.collection('Выходы').doc(emailin).update({});
                db.collection('Ученики').doc(emailin).set({});
                window.alert('Проверьте электронную почту.');
                var user = userCredential.user;
                verifiy(emailin, actionCodeSettings);
                main(emailin);
            })
            .catch((error) => {
                errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                if (errorCode == 'auth/email-already-in-use') window.alert('Введите другую почту');
            });
    } else {
        window.alert("Введите вашу st почту");
    }
};

function verifiy(e, a) {
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
};

function login() {
    let vos = new Array();
    var count = 0;
    vos = ['timamen10@gmail.com'];
    var emailin = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;
    firebase.auth().signInWithEmailAndPassword(emailin, password)
        .then((userCredential) => {
            var user = userCredential.user;
            for (let i = 0; i < vos.length; i++) {
                if (emailin == vos[i]) {
                    count++;
                }
            }
            if (count == 1) {
                window.localStorage.setItem('emailForSignIn', emailin);
                $('.grid').css('grid-temlate-areas', 'out out');
                document.location.href = './analytics.html';
            } else {
                window.localStorage.setItem('emailForSignIn', emailin);
                $('.grid').css('grid-temlate-areas', 'out out');
                document.location.href = './main.html';
            }
        })
        .catch((error) => {
            var errorCode = error.code;
            if (errorCode == 'auth/user-not-found') window.alert('Введите существующую почту');
            if (errorCode == 'auth/wrong-password') window.alert('Неверный пароль');
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
};

function main(a, name, secname, room) {
    var name = String(document.getElementById("Name").value);
    var secname = String(document.getElementById("secName").value);
    var room = String(document.getElementById("Room").value);
    db.collection('Ученики').doc(a).update({ name });
    db.collection('Ученики').doc(a).update({ secname });
    db.collection('Ученики').doc(a).update({ room });
};


function aaa() {
    $('.in').css('visibility', 'hidden');
    $('.in2').css('visibility', 'visible');
};

function bbb() {
    $('.in2').css('visibility', 'hidden');
    $('.in').css('visibility', 'visible');
};