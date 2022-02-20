﻿
(function () {
    deferCommonPage();
})();

function deferCommonPage() {
    if (window.jQuery)
        domReadyCommonPage();
    else{
        setTimeout(function () { deferCommonPage() }, 100);
    }
}
function domReadyCommonPage() {
   
    if (document.body.contains(document.querySelector("#topAnnouncement"))) {
        return;
    } else {
        document.querySelector(".responsiveHeader").classList.add("fixed");
        document.querySelector("body").classList.add("header-fixed");
    }

   



    setTimeout(function () {
        loadFont('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap');
        loadFont('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');
    }, 0);
    
    
    jQuery('#btnMenuHamburger').on('click', function () {
        if (jQuery('#TopHeader').hasClass('open')) {
            jQuery('body').animate({ 'left': '0' }, {
                duration: 200,
                queue: false,
                complete: function () {
                    jQuery('body').removeClass('responsive');
                    jQuery('#TopHeader').removeClass("open");
                }
            });
        }
        else {
            jQuery('body').addClass('responsive').animate({ 'left': '220' }, {
                duration: 200,
                queue: false,
                complete: function () {
                    jQuery('body').addClass('responsive');
                    jQuery('#TopHeader').addClass('open');
                }
            });

        }
        return false;
    });

    //To make current section highlighted
    highlightActvieMenu();
}


function SearchClick(e) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        SearchContent(e);
    }
}
function SearchContent(e) {
    e.preventDefault();
    var searchTextBox = jQuery('#ctl00_HeaderHomeNewDesign_searchTextBox').length?jQuery('#ctl00_HeaderHomeNewDesign_searchTextBox'):jQuery("#searchTextBox");

    window.location.href = "/search.aspx?q=" + escape(searchTextBox.val().trim());

    //var searchText = jQuery('#ctl00_HeaderHomeNewDesign_searchTextBox').val().trim();
    //if (searchText.length === 0) {
    //    window.location.href = "/search";
    //    return;
    //}
    //searchText = searchText.trim().replace("c#", "csharp")
    //                            .replace("j#", "jsharp")
    //                            .replace("f#", "fsharp")
    //                            .replace("C#", "Csharp")
    //                            .replace("F#", "Fsharp")
    //                            .replace("++", "pp")
    //                            .replace(/  +/g, ' ')
    //                            .replace(/ +/g,'-')

    //var sectionName = 'articles';//default section type
    //try {
    //    var section = window.location.href.replace(/^https?:\/\//, '').split('/')[1];
    //    if ((section.toLowerCase() === 'uploadfile') || (section.toLowerCase() === 'article')) {
    //        var contentHeadingText = document.querySelector('div.article a.HeadingBold').textContent.trim() || document.querySelector('div.article a.HeadingBold').innerText.trim();
    //        sectionName = contentHeadingText.toLowerCase();
    //    }
    //    else {
    //        switch (section.split('-')[0].toLowerCase()) {
    //            case "breaking":
    //            case "general":
    //            case "editorial":
    //            case "news":
    //                sectionName = 'news';
    //                break;
    //            case "videos":
    //            case "video":
    //                sectionName = 'videos';
    //                break;
    //            case "blogs":
    //                sectionName = 'blogs';
    //                break;
    //            case "resources":
    //                var pathLength = window.location.href.replace(/^https?:\/\//, '').split('/').length;
    //                var pageName = window.location.href.replace(/^https?:\/\//, '').split('/')[pathLength - 1];
    //                if (pageName.toLowerCase() == 'aboutus.aspx') {
    //                    sectionName = 'articles'
    //                }
    //                else {
    //                    sectionName = 'resources'
    //                }
    //                break;
    //            case "interview":
    //            case "interviews":
    //                sectionName = 'interviews'
    //                break;
    //        }
    //    }

    //}
    //catch (ex) { }

    //var searchUrl = window.location.protocol + "//" + window.location.host + "/search/" + encodeURI(searchText);
    //window.location.href = (sectionName == "articles") ? searchUrl : searchUrl + "/" + sectionName;
}
//function SearchContent(e) {
//    e.preventDefault();
//    var searchText = jQuery('#HeaderSearch').val().trim();
//    if (searchText.length === 0) {
//        window.location.href = "/search";
//        return;
//    }
//    searchText = searchText.trim().replace("c#", "csharp")
//                                .replace("j#", "jsharp")
//                                .replace("f#", "fsharp")
//                                .replace("C#", "Csharp")
//                                .replace("F#", "Fsharp")
//                                .replace("++", "pp");

