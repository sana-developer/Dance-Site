console.log("nav here")
$(document).ready(function(){
    $("svg").hide();
    let windowWidth = $(window).width();
    if(windowWidth >= 600){
        $("li").hide();
        $(".menu").show();
        $(".menu").click(function(){
            $("li").show();
            $(".menu").hide();
            $(".close").show();
        });
        $(".close").click(function(){
            $("li").hide();
            $(".menu").show();
            $(".close").hide();
        })
    }
  
  });