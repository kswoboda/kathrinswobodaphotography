import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import * as Isotope from 'isotope-layout/dist/isotope.pkgd.min.js';


@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	var request = new XMLHttpRequest();
  	request.onload = addCoverImages; // function to be called when request is sent
  	request.open('get', 'json/images.json', true);
  	request.send();


  	window.addEventListener("hashchange", function(e) {
  	  jQuery('#modal-fullscreen').modal('hide');
  	  if(window.location.hash.length > 1) {
  	    jQuery(".album_grid").hide();
  	    openAlbumDelayed(window.location.hash.replace("#", ""));
  	  } else {
  	    jQuery('#back_button').hide();
  	    removePhotos();
  	    jQuery(".album_grid").show();
  	  }
  	  jQuery("html, body").animate({
  	      scrollTop: 0
  	  }, 90);
  	});


  	if(window.location.hash.length > 1) {
  	  jQuery(".album_grid").hide();
  	  openAlbumDelayed(window.location.hash.replace("#", ""));
  	} else {
  	  jQuery('#back_button').hide();
  	}

  	// Remove all photos when modal is closed
  	// Documentation: http://getbootstrap.com/javascript/#modals-events
  	jQuery('#modal-fullscreen').on('hidden.bs.modal', function (e) {
  	  closeAlbum();
  	});

  	

  	//When close-button is pushed, closeAlbum() and hide the modal
  	jQuery('.close-button').on('click', function(){
  	  closeAlbum();
  	  jQuery('#modal-fullscreen').modal('hide');
  	});



  	jQuery('#gal-button').on('click', function(){
  	  jQuery(".album_grid").show();
  	  removePhotos();
  	  jQuery('#back_button').hide();
  	  window.location.hash = "";
  	});

  	jQuery('#myCarousel').carousel({
  	    interval: 4000,
        hover: false
  	});

  	jQuery('.grid').isotope({
  	    itemSelector: '.grid-item',
  	    masonry: {
  	      columnWidth: '.grid-sizer',
  	      percentPosition: true,
  	      gutter: 20
  	    }
  	  });

  	jQuery("#back_button").on("click", function() {
  		jQuery(".album_grid").show();
  		removePhotos();
  		jQuery('#back_button').hide();
  		window.location.hash = "";
  	});
  }

}




  





// Get the coverimage for each album dynamically using gitHub API
function addCoverImages() {
  var album = JSON.parse(this.responseText); // gitHub API returns JSON
  for (var i = 0; i < album.length; i++) {
    if(album[i].name != "Favorites"){ // adds all albums other than favorities album to album_grid
      var photoURL = album[i].coverimage;
      var photoID = album[i].name.replace(' ','_20');
      jQuery('.album_grid').append(
        '<button type="button" class="album_button animated fadeInLeft" id= '+ photoID +'>'
      );
      jQuery("#"+photoID).append(
        '<img class="album_photo" src='+ photoURL+' ></img>' +
        '<a class="album_name">' + album[i].name + '</a>'
      );

      jQuery('#'+photoID).unbind("click");

      // Add click listener to each album in album grid
      document.getElementById(photoID).addEventListener("click", function(){
        openAlbumDelayed(this.getAttribute('id').replace("_20", "%20"));
      });
    }
  }
}

function addPhotos(responseText, folderName){
  var photos = JSON.parse(responseText); // album that was clicked on
  var coverPast = 0;
  var ie = msieversion();
  var empty = jQuery('.grid').children().length;
  if (empty == 1) {
   for(var i = 0; i < photos.length; i++){    
       var photoURL = photos[i].url;

       var photoID = photos[i].url.substr(photos[i].url.lastIndexOf('/') + 1).replace("%20", "_20");
       var img = new Image();
       img.alt = "Photo";
       if(!ie) {
         img.className = "grid-item grid-item-img lazy " + photos[i].width;
         jQuery(img).attr("data-src", photoURL);
         img.src = "/assets/images/loading.gif";
       }
       else {
         img.src = photoURL;
         img.className = "ie";
       }
       img.id = photoID;
       img.onload = function () {
         jQuery('.grid').isotope('layout');
       }

       jQuery('.grid').append( img )
                 .isotope( 'appended', img );    
       setupModal(responseText, folderName, photoID, i+coverPast);
     }
     jQuery('.lazy').lazy();
  }
}

function setupModal(responseText, folderName, photoID, i) {
  if (photoID.length > 0) {
    document.getElementById(photoID).addEventListener("click", function(){
      closeAlbum();
      openPhotoCarousel(responseText, folderName);
      jQuery('#modal-fullscreen').carousel(i);
      jQuery('#modal-fullscreen').modal('show');
    });
  }
 
}

function removePhotos() {
  jQuery('.grid-item').remove();
  jQuery('.ie').remove();
  jQuery('#back_button').hide();

  jQuery(".center_column").addClass("col-md-offset-2");
  jQuery(".center_column").addClass("col-md-8");
  jQuery(".center_column").removeClass("col-md-12");
}

function openAlbumDelayed(folderName) {
  removePhotos();
  jQuery(".center_column").removeClass("col-md-offset-2");
  jQuery(".center_column").removeClass("col-md-8");
  jQuery(".center_column").addClass("col-md-12");
  jQuery(".album_grid").hide();
  jQuery('#back_button').show();
  setTimeout(function () { 
      openAlbum(folderName);
  }, 300);        
}

function openAlbum(folderName){
  var albumRequest = new XMLHttpRequest();
  console.log(folderName);
  albumRequest.addEventListener('load', function() {
  	window.location.hash = folderName;
  	addPhotos(this.responseText, folderName);
  });

  albumRequest.open('get', 'json/' + folderName + ".json", true);
  albumRequest.send();
}

function openPhotoCarousel(response, folderName){
  addPhotosToCarousel(response, folderName);
}

// Close carousel when close button is pushed and remove all images from carousel 
function closeAlbum(){
  console.log('closeAlbum');

  jQuery("#photos-in-carousel").empty();  
  jQuery('#photos-in-carousel').append('<div class="item active" id="item_active"></div>'); // get carousel ready to be filled again
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    {
        console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        return true;
    }
    else 
    {
        console.log('otherbrowser');
        return false;
    }
}

function addPhotosToCarousel(response, folderName){
  var photos = JSON.parse(response); // album that was clicked on
  for(var i = 0; i < photos.length; i++){
    var photoURL = photos[i].url;
    if(i == 0){ // first image is the active image
        jQuery('#myCarousel').carousel('pause');
        jQuery('#frame0').hide();
        var img = new Image();
        img.src = photoURL;
        img.className = "fullsize_img img-responsive center-block " + photos[i].url;
        img.onload=function(){
          jQuery('#frame0').fadeIn();
          jQuery('#myCarousel').carousel('cycle');
        };
        jQuery('#item_active').append(img);
    }
    else{ // rest of the images
      jQuery('#photos-in-carousel').append('<div class="item" id="frame'+i+'"></div>');

      var img = new Image();
      img.src = photoURL;
      img.className = "fullsize_img img-responsive center-block";
      img.onload=function(){jQuery('#frame' + i).fadeIn()};
      jQuery(img).appendTo(jQuery('#frame' + i));
    }
  }
}


