import { Component, OnInit } from '@angular/core';
declare var jQuery: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  	var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      addPhotosToCarousel(this.responseText, "Favorites");
    });
  	request.open('get','json/Favorites.json', true);
  	request.send();
  	jQuery('#myCarousel').carousel({
  	    interval: 6000
  	});
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
        img.className = "img-responsive center-block fullsize_img ";
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
