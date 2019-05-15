/**
 * Created by Rizki Darmawan on 12/12/2017.
 */

function login_process()
{
    var modalLogin = document.getElementById('modalLogin');
    var txt_username = $('#txt_username').val();
    var txt_password = $('#txt_password').val();
    var device = window.localStorage.getItem("playerIds");

    var options = {title: 'Info'};
    if(txt_username === '' || txt_password === '') {
        ons.notification.alert('Data tidak boleh kosong..', options);

    } else {
        
        var promise = m_access(txt_username, txt_password, device);
        promise.done(function (data) {
            if(data.dtReturn === true) {
                /*
                 * session login, id_user, name
                 */
                var id_user = data.dtId_user;
                var name = data.dtName;
                var divisi = data.dtDivisi;
                window.localStorage.setItem("login", true);
                window.localStorage.setItem("id_user", id_user);
                window.localStorage.setItem("name_user", name);
                window.localStorage.setItem("divisi", divisi);
                
                showModalLoading();
                setTimeout(function() {
                    //hapus navigator login
                    $('#modalLogin').empty();
                    
                    /*
                     * data profile
                     * nama user, divisi
                     */
                    _profileHelper(name, divisi);
                    
                    /*
                     * tampilkan dialog pemberitahuan
                     * ada penugasan baru
                     */
                    notifikasiPenugasanBaru();

                    modalLogin.hide();
                    ons.notification.toast({message: 'Anda berhasil login..', timeout: 2000});
                }, 2000);
                
                if(data.dtNotif_device === 'updated') {
                    setTimeout(function() {
                        ons.notification.toast({message: 'Semua device Anda berhasil dilogout.', timeout: 5000});
                    }, 5000);
                }
                
                /*
                 * tampilkan peta
                 * lat, long data pelanggan
                 */
                panggilMaps();
                
                /*
                 * data task in progress
                 * id_user
                 */
                panggilTaskCompletes(id_user);
                
                /*
                 * data task in completes
                 * id_user
                 */
                panggilTaskProgress(id_user);
                
                /*
                 * sensing lokasi :: geolocation
                 */
                deviceReady = true;
                panggilUpdateDevice(deviceReady);
                
            } else {
                
                ons.notification.alert('Maaf, Username atau Password yang Anda masukan salah!', options);
            }
        });
    }
}

function logout_process()
{
    document.getElementById(appMenu).close();
    
    /*
     * Add log activity
     */
    addLogActivity('Logout aplikasi > mobile', window.localStorage.getItem("id_user"));
    
    /*
     * unset session login, id_user, name_user, divisi
     */
    window.localStorage.removeItem("login");
    window.localStorage.removeItem("id_user");
    window.localStorage.removeItem("name_user");
    window.localStorage.removeItem("divisi");
    
    var modalLogin = document.getElementById('modalLogin');

    //location.href = 'index.html';
    modalLogin.show();
    //tambahkan--kembali navigator login
    $('#modalLogin').append('<ons-navigator id="appNavigator" page="login.html"></ons-navigator>');
    setTimeout(function() {
        toggleToast();
    }, 500);
    setTimeout(function() {
        toggleToast();
    }, 3000);
}

function toggleToast()
{
    document.querySelector('ons-toast').toggle();
}

function reset_password()
{

}

function submitForm()
{
    var txt_username = $('#txt_username').val();
    var txt_password = $('#txt_password').val();

    window.localStorage.setItem("username", txt_username);
    window.localStorage['password'] = txt_password;

    $('#output').html("Username: " + window.localStorage.getItem("username") + "<br>" + "Password: " + window.localStorage["password"]);

    return false;
}

function hapusLocal() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");

    return false;
}

function panggilCekDevice()
{
    var promise = m_cek_device();
    promise.done(function(data) {
        var result = data.return;
        
        if(result === false) {
            showModalLoading();
            
            document.getElementById(appMenu).close();

            /*
             * unset session login, id_user, name_user, divisi
             */
            window.localStorage.removeItem("login");
            window.localStorage.removeItem("id_user");
            window.localStorage.removeItem("name_user");
            window.localStorage.removeItem("divisi");
            
            setTimeout(function() {
                fn.loadLink('index.html', '_self')
            }, 1500);
        }
    });
    return false;
}