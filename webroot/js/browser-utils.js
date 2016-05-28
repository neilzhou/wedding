var browser = {
    versions: function() {
        var u = navigator.userAgent,
        app = navigator.appVersion;
        return {
            isWeixin: !!u.match(/MicroMessenger/i),
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
            iPhone: u.indexOf("iPhone") > -1,
            iPad: u.indexOf("iPad") > -1
        };
    } (),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function mp3_play(mp3_url){
    //var qt_mp3_url = "mp3/wodemingzijiaoyilian.m4a";
    if (mp3_url) {
        $('#playbox audio').get(0).pause();
        //$('#playbox audio').get(0).setAttribute('src', mp3_url);
        //$('#playbox audio').get(0).setAttribute('loop', false);
        $('#playbox audio').get(0).load();
        $('#playbox audio').get(0).play();
    }else{
        //$('#playbox audio').get(0).setAttribute('src', qt_mp3_url);
        if ($('#playbox').hasClass('on')){
            $('#playbox').attr('class','');
            $('#playbox audio').get(0).pause();
        }else{
            $('#playbox').attr('class','on');
            $('#playbox audio').get(0).play();
        }
    }
}

$(function(){
    $('.ul_nav li').on('click', function(e){
        $('.ul_nav li').removeClass('active');
        $(this).addClass('active');
    });

    if(location.hash){
        var hashArray = location.hash.split('#');
        pageHash = hashArray[1];
        var $obj = $('.ul_nav li.'+pageHash);
        if($obj.length){
            $('.ul_nav li').removeClass('active');
            $obj.addClass('active');
        }
    }

    var first = 0;
    if(browser.versions.mobile && !browser.versions.isWeixin) {
        $('body').on('click tap touchstart swipeUp', function(){
            if (first == 0) {
                $('#playbox audio').get(0).play();
                first ++;    
            }
        });
    };
});
