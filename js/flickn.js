/*global alert: false, console: false, Debug: false, document: false, jQuery: false, Image: false */
"use strict";
var s, flickn = {
	settings: {
		page: 1,
		per_page: 100,
		panda: 'ling+ling',
		url: 'http://api.flickr.com/services/rest/',
		api_key: '8822b7deebb83ceed7c96b11990522e8',
		method: 'flickr.panda.getPhotos',
		format: 'json',
		imageList: [],
		flckrList: [],
		error: ''
	},
	init: function () {
		s = this.settings;
	},
	buildURL: function () {
		return s.url + '?api_key=' + s.api_key + '&format=' + s.format + '&panda_name=' + s.panda + '&page=' + s.page + '&per_page=' + s.per_page + '&method=' + s.method;
	},
	checkJquery: function () {
		if (typeof jQuery === 'undefined') {
			s.error = 'Sorry but jQuery was not loaded.';
		}
	},
	getImageList: function () {
		this.checkJquery();
		if (!s.error) {
			var pandaURL = this.buildURL();
			jQuery.get(pandaURL, function () {
				alert('hi');
			}, 'jsonp');
		} else {
			alert(s.error);
		}
	}
};
flickn.init();
flickn.getImageList();
var photoList = [];
var userLink = [];
var currentPhoto = 0;
var numPhotos;
function jsonFlickrApi(rsp) {
	var i, photo, photoSrc, userSrc, div, txt;
	if (rsp.stat !== "ok") {
		return;
	}

	for (i = 0; i < rsp.photos.photo.length; i = i + 1) {
		photo = rsp.photos.photo[i];
		photoSrc = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
		userSrc = 'http://www.flickr.com/photos/' + photo.owner;
		photoList.push(photoSrc);
		userLink.push(userSrc);
	}
	numPhotos = photoList.length;
	// set initial view
	jQuery('#numPhotos').html(numPhotos);
	jQuery('#currentPhoto').html(currentPhoto+1);
	jQuery('#photoView').html('<img src="' + photoList[currentPhoto] + '" /><span id="owner">' + userLink[currentPhoto] + '</span>');
	// preload the next and last image so there is less wait time on next or prev click
	var img = new Image();
	img.src = photoList[currentPhoto + 1];
	var img2 = new Image();
	img.src = photoList[numPhotos - 1];
}

jQuery(document).ready(function () {
	// bind events to next and previous buttons onload
	jQuery('#nextPhoto').on('click', function () {
		currentPhoto++;
		if (currentPhoto >= numPhotos) {
			currentPhoto = 0;
		} else {
			// preload the next image so there is less wait time on next click
			var img = new Image();
			img.src = photoList[currentPhoto + 1];
		}
		// update the view
		jQuery('#photoView img').attr('src', photoList[currentPhoto]);
		jQuery('#owner').html(userLink[currentPhoto]);
		jQuery('#currentPhoto').html(currentPhoto+1);
	});
	jQuery('#prevPhoto').on('click', function () {
		currentPhoto--;
		if (currentPhoto < 0) {
			currentPhoto = numPhotos - 1;
		}
		// update the view
		jQuery('#photoView img').attr('src', photoList[currentPhoto]);
		jQuery('#owner').html(userLink[currentPhoto]);
		jQuery('#currentPhoto').html(currentPhoto+1);
	});
});