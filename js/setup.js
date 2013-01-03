
/*-------------------------------------------------------------------------

Theme Name: SQUARED - version 1.0

For any questions concerning this theme please contact us through our 
profile page at themeforest.

-------------------------------------------------------------------------*/

//THEME SETUP//////////////////////////////////////////////////////////////

/*init-------------------------------------------------------------------*/

var startPage = "1"						//page to display upon loading
var ss_raster =  0						//raster image 0/1 - on/off
var appearOnLoad = 0					// content appear on load 0/1 - on/off
var scrollToTop = 1						//if content should scroll back to top  0/1 - on/off
var scrollSpeed = 'slow'				//scroll speed - possible values 'slow', 'normal', 'fast', or in millisecionds xxxx
var menuAppear = 0						//if menu should appear right away or once slides have loaded 0/1 - window.load/directly

/*supersized-------------------------------------------------------------*/

var ss_interval = 3000					// Length between transitions
var ss_transitionType = 3				// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
var ss_transitionSpeed = 700			// Speed of transition
var ss_largeCaption =  0				// Maker large caption appear or not 0/1 - on/off
var ss_pauseContentOpen = 1             // Pause slideshow when content opens

 
/*twitter details--------------------------------------------------------*/

var tweetUsers = ['udfrance'];    		// Your twitter accs, for multiple set ['account1, account2, account3'].Loads max 50 tweets from the last 7 days.
var noTweets ="3"					    //Number of tweets to load
var TweetsDisp = 3					    //Number of tweets to display at a time, possible values 1,2, or 3. 

/*folio details----------------------------------------------------------*/

var folio_items_per_page =  1			//Number of folio pages visible at once - only for paginated pages
var folio_start_page = 0				//What page to load by default
var lightboxTransition = 'elastic'		//Set lightbox transition type
var overlayOpacity =0.8					//Fancybox overlay opacity
var overlayColor = '#000'				//Fancybox overlay color	
var videoWidth = 750					//Fancybox video width
var videoHeight = 385					//Fancybox video height

/*blog details-----------------------------------------------------------*/

var blog_items_per_page =  1			//Number of blog pages visible at once - only for paginated pages


/*google map-------------------------------------------------------*/

//set map center
var mapLat = 40.71435						//set latitude - get lat/long @ http://universimmedia.pagesperso-orange.fr/geo/loc.htm
var mapLng = -74.00597						//set longitude
var mapZoomLevel = 12						//initial map zoom level
var mapWidth ="270px"
var mapHeight ="210px"

//main marker info
var mapTitle ="SQUARED studios"					//map title - title that displays when user clicks your map logo
var mapInfo	 ="5th avenue, something, somewhere"	//map info - info that displays when user clicks your map logo
var mapControl = true						//map combobox - allowing to switch between plan, satellite, + relief

//note: to add more markers open gmap.js

/*toggle/fade speeds-----------------------------------------------------*/

var hoverFadeSpeed = 'fast'  			//Portfolio/icons hover speed - Possible values: 'slow', 'normal', 'fast', or in milliseconds
var pageFadeSpeed = 400					//Page fade speed
var menuEase = 'easeInCubic'			//Ease type
var contentToggleSpeed = 'normal'		//Content toggle speed
var pageEase = 'easeInCubic'			//Ease type

/*Social network ids - only fill out the ids, not the full url-------------*/

var facebookPageID =""
var twitterID = ""
var myspaceID = ""
var flickrID =""
var youtubeID =""

/*Contact from messages----------------------------------------------------*/

var formError="There was an error sending your email. Please try again."
var formWarning ="Verify fields, and try again!"
var formSuccess ="Thanks, we got your mail and will get back to you in 48h!"
var formSuccessTitle ="Message sent"
var formReload ="Send us a mail and we will get back to you in 48 hours."
var formReloadTitle ="Got something to say..."


/*Internal linking variable DO NOT TOUCH------------------------------------*/
var goToPage