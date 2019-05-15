var url     = window.site_url;
var token   = window.my_token;

function m_simpan_persentase_penyelesaian(id_penugasan, persentase_penyelesaian)
{
    var formdata = new FormData();
    formdata.append('id_penugasan', id_penugasan);
    formdata.append('persentase_penyelesaian', persentase_penyelesaian);
    
    return $.ajax({
        url: url+'api/apiSimpanPersentasePenyelesaian?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function m_detail_laporan(id_penugasan)
{
    var formdata = new FormData();
    formdata.append('id_penugasan', id_penugasan);
    
    return $.ajax({
        url: url+'api/apiDetailLaporan?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function m_simpan_laporan_penugasan(getform)
{
    var id_user = window.localStorage.getItem("id_user");
    
    var formdata = new FormData();
    formdata.append('id_penugasan', getform.id_penugasan);
    formdata.append('status_hasil', getform.txt_status_hasil);
    formdata.append('pukul_datang', getform.txt_pukul_datang);
    formdata.append('pukul_selesai', getform.txt_pukul_selesai);
    formdata.append('keterangan_hasil', getform.txt_keterangan_hasil);
    formdata.append('id_user', id_user);
    
    return $.ajax({
        url: url+'api/apiSimpanLaporanPenugasan?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}