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
var app = {

    // // Application Constructor
    // initialize: function() {
    //     this.bindEvents();
    // },
    // // Bind Event Listeners
    // //
    // // Bind any events that are required on startup. Common events are:
    // // 'load', 'deviceready', 'offline', and 'online'.
    // bindEvents: function() {
    //     document.addEventListener('deviceready', this.onDeviceReady, false);
    // },
    // // deviceready Event Handler
    // //
    // // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // // function, we must explicitly call 'app.receivedEvent(...);'
    // onDeviceReady: function() {
    //     app.receivedEvent('deviceready');
    // },
    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};


$(document).ready(function(){
    var url  = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json'
      , html = '';
    
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data){
            $.each(data['categories'], function(i, item) {
                html += '<li><a href="category.html?category=' + item['category'] + '">' + item['category'] + '</a></li>';
            });

            $('#categories').html(html);

            $('#categories').trigger('create');    
            $('#categories').listview('refresh');
        }
    });
});


function videos(category) {
    var url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=amateur&thumbsize=all';
    var html = '';
        
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data){
            alert('oi');
            $.each(data['videos'], function(i, item) {
                html += '<div class="ui-grid-a">';
                html += '    <div class="ui-block-a">';
                html += '        <div class="ui-bar ui-bar-a" style="height:120px; margin-top: 14px;">';
                html += '            <img src="' + item.video.default_thumb + '" height="120px" width="180px" />';
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="ui-block-b">';
                html += '        <div class="ui-bar ui-bar-a" style="height:120px">';
                html += '            ' + item.video.title + ' <br>';
                html += '            Duration: ' + item.video.duration + '';
                html += '        </div>';
                html += '    </div>';
                html += '</div><!-- /grid-a -->';
            });

            $('#videos').html(html);

            // $('#videos').trigger('create');    
            // $('#videos').listview('refresh');
        }
    });
}