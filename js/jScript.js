	
$(document).ready(function(){

	
	//VARIABLES -------------------------------------------------------------------------/
	
	var navTarget = "ul#nav li a"  																				//menu link to target
	var activeNavItem 																							//stores id of clicked menu item
	var contentHolder = "#content-wrapper"																		//specify gobal content holder
	var header ="#header #inner"																				//specify sidebar
	var menu ="#navContainer"
	var iconWidth = 120																							//image hover icon width
	var iconHeight = 20																							//image hover icon width
	var targetHover																								//image/videos- stores hover target ref.
	var widthRef																								//image/videos- stores img/video width ref.
	var postStatus = 0																							//blog - stores post open/closed status
	var rdId																									//blog - read more id
	var postNo																									//blog - post number to call
	var contentState =0

	//CUFON CALLS -----------------------------------------------------------------------/
	
	//set all font
	Cufon.replace('h1,h2,h3,h4,h5,h6,.name,.comment_name,.dateDay,.dateMonthYr,.pageHeading,#s_ind, .slidenumber, .totalslides',{fontFamily: 'league gothic'}); 											
	
	//INIT -SET -------------------------------------------------------------------------/
	
	//html/wrapper
	if(appearOnLoad == 0) $('html').css({overflow:'hidden'});													//ie7 fix
	if(appearOnLoad == 0) $('#wrapper').css({overflow:'hidden'});												//hide overflow					 
	
	//pattern overlay - check if raster is on/of
	if(ss_raster==0){
		$('#wrapper').addClass('raster');																		//add raster if 0, else remove
	}else{
		//nothing
	}
	
	//set orig. pos of header, menu & content - for non js
	/*$(header).css({left:'-980px'});
	$(menu).css({left:'-940px'});
	$(contentHolder).css({left:'-980px'});	*/
	
	 //show toggle but immediately
	 if(menuAppear ==1) $('#toggleBut').fadeIn();

	
		
					
	//FUNCTIONS-------------------------------------------------------------------------/
	
	
	//scroll to top function - call as necessary
	var toTop = function(){

		//scrollToTop 
		if(scrollToTop = 1)$('#wrapper').animate({scrollTop:0},scrollSpeed);
				
	}

	
	//open content function - call as necessary
	var contentOpen = function(){
		
		//toggleBut effects
		$('#toggleBut div').fadeOut('fast');
		$('#toggleBut').stop().animate({width:'40px'});	
		$('#toggleBut').addClass('toggleButActive');
		
		$('.load-item,#navArrows, .captionContainer,#s_ind').fadeOut('normal',menuEase, function(){
				$(menu).stop().animate({left:'0px'},contentToggleSpeed, menuEase);											//toggle menu										   
				$(header).stop().animate({left:'0px'},contentToggleSpeed, menuEase);										//toggle header
				$(contentHolder).show().stop().animate({left:'0px'}, contentToggleSpeed,pageEase, function (){ 				 //toggle content
				
					$('html').css({overflow:'auto'});																		//ie7 fix
					$('#wrapper').css({overflow:'auto'});																	//make scroll bar reappear
																											
				});					
				
		});
			
		
		if(ss_pauseContentOpen==1) api.playToggle();															// resume slideshow when content closes
		return false;	
	
	};

	//close content function - call as necessary
	var contentClose = function(){
		
		$('#toggleBut').removeClass('toggleButActive')
	
		$(menu).stop().animate({left:'-980px'},contentToggleSpeed, menuEase);
		$(header).stop().animate({left:'-980px'},contentToggleSpeed, menuEase);
		$(contentHolder).stop().animate({left:'-980px'}, contentToggleSpeed,pageEase, function(){		//hide content once animation is done, deactivate scrollbar
				
				
				$('#wrapper').animate({scrollTop:0},0);
				$('.load-item,#navArrows, .captionContainer,#s_ind').delay(contentToggleSpeed).fadeIn('normal',menuEase); 
				$(menu).stop().animate({left:'-940px',width:'1025px'},contentToggleSpeed, menuEase,function(){
																											
						$('#toggleBut').animate({width:'85px'});
						$('#toggleBut div').delay(200).fadeIn('fast');
				});
					
		});										
			
		
		$('html').css({overflow:'hidden'});																		//ie7 fix
		$('#wrapper').css({overflow:'hidden'});																	//make scroll bar reappear
		if(ss_pauseContentOpen==1) api.playToggle();															// resume slideshow when content closes
		return false;		   	 	
				
	
	};
	
	var initScrollers =  function(){
	
		$("#client-scroller").thumbnailScroller({ 
				scrollerType:"clickButtons", 
				scrollerOrientation:"horizontal", 
				scrollSpeed:2, 
				scrollEasing:"easeOutCirc", 
				scrollEasingAmount:600, 
				acceleration:4, 
				scrollSpeed:800, 
				noScrollCenterSpace:10, 
				autoScrolling:0, 
				autoScrollingSpeed:2000, 
				autoScrollingEasing:"easeInOutQuad", 
				autoScrollingDelay:500 
			});  

	}
	
	//WINDOW LOAD FUNCTIONS ------------------------------------------------------------/
	
	$(window).load(function () {
							 
		//RECENT CLIENT SCROLL 
		$('.jTscrollerContainer,.jThumbnailScroller.h_ButScroll .jTscrollerPrevButton,.jThumbnailScroller.h_ButScroll .jTscrollerNextButton').fadeIn();
		//hide loading texts
		$('.scrollerLoader').remove();
	
     	initScrollers();
		 
		 //show toggle but once content loaded
		 if(menuAppear ==0) $('#toggleBut').fadeIn();
	  
	 
	});
	
	//PAGINATION ----------------------------------------------------------------------/
	
	//init pajinate containers - add containers as necessary
	$('#folioContainer4').pajinate({start_page : folio_start_page, items_per_page : folio_items_per_page})    	//initialize pagination of folio items
	$('#blogContainer').pajinate({start_page : 0,items_per_page : blog_items_per_page});     					//initialize pagination of blog items
	
	
	//TO TOP BUTTON-----------------------------------------------------------------/
	
	$('#toTop').click(function(){
		
		toTop();
							   
	 });
	

	//TOGGLE CONTENT ------------------------------------------------------------------/


	//TOGGLE BUTTON
	
	$('#toggleBut').click(function() {
		
		if(contentState==0){																					//check content state																																
															
		  contentOpen();																						//open content
		  $(this).css({backgroundPosition:'0px -40px'});
		  contentState = 1																						//indicate content is open
		  
		}else{
			
		  contentClose();	
		 $(this).css({backgroundPosition:'0px 0px'});
		  contentState = 0
		}
		
	});
	
	//CHECK INITIAL STATUS
	if(appearOnLoad==1){
		
		  $('#toggleBut').css({backgroundPosition:'0px -40px'});
		  contentState = 1	
	
	}
	
	
	//SLIDER CAPTIONS FUNCTIONS
	$('#slidecaption, #slidecaption-grande').click(function() {
			
		//alert(goToPage)
		
		if(goToPage != ''){
			
			//set page to display
			$(contentHolder).children('.content').hide();
	 		$(contentHolder).children("#page_"+goToPage).show();
			
			//use page id to set active clicked menu item
			activeNavItem = '_'+ goToPage
		
			//content function
			switchContent();
		
		} else{
		
			//nothing
			
		}
		
		//open content
		contentOpen();
		
		//swtich background of toggle but
		$('#toggleBut').css({backgroundPosition:'0px -40px'});
		
		//set content state for reference
		contentState = 1

	});
	
	//INTERNAL LINKS
	
	$('.internalLink').click(function() {

		
		if($(this).attr('rel') != ''){
			
			//get the that refers to page to load
			var linkID = $(this).attr('rel');
			
			//use page id to set active clicked menu item
			activeNavItem = '_'+ linkID
		
			//content function
			switchContent();
		
		} else{
		
			//nothing
			
		}
		

	});

	
	//MAIN MENU - PAGE SWITCH -------------------------------------------------------------------------/


	//SET MENU ITEM IDs
	
	 $(navTarget).each(function(i){
		i++						
   		this.id = this.id +"_" +i ;
	 });
	 
	 
	 //SET PAGE ITEM IDs
	 
	 $(contentHolder).children('.content').each(function(i){
		i++													 
   		this.id = this.id + "page" +"_" + i;
	 });
	 
	 //HIDE PAGES & SHOW P1
	 $(contentHolder).children('.content').hide();
	 $(contentHolder).children("#page_"+startPage).show();
	 
	//SET PAGE TO LOAD
	
	$('#_'+startPage).addClass('active');
	
	
	//SUB MENU ITEM IDs

	/*initial submenu state*/
	$('ul.submenu').css({opacity:1,top:'30px'}).hide();	
	
	/*parent hover actions*/
	$("ul#nav li").hover(
	
		function(){
			
				$(this).children('ul.submenu').show().stop().animate({opacity:1,top:'38px'},'fast');	
			
		},
		
		function(){
			
				$(this).children('ul.submenu').css({left:'0', marginLeft:'0'}).stop().animate({opacity:0,top:'30px'},'normal', function(){ 																														
						
					$(this).parent().children('ul.submenu').hide();
						
			});	
			
	});
	


	//MENU CLICK FUNCTION
	
	 $(navTarget).click(function() {

		//ensure link isnt clickable when active
		if ($(this).hasClass('active')) return false;
		
		//get id of clicked item
		activeNavItem = $(this).attr('id');
		
		//call the page switch function
		switchContent();
		
		
	
	});
	 
	 
	 //CONTENT SWTICH FUNCTION
	 
	 var switchContent = function (){
		 
			
			//set previous and next link & page ids
			var PrevLink = $(navTarget+'.active')
			$(PrevLink).removeClass('active');
			var PrevId = $(PrevLink).attr('id');
			//alert(PrevId)
			
			var NextLink = $('#'+activeNavItem).addClass('active');
			var NextId = activeNavItem
			//alert(NextId);
			
			//set markers
			var prevPage = $("#content-wrapper").children("#page"+PrevId);
			var nextPage = $("#content-wrapper").children("#page"+NextId);	
			
			$(prevPage).css({opacity:1});
			$(nextPage).css({opacity:0});
			
			//run ie fix for animating cufon text
			$(prevPage).children().each(function(){
				//$('._original').stop().animate({opacity:1},pageFadeSpeed);												
			 })
			
			//fade out previous + call things once done
			$(prevPage).stop().animate({opacity:0},pageFadeSpeed, function(){
				
				
				//scroll to top
				toTop();
				//animation done, hide previous page
				$(this).hide();
				//show the next page
				$(nextPage).show();
				
				//check page has map
				if(nextPage.has('.gMap').length){

					//init google map
					initialize();
					//set size
					$('#map_canvas').css({width:mapWidth, height:mapHeight});
							
				}
				
				if(nextPage.has('.jThumbnailScroller').length){
				
					//alert('yes')
					initScrollers();
				
				}
				
				//fade it in
				$(nextPage).animate({opacity:1},pageFadeSpeed);
				//run ie fix for animating cufon text -
				$(nextPage).children().each(function(){	
					//$('._original').stop().animate({opacity:1},pageFadeSpeed);				
				
				 })
			})
			
	};	
	 
	 

	
	//IMGES& VIDEO -------------------------------------------------------------------------------/
	
	
	
	//FANCYBOX INIT  - DO NOT EDIT------------------------------/
	
	//init fancybox - image handling
	$("a._imageThumb, a._scrollThumb").fancybox({
				'transitionIn'		: lightboxTransition,
				'transitionOut'		: lightboxTransition,
				'titlePosition' 	: 'over',
				'padding'			: '0',																		
				'overlayOpacity'    : overlayOpacity,
				'overlayColor'      : overlayColor,
				'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {  
				

						var obj = currentArray[ currentIndex ];
				
				
						//CASE 1: thumb has associated html content
						if($(obj).next().hasClass('fancybox-html')){
							
							//check if stack order should be displayed
							
							if ($(obj).next().length && $(obj).attr('rel')){
							
								return  '<span id="fancybox-title-over">' + '<div class="fbnum"> Image:'+(currentIndex + 1) + ' / ' + currentArray.length+'</div>'+($(obj).next().html()) + '</span>';
							
							}else {
								
								return  '<span id="fancybox-title-over">' + ($(obj).next().html()) + '</span>';
							
							}
							
						
						//CASE 2:  thumb is a part of a group and has a title only
						} else if($(obj).attr('rel') && $(obj).attr('title')){

							return  '<span id="fancybox-title-over">' + '<div class="fbnum" style="margin-bottom:0px"> Image:'+ (currentIndex + 1) + ' / ' + currentArray.length + '</div> '+ (title.length?''+title:'') + '</span>';
							
						
						//CASE 3: thumb has no info but belongs to group
						} else if($(obj).attr('rel')) {
						
							return  '<span id="fancybox-title-over">' + '<div class="fbnum" style="margin-bottom:0px"> Image:'+(currentIndex + 1) + ' / ' + currentArray.length+'</div>'+'</span>';
						
						
						//CASE 4: thumb has a title only
						} else if($(obj).attr('title')) {
						
							//if image is not associated with group, hide image numbering
							return  '<span id="fancybox-title-over">' +(title.length ?''+title :'') + '</span>';
							
						
						//CASE 5: no info & does not belong to group
						}else{
							
							// hide title overlay
							$('#fancybox-title-over').hide();
							
						}
					
					},
				
				
				//animate image info on complete
				'onComplete':function(){
				
						$('#fancybox-title-over').hide().fadeIn('slow');
				}
				
			     
				
	});
	
	
	
	//init fancybox - video handling
	$("a._videoThumb").fancybox({
                  'transitionIn'        : lightboxTransition,
                  'transitionOut'       : lightboxTransition,
				  'padding'			    : '0',																	
				  'width'			    : videoWidth,
				  'height'				: videoHeight,
				  'overlayOpacity'      : overlayOpacity,
				  'overlayColor'        : overlayColor,
                  'autoscale'           : 'true',
                   'type'               : 'swf',
				  'swf'           		: {
				  'wmode'             	: 'transparent',
				  'allowfullscreen'  	: 'true'
										   }

        }); 
	
	
	
	//SCROLLER THUMB ACTIONS --------------------------------------/
	
	$('._scrollThumb-ind').css({bottom:'-25px', opacity:0});
	
	$("._scrollThumb").hover(
	
		function(){
			
			 $(this).children('._scrollThumb-ind').stop().animate({bottom:'15px', opacity:1});
			
		},
		
			function(){
				$(this).children('._scrollThumb-ind').stop().animate({bottom:'-25px',opacity:0});
			
		});
	
	
	
	//FOLIO + IMAGE THUMB ACTIONS --------------------------------------/
	
	//set initial opacity of icon, thumb txt, and rollover
	$("._hoverIcon").css({opacity:0});
	$("._thumb-ind").css({opacity:0});
	$("._rollover").css({opacity:0});
	
	
	 //iterrate over all image frames - set hover w/h, shadow w/h
	$(".image_frame").each(function(){
		
		
		var mW = $(this).children('img').width();		
		var mH = $(this).children('img').height();	
		
		//set w/h of hover effects based on image w/h
		if($(this).has('a').length)$(this).children('a').css({width:mW,height:mH});			
   		if($(this).has('._rollover').length) $(this).children('._rollover').css({width:mW,height:mH});	
		if($(this).has('._hoverIcon').length) $(this).children('._hoverIcon').css({width:mW,height:mH});	
		if($(this).has('._thumb-ind').length) $(this).children('._thumb-ind').css({width:mW, 'margin-top':mH/2 +iconHeight/2});
		if($(this).has('._imageQuote').length) $(this).children('._imageQuote').css({width:(mW/3)-40/*padding*/, height:mH-40/*padding*/});	
		if($(this).has('._imageQuote-2').length) $(this).children('._imageQuote-2').css({width:(mW/3)-40/*padding*//*, height:mH-40padding*/});
		
		
		//resize drop shadow if in use
		if($(this).parent().children().hasClass('drop_shadow')){
			
			//set image aspect ratio - change as necessary
			var aspectRatio = 600/40
			var sH = mW/aspectRatio
			
			$(this).parent().children('.drop_shadow').css({width:mW, height:sH});
		}
	 });
	 
	 
	 //iterrate over all video frames - shadow w/h
	 $(".video_frame").each(function(){
		
		var mW = $(this).children('iframe').width();		
		var mH = $(this).children('iframe').height();	
		
		//resize drop shadow if in use
		if($(this).parent().children().hasClass('drop_shadow')){
			
			//set image aspect ratio - change as necessary
			var aspectRatio = 600/40
			var sH = mW/aspectRatio
			
			$(this).parent().children('.drop_shadow').css({width:mW, height:sH});
		}
	 });


	/*image hovers - add addtional hover icon classes here*/
	
	var mW 	//media width
	var mH  //media height
	var cW 	//center width
	var cH 	//center height
	
	$("._imageThumb,._blogThumb,._videoThumb").hover(

			function() {
				
				//get current values
				 mW = $(this).width();		
				 mH = $(this).height();	
				 cW = mW/2;		
				 cH = mH/2;
				
				//get target selector to animate
				targetHover = $(this).parent().children('._rollover');
				
				//center the rollover based on width and height
				$(targetHover).css({width : cW, height : cH, 'margin-top' :(mH/2)-(cH/2), 'margin-left' :(mW/2)-(cW/2),opacity:0});

			   //animate
				$(targetHover).stop().delay(100).animate({width:mW, height:mH, 'margin-top' :'0px', 'margin-left' : '0px' ,opacity:.8}, hoverFadeSpeed);
				
				//get reference width of image used
				widthRef = $(this).parent().children('._original').height();
				
				if($(this).parent('.image_frame')){
					
					//hide the icon and move it up a bit
					$(this).parent().children('._hoverIcon').css({'margin-top':'-20px',opacity:0},200);
					
					//animate the icon to the position
					$(this).parent().children('._hoverIcon').stop().delay(300).animate({'margin-top':'0px', opacity:1}, 200);
					
					//fade in thumb indication
					$(this).parent().children('span').stop().delay(300).animate({opacity:1}, 200);
																																   
				}
				
		},
			function() {
				
				//get values 
				 mW = $(this).width();		
				 mH = $(this).height();	
				 cW = mW/2;		
				 cH = mH/2;
				
				//set target selector
				targetHover = $(this).parent().children('._rollover')
				
				//recenter the rollover based on width and height
				$(targetHover).delay(150).stop().animate({width : cW, height : cH, 'margin-top' :(mH/2)-(cH/2), 'margin-left' :(mW/2)-(cW/2), opacity:0},200);
				
				if($(this).parent('.image_frame')){
					
					//fade out thumb indication
					$(this).parent().children('span').stop().animate({opacity:0}, 200);
					
					//animate logo upwards
					$(this).parent().children('._hoverIcon').stop().animate({opacity:0}, 200);
					
				}
				
		});

	
		//SOCIAL ------------------------------------------------------------------------------/
		
		$("._rollover-social").hover(
			function() {
				$(this).stop().animate({"opacity": "1"}, hoverFadeSpeed);
		},
			function() {
				$(this).stop().animate({"opacity": "0"}, hoverFadeSpeed);
		});
	
		
	
		
		//BLOG -------------------------------------------------------------------------------/

		
		//read more click functions
		$('.r-more').click(function() {
				
				//get id of read more link
				rdId = $(this).attr('id');
				
				//get the number from the id
				postNo = rdId.substr(rdId.length - 2);
				
				//check that post is closed
				if (postStatus ==0){		
					
					$('#blogContainer').animate({marginLeft:'-598px', opacity:0}, function(){															   
							
							//enter the pose close button
							$('.post_close').show();
							$('.post_close').stop().animate({backgroundPosition:'-17px'}, 200);
							
							//hide the blog container as its not in use
							$('#blogContainer').hide();
							
							//swtich post status
							postStatus=1;	
							
							//call our post content associated with the read more that was clicked
							$(this).parent().children('#post'+postNo).show().animate({marginLeft:'0px', opacity:1});
					});
					
					
				
				}
					
		});
		 
		 
		 //post close button functions
		$('.post_close').click(function() { 
				
				//only in use if a post is open
				if (postStatus ==1){
		 
		 			//get the post thats open, slide it and hide it
					$('#post'+postNo).animate({marginLeft:'-598px', opacity:0}, function(){											 
																						 
								//hide the close button														 
								$('.post_close').stop().animate({backgroundPosition:'-33px'}, 200, function(){
								
									$('.post_close').hide();
								
								});
								
								//re-enter the blog container
								//$('#blogSideBar').show().animate({opacity:1});
								$('#blogContainer').show().animate({marginLeft:'0px', opacity:1})
								
								//scroll to top
								toTop();
								
								//swtich post status
								postStatus=0;		
								
								//hide the post that was previously open
								$('#post'+postNo).hide();
								
							
					});
							
				}
		
		});
		 
		 //post_close:hover
		$('.post_close').mouseover(function() {
											
			$(this).css({backgroundPosition:'0px'});
			
		  }).mouseout(function(){
			  
			$(this).css({backgroundPosition:'-17px'});
			
		  });
		
		 
		
		//FORMS ------------------------------------------------------------------------------/
		/*- original code by Farid Hadi -http://www.faridhadi.com*/
		
		// hide form reload button
		$('#reload').hide();
		
		//field values on focus,on focus out
		$('#contactForm #name,#contactForm #email,#contactForm #subject,#contactForm #message' ).focus(function(){
			var initVal = $(this).val();
			$(this).val( initVal === this.defaultValue ? '' : initVal );
		}).blur(function(){
			var initVal = $(this).val();
			$(this).val( initVal.match(/^\s+$|^$/) ? this.defaultValue : initVal );
		});
		
		//submit click function
		$('#contactForm #submit').click(function() {
												 
			// Fade in the prloader
			$('#contactForm #formProgress').hide();
			$('#contactForm #formProgress').html('Sending&hellip;');
			$('#contactForm #formProgress').fadeIn();
			
			// Disable the submit button
			$('#contactForm #submit').attr("disabled", "disabled");
			
			// Set temporary variables for the script
			var isFocus=0;
			var isError=0;
			
			// Get the data from the form
			var name=$('#contactForm #name').val();
			var email=$('#contactForm #email').val();
			var subject=$('#contactForm #subject').val();
			var message=$('#contactForm #message').val();
			
			
			//check if form element have verify class, if so remove and recheck
			if ($('#contactForm #name').hasClass('formVerify')){
				$('#contactForm #name').removeClass('formVerify');
			}
			if ($('#contactForm #email').hasClass('formVerify')){
				$('#contactForm #email').removeClass('formVerify');
			}
			if ($('#contactForm #message').hasClass('formVerify')){
				$('#contactForm #message').removeClass('formVerify');
			}
			
			//Make sure bkgs are set to original
			$('#contactForm #name').addClass('formReset');
			$('#contactForm #email').addClass('formReset');
			$('#contactForm #message').addClass('formReset');
			
			// Validate the data
			if(name=='Name*' || name=='' ) {
				$('#contactForm #name').addClass('formVerify');
				$('#contactForm #name').focus();
				isFocus=1;
				isError=1;
			}
			if(email=='E-mail*' || email=='' ) {
				$('#contactForm #email').addClass('formVerify');
				if(isFocus==0) {
					$('#contactForm #email').focus();
					isFocus=1;
				}
				isError=1;
			} else {
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(reg.test(email)==false) {
					$('#contactForm #email').addClass('formVerify');
	
					if(isFocus==0) {
						$('#contactForm #email').focus();
						isFocus=1;
					}
					isError=1;
					
				}
			}
			if(message=='Message*' || message=='' ) {
				$('#contactForm #message').addClass('formVerify');
				if(isFocus==0) {
					$('#contactForm #message').focus();
					isFocus=1;
				}
				isError=1;
			}
			
			// Terminate the script if an error is found
			if(isError==1) {
				$('#contactForm #formProgress').html(formWarning);
				
				
				// Activate the submit button
				$('#contactForm #submit').attr("disabled", "");
				
				return false;
			}
			
			$.ajaxSetup ({
				cache: false
			});
			
			var dataString = 'name='+ name + '&email=' + email + '&subject=' + subject + '&message=' + message;  
			$.ajax({
				type: "POST",
				url: "php/submit-form-ajax.php",
				data: dataString,
				success: function(msg) {
					
					/*alert(msg);*/
					
					
					// Check to see if the mail was successfully sent
					if(msg=='Mail sent') {
						
						// Update the loader to a check + message
						$('#sentConfirmMessage').html(formSuccess);
						
						//Change the main title
						$('#sentConfirmTitle').html(formSuccessTitle);
						
						//Display the info
						$('#sentConfirmMessage').fadeIn(1000);
						$('#sentConfirmTitle').fadeIn(1000);
						
						// Reinitialize the fields
						$('#contactForm #name').val('Name*');
						$('#contactForm #email').val('E-mail*');
						$('#contactForm #subject').val('Subject');
						$('#contactForm #message').val('Message*');
						
						// Fade out the contact from, then toggle the height
						$("#contactForm").animate({"opacity": "0"}, 1000);	
						$('#contactForm').delay(200).slideToggle("slow");
						
						//Fade in reload link
						$('#reload').fadeIn();	
						
						
						//Ensure new title is cufoned after sending
						Cufon.replace('#sentConfirmTitle',{fontFamily: 'league gothic'});
						
						
					} else {
						$('#contactForm #formProgress').html(formError);
					}
					
					// Activate the submit button
					$('#contactForm #submit').attr("disabled", "");
				},
				error: function(ob,errStr) {
					$('#contactForm #formProgress').html(formError);
					
					// Activate the submit button
					$('#contactForm #submit').attr("disabled", "");
				}
			});
			
			return false;
	});
		
	// Contact form reload but function	
	$('#reload').click(function() {
		
		$("#contactForm").animate({"opacity": "1"}, 1000);	
		$('#contactForm').animate({ height:'toggle' }, 1000);
		$('#sentConfirmMessage').html(formReload);
		$('#sentConfirmTitle').html(formReloadTitle);
		$('#reload').fadeOut();
		$('#contactForm #formProgress').html('*required');
		
		//Ensure new title is cufoned
		Cufon.replace('#sentConfirmTitle',{fontFamily: 'league gothic'});
		
	});			
		
		
		
		
});
