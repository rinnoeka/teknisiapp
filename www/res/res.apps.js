/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var site_url	= 'http://[domain anda].com/'; //http://localhost:8080/web_services/

var my_token	= '52fc65be68965c69b8e39ec933fd0a76dfa9ba14';

var appNavigator = 'appNavigator';

var appSplitter = 'appSplitter';

var appMenu = 'appMenu';

var appContent = 'appContent';

var appTabbar = 'appTabbar';

var idOneSignal = 'e70be2de-76a0-4r01-973d-28b733590e6d';

var deviceReady = false;

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.playerIds();
        this.loadLogin();
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    // Load device :: on login
    loadLogin: function() {
        var modalLogin = document.getElementById('modalLogin');
        var login = window.localStorage.getItem("login");

        if(login !== null) {
            /*
             * cek device :: active or not
             * by id_user and device
             */
            panggilCekDevice();
            
            //hapus navigator login
            $('#modalLogin').empty();

            modalLogin.hide();
            
            /*
             * sensing lokasi :: geolocation
             */
            deviceReady = true;
            panggilUpdateDevice(deviceReady);
            
        } else {
            
            modalLogin.show();
        }
    },

    // Onesignal notifications
    playerIds: function() {
        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        var registerDevice = function (ids) {
            var player_id = ids.userId;
            window.localStorage.setItem("playerIds", player_id);
        };

        window.plugins.OneSignal
            .startInit(idOneSignal)
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();
        window.plugins.OneSignal.getIds(registerDevice);
        window.plugins.OneSignal.setSubscription(true);
        window.plugins.OneSignal.enableNotificationsWhenActive(true);
    }
};

app.initialize();
/*
END
 */

/*
sidebar menus :: konfigur
 */
window.fn = {};

/* konfigur :: toggle menu open */
window.fn.toggleMenu = function () {
    document.getElementById(appSplitter).left.toggle();
};

/* konfigur :: view on tab /page */
window.fn.loadView = function (index) {
    document.getElementById(appTabbar).setActiveTab(index);
    document.getElementById(appMenu).close();
};

/* konfigur :: view on link(internal or external) */
window.fn.loadLink = function (url, target) {
    window.open(url, target);
};

/* konfigur :: view on pushPage */
window.fn.pushPage = function (page, anim) {
    if (anim) {
        document.getElementById(appMenu).close();
        document.getElementById(appNavigator).pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
        document.getElementById(appMenu).close();
        
        var target_ids;
        if(page.hasOwnProperty('target_ids')) {
            if(page.hasOwnProperty('popover')) {
                target_ids = $('input[name="'+page.target_ids+'"]').val();
            } else {
                target_ids = page.target_ids;
            }
            
        } else { target_ids = ''; }
        document.getElementById(appNavigator).pushPage(page.id, { data: { title: page.title, target_ids: target_ids } });
    }

    /*
    while
    from popover then
    hide popover
     */
    if(page.hasOwnProperty('popover')) {
        hidePopover(page.popover);
    }
};
/* end */

/* konfigur :: set title page :: by tab */
function tabbar() {
    ons.getScriptPage().addEventListener('prechange', function(event) {
        if (event.target.matches('#'+appTabbar)) {
            event.currentTarget.querySelector('ons-toolbar .center').innerHTML = event.tabItem.getAttribute('label');
        }
    });
}

/* konfigur :: set title page :: by pushPage */
function setTitlePage() {
    ons.getScriptPage().onInit = function () {
        this.querySelector('ons-toolbar div.center').textContent = this.data.title;
    };
}

/* konfigur :: pull hook to refresh page home */
function pullHookHome() {
    ons.getScriptPage().onInit = function () {
        var pullHook = document.getElementById('pull-hook-home');
        var pullHookContent = document.getElementById('pull-hook-home-content');

        pullHook.addEventListener('changestate', function (event) {
            var message = '';

            switch (event.state) {
                case 'initial':
                    message = 'Pull to refresh';
                    break;
                case 'preaction':
                    message = 'Release';
                    break;
                case 'action':
                    message = '<ons-progress-bar indeterminate></ons-progress-bar>';
                    break;
            }

            pullHookContent.innerHTML = message;
        });

        pullHook.onAction = function (done) {
            setTimeout(done, 1000);
        };
    };
}

/* konfigur :: show popover */
var showPopover = function (target, id, target_ids, param) {
    document.getElementById(id).show(target);
    if(target_ids !== '') {
        var obj = $('#'+id+'__target_ids');
        obj.empty();
        
        obj.html('<input type="hidden" name="'+id+'__target_ids" value="'+target_ids+'">');
        
        if(id === 'popover_task_progress' && param.hasOwnProperty('status')) {
            _btnLaksanakan(id, param.status);
        }    
    }
};
/* konfigur :: close popover */
var hidePopover = function (id) {
    document.getElementById(id).hide();
};

/* konfigur :: show action sheet */
window.fn.showDialog = function (id) {
    var elem = document.getElementById(id);
    elem.show();
    var timeoutID = 0;
    if (id === 'modal-dialog') {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(fn.hideDialog(id), 2000);
    }
};
window.fn.hideDialog = function (id) {
    document.getElementById(id).hide();
};

/*
show :: hide :: modal loading
 */
function showModalLoading()
{
    var modal = document.getElementById('modalLoading');
    modal.show();
    setTimeout(function() {
        modal.hide();
    }, 2000);
}