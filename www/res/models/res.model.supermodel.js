/**
 * Created by Rizki Darmawan on 12/12/2017.
 */
var url     = window.site_url;
var token   = window.my_token;

function addLogActivity(aktifitas, id_user)
{
    var formdata = new FormData();
    formdata.append('aktifitas', aktifitas);
    formdata.append('id_user', id_user);
    
    $.ajax({
        url: url+'api/apiLogActivity?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtPelangganAll()
{
    return $.ajax({
        url: url+'api/apiPelangganAll?my_token='+token,
        data: '',
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

/*
 * parameter:
 * id_user
 */
function dtPenugasanComplete(data)
{
    var formdatax = new FormData();
    formdatax.append('id_user', data.id_user);
    
    return $.ajax({
        url: url+'api/apiPenugasanComplete?my_token='+token,
        data: formdatax,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtPenugasanProgress(data)
{
    var formdata = new FormData();
    formdata.append('id_user', data.id_user);
    
    return $.ajax({
        url: url+'api/apiPenugasanProgress?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtDetailPelanggan(id_penugasan)
{
    var formdata = new FormData();
    formdata.append('id_penugasan', id_penugasan);
    
    return $.ajax({
        url: url+'api/apiDetailPelanggan?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtDetailTiket(id_penugasan)
{
    var formdata = new FormData();
    formdata.append('id_penugasan', id_penugasan);
    
    return $.ajax({
        url: url+'api/apiDetailTiket?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtLog()
{
    var id_user = window.localStorage.getItem("id_user");
    
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    
    return $.ajax({
        url: url+'api/apiLog?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function m_update_device(lat, long)
{
    var device = window.localStorage.getItem("playerIds");
    var formdata = new FormData();
    formdata.append('device', device);
    formdata.append('latitude', lat);
    formdata.append('longitude', long);
    
    $.ajax({
        url: url+'api/apiUpdateDevice?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
    return false;
}

function m_penugasan_baru()
{
    var id_user = window.localStorage.getItem("id_user");
    
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    
    return $.ajax({
        url: url+'api/apiPenugasanBaru?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function m_pelaksanaan_penugasan(id_penugasan)
{
    var formdata = new FormData();
    formdata.append('id_penugasan', id_penugasan);
    
    return $.ajax({
        url: url+'api/apiPelaksanaanPenugasan?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtPelaksanaanTerkini()
{
    var id_user = window.localStorage.getItem("id_user");
    
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    
    return $.ajax({
        url: url+'api/apiPelaksanaanTerkini?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function dtPenugasanBaruAll()
{
    var id_user = window.localStorage.getItem("id_user");
    
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    
    return $.ajax({
        url: url+'api/apiPenugasanBaruByPelaksana?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}