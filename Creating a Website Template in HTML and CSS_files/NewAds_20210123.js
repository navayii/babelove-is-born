﻿var isFirstTime = true;
//To update Banner/Link Ads View count
(function () {
    deferAds();
})();

function deferAds() {
    if (window.jQuery)
        domReadyAds();
    else
        setTimeout(function () { deferAds() }, 100);
}
function domReadyAds() {
    DisplayAds();
}

function UpdateAdViewCount(adId, bannerType) {
    jQuery.ajax({
        url: "https://adtrack.c-sharpcorner.com/AdViews/Record?adId=" + adId + "&type=" + bannerType,
        type: "POST",
        success: function () {
            //console.log("");
        }
    });
}

function GetLinkAds() {
    var adControls = jQuery('.linkAdContainer');

    // return if no ad controls available on page
    if (adControls.length == 0) return;

    var linkTrainingAdId = jQuery("#linkTrainingAd").data("adid") || -1;
    var maxAdCount = 2;
    jQuery.ajax({
        type: "POST",
        url: "/WebServices/CommonServices.asmx/GetMultipleLinkAds",
        data: "{adCount:" + maxAdCount + ",minorCategory:'" + jQuery("#ImgCategory").data("category") + "',linkTrainingAdId:" + linkTrainingAdId + ",isFirstTime:" + isFirstTime + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
           // var data = JSON.parse(response.d);


            response = { "d": "[{\"value\":{\"Id\":133,\"Title\":\"Download Free .NET \u0026 JAVA Files API\",\"Url\":\"/AdRedirector.aspx?AdId=133\u0026target=https://www.e-iceblue.com/download/free-products.html?aff_id=100\",\"Country\":\"All\"},\"Type\":\"LinkAd\"}]" }
            var data = JSON.parse(response.d);
            var o = { "Id": 143, "Title": "Try Free File Format APIs for Word/Excel/PDF", "Url": "/AdRedirector.aspx?AdId=133&target=https://products.conholdate.com/total/net/?utm_source=csharpcorner&utm_medium=text-link&utm_campaign=charpcorner-conholdate", "Country": "All" }
            data.push({ "value": o, "Type": "LinkAd" });
            data = data.filter(x => x.Type == "LinkAd");


            if (data.length > 0) {
                var AdData = [];
                var currentIndex = 0;
                //Getting Total LinkAds
                var totalLinkAds = 0
                jQuery(data).each(function (index, item) {
                    if (item.Type.toLowerCase() === "linkad") { totalLinkAds++ }
                });
                jQuery(data).each(function (index) {
                    if (totalLinkAds === 2 && index === 1) { return; }
                    if (data[index].value != null) {
                        var adIds = [];
                        if (data[index].Type === "LinkAd" && isFirstTime) {
                            var adHtml = "";
                            if (totalLinkAds === 2 && jQuery('.content-head-link').length > 0) {
                                for (var _i = 0; _i < 2; _i++) {
                                    var linkAds = data[_i].value;
                                    adIds.push(linkAds.Id);
                                    adHtml += "<div class='ad-items linkAdContainer'><div id='LinkAd_Container' class='LinkAd'>" +
                                    "<a href='" + linkAds.Url + "' data-AdId='" + linkAds.Id + "' class='linkAd LinkNormalBlue' target='_blank' >" + linkAds.Title + "</a></div></div>";
                                }
                                adHtml = "<div class='content-head-link clearfix'>" + adHtml + "</div>";
                                jQuery(adHtml).insertBefore(jQuery('.content-head-link')[0]);
                            }
                            else {
                                adIds.push(this.value.Id);
                                adHtml = "<div class='LinkAd'>" +
                                    "<a href='" + this.value.Url + "' data-AdId='" + this.value.Id + "' class='linkAd LinkNormalBlue' target='_blank' id='linkAd'>" + this.value.Title + "</a></div>";
                                jQuery(adControls[0]).html(adHtml);
                            }
                        }
                        else {
                            /*Link Training Ad*/
                            if (data[index].value != null && data[index].Type !== "LinkAd" && adControls.length > 1) {
                                if (Array.isArray(this.value)) {
                                    for (var t = 0; t < this.value.length; t++) {
                                        adIds.push(this.value[t].Id);
                                        var adHtml = "<div id='LinkAd_Container' class='LinkAd training'>" +
                                            "<a href='" + this.value[t].Url + "' data-AdId='" + this.value[t].Id + "' class='linkAd LinkNormalBlue' target='_blank' id='linkTrainingAd'>" + this.value[t].Title + "</a></div>";
                                        jQuery(adControls[adControls.length - 1]).html(adHtml);
                                    }
                                }
                                else {
                                    adIds.push(this.value.Id);
                                    var adHtml = "<div id='LinkAd_Container' class='LinkAd training'>" +
                                            "<a href='" + this.value.Url + "' data-AdId='" + this.value.Id + "' class='linkAd LinkNormalBlue' target='_blank' id='linkTrainingAd'>" + this.value.Title + "</a></div>";
                                    jQuery(adControls[adControls.length - 1]).html(adHtml);
                                }
                            }
                        }
                        //Update LinkAd View Count for each ad
                        for (var i = 0; i < adIds.length; i++) {
                            if (adIds[i] !== undefined) {
                                UpdateAdViewCount(adIds[i], "link");
                            }
                        }
                    }
                });
                isFirstTime = false;
                //jQuery.each(adControls, function (index, item) {
                //    currentIndex = (adControls.length > data.length && currentIndex >= data.length) ? 0 : currentIndex;
                //    AdData = data[currentIndex];
                //    //Prepare LinkAd HTML
                //    var addHtml = "<div id='LinkAd_Container' class='LinkAd'>" +
                //                "<a href='" + AdData.Url + "' class='linkAd LinkNormalBlue' target='_blank' id='linkAd'>" + AdData.Title + "</a></div>";
                //    jQuery("#" + this.id).html(addHtml);
                //    currentIndex++;

                //    //To update Ad view count
                //    UpdateAdViewCount(AdData.Id, "link");
                //});
            }
        }
    });
}
function GetNewsArticleAd() {
    var AdvertisementId = jQuery('#hiddenAdInfo').data('id') || -1;
    jQuery.ajax({
        type: "POST",
        url: "/WebServices/CommonServices.asmx/GetNewsArticleAd",
        data: "{minorCategory:'" + jQuery("#ImgCategory").data("category") + "',AdId:'" + AdvertisementId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (jQuery(r.d).find("img").length > 0) {
                jQuery('#NewsArticleAdBox').append(r.d).css({ 'height': '280px', 'width': '336px', 'overflow': 'hidden', 'position': 'relative', 'margin-bottom': '10px' });
                animateAds();
                //To update Ad view count
                var $bannerInfo = jQuery('#hiddenAdInfo');
                if ($bannerInfo.length > 0 && (typeof ($bannerInfo.data('id')) != 'undefined')) {
                    var adId = $bannerInfo.data('id');
                    UpdateAdViewCount(adId, 'banner');
                }
            }
            else {
                //jQuery('#NewsArticleAdBox').remove();
            }
        }
    });
}
function GetNewsArticleAdMiddle() {
    var AdvertisementId = jQuery('#hiddenAdInfo2').data('id') || -1;
    jQuery.ajax({
        type: "POST",
        url: "/WebServices/CommonServices.asmx/GetNewsArticleAdMiddle",
        data: "{minorCategory:'" + jQuery("#ImgCategory").data("category") + "',AdId:'" + AdvertisementId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (jQuery(r.d).find("img").length > 0) {
                jQuery('#NewArticleAdMiddle').append(r.d).css({ 'height': '280px', 'width': '336px', 'overflow': 'hidden', 'position': 'relative' });
                animateMiddleAds();
                //To update Ad view count
                var $bannerInfo = jQuery('#hiddenAdInfo2');
                if ($bannerInfo.length > 0 && (typeof ($bannerInfo.data('id')) != 'undefined')) {
                    var adId = $bannerInfo.data('id');
                    UpdateAdViewCount(adId, 'banner');
                }
            }
            else {
                //jQuery('#NewArticleAdMiddle').remove();
            }
        }

    });
}
function GetNewsArticleLargeAd() {
    var AdvertisementId = jQuery('#hiddenLargeAdInfo').data('id') || -1;
    jQuery.ajax({
        type: "POST",
        url: "/WebServices/CommonServices.asmx/GetNewsArticleLargeAd",
        data: "{minorCategory:'" + jQuery("#ImgCategory").data("category") + "',AdId:'" + AdvertisementId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (jQuery(r.d).find("img").length > 0) {
                //jQuery('#bannerLargeAd').html("").append(r.d);
                jQuery('#bannerLargeAd').append(r.d).css({ 'height': '600px', 'width': '336px', 'overflow': 'hidden', 'position': 'relative' });
                animatelargeAds();
                //To update Ad view count
                var $bannerInfo = jQuery('#hiddenLargeAdInfo');
                if ($bannerInfo.length > 0 && (typeof ($bannerInfo.data('id')) != 'undefined')) {
                    var adId = $bannerInfo.data('id');
                    UpdateAdViewCount(adId, 'banner');
                }
            }
        }
    });
}

