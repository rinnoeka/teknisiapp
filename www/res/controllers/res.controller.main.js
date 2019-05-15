var watchID = null;
var timeOut = 30000; //10 minutes (10*60*1000)

/**
 * fungsi untuk menampilkan map
 * dengan beberapa titik pelanggan
 */
function panggilMaps()
{
    var promise = dtPelangganAll();
    promise.done(function(data) {
        var pelaksanaan_terkini = dtPelaksanaanTerkini();
        pelaksanaan_terkini.done(function(data_pelaksanaan) {
            
            if(data_pelaksanaan.dtPenugasan.jum > 0) {
                document.getElementById('home_data_list').innerHTML = v_pelaksanaan_penugasan(data_pelaksanaan.dtPenugasan);
        
                v_map_direction(data_pelaksanaan);
                
            } else {
                
                var penugasan_baru = dtPenugasanBaruAll();
                penugasan_baru.done(function(data_penugasan_baru) {
                    document.getElementById('home_data_list').innerHTML = v_penugasan_baru_by_pelaksana(data_penugasan_baru.dtPenugasan);
                });
                
                v_maps(data.dtPelanggan);
            }
        });
    });
}

function panggilTaskCompletes(id_user)
{
    obj = {id_user: id_user};
    var promise = dtPenugasanComplete(obj);
    promise.done(function(data) {
        document.getElementById('id-task-completes').innerHTML = v_task_completes(data.dtPenugasan);
    });
}

function panggilTaskProgress(id_user)
{
    obj = {id_user: id_user};
    var promise = dtPenugasanProgress(obj);
    promise.done(function(data) {
        document.getElementById('id-task-progress').innerHTML = v_task_progress(data.dtPenugasan);
    });
}

function panggilDetailPelanggan()
{
    var nav = document.querySelector('ons-navigator').topPage.pushedOptions;
    
    var id_penugasan = nav.data.target_ids;
    var promise = dtDetailPelanggan(id_penugasan);
    promise.done(function(data) {
        document.getElementById('detail_pelanggan__id_pelanggan').innerHTML = '#'+data.id_pelanggan;
        document.getElementById('detail_pelanggan__nama').innerHTML = data.nama;
        document.getElementById('detail_pelanggan__telepon').innerHTML = data.telepon;
        document.getElementById('detail_pelanggan__alamat').innerHTML = data.alamat;
        document.getElementById('detail_pelanggan__titik_lokasi').innerHTML = data.latitude+','+data.longitude;
    });
}

function panggilDetailTiket()
{
    var nav = document.querySelector('ons-navigator').topPage.pushedOptions;
    
    var id_penugasan = nav.data.target_ids;
    var promise = dtDetailTiket(id_penugasan);
    promise.done(function(data) {
        var prioritas = data.skala_prioritas;
        
        document.getElementById('detail_tiket__id_tiket').innerHTML = '#'+data.id_tiket;
        document.getElementById('detail_tiket__judul').innerHTML = data.judul;
        document.getElementById('detail_tiket__jenis_tiket').innerHTML = data.jenis_tiket;
        document.getElementById('detail_tiket__skala_prioritas').innerHTML = '<span class="label-inline-warning"><ons-icon icon="md-info-outline"></ons-icon> '+prioritas+'</span>';
        document.getElementById('detail_tiket__deskripsi').innerHTML = data.deskripsi;
        document.getElementById('detail_tugas__tgl_jadwal').innerHTML = data.tgl_jadwal;
        document.getElementById('detail_tugas__jenis_tugas').innerHTML = data.jenis_tugas;
        document.getElementById('detail_tugas__catatan').innerHTML = data.catatan;
    });
}

function panggilDetailLaporan()
{
    var nav = document.querySelector('ons-navigator').topPage.pushedOptions;
    
    var id_penugasan = nav.data.target_ids;
    var promise = m_detail_laporan(id_penugasan);
    promise.done(function(data) {
        if(data.persentase_penyelesaian !== null) {
            document.getElementById('persentase_penyelesaian').value = data.persentase_penyelesaian;
        }
        
        if(data.status === 'dilaporkan' || data.status === 'direview') {
            if(data.status_hasil === 'Belum selesai') {
                document.getElementById('txt-status-belum-selesai').checked = true;
            }
            document.getElementById('txt-pukul-datang').value = data.pukul_datang;
            document.getElementById('txt-pukul-selesai').value = data.pukul_selesai;
            document.getElementById('txt-keterangan-hasil').value = data.keterangan_hasil;
        }
        
        if(data.status === 'dilaksanakan') {
            $('#persentase_penyelesaian').removeAttr('disabled');
            $('#btnSimpanLaporan').removeAttr('disabled');
        }
    });
}

function panggilLog()
{
    var promise = dtLog();
    promise.done(function(data) {
        v_log(data.dtLog);
    });
}

