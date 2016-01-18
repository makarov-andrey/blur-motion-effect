$(function(){
    var $slider = $(".swiper-container");
    $slider.swiper({
        speed: 1000,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        pagination: ".swiper-pagination",
        paginationClickable: true
    });
    $slider.find(".swiper-wrapper").blurMotionEffect();
    $(".popup .content").blurMotionEffect(0.5);

    $(".popup-button").on("click", function(){
        $(".popup").addClass("opened");
        $(".wrapper").addClass("far-away");
        $slider.find(".swiper-wrapper").destroyBlurMotionEffect();
    });
    $(".overlay").on("click", function(){
        $(".popup").removeClass("opened").addClass("closed");
        $(".wrapper").removeClass("far-away");
        setTimeout(function(){
            $(".popup").removeClass("closed");
            $slider.find(".swiper-wrapper").blurMotionEffect();
        }, 500);
    });
});