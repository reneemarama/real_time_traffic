  var module_3073658 = (function() {
    var __hs_messages = {};
    i18n_getmessage = function() {
      return hs_i18n_getMessage(__hs_messages, hsVars['language'], arguments); 
    };
    i18n_getlanguage = function() {
      return hsVars['language']; 
    };
// Auto offset body by header height
function setBodyTopPadding() {
  var headerHeight = $('.u3gm-header').height();
  headerHeight += 'px';  
  if (!$("body").hasClass("u3t-landing-page")) {
    $("body").css("margin-top", headerHeight);
  }  
}
setBodyTopPadding();
$(window).resize(function(){
  setBodyTopPadding();
});

// Initialize Offscreen Menu
$(document).ready(function() {
  var anchor = document.querySelectorAll('.hamburger-toggle');

  [].forEach.call(anchor, function(anchor){
    var open = false;
    anchor.onclick = function(event){
      $("html").toggleClass("menu-open");
      event.preventDefault();
      if(!open){
        this.classList.add('close');

        open = true;
      } else{
        this.classList.remove('close');

        $("html").toggleClass("menu-closing");
        setTimeout(function(){
          $("html").toggleClass("menu-closing");
        }, 800);

        open = false;
      }
    };
  }); 
});


// //load sajari search js
// (function() {
//   function setup(c,a,f){function g(){var a=[],b=function(){a.push(arguments)};b.arr=a;c.sajari=c.sajari||{};c.sajari.ui=c.sajari.ui||[];c.sajari.ui.push(b);return b}var d=a.createElement("link");d.href=f;d.as="script";d.rel="preload";d.crossorigin=!0;var e=a.createElement("script");e.async=!0;e.src=f;a.head.appendChild(d);a.head.appendChild(e);a=g();a.init=function(a){var b=g();b(a);return b};return a};
//   window.sajari = setup(window, document, "//cdn.sajari.net/js/integrations/website-search-1.4.js");
// }());

// //initialize sajari global search
// var searchBox = sajari.init({
//   mode: "search-box",
//   project: "1538415417356570100", // Set this to your project.
//   collection: "www-salsify-com-global", // Set this to your collection.
//   instantPipeline: "autocomplete", // Pipeline used as you type
//   inputPlaceholder: "Search", // Input element placeholder
//   maxSuggestions: 5, // Maximum number of suggestions to show
//   attachSearchBox: document.getElementById("nav-search-box") // DOM element to attach to
// });

// searchBox("sub", "pipeline.search-sent", function (_, query) {
//   window.location = "https://www.salsify.com/search-results?q=" + encodeURIComponent(query.q);
// });


// // initialize search button toggle
// $( ".menu-wrap #global-search" ).click(function() {
//   $("body" ).toggleClass( "search-open" );
// });

// $(document).click(function(a){
//   if($(a.target).closest("#nav-search-box input, .menu-wrap #global-search").length>0){
//   }
//   else{
//     $("body" ).removeClass( "search-open" );
//   }
// });

// Search
$('.search-icon').click( function() {
  $(".search").toggleClass("search-active"); 
  $(".menu").toggleClass("search-active-menu");
   $(".menu-wrap").toggleClass("search-menu");
  
});



console.log('U3GM Header JS Attached');


  })();