//    var sectionName = 'articles';
//    try {
//        var section = window.location.href.replace(/^https?:\/\//, '').split('/')[1];
//        if ((section.toLowerCase() === 'uploadfile') || (section.toLowerCase() === 'article')) {
//            var contentHeadingText = document.querySelector('body').dataset.section;
//            sectionName = contentHeadingText.toLowerCase();
//        }
//        else {
//            switch (section.split('-')[0].toLowerCase()) {
//                case "breaking":
//                case "general":
//                case "editorial":
//                case "news":
//                    sectionName = 'news';
//                    break;
//                case "videos":
//                case "video":
//                    sectionName = 'videos';
//                    break;
//                case "blogs":
//                    sectionName = 'blogs';
//                    break;
//                case "resources":
//                    var pathLength = window.location.href.replace(/^https?:\/\//, '').split('/').length;
//                    var pageName = window.location.href.replace(/^https?:\/\//, '').split('/')[pathLength - 1];
//                    if (pageName.toLowerCase() == 'aboutus.aspx') {
//                        sectionName = 'articles'
//                    }
//                    else {
//                        sectionName = 'resources'
//                    }
//                    break;
//                case "interview":
//                case "interviews":
//                    sectionName = 'interviews'
//                    break;
//            }
//        }

//    }
//    catch (ex) { }

//    var searchUrl = window.location.protocol + "//" + window.location.host + "/search/" + encodeURI(searchText);
//    window.location.href = (sectionName == "articles") ? searchUrl : searchUrl + "/" + sectionName;
//}


//function highlightActvieMenu() {
//    try {
//        var path = window.location.href.replace(/^https?:\/\//, '').split('/')[1];
//        var hostName = window.location.hostname;
//        var activeCategory = hostName + '/' + path.toLowerCase();
//        if ((path.toLowerCase() === 'uploadfile') || (path.toLowerCase() === 'article')) {
//            var contentHeadingText = document.querySelector('body').dataset.section;
//            activeCategory = hostName + '/' + contentHeadingText.toLowerCase();
//        }
//        else {
//            switch (path.split('-')[0].toLowerCase()) {
//                case "technologies":
//                    activeCategory = hostName + '/technologies';
//                    break;
//                case "breaking":
//                    activeCategory = hostName + '/news';
//                    break;
//                case "general":
//                    activeCategory = hostName + '/news';
//                case "editorial":
//                    activeCategory = hostName + '/news';
//                    break;
//                case "news":
//                    activeCategory =(path!=='editorial-feedback')?hostName + '/news':"/articles";

//                    break;
//                case "videos":
//                case "video":
//                    activeCategory = hostName + '/videos';
//                    break;
//                case "blogs":
//                    activeCategory = hostName + '/blogs';
//                    break;
//                case "code":
//                    activeCategory = hostName + '/code';
//                    break;
//                case "interview":
//                case "interviews":
//                    activeCategory = hostName + '/interviews';
//                    break;
//                case "":
//                    activeCategory = hostName;
//                    break;
//            }
//        }

//        var activeMenuItem = document.querySelector('ul.nav li a[href*="' + activeCategory + '"]');
//        if (activeMenuItem !== null) {
//            activeMenuItem.classList.add('active');
//        }
//    }
//    catch (err) {
//        console.log('Error while trying to highlight active menu');
//    }
//}

