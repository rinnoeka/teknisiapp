function v_task_completes(data)
{
    var json = data.datas;
    var dt = '<ons-carousel auto-refresh overscrollable item-width="320px" swipeable id="carousel-task-completes">';
    var img = window.site_url+'uploads/fotos/default-pelanggan.png';
    $.each(json, function(n, item) {
        var id_penugasan = item.id_penugasan;
        var nama = item.nama;
        var judul = item.judul;
        var deskripsi = item.deskripsi;
        var jenis_tugas = item.jenis_tugas;
        var tgl_pelaksanaan = item.tgl_pelaksanaan;
        var waktu = item.waktu;
        dt += '<ons-carousel-item>'+
                    '<ons-card class="nopadding">'+
                        '<ons-list>'+
                            '<ons-list-item>'+
                                '<div class="left">'+
                                    '<img src="'+img+'" class="list-item__thumbnail">'+
                                '</div>'+
                                '<div class="center teks-abu">'+
                                    nama+
                                '</div>'+
                                '<div class="right nopadding">'+
                                    '<ons-button modifier="quiet" class="reset-button-color" onclick="showPopover(this, \'popover_task_completes\', '+id_penugasan+')"><ons-icon size="22px" icon="md-more-vert"></ons-icon></ons-button>'+
                                '</div>'+
                            '</ons-list-item>'+
                        '</ons-list>'+
                        '<div class="task-content">'+
                            '<div class="task-content__judul">'+
                                judul+
                            '</div>'+
                            '<div class="task-content__content">'+
                                deskripsi+
                            '</div>'+
                            '<div class="task-content__waktu">'+
                                '<p>'+jenis_tugas+'</p>'+
                                '<p>- '+tgl_pelaksanaan+', '+waktu+' WIB</p>'+
                            '</div>'+
                        '</div>'+
                    '</ons-card>'+
                '</ons-carousel-item>';
    });
    dt += '</ons-carousel>';
    if(data.jum > 0) {
        return dt;
    } else {
        return '';
    }
}

function v_task_progress(data)
{
    var json = data.datas;
    var dt = '<ons-carousel auto-refresh overscrollable item-width="320px" swipeable id="carousel-task-progress">';
    var img = window.site_url+'uploads/fotos/default-pelanggan.png';
    $.each(json, function(n, item) {
        var id_penugasan = item.id_penugasan;
        var pelanggan = item.nama;
        var judul = item.judul;
        var deskripsi = item.deskripsi;
        var jenis_tugas = item.jenis_tugas;
        var tgl_jadwal = item.tgl_jadwal;
        var status = item.status;
        dt += '<ons-carousel-item>'+
                    '<ons-card class="nopadding">'+
                        '<ons-list>'+
                            '<ons-list-item>'+
                                '<div class="left">'+
                                    '<img src="'+img+'" class="list-item__thumbnail">'+
                                '</div>'+
                                '<div class="center teks-abu">'+
                                    pelanggan+
                                '</div>'+
                                '<div class="right nopadding">'+
                                    '<ons-button modifier="quiet" class="reset-button-color" onclick="showPopover(this, \'popover_task_progress\', '+id_penugasan+', {\'status\': \''+status+'\'})"><ons-icon size="22px" icon="md-more-vert"></ons-icon></ons-button>'+
                                '</div>'+
                            '</ons-list-item>'+
                        '</ons-list>'+
                        '<div class="task-content">'+
                            '<div class="task-content__judul">'+
                                judul+
                            '</div>'+
                            '<div class="task-content__content">'+
                                deskripsi+
                            '</div>'+
                            '<div class="task-content__waktu">'+
                                '<p>'+jenis_tugas+'</p>'+
                                '<p>- '+tgl_jadwal+'</p>'+
                            '</div>'+
                        '</div>'+
                    '</ons-card>'+
                '</ons-carousel-item>';
    });
    dt += '</ons-carousel>';
    if(data.jum > 0) {
        return dt;
    } else {
        return '';
    }
}