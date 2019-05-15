function _profileHelper(name, divisi)
{
    var img = document.querySelector('.profile-content img');
    img.setAttribute('src', window.site_url+'uploads/fotos/default-teknisi.png');
    $('.profile-nama').html(name);
    $('.profile-bagian').html(divisi);
}

function _btnLaksanakan(id, status)
{
    $('#'+id+' ons-list ons-list-item.list__laksanakan').remove();
    
    if(status === 'ditugaskan') {
        var dt = '<ons-list-item class="list__laksanakan" tappable onclick="__onLaksanakan(\''+id+'\')">'+
                    '<div class="center"><ons-icon size="16px" icon="md-mail-send"></ons-icon> &nbsp; Laksanakan</div>'+
                '</ons-list-item>';
    
        $('#'+id+' ons-list').append(dt);
    }
}

function __onLaksanakan(target)
{
    hidePopover(target);
    
    ons.notification.confirm({message: 'Lakukan Penugasan Sekarang?', callback: function(ret){ if(ret){ laksanakanPenugasan__popover(); }}});
}

function __showNilaiPersentase()
{
    var data = $('#persentase_penyelesaian');
    document.getElementById('nilai').innerHTML = data.val()+'%';
}

function __SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function __copy(target)
{
    document.execCommand('copy');
}