function GetNewPremiumSponsors() {
    jQuery.ajax({
        type: "POST",
        url: "/WebServices/CommonServices.asmx/GetNewPremiumSponsors",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.d.length > 0) {
                jQuery('#PremiumSponsorsBox').append(r.d);
            }
            else {
                jQuery('#PremiumSponsorsBox').remove();
            }
        }
    });
}

function GetNewPremiumSponsorsTextAd() {
    jQuery.ajax({
        type: "POST",
        url: "/WebServices/CommonServices.asmx/GetNewPremiumSponsorsTextAd",
        data: "{minorCategory:'" + jQuery("#ImgCategory").data("category") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            if (r.d.length > 0) {
                jQuery('#PremiumSponsorTextAdBox').append(r.d);
            }
            else {
                jQuery('#PremiumSponsorTextAdBox').remove();
            }
        }
    });
}

// To display linkAds and BannerAds if required to show at current page.
var adCounter = 0;
function DisplayAds() {
    try {
        var linkAdContainer = jQuery('.linkAdContainer');
        var bannerAdContainer = jQuery('#NewsArticleAdBox');
        var bannerAdContainer2 = jQuery('#NewArticleAdMiddle');
        var premiumSponsorAd = jQuery('#PremiumSponsorsBox');
        var premiumSponsorTextAd = jQuery('#PremiumSponsorTextAdBox');
        var bannerLargeAd = jQuery("#bannerLargeAd");

        if (linkAdContainer.length > 0) {
            GetLinkAds();
        }
        if (bannerAdContainer.length > 0) {
            if (bannerLargeAd.length === 0) {
                jQuery('#NewsArticleAdBox').parent().append("<div id='bannerLargeAd'></div>");
            }
            GetNewsArticleAd();
        }
        if (bannerAdContainer2.length > 0) {
            //GetNewsArticleAdMiddle();
        }
        if (premiumSponsorAd.length > 0) {
            GetNewPremiumSponsors();
        }
        if (premiumSponsorTextAd.length > 0) {
            GetNewPremiumSponsorsTextAd();
        }
        GetNewsArticleLargeAd();
        //if (jQuery("#bannerLargeAd").length) {
        //    bindLargeAdScrollEvent();
        //}
    }
    catch (er) {
        console.log('Error while try to bind Ads at login js');
    }
}
var _bottom = 0, reachedBottom = false, _TotalLargeBannerScrolled = 0;
function bindLargeAdScrollEvent() {
    var prevAd = jQuery("#bannerLargeAd").prev();
    jQuery(window).scroll(function () {
        if (jQuery(document).height() - jQuery("#bannerLargeAd").parent().height() > jQuery("#bannerLargeAd").parent().height()) {
            var prevAdBottom = prevAd.offset().top + prevAd.height();
            var scrolledWindow = window.scrollY;
            if (window.scrollY > (jQuery(document).height() - jQuery(window).height() - 150)) {
                if (!reachedBottom) {
                    reachedBottom = true;
                    _TotalLargeBannerScrolled = window.scrollY;
                    _bottom = (jQuery(document).height() - (jQuery("#bannerLargeAd").offset().top + jQuery("#bannerLargeAd").height())) - 150;
                }
                jQuery("#bannerLargeAd").css({ "position": "fixed", "top": "", "bottom": (_bottom - (_TotalLargeBannerScrolled - scrolledWindow)) + "px" });
            }
            else if (scrolledWindow > prevAdBottom - 50) {
                reachedBottom = false;
                jQuery("#bannerLargeAd").css({ "position": "fixed", "top": "50px", "bottom": "" });
            }
            else {
                jQuery("#bannerLargeAd").css({ "position": "relative", "top": "" });
            }
        }
    });
}
var isLargeAdAnimation = false;
var isAdAnimation = false;
var isMiddleAdAnimation = false;
function animatelargeAds() {
    var isLargeAdAnimation = true;
    jQuery(jQuery(".large-ad-child")[1]).animate({ right: '50%' },
        {
            easing: 'swing',
            duration: 300,
            queue: true,
            complete: function () {
                if (isLargeAdAnimation) {
                    setTimeout(function () {
                        jQuery(jQuery(".large-ad-child")[0]).remove();
                    }, 800);
                }
                isLargeAdAnimation = false;
            }
        });
    jQuery(jQuery(".large-ad-child")[0]).css("right", "50%");
}
function animateAds() {
    var isAdAnimation = true;
    jQuery(jQuery(".ad-child")[1]).animate({ right: '0' },
        {
            easing: 'swing',
            duration: 300,
            queue: true,
            complete: function () {
                if (isAdAnimation) {
                    setTimeout(function () {
                        jQuery(jQuery(".ad-child")[0]).remove();
                    }, 800);
                }
                isAdAnimation = false;
            }
        });
    jQuery(jQuery(".ad-child")[0]).css("right", "0");
}
function animateMiddleAds() {
    var isMiddleAdAnimation = true;
    jQuery(jQuery(".middle-ad-child")[1]).animate({ right: '0' },
        {
            easing: 'swing',
            duration: 300,
            queue: true,
            complete: function () {
                if (isMiddleAdAnimation) {
                    setTimeout(function () {
                        jQuery(jQuery(".middle-ad-child")[0]).remove();
                    }, 800);
                }
                isMiddleAdAnimation = false;
            }
        });
    jQuery(jQuery(".middle-ad-child")[0]).css("right", "0");
}