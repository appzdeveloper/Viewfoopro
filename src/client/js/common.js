/*  Notification JS  */

$(document).ready(function ()
{
    $("#notification_li").click(function ()
    {
        $("#profileContainer").hide();
        $("#notificationContainer").fadeToggle(3);
        $("#notification_count").fadeOut("slow");
        return false;
    });

    //Document Click hiding the popup 
    $(document).click(function ()
    {
        $("#notificationContainer").hide();
    });

});

/*  Profile JS  */

$(document).ready(function ()
{
    $("#profileLink").click(function ()
    {
        $("#notificationContainer").hide();
        $("#profileContainer").fadeToggle(3);
        return false;
    });

    //Document Click hiding the popup 
    $(document).click(function ()
    {
        $("#profileContainer").hide();
    });

});



/*  Gallery Template Page SideBar JS  */

$(window).load(function () {
    $("[data-toggle]").click(function () {
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    });

});

/***************/

/*  Navigation JS  */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

/******************/

/********* Add Class On Page Scroll ************/

$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 90) {
        $(".sidebar-block").addClass("sticky-top");
    } else {
        $(".sidebar-block").removeClass("sticky-top");
    }
});


/**************/

/********* PopUp JS ************/

$(document).ready(function () {
    $('#button').click(function (e) { // Button which will activate our modal
        $('#modal').reveal({// The item which will be opened with reveal
            animation: 'fade', // fade, fadeAndPop, none
            animationspeed: 600, // how fast animtions are
            closeonbackgroundclick: true, // if you click background will modal close?
            dismissmodalclass: 'close'    // the class of a button or element that will close an open modal
        });
        return false;
    });
});


/**********/

/********* Slider JS ************/

$(document).ready(function () {

//    $("#owl-demo").owlCarousel({
//        navigation: true, // Show next and prev buttons
//        slideSpeed: 150,
//        paginationSpeed: 400,
//        singleItem: true,
//        autoslide: false,
//        autoHeight: true
//
//    });

});

/**************/

/********* Publish PopUp Select Box JS ************/

$(function () {
    var Accordion = function (el, multiple) {

        this.el = el || {};
        this.multiple = multiple || false;
        // Variables privadas
        var links = this.el.find('.fa-angle-down');
        var links2 = this.el.find('.plusicon');
        // Evento
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown);
        links2.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown)
    }

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this),
                $next = $this.parent('div').next();
        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            //$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }
        ;
    }

    var accordion = new Accordion($('#accordion'), false);
    $('.mainfolderadd').click(function () {
        $('ul.accordion > li').removeClass('newcreate');
        var functionCall = "'" + $("#addnewfolder").val() + "'";
        //$('ul#addfolder').append('<li class="newcreate latest"><div class="link"><span onclick="displayTag('+functionCall+')">'+$("#addnewfolder").val()+'</span><i class="fa  fa-angle-down"></i></div><ul class="submenu"><li><div class="link sub_add"><span>Add New sub folder</span><i class="plusicon"></i></div><ul class="submenu"><input type="text" placeholder="Enter sub folder name" id="addnewsubfolder"><button class="add_btn subfolderadd">Add</button></ul></li></ul></li>');

        $('ul#addfolder').append('<li class="newcreate latest"><div class="link"><span onclick="displayTag(' + functionCall + ')">' + $("#addnewfolder").val() + '</span><i class="fa  fa-angle-down"></i></div><ul class="submenu"><li><div class="link addfolder sub_add"><i class="plusicon"></i><span>Add New sub folder</span></div><ul class="submenu"><input type="text" placeholder="Enter sub folder name" id="addnewsubfolder"><button class="add_btn subfolderadd">Add</button></ul></li></ul></li>');
        var accordion = new Accordion($('.newcreate'), false);
        $(this).parent().prev('div').removeClass('open');
        $(this).parent().hide();
      
        $('.subfolderadd').click(function () {
            var parentUl = $(this).parent().parent().parent();
            var text = parentUl.prev('div').children('span').text();
            if (parentUl.parent().hasClass("latest")) {
                var inputVal = $(this).prev('input').val();
                var functionCall = "'" + text + "/" + inputVal + "'";
                parentUl.append('<li onclick="displaysubtag(' + functionCall + ')"><a href="#">' + inputVal + '</a></li>');
            }
            //                $(this).parent().prev('div').removeClass('open');
            //                $(this).parent().hide();
        });
    });

    $('.subfolderadd').click(function () {
        var parentUl = $(this).parent().parent().parent();
        var text = parentUl.prev('div').children('span').text();
        var inputVal = $(this).prev('input').val();
        var functionCall = "'" + text + "/" + inputVal + "'";
        parentUl.append('<li onclick="displaysubtag(' + functionCall + ')"><a href="#">' + inputVal + '</a></li>');
//                $(this).parent().prev('div').removeClass('open');
//                $(this).parent().hide();
    });
});
function displayTag(text) {
    $(".select_btn").text(text);
    $(".btn-group").removeClass("open");
}
function displaysubtag(text) {
    $(".select_btn").text(text);
    $(".btn-group").removeClass("open");
}
$(".select_btn").click(function () {
    $(".btn-group").toggleClass("open");
});







