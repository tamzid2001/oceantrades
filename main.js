//JavaScript Code

$(document).ready(function(){ 
    //navigation scroll smooth

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();  
        var target = this.hash;
        var $target = $(target);   

        
        /*=== Active Scroll Indicator ===*/ 
        const sections = document.querySelectorAll('section[id]'); 
        window.addEventListener('scroll', scrollActive);

        function scrollActive(){
            const scrollY = window.pageYOffset

            sections.forEach(current =>{
                const sectionHeight = current.offsetHeight
                const sectionTop = current.offsetTop - 70;
                sectionId = current.getAttribute('id'); 

                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    document.querySelector('.navbar-nav a[href*=' + sectionId + ']').classList.add('active')
                }else{
                    document.querySelector('.navbar-nav a[href*=' + sectionId + ']').classList.remove('active')
                }
            })
        }

        /*=== Smooth Scroll ====*/
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });   

    //Scroll Top Bar
    $(window).scroll(function(){
        if($(this).scrollTop() >= 500){
            $(".back-to-top").fadeIn(200);
        }else{
            $(".back-to-top").fadeOut(200);
        }
        $(".back-to-top").click(function(){
            $('body,html').animate({scrollTop:0}, 500);
        })
    })

    //search toggle button
    $(function(){
        $('.toggle-overlay').click(function(){
            $('.search-overlay').toggleClass('open');
        })
    })

    //Menu Toggle button
    $(".menu-toggle").click(function(){
        $('.menu-toggle').toggleClass('active');
    })

    //owl carousel
    $('.projects').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop:false
            }
        }
    }) 
})

var player = videojs('my-video', {
    autoplay: 'muted',
    fluid: true
  });

$(".services_name").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});