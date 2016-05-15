if(browser.versions.mobile) {
  window.location.href="index.html"
}

$(document).ready(function(){
  //$('section').height($(window).height());
    var mySwiper = new Swiper ('.swiper-container', {
        mode: 'vertical',
        mousewheelControl: true,
        onFirstInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            if(!pageHash || pageHash != 'address') {
                swiperAnimate(swiper); //初始化完成开始动画
            }
        }, 
        onSlideChangeEnd: function(swiper){ 
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        } 
    });
    $('li.invitation').click(function(){
        mySwiper.swipeTo(0, 1000, true);//切换到第一个slide，速度为1秒
    });

    $('li.address').click(function(){
        mySwiper.swipeTo(2, 1000, true);//切换到第3个slide，速度为1秒
    });

    if(pageHash && pageHash == 'address') {
        $('li.address').trigger('click');
    }
});
