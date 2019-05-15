function v_log(data)
{
    ons.ready(function () {
        var infinitelist = document.getElementById('infinite-list');
        var total = data.jum;

        infinitelist.delegate = {
            createItemContent: function(i) {

                return ons.createElement(
                    '<ons-list-item>'+
                    '<span class="list-item__title">'+data[i].aktifitas+'</span>'+
                    '<span class="list-item__subtitle"><ons-icon icon="md-calendar"></ons-icon> '+data[i].waktu+'</span>'+
                    '</ons-list-item>'
                )
            },
            countItems: function () {
                return total
            }
        };

        infinitelist.refresh();
    })
}