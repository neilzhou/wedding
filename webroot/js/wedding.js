$(document).ready(function(){
  //$('section').height($(window).height());
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
  })        
});
function mp3_play(mp3_url){
    var qt_mp3_url = "http://mp3.123hl.cn/wodemingzijiaoyilian.m4a";
    if (mp3_url) {
        $('#playbox audio').get(0).pause();
        $('#playbox audio').get(0).setAttribute('src', mp3_url);
        //$('#playbox audio').get(0).setAttribute('loop', false);
        $('#playbox audio').get(0).load();
        $('#playbox audio').get(0).play();
    }else{
        $('#playbox audio').get(0).setAttribute('src', qt_mp3_url);
        if ($('#playbox').hasClass('on')){
            $('#playbox').attr('class','');
            $('#playbox audio').get(0).pause();
        }else{
            $('#playbox').attr('class','on');
            $('#playbox audio').get(0).play();
        }
    }
}
