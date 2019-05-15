/**
 * Created by Rizki Darmawan on 12/12/2017.
 */
var url     = window.site_url;
var token   = window.my_token;

function m_access(username, password, device)
{
    var formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password)
    formdata.append('device', device);

    return $.ajax({
        url: url+'api/apiAccess?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}

function m_cek_device()
{
    var id_user = window.localStorage.getItem("id_user");
    var device = window.localStorage.getItem("playerIds");
    
    var formdata = new FormData();
    formdata.append('id_user', id_user);
    formdata.append('device', device);
    
    return $.ajax({
        url: url+'api/apiCekDevice?my_token='+token,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        dataType: 'json'
    });
}