
if(!browser.versions.mobile) {
  var hash = location.hash;
  if(!hash) hash = '';
  window.location.href="pc.html" + hash;
}

$(document).ready(function(){
  //$('section').height($(window).height());
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        mousewheelControl: true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            if((typeof pageHash == 'undefined') || pageHash != 'address') {
                swiperAnimate(swiper); //初始化完成开始动画
            }
        }, 
        onSlideChangeEnd: function(swiper){ 
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        } 
    });
    $('li.invitation').click(function(){
        mySwiper.slideTo(0, 1000, true);//切换到第一个slide，速度为1秒
    });

    $('li.address').click(function(){
        mySwiper.slideTo(2, 1000, true);//切换到第3个slide，速度为1秒
    });

    if((typeof pageHash != 'undefined') && pageHash == 'address') {
        //$('li.address').trigger('click');
        mySwiper.slideTo(2, 1000, true);//切换到第3个slide，速度为1秒
    }
});
