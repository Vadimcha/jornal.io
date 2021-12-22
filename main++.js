function adddb() {
    var user = window.localStorage.getItem('emailForSignIn');
    var kuda = document.getElementById("flex").value;
    var time;
    var check = 0;
    var vrema_uxoda = document.getElementById("time").value;
    var data_prixoda = document.getElementById("end").value;
    var vrema_prixoda = document.getElementById("time_end").value;
    var now = new Date();
    var data_uxoda = String(now.getYear() + 1900) + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    db.collection('Выходы').doc(user).update({ kuda });
    if (now.getHours() <= 9) {
        time = "0" + now.getHours() + ":";
    } else {
        time = now.getHours() + ":";
    }
    if (now.getMinutes() <= 9) {
        time = time + "0" + now.getMinutes();
    } else {
        time = time + now.getMinutes();
    }
    if (vrema_uxoda >= time) {
        check++;
    } else {
        window.alert('Введите правильное время ухода');
    }
    if (data_prixoda >= data_uxoda) {
        check++;
    } else {
        window.alert('Введите правильную дату');
    }
    if (((vrema_prixoda > vrema_uxoda) && (data_uxoda == data_prixoda)) || (data_prixoda > data_uxoda)) {
        check++;
    } else {
        window.alert('Введите правильное время прихода');
    }
    if (check == 3) {
        db.collection('Выходы').doc(user).update({ vrema_uxoda });
        db.collection('Выходы').doc(user).update({ data_prixoda });
        db.collection('Выходы').doc(user).update({ vrema_prixoda });
        db.collection('Выходы').doc(user).update({ data_uxoda });
    }
    db.collection('Выходы').doc(user).update({ veryfied: false });
}