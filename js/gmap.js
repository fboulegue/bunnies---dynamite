/*Creating more markers

	1. Copy existing marker, replace number in consecutive order, start 2,3 etc. 
	2. Set corresponding variables in setup.js

*/

function initialize() {
	
	
				//CREATE MAP ----------------------------------------------------------------------
				
				var latlng = new google.maps.LatLng(mapLat, mapLng);
				var settings = {
					zoom: mapZoomLevel,
					center: latlng,
					mapTypeControl: mapControl,
					mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
					navigationControl: true,
					navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
					mapTypeId: google.maps.MapTypeId.ROADMAP};
				var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
				var contentString = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<div id="bodyContent">'+
					'<p style="margin-bottom:0px"><strong>'+mapTitle+'</strong></p>'+
					'<p>'+mapInfo+'</p>'+
					'</div>'+
					'</div>';
				var infowindow = new google.maps.InfoWindow({
					content: contentString
				});
				
				var companyLocation = new google.maps.MarkerImage('images/white/map_marker.png',
					//The marker size in pixels - image size.					  
					new google.maps.Size(100,50),
					//Image origin
					new google.maps.Point(0,0),
					//Image anchor location
					new google.maps.Point(50,50)
				);


				var companyPosition = new google.maps.LatLng(mapLat, mapLng);

				var companyMarker = new google.maps.Marker({
					position: companyPosition,
					map: map,
					icon: companyLocation,
					title:"",
					zIndex: 3});
				
				
				
				//Map click function
				google.maps.event.addListener(companyMarker, 'click', function() {
					infowindow.open(map,companyMarker);
				});
				
				
			}