function panggilUpdateDevice(deviceReady)
{
    if(deviceReady) {
        // Throw an error if no update is received every 30 seconds
        var options = { timeout: timeOut, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    }
}

// onSuccess Geolocation
//
function onSuccess(position) {
    /*
     * get data geolocations
     * latitude, longitude
     */
    var lats = position.coords.latitude;
    var longs = position.coords.longitude;
    
    /*
     * proses update device
     * by device, latitude, longitude
     */
    m_update_device(lats, longs);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function stopWatch(deviceReady){
    if(deviceReady) {
        navigator.geolocation.clearWatch(watchID);
        alert('Mencari lokasi dihentikan!');
    }
}

function notifikasiPenugasanBaru()
{
    var promise = m_penugasan_baru();
    promise.done(function(data) {
        if(data.return === true) {
            var r = data.dtPenugasan;
            
            if(r.jum > 0) {
                var dt = 'Dear '+window.localStorage.getItem('name_user')+'<br>Anda mendapatkan penugasan baru ke lokasi '+r.nama_pelanggan+' - '+r.perusahaan+'.';
                dt += '<input type="hidden" name="dialog__penugasan_baru__id_penugasan" value="'+r.id_penugasan+'">';
                document.getElementById('dialog__penugasan_baru__content').innerHTML = dt;
                
                $('#dialog__penugasan_baru div.alert-dialog-footer button.btn-tugas-sebelumnya').remove();
                if(r.jum_laksanakan > 0) {
                    $('#dialog__penugasan_baru div.alert-dialog-footer').prepend('<button class="alert-dialog-button btn-tugas-sebelumnya" onclick="fn.hideDialog(\'dialog__penugasan_baru\')">Selesaikan tugas sebelumnya.</button>');
                    
                }

                fn.showDialog('dialog__penugasan_baru');
            }
        }
    });
}

function laksanakanPenugasan()
{
    var id_penugasan = $('input[name="dialog__penugasan_baru__id_penugasan"]').val();
    $('#map').empty();
    
    var promise = m_pelaksanaan_penugasan(id_penugasan);
    promise.done(function(data) {
        document.getElementById('home_data_list').innerHTML = v_pelaksanaan_penugasan(data.dtPenugasan);
        
        v_map_direction(data);
    });
    
    fn.hideDialog('dialog__penugasan_baru');
}

function laksanakanPenugasan__popover()
{
    var id_penugasan = $('input[name="popover_task_progress__target_ids"]').val();
    $('#map').empty();
    
    var promise = m_pelaksanaan_penugasan(id_penugasan);
    promise.done(function(data) {
        document.getElementById('home_data_list').innerHTML = v_pelaksanaan_penugasan(data.dtPenugasan);
        
        v_map_direction(data);
    });
    
    fn.loadView(0);
}

function simpanPersentasePenilaian(persentase_penyelesaian)
{
    var nav = document.querySelector('ons-navigator').topPage.pushedOptions;
    
    var id_penugasan = nav.data.target_ids;
    
    var promise = m_simpan_persentase_penyelesaian(id_penugasan, persentase_penyelesaian);
    promise.done(function(data) {
        if(data.return === true) {
            ons.notification.toast({message: persentase_penyelesaian+'% Penugasan sudah Diselesaikan.', timeout: 2000});
            
        } else {
            
            ons.notification.toast({message: 'Data gagal diupdate.', timeout: 2000});
        }
    });
}

function simpanLaporanPenugasan()
{
    var nav = document.querySelector('ons-navigator').topPage.pushedOptions;
    
    var id_penugasan = nav.data.target_ids;
    var txt_status_hasil = $('input[name="txt_status_hasil"]:checked').val();
    var txt_pukul_datang = $('input[name="txt_pukul_datang"]').val();
    var txt_pukul_selesai = $('input[name="txt_pukul_selesai"]').val();
    var txt_keterangan_hasil = $('textarea[name="txt_keterangan_hasil"]').val();
    
    var options = {title: 'Info'};
    if(txt_pukul_datang == '' || txt_pukul_selesai == '' || txt_keterangan_hasil == '') {
        ons.notification.alert('Form tidak boleh dikosongkan!', options);
        
    } else {
        var getForm = {'id_penugasan': id_penugasan, 'txt_status_hasil': txt_status_hasil, 'txt_pukul_datang': txt_pukul_datang, 'txt_pukul_selesai': txt_pukul_selesai, 'txt_keterangan_hasil': txt_keterangan_hasil};
        var promise = m_simpan_laporan_penugasan(getForm);
        promise.done(function(data) {
            if(data.return === true) {
                ons.notification.toast({message: 'Penugasan berhasil dilaporkan.', timeout: 2000});
                
            } else {
                
                ons.notification.toast({message: 'Data gagal disimpan.', timeout: 2000});
            }
        });
    }
}

function setAkunProfile()
{
    var img = document.querySelector('.frm-foto img');
    img.setAttribute('src', window.site_url+'uploads/fotos/default-teknisi.png');
    
    document.getElementById('txt_nama').value = window.localStorage.getItem("name_user");
    document.getElementById('txt_username').value = window.localStorage.getItem("username");
}