function highlightActvieMenu(){
    try {
        var path = window.location.href.replace(/^https?:\/\//, '').split('/')[1];
        var hostName = window.location.hostname;
        var activeCategory = hostName + '/' + path.toLowerCase();
        if ((path.toLowerCase() === 'uploadfile') || (path.toLowerCase() === 'article')) {
            var contentHeadingText = document.querySelector('body').dataset.section;
            activeCategory = hostName + '/' + contentHeadingText.toLowerCase();
        }
        else {
            switch (path.split('-')[0].toLowerCase()) {
                case "technologies":
                    activeCategory = hostName + '/technologies';
                    break;
                case "breaking":
                    activeCategory = hostName + '/news';
                    break;
                case "general":
                    activeCategory = hostName + '/news';
                case "editorial":
                    activeCategory = (path !== 'editorial-feedback') ? hostName + '/news' : "/articles";
                    break;
                case "news":
                    activeCategory = hostName + '/news';
                    break;
                case "videos":
                case "video":
                    activeCategory = hostName + '/videos';
                    break;
                case "blogs":
                    activeCategory = hostName + '/blogs';
                    break;
                case "code":
                    activeCategory = hostName + '/code';
                    break;
                case "interview":
                case "interviews":
                    activeCategory = hostName + '/interviews';
                    break;
                case "":
                    activeCategory = hostName;
                    break;
            }
        }
        var activeMenuItem = document.querySelector('ul.headerMenu li a[href*="' + activeCategory + '"]');
        if (activeMenuItem !== null) {
            if (document.querySelectorAll('ul.headerMenu li a.active').length > 0) {
                document.querySelector('ul.headerMenu li a.active').classList.remove('active');
            }
            activeMenuItem.classList.add('active');
        }
    }
    catch (err) {
      console.log('Error occured while highlighting menu');
    }
}

function adjustShareIconsPositions(isFirstTime)
{
    var windowWidth = jQuery(window).width();
    var innerContentWidth = jQuery('.page-body').width();
    var positionLeft = (((windowWidth -innerContentWidth) / 2) - 56);
    var positionTop = (jQuery(window).height() / 2) - 120;

    if(jQuery('.user-content').length > 0) {
     positionTop =(jQuery('.user-content').offset().top > 280) ? 320: positionTop;
    }
    
    if (parseInt(windowWidth) < 1206)
    {
        jQuery('.cotent-share-icon ul:not(.emotions-wrapper)').removeAttr('style');
    }
    else {
        if (isFirstTime) {
            jQuery('.cotent-share-icon ul:not(.emotions-wrapper)').css({ "left": ((positionLeft<0)?0:positionLeft), "top": positionTop });
        }
        else {
            jQuery('.cotent-share-icon ul:not(.emotions-wrapper)').animate({
                left: ((positionLeft<0)?0:positionLeft),
                top: positionTop
            }, 1000);
        }
    }
}

function loadConfirmationStyles() {
    if (jQuery('#confirmationPopupStyles').length < 1) {
        var stylesClasses = "<style id='confirmationPopupStyles' type='text/css'> #confirmOverlay{width: 100%; height: 100%; position: fixed; top: 0;left: 0; background:rgba(0,0,0,0.3); z-index:9999;}";
        stylesClasses += "#confirmBox{ position:absolute; left:0; right:0; top:22%; margin:0 auto; transform:translateY(-50%); -webkit-transform:translateY(-50%); -moz-transform:translateY(-50%); -ms-transform:translateY(-50%); -o-transform:translateY(-50%); width:98%; max-width:400px; background: #fff; }";
        stylesClasses += "#confirmBox h1 {background: #0086dc;padding: 3px 10px;color: #fff!important;margin: 0px;font-weight: normal;font-size: 18px;line-height: 24px;padding: 6px 0;text-align: center;}";
        stylesClasses += "#confirmBox p {padding: 10px;margin: 0px;font-size: 15px;}";
        stylesClasses += "#confirmButtons{padding: 10px 10px 20px 10px; text-align: right;}"
        stylesClasses += "#confirmBox .button{line-height: 30px; font-size: 16px; vertical-align: middle;background: #0086dc;border: none;color: #fff !important; text-decoration: none;cursor: pointer; display: inline-block; margin: 0px 10px 0px 0px; padding:2px 8px;min-width:60px;text-align:center;}";
        stylesClasses += "#confirmBox .button:hover{background: #f60;border: none;color: #fff !important;cursor: pointer;}";
        stylesClasses += ".disablebutton{line-height: 30px;padding: 0 10px 3px 10px;font-size: 17px; vertical-align: middle; background: #a6a6a6; border: none; color: #fff !important;cursor: default; display: inline-block;}";
        stylesClasses += "#confirmBox .button:last-child{ margin-right: 0;} </style>";
        jQuery('head').append(stylesClasses);

    }
}

function getAdditionHeight() {
    //socail share icons : this function will be called in content detail related scripts
    //Reduce addition hight from .user-content top offset
    var headerAdHeight = jQuery("#ctl00_ad728X90").length && jQuery("#ctl00_ad728X90").outerHeight();
    var contentDescriptHeight = jQuery("#ArticleSummary").length && jQuery("#ArticleSummary").outerHeight();
    contentDescriptHeight = (contentDescriptHeight === 0) ? (jQuery("#ContentSummery").length && jQuery("#ContentSummery").outerHeight()) : contentDescriptHeight;
    var additionalHeight = headerAdHeight + contentDescriptHeight;
    return additionalHeight;
}
