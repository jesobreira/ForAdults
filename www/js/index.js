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
    onVerifyAcess: function() {
        if ($.cookie('email') != '' && $.cookie('senha') != '') {
            window.location = 'categories.html';
            return;
        }

        return;
    },
    onLogin: function() {
        var email = $('#sign-in-email').val()
          , pass  = $('#sign-in-password').val()
        ;

        if (email == '') {
            alert('Email is empty');
        }

        if (pass == '') {
            alert('Password is empty');
        }

        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                email: email,
                senha:  pass
            }, 
            url: "http://api.ciawn.com.br/api/client/?email=winnersdevelopers@gmail.com&senha=chinelao",
            success: function(data) {
                if (data.message == "error") {
                    alert('Você ainda não tem cadastro');
                    return;
                }

                $.cookie('email', email, { expires: 7 });
                $.cookie('senha', pass, { expires: 7 });
                window.location.href = 'categories.html';
            },
            error: function(data) {
                console.log(data);
            }
        });
    },
    onSignUp: function() {
        var first_name = $('#txt-first-name').val()
          , last_name  = $('#txt-last-name').val()
          , email      = $('#txt-email').val()
          , password   = $('#txt-password').val()
          , password_c = $('#txt-password-confirm').val()
          ;

        if (first_name == '') {
            alert('First name is empty');
        }

        if (last_name == '') {
            alert('Last name is empty');
        }

        if (email == '') {
            alert('Email is empty');
        }

        if (password == '') {
            alert('Password is empty');
        }

        if (password_c == '') {
            alert('Password confimation is empty');
        }

        if (password != password_c) {
            alert('Password is diferent password confimation');
        }

        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                nome1: first_name,
                nome2: last_name,
                email: email,
                senha: password,
            }, 
            url: "http://api.ciawn.com.br/api/client/?email=winnersdevelopers@gmail.com&senha=chinelao",
            success: function(data) {
                alert('Sucesso, você será redirecionado para a pagina de categorias');

                $.cookie('email', email, { expires: 7 });
                $.cookie('senha', password, { expires: 7 });

                window.location.href = 'categories.html';
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
};


$(document).ready(function(){

    $('#sign-in').click(function(){
        app.onLogin();
    });

    $('#sign-up').click(function(){
        app.onSignUp();
    });

    var url  = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json'
      , html = '';
    
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data){
            $.each(data['categories'], function(i, item) {
                html += '<li><a data-ajax="false" href="category.html?category=' + item['category'] + '">' + item['category'] + '</a></li>';
            });

            $('#categories').html(html);

            $('#categories').trigger('create');    
            $('#categories').listview('refresh');
        }
    });
});


function videos() {
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]}) 

    var url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=' + queryDict.category + '&thumbsize=all';
    var html = '';
        
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data){
            $.each(data['videos'], function(i, item) {
                html += '<div class="ui-grid-a">';
                html += '    <div class="ui-block-a">';
                html += '        <div class="ui-bar ui-bar-a" style="height:120px; margin-top: 14px;">';
                html += '            <img src="' + item.video.default_thumb + '" height="120px" width="180px" />';
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="ui-block-b">';
                html += '        <div class="ui-bar ui-bar-a" style="height:120px">';
                html += '            <a href="video.html?video=' + item.video.video_id + '" data-ajax="false" style="color: red;" >' + item.video.title + ' </a> <br>';
                html += '            Duration: ' + item.video.duration + '';
                html += '        </div>';
                html += '    </div>';
                html += '</div><!-- /grid-a -->';
            });

            $('#videos').html(html);

            // $('#videos').trigger('create');    
            // $('#videos').listview('refresh');
        }, 
        error: function(data) {
            alert('ocorreu algum erro');
        }
    });
}

function viewVideo() {
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})

    var url = 'http://cors-server.getup.io/url/api.redtube.com/?data=redtube.Videos.getVideoEmbedCode&video_id=' + queryDict.video + '&output=json'
    var html = '';
        
    $.ajax({
        type: "GET",
        dataType: "json",
        url: url,
        success: function(data){
            $('#video_url').html(atob(data.embed.code));
        }, 
        error: function(data) {
            alert('ocorreu algum erro');
        }
    });
}