var uluru = {lat: -6.5815223, lng: 106.8119382};

function v_maps(data)
{
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var infowindow = new google.maps.InfoWindow(), marker, i;
    
    var bounds = new google.maps.LatLngBounds(); // diluar looping
    
    var json = data.datas;
    $.each(json, function(n, item) {
        var latitude = item.latitude;
        var longitude = item.longitude;
        var perusahaan = item.perusahaan;
        
        pos = new google.maps.LatLng(latitude, longitude);

        bounds.extend(pos); // di dalam looping

        marker = new google.maps.Marker({
          position: pos,
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
              infowindow.setContent(perusahaan);
              infowindow.open(map, marker);
          }
        })(marker, i));
    });
    
    map.fitBounds(bounds); // setelah looping
}

function v_pelaksanaan_penugasan(data)
{
    var dt = '';
    
    dt += '<ons-list-item tappable onclick="fn.pushPage({\'id\': \'taskdetail.html\', \'title\': \'Detail Task\', \'target_ids\': '+data.id_penugasan+'})">'+
                '<span class="list-item__title">ID Task</span>'+
                '<span class="list-item__subtitle">#'+data.id_tiket+'</span>'+
            '</ons-list-item>'+
            '<ons-list-item>'+
                '<span class="list-item__title">Judul</span>'+
                '<span class="list-item__subtitle">'+data.judul+'</span>'+
            '</ons-list-item>'+
            '<ons-list-item>'+
                '<span class="list-item__title">Skala Prioritas</span>'+
                '<span class="list-item__subtitle">'+data.skala_prioritas+'</span>'+
            '</ons-list-item>'+

            '<ons-list-header>Data Pelanggan</ons-list-header>'+
            '<ons-list-item>'+
                '<span class="list-item__title">Nama Pelanggan</span>'+
                '<span class="list-item__subtitle">'+data.nama_pelanggan+'</span>'+
            '</ons-list-item>'+
            '<ons-list-item>'+
                '<span class="list-item__title">Perusahaan</span>'+
                '<span class="list-item__subtitle">'+data.perusahaan+'</span>'+
            '</ons-list-item>'+
            '<ons-list-item>'+
                '<span class="list-item__title">Nomor Telp</span>'+
                '<span class="list-item__subtitle">'+data.telepon+'</span>'+
            '</ons-list-item>'+

            '<ons-list-header tapptable>Detail Task</ons-list-header>'+
            '<ons-list-item>'+
                '<span class="list-item__title">Jenis</span>'+
                '<span class="list-item__subtitle">'+data.jenis_tugas+'</span>'+
            '</ons-list-item>'+
            '<ons-list-item tappable modifier="chevron" onclick="fn.pushPage({\'id\': \'taskdetail.html\', \'title\': \'Detail Task\', \'target_ids\': '+data.id_penugasan+'})">Selengkapnya</ons-list-item>';
    
    return dt;
}

function v_map_direction(data)
{
    var device = data.dtDevice;
    var pelanggan = data.dtPelanggan;
    
    var asal = device.latitude+','+device.longitude;
    var tujuan = pelanggan.latitude+','+pelanggan.longitude;
    
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    directionsDisplay.setMap(map);

    var request = {
        origin: asal,
        destination: tujuan,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function v_penugasan_baru_by_pelaksana(data)
{
    var json = data.datas;
    
    var img = window.site_url+'uploads/fotos/default-pelanggan.png';
    var dt = '<ons-list-header>Jadwal Penugasan : </ons-list-header>';
    $.each(json, function(i, item) {
        dt += '<ons-list-item modifier="chevron" tappable onclick="fn.pushPage({\'id\': \'taskdetail.html\', \'title\': \'Detail Task\', \'target_ids\': '+item.id_penugasan+'})">'+
                    '<div class="left">'+
                        '<img src="'+img+'" class="list-item__thumbnail">'+
                    '</div>'+
                    '<div class="center">'+
                        '<div class="list-item__title">'+item.nama_pelanggan+' - '+item.perusahaan+'</div>'+
                        '<div class="list-item__subtitle">'+item.judul+', '+item.tgl_jadwal+'</div>'+
                    '</div>'+
                '</ons-list-item>';
    });
    if(data.jum > 0) {
        return dt;
    } else {
        dt += '<ons-list-item modifier="longdivider" tappable>Tidak ada data&nbsp;<strong>penugasan baru</strong>. . .</ons-list-item>';
        
        return dt;
    }
}