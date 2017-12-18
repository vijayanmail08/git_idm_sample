(function($) {
    Drupal.behaviors.idm_assets = {
	  attach: function(){
          var initialized = false;
					$(window).load(function(){
		   if($('.page-rsa-approvals').length > 0 ){
			$(".page-rsa-approvals #sticky-header").sticky({topSpacing: 0, center:true, className:"hey", getWidthFrom: "#mgr_employees" });
		   }
	   });
			//updated user search wireless start
				var f = 100/1423 * $(window).width("%");
				if(Math.round(f)>66) {
					var offset = $('#idm-request-assets-wireless-attributess .submit-user-buttons').offset();  
					$(window).scroll(function () {
					var scrollTop = $(window).scrollTop();
					if (offset.top<scrollTop) {
							$('#idm-request-assets-wireless-attributess .submit-user-buttons').css({"position": 'fixed'}); 
					} else {
							$('#idm-request-assets-wireless-attributess .submit-user-buttons').removeAttr("style");   
					}
					});
				}
				$("#idm-request-assets-wireless-attributess .submit-search-buttons #edit-submit").hide();
				$("#idm-request-assets-wireless-attributess .fieldset-wrapper .search-name #autocomplete ul li div").live("click", function(){
					//$("#idm-request-assets-wireless-attributess #search-application").trigger("click");
					//$("#idm-request-assets-wireless-attributess #edit-submit").trigger("click");
					myFunction(arg=1);
				});
				$("#idm-request-assets-wireless-attributess .noresult-found").hide();
				$('#idm-request-assets-wireless-attributess .search-list-submit').live('click',function() {
					var search_user_hidden = $("#idm-request-assets-wireless-attributess #search_user_hidden").val();
					if(search_user_hidden!='') {
					$("#idm-request-assets-wireless-attributess .top_msg_stmt").remove();
					$("#idm-request-assets-wireless-attributess #edit-name").val(search_user_hidden);
					$("#idm-request-assets-wireless-attributess #edit-submit").trigger("click");
					} else {
						jQuery('#idm-request-assets-wireless-attributess .top_msg_stmt').remove();
						jQuery("#idm-request-assets-wireless-attributess #searchResult").before("<div class='top_msg_stmt'>Please Select User</div>");
						return false;
					}
			});
			$('#idm-request-assets-wireless-attributess .search-list-cancel').live('click',function() {
					$("#idm-request-assets-wireless-attributess #edit-name").val('');
					$("#idm-request-assets-wireless-attributess #myTableContainer").hide();
					$("#idm-request-assets-wireless-attributess .submit-buttons-row").show();
			});
			$("#idm-request-assets-wireless-attributess .fieldset-wrapper").after("<div id='LoadingImage'><img src='/sites/all/themes/idmtheme/images/ajax.gif'></div>");
			$("#idm-request-assets-wireless-attributess #LoadingImage").hide();
			$('#idm-request-assets-wireless-attributess .wireless-submit-button').live('click',function() {
				$("#idm-request-assets-wireless-attributess .wireless-submit-button").addClass("submit-stop");
			});
			$('#idm-request-assets-wireless-attributess .submit-stop').live('click',function() {
				return false;
			});
			//updated user search wireless end
		  $('#idm_assets #assets_wrapper .assets-type.recommends').show();
		  $('#idm_assets .assets-select select').live('change', function() {
			$(this).parents('#assets_wrapper').find('.assets-type').hide();
			$(this).parents('#assets_wrapper').find('.assets-type.'+$(this).val()).show();
		  });
		  $("#idm_assets #assets_wrapper .assets-type #header_arrow").live('click', function() {
			order = $(this).attr('class');
			$(this).removeClass(order);
			$(this).parents('.assets-type').find('ul.content').toggle();
			if (order == 'desc') {
				$(this).addClass('right');
			}
			else {
				$(this).addClass('desc');
			}
		  });
         if($('#edit-certificate-for-2').attr('checked')){
          $(".search-name").show();
         }
		 $('#edit-certificate-for').live('click',function(e) {
			if($('#edit-certificate-for-1').attr('checked')){
			  $(".search-name").hide();
			  $('#idm-request-assets-certificate #edit-assets #edit-submit').removeClass('disabled_button');
			 }
			 if($('#edit-certificate-for-2').attr('checked')){
			  $(".search-name").show();
			 }
		 });
		 $('#edit-certificate-for span:first').live('click',function(e) {
	          $('#edit-cert #edit-name').removeClass('error');
	          $("#edit-cert .form-item-name .error").css("display","none");
		 });
		 $('#edit-assets .submit-buttons-row #edit-cancel').live('click',function() {
		   window.location.href='/';
		   return false;
		 });
		 $("document").ready(function() {
				setTimeout(function() {
                    $("#edit-asset-class").trigger('change');
                    initialized = true;
				},10);
			});
		  $('#edit-asset-class').live('change',function(e) {
			   var asset_class = $(this).val();
			   if($(this).val() == "Computer") {
					$(".service-provider").hide();
					$(".os-version").hide();
					$(".wireless-number").hide();
				} else {
					$(".service-provider").show();
					$(".os-version").show();
					$(".wireless-number").show();
				}
                if(initialized){
                 $('.asset-class .ajax_throbber img').show();
                }
			   $.ajax({
				url: '/request/assets/certificate/options/'+asset_class,
				success: function(data) {
					updateselectoptions(data, '#edit-asset-type', '#asset_type');
					updateselectoptions(data, '#edit-make', '#asset_make');
					updateselectoptions(data, '#edit-model', '#asset_model');
					$('.asset-class .ajax_throbber img').hide();
				}
			  });
			})
		   $('#edit-asset-type').live('change',function(e) {
			   var asset_type = $(this).val();
			   var asset_class = $('#edit-asset-class').val();
			   $('.asset-type .ajax_throbber img').show();
			   $.ajax({
				url: '/request/assets/certificate/options/'+asset_class+'/'+asset_type,
				success: function(data) {
					updateselectoptions(data, '#edit-make', '#asset_make');
					updateselectoptions(data, '#edit-model', '#asset_model');
					$('.asset-type .ajax_throbber img').hide();
				}
			  });
			})
			$('#edit-make').live('change',function(e) {
			   var asset_make = $(this).val();
			   var asset_type = $('#edit-asset-type').val();
			   var asset_class = $('#edit-asset-class').val();
			   $('.make .ajax_throbber img').show();
			   $.ajax({
				url: '/request/assets/certificate/options/'+asset_class+'/'+asset_type+'/'+asset_make,
				success: function(data) {
					updateselectoptions(data, '#edit-model', '#asset_model');
					$('.make .ajax_throbber img').hide();
				}
			  });
			})
			$('.assets-content .assets-type ul.content .row ul li .data .small_button').live('click',function() {
				$url = $(this).attr('ext_url');
				if ($(this).hasClass('external_asset_link') && !$(this).hasClass("self_other_url") && $(this).html() == 'Request') {
          var $dialog = $('<div class="external_link_dialog">You are being redirected to legacy IDM website. <a target=_blank href='+$url+'>Click here</a>'+' to proceed.</br>Use close icon to close the dialog box.</div>').dialog({
           title: 'IDM',
           modal: true,
           height:150,
           width: 350,
           dialogClass: 'close',
           resizable: false,
         });
         //setTimeout(function () {$dialog.dialog('open');window.open($url, '_blank');$dialog.dialog('close');}, 7000);
         $dialog.dialog('open');
         setTimeout(function () {$dialog.dialog('close');window.open($url, '_blank');}, 7000);
				} else {
					window.open($url, '_self');
				}
			});
		  $('#idm-request-assets-certificate input#edit-name').live('blur, keyup',function(e) {
			  if($('#edit-certificate-for-2').attr('checked')){
				$('#idm-request-assets-certificate #edit-assets #edit-submit').addClass('disabled_button');
			  }
          });
			$( "#idm-request-assets-certificate" ).submit(function( event ) {
				if($('#idm-request-assets-certificate #edit-assets input#edit-submit.').hasClass("disabled_button")){
					event.preventDefault();
				}
			});
		  $('#idm-request-assets-certificate input#edit-name').live('autocompleteSelect',function(e) {
			 $('#idm-request-assets-certificate #edit-assets #edit-submit').removeAttr('disabled', 'disabled');
			 $('#idm-request-assets-certificate #edit-assets .fieldset-wrapper #edit-submit').removeClass('disabled_button');
		  });
		  $('#idm-request-assets-certificate').live('submit', function(e){
        $("#idm-request-assets-certificate select" ).each(function() {
          $(this).removeAttr('disabled');
        });
			});
			$('#idm-request-assets-vroozi-profile-mgtt .submit-stop').live('click',function(e) {
				return false;
			});
		  $('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-cancel').live('click',function() {
			   window.location.href='/assets';
			   return false;
		  });
		  $('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-cancel-leg').live('click',function() {
			   var cancel_redirect = $('#idm-request-assets-secure-remote-access #cancel-redirect').val();
			   window.location.href = cancel_redirect;
			   return false;
		  });
		  $('#idm-request-assets-vroozi-profile-mgtt .submit-buttons-row #edit-cancel').live('click',function() {
			   window.location.href='/assets';
			   return false;
		  });
		  $('#idm-request-assets-wireless-attributess .submit-search-buttons #edit-cancel').live('click',function() {
				window.location.href='/assets';
				return false;
		  });
			 $('#idm-request-assets-wireless-attributess .submit-user-buttons #edit-cancel').live('click',function() {
					window.location.href='/request/assets/wireless-attributess';
					return false;
		  });
		  $('#idm-request-assets-vroozi-profile-mgtt #edit-security .submit-buttons-row #edit-cancel').live('click',function() {
			   window.location.href='/request/assets/vroozi-profile-mgtt';
			   return false;
		  });
			 $('#idm-assets-bulk-operations-form #edit-bulkop .domain-submit-buttons #edit-cancel').live('click',function() {
			   window.location.href='/assets';
			   return false;
		  });
			$('#idm-assets-bulk-operations-form #edit-bulkop .domain-submit-buttons #edit-submit').css({"height": '2.1em', "width": '6.75em', "font-weight": 'normal', "margin-right": '1em', "font-size": '1.1em', "margin-left": '0px', "font-family": 'rock-sans-bold,sans-serif'});
			$('#idm-assets-bulk-operations-form #edit-bulkop .domain-submit-buttons #edit-cancel').css({"height": '2.1em', "width": '6.75em', "font-weight": 'normal', "margin-right": '1em', "font-size": '1.1em', "margin-left": '0px', "font-family": 'rock-sans-bold,sans-serif'});
			$('#idm-assets-bulk-operations-form #edit-bulkop .domain-submit-buttons').css({"clear": 'both', "padding-top": '30px'});

	//domain tilde account start
    $('#edit-request-for').live('click',function(e) {
	  var tildeaccount_exist_flag = $("#view_tilde_flag").html();
      if($('#edit-request-for-1').attr('checked')){
        $('#idm-request-assets-domain-tilde-account #nam_id').val('mgrselected');
        $('#idm-request-assets-domain-tilde-account #pro_id').val('proselected');
        $(".domain-search-name").hide();
		if(tildeaccount_exist_flag == 1) {
		  $("#view_tilde").show();
		  $('#edit-name').removeClass('error');
		  $('#edit-copy-profile').attr("disabled","disabled");
		  $('#edit-copy-profile').removeClass('error');
		  $('#edit-comments').attr("disabled","disabled");
		  $('#edit-comments').removeClass('error');
		  $('#edit-submit').attr("disabled","disabled");
		  $('#edit-submit').removeClass("hover-blue");
		  $('#edit-submit').addClass("hover-grey");
                 $('label.error').css("display","none");
		  //$('label.error').removeClass('error');
		}
      }
      if($('#edit-request-for-2').attr('checked')){
        $('#idm-request-assets-domain-tilde-account #nam_id').val('not mgrselected');
        $('#idm-request-assets-domain-tilde-account #pro_id').val('not proselected');
        $(".domain-search-name").show();
		if(tildeaccount_exist_flag == 1) {
		  $("#view_tilde").hide();
		  $('#edit-copy-profile').removeAttr("disabled","disabled");
		  $('#edit-comments').removeAttr("disabled","disabled");
		  $('#edit-submit').removeAttr("disabled","disabled");
		  $('#edit-submit').addClass("hover-blue");
		  $('#edit-submit').removeClass("hover-grey");
		}
      }
    });

	$('#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile').live('autocompleteSelect',function(e) {
		if(this.value) {
			$('#idm-request-assets-domain-tilde-account #edit-domaintilde #copy_profile_flag').val('1');
		} else {
			$('#idm-request-assets-domain-tilde-account #edit-domaintilde #copy_profile_flag').val('0');
		}
		if(!$(this).find("div").hasClass("no-search-result")) {
            $('#idm-request-assets-domain-tilde-account #pro_id').val('proselected');
        } else {
            $('#idm-request-assets-domain-tilde-account #pro_id').val('not proselected');
        }
	});
	$('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name').live('autocompleteSelect',function(e) {
		if(this.value) {
			$('#idm-request-assets-domain-tilde-account #edit-domain #someoneelse_flag').val('1');
		} else {
			$('#idm-request-assets-domain-tilde-account #edit-domain #someoneelse_flag').val('0');
		}
		if(!$(this).find("div").hasClass("no-search-result")) {
            $('#idm-request-assets-domain-tilde-account #nam_id').val('mgrselected');
        } else {
            $('#idm-request-assets-domain-tilde-account #nam_id').val('not mgrselected');
        }
	});
	$("#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile").focusin(function() {
		$('#idm-request-assets-domain-tilde-account #edit-domaintilde #copy_profile_flag').val('0');
	});
	$("#idm-request-assets-domain-tilde-account #edit-domain input#edit-name").focusin(function() {
		$('#idm-request-assets-domain-tilde-account #edit-domain #someoneelse_flag').val('0');
	});
    $('#idm-request-assets-domain-tilde-account #view_tilde').live('click',function() {
		   window.location.href='/request/assets/tildeaccount/view';
		   return false;
    });

    $('#idm-request-assets-domain-tilde-account #edit-domaintilde .submit-buttons-row #edit-cancel').live('click',function() {
		   window.location.href='/';
		   return false;
    });
    $( "#idm-request-assets-domain-tilde-account input[name='name']" ).keyup(function() {
        $('#idm-request-assets-domain-tilde-account #nam_id').val('not mgrselected');
    });
    $( "#idm-request-assets-domain-tilde-account input[name='copy_profile']" ).keyup(function() {
        $('#idm-request-assets-domain-tilde-account #pro_id').val('not proselected');
    });
    $("#idm-request-assets-domain-tilde-account .fieldset-wrapper .domain-search-name #autocomplete ul li div").live("click", function(){
        if(!$(this).find("div").hasClass("no-search-result")) {
            $('#idm-request-assets-domain-tilde-account #nam_id').val('mgrselected');
        } else {
            $('#idm-request-assets-domain-tilde-account #nam_id').val('not mgrselected');
        }
    });
    $("#idm-request-assets-domain-tilde-account .fieldset-wrapper .domain-copy-profile #autocomplete ul li div").live("click", function(){
        if(!$(this).find("div").hasClass("no-search-result")) {
            $('#idm-request-assets-domain-tilde-account #pro_id').val('proselected');
        } else {
            $('#idm-request-assets-domain-tilde-account #pro_id').val('not proselected');
        }
    });
    //domain tilde account end

    // RSA start
		/*if($('#idm-request-assets-secure-remote-access #employee_locationid').val() != 'US') {
			$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options div:eq(1)").hide();
		} else {
			$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options div:eq(1)").show();
		}*/
		if($('#idm-request-assets-secure-remote-access #loggedinusertype').val() == 'Functional') {
					 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
					 $(".accesstype3").show();
					 $(".accesstype2").hide();
					 $(".accesstype1").hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-submit').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.comments').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
					 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
		}

		$('#idm-request-assets-secure-remote-access .submit-stop').live('click',function(e) {
			return false;
		});
    if($('#edit-remote-access-for-2').attr('checked')){
        $(".search-name").show();
       }

	 $('#edit-remote-access-for').live('click',function(e) {
	  if($('#edit-remote-access-for-1').attr('checked')){
		    $('#idm-request-assets-secure-remote-access #nam_id').val('mgrselected');
				$('#idm-request-assets-secure-remote-access #edit-request-access div.comments').show();
				$('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-submit').show();
		    $(".search-name").hide();
			$(".accesstype3").hide();
			$(".accesstype2").hide();
			$(".accesstype1").hide();
			 if($('#idm-request-assets-secure-remote-access #loggedinusertype').val() == 'Employee') {
							$(".accesstype3").hide();
			        $('#idm-request-assets-secure-remote-access #apitype').val('');
			        $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
                    $('#idm-request-assets-secure-remote-access #edit-request-access div.connect-remotely-options').show();
			        $("input[type='radio'][name='connect_remotely_options']:checked").each(function(){
			            $('#edit-connect-remotely-options-1').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-1').attr('checked', false)
			            $('#edit-connect-remotely-options-2').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-2').attr('checked', false)
			            $('#edit-connect-remotely-options-3').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-3').attr('checked', false)
			            $('#edit-connect-remotely-options-4').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-41').attr('checked', false)
			        });
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			 } else if ($('#idm-request-assets-secure-remote-access #loggedinusertype').val() == 'Functional') {
					 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
					 $(".accesstype3").show();
					 $(".accesstype2").hide();
					 $(".accesstype1").hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-submit').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.comments').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
					 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
			 } else {
				 $(".accesstype2").show();
				 $(".accesstype1").hide();
				 $(".accesstype3").hide();
				 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
				 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
				 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
				 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
				 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
			 }
		  /*if($('#idm-request-assets-secure-remote-access #loggedinusertype').val() == 'Employee') {
				$("#idm-request-assets-secure-remote-access .connect-remotely-options").show();
				$(".accesstype2").hide();
				$(".accesstype1").hide();
                $('#idm-request-assets-secure-remote-access #apitype').val('certificateapi');
                   if($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '2' || $('#idm-request-assets-secure-remote-access #remoteconnect').val() == '3' || $('#idm-request-assets-secure-remote-access #remoteconnect').val() == '4') {
                        $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
                        $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
                        $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
                           if($('#idm-request-assets-secure-remote-access #typereq').val('replacement')) {
                                //$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
                                $(".accesstype2").show();
                           }
                   } else {
                       $(".accesstype1").show();
                   }
            } else {
                $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
                $(".accesstype2").show();
                $(".accesstype1").hide();
                $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
           }*/
	  //$('#idm-request-assets-certificate #edit-assets #edit-submit').removeClass('disabled_button');
	 }

	 if($('#edit-remote-access-for-2').attr('checked')){
	  $('#idm-request-assets-secure-remote-access #nam_id').val('not mgrselected');
	  $(".search-name").show();
	  $("#idm-request-assets-secure-remote-access #edit-name").val('');
        $(".accesstype2").hide();
        $(".accesstype1").hide();
        $('#idm-request-assets-secure-remote-access #apitype').val('');
        $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
        $("input[type='radio'][name='connect_remotely_options']:checked").each(function(){
            $('#edit-connect-remotely-options-1').prev('span').css('background-position', '');
            $('#edit-connect-remotely-options-1').attr('checked', false)
            $('#edit-connect-remotely-options-2').prev('span').css('background-position', '');
            $('#edit-connect-remotely-options-2').attr('checked', false)
            $('#edit-connect-remotely-options-3').prev('span').css('background-position', '');
            $('#edit-connect-remotely-options-3').attr('checked', false)
            $('#edit-connect-remotely-options-4').prev('span').css('background-position', '');
            $('#edit-connect-remotely-options-41').attr('checked', false)
        });
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
	 }
    });
	$('#edit-connect-remotely-options div.form-item-connect-remotely-options').live('click',function(e) {
		 if($('#edit-connect-remotely-options-1').attr('checked') || $('#edit-connect-remotely-options-2').attr('checked')){
			 $(".accesstype2").hide();
			 $(".accesstype1").show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').show();
			 //$('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').show();
			 //$('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').show();
			 //$('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			 $('#idm-request-assets-secure-remote-access #apitype').val('certificateapi');
			 //$('#idm-request-assets-secure-remote-access #remoteconnect').val('1');
			 if($('#edit-connect-remotely-options-1').attr('checked')){
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('1');
			 }
			 if($('#edit-connect-remotely-options-2').attr('checked')){
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('2');
			 }
			 //$('#idm-request-assets-secure-remote-access #typereq').val('');
			 if($('#idm-request-assets-secure-remote-access #typereq').val() == 'replacement' && $('#idm-request-assets-secure-remote-access #apitype').val() == 'rsaapi') {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
             } else {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
             }
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.connect-remotely-options label.error').hide();
		 }
		 else {
			 $(".accesstype1").hide();
			 $(".accesstype2").show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
			 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');

			 if($('#edit-connect-remotely-options-3').attr('checked')){
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('3');
			 }
			 if($('#edit-connect-remotely-options-4').attr('checked')){
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('4');
			 }
			 if($('#edit-connect-remotely-options-5').attr('checked')){
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('5');
			 }
			 if($('#idm-request-assets-secure-remote-access #typereq').val() == 'replacement' && $('#idm-request-assets-secure-remote-access #apitype').val() == 'rsaapi') {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
             } else {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
             }
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.connect-remotely-options label.error').hide();			 
		 }
	});
	$('#idm-request-assets-secure-remote-access #edit-request-access #edit-typeofrequest').live('change',function(e) {
		var replacement = $(this).val();
		if(replacement == 'Replacement') {
			$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
			$('#idm-request-assets-secure-remote-access #typereq').val('replacement');
			//$('#idm-request-assets-secure-remote-access #edit-request-access div.serialno').hide();
			$('#idm-request-assets-secure-remote-access div.typeofrequest label.error').hide();
		}
		else if(replacement == 'New') {
			$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			$('#idm-request-assets-secure-remote-access #typereq').val('new');
			$('#idm-request-assets-secure-remote-access div.typeofrequest label.error').hide();
			//$('#idm-request-assets-rsa #edit-request-access div.serialno').show();
		}
		else {
			$('#idm-request-assets-secure-remote-access div.typeofrequest label.error').show();
			$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			//$('#idm-request-assets-secure-remote-access #edit-request-access div.serialno').hide();
		}
	});
	$('#idm-request-assets-secure-remote-access #edit-request-access #edit-devicetype').live('change',function(e) {
		var devicetype = $(this).val();
		if(devicetype != '') {
			$('#idm-request-assets-secure-remote-access div.devicetype label.error').hide();
		} else {
			$('#idm-request-assets-secure-remote-access div.devicetype label.error').show();
		}
	});
	$('#edit-reasonreplacement div.form-item-reasonreplacement').live('click',function(e) {
		 if($('#edit-reasonreplacement-1').attr('checked')){
			 $('#idm-request-assets-secure-remote-access div.reasonreplacement label.error').hide();
		 } else if($('#edit-reasonreplacement-2').attr('checked')){
			 $('#idm-request-assets-secure-remote-access div.reasonreplacement label.error').hide();
		 } else {
			 $('#idm-request-assets-secure-remote-access div.reasonreplacement label.error').show();
		 }
	});
	$('#edit-request-access div#edit-type-of-token').live('click',function(e) {
		 var current = $(this);
		if($('#edit-type-of-token-soft').attr('checked')){
			current.parents('.fieldset-wrapper').find('.typeofrequest').show();
			current.parents('.fieldset-wrapper').find('.devicetype').show();
			current.parents('.fieldset-wrapper').find('.type-of-token-request').show();
			current.parents('.fieldset-wrapper').find('.budget-code').show();
			current.parents('.fieldset-wrapper').find('.location').hide();
			current.parents('.fieldset-wrapper').find('.locationaddress').hide();
			current.parents('.fieldset-wrapper').find('.reason-replacement').hide();
			current.parents('.fieldset-wrapper').find('.select-token').hide();
			current.parents('.fieldset-wrapper').find('.request-description').html('Soft Token');
			current.parents('.fieldset-wrapper').find('#tokenrequest').val('Soft Token');
		}
		if($('#edit-type-of-token-hard').attr('checked')){
			current.parents('.fieldset-wrapper').find('.location').show();
			current.parents('.fieldset-wrapper').find('.locationaddress').show();
			current.parents('.fieldset-wrapper').find('.typeofrequest').show();
			current.parents('.fieldset-wrapper').find('.type-of-token-request').show();
			//current.parents('.fieldset-wrapper').find('.reason-replacement').show();
			current.parents('.fieldset-wrapper').find('.budget-code').show();
			current.parents('.fieldset-wrapper').find('.select-token').show();
			current.parents('.fieldset-wrapper').find('.devicetype').hide();
			current.parents('.fieldset-wrapper').find('.request-description').html('Hard Token');
			current.parents('.fieldset-wrapper').find('#tokenrequest').val('Hard Token');
		}
	});
	$('#idm-request-assets-rsa #edit-request-access #edit-location').live('change',function(e) {
			var location = $(this).val();
			if(location == 'Other - FedEx') {
				$('#idm-request-assets-rsa #edit-request-access div.fedexdeliveryaddress').show();
				$('#idm-request-assets-rsa #edit-request-access div.phoneno').show();
			}
			else {
				$('#idm-request-assets-rsa #edit-request-access div.fedexdeliveryaddress').hide();
				$('#idm-request-assets-rsa #edit-request-access div.phoneno').hide();
			}
	          $('.location .ajax_throbber img').show();
			   $.ajax({
				url: '/request/assets/rsa/options/'+location,
				success: function(data) {
					updateselectoptionslocation(data, '#edit-locationaddress', '#locationaddress');
					$('.location .ajax_throbber img').hide();
				}
			  });
	 });
    $('#idm-request-assets-rsa #edit-request-access .submit-buttons-row #edit-cancel').live('click',function() {
		   window.location.href='/';
		   return false;
    });
    $('#idm-request-assets-secure-remote-access #edit-remote-access input#edit-name').live('autocompleteSelect',function(e) {
		if(this.value) {
			$('#idm-request-assets-secure-remote-access #edit-remote-access #someoneelse_flag').val('1');
		} else {
			$('#idm-request-assets-secure-remote-access #edit-remote-access #someoneelse_flag').val('0');
		}
		if(!$("#idm-request-assets-secure-remote-access .fieldset-wrapper .search-name #autocomplete").find("div").hasClass("no-search-result")) {
            $("#idm-request-assets-secure-remote-access #nam_id").val('mgrselected');
        } else {
            $("#idm-request-assets-secure-remote-access #nam_id").val('not mgrselected');
        }
	});

    $("#idm-request-assets-secure-remote-access .fieldset-wrapper .search-name #autocomplete ul li div").live("click", function(){
        var usertype = $(this).children("span.myClass").text();
        $('#idm-request-assets-secure-remote-access #selectedusertype').val(usertype);
        var locationid = $(this).children("span.locationid").text();
        if(locationid.match("^(US|IDMUS|6040000|PR|CC)")) {
            locationid = 'US';
        } else {
            locationid = 'International';
        }
        if(usertype == 'Contractor') {
			 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-submit').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.comments').show();
			 $(".accesstype2").show();
			 $(".accesstype1").hide();
			 $(".accesstype3").hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
			 if($('#idm-request-assets-secure-remote-access #typereq').val() == 'replacement') {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
             } else {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
             }
			 //$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');

			  } else if (usertype == 'Employee' || usertype == 'Daily Hire'){
						//alert(locationid);
            $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
            $('#idm-request-assets-secure-remote-access #apitype').val('');
						$("#idm-request-assets-secure-remote-access .connect-remotely-options").show();
						$('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-submit').show();
						$('#idm-request-assets-secure-remote-access #edit-request-access div.comments').show();
						/*if(locationid == 'US') {
							$("#idm-request-assets-secure-remote-access .connect-remotely-options").show();
							$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options div:eq(1)").show();
							//$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options label.error").css("margin-top","70px");
							//$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options").css("border","1px solid red");
						} else {
							$("#idm-request-assets-secure-remote-access .connect-remotely-options").show();
							$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options div:eq(1)").hide();
							//$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options label.error").css("margin-top","40px");
							//$("#idm-request-assets-secure-remote-access #edit-connect-remotely-options").css("border","1px solid red");
						}*/

               if(($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '3') || ($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '4') || ($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '5')) {
                    $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
                    $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
                    $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
                        if($('#idm-request-assets-secure-remote-access #typereq').val() == 'replacement') {
                            $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
                        } else {
                            $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
                        }
						$(".accesstype2").show();
						$(".accesstype1").hide();
						$(".accesstype3").hide();
						$('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
               } else {
                    if(($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '1' || $('#idm-request-assets-secure-remote-access #remoteconnect').val() == '2')) {
                         $(".accesstype2").hide();
                         $(".accesstype1").show();
												 $(".accesstype3").hide();
                         $('#idm-request-assets-secure-remote-access #apitype').val('certificateapi');
                    } else {
                         $(".accesstype2").hide();
                         $(".accesstype1").hide();
												 $(".accesstype3").hide();
                    }
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
              }
							} else if (usertype == 'Functional'){
									//alert(locationid);
								 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
								 $(".accesstype3").show();
								 $(".accesstype2").hide();
								 $(".accesstype1").hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access .submit-buttons-row #edit-submit').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.comments').hide();
								 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
								 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
							}
        if(!$(this).find("div").hasClass("no-search-result")) {
            $('#idm-request-assets-secure-remote-access #nam_id').val('mgrselected');
        } else {
            $('#idm-request-assets-secure-remote-access #nam_id').val('not mgrselected');
        }
    });
	$("#idm-request-assets-secure-remote-access #edit-remote-access input#edit-name").focusin(function() {
		$('#idm-request-assets-secure-remote-access #edit-remote-access #someoneelse_flag').val('0');
	});
	 $( "#idm-request-assets-secure-remote-access input[name='name']" ).keyup(function() {
	     $('#idm-request-assets-secure-remote-access #nam_id').val('not mgrselected');
	 });
    // RSA end
	//Personally owned mobile device access start
    $('#idm-groups-personally-owned-mobile-access #edit-mobile .domain-submit-buttons #edit-cancel').live('click',function() {
	  window.location.href='/';
      return false;
    });
    $("#edit-rsa div#autocomplete ul li.selected").live('hover', function() {
      if ($('#edit-rsa div#autocomplete ul li.selected div.noresult').length) {
         $(this).css("background", "white");
         $(this).css("color", "#000000");
      }
    });
    $("#edit-cert div#autocomplete ul li.selected").live('hover', function() {
      if ($('#edit-cert div#autocomplete ul li.selected div.noresult').length) {
         $(this).css("background", "white");
         $(this).css("color", "#000000");
      }
      });
    $("#edit-domain div#autocomplete ul li.selected").live('hover', function() {
      if ($('#edit-domain div#autocomplete ul li.selected div.noresult').length) {
         $(this).css("background", "white");
         $(this).css("color", "#000000");
      }
    });

 $(".messages--status img").live('click',function(e) {
   $(".messages--status").hide();
 });
 $(".messages--error img").live('click',function(e) {
   $(".messages--error").hide();
 });

 // Provisioning Request start
    if($('#edit-request-for-2').attr('checked')){
     $(".search-name").show();
    }
	 $('#edit-request-for').live('click',function(e) {
	  if($('#edit-request-for-1').attr('checked')){
		    $('#idm-request-assets-secure-remote-access #nam_id').val('mgrselected');
		    $(".search-name").hide();
			$(".accesstype2").hide();
			$(".accesstype1").hide();
			 if($('#idm-request-assets-secure-remote-access #loggedinusertype').val() == 'Employee') {
			        $('#idm-request-assets-secure-remote-access #apitype').val('');
			        $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.connect-remotely-options').show();
			        $("input[type='radio'][name='connect_remotely_options']:checked").each(function(){
			            $('#edit-connect-remotely-options-1').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-1').attr('checked', false)
			            $('#edit-connect-remotely-options-2').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-2').attr('checked', false)
			            $('#edit-connect-remotely-options-3').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-3').attr('checked', false)
			            $('#edit-connect-remotely-options-4').prev('span').css('background-position', '');
			            $('#edit-connect-remotely-options-41').attr('checked', false)
			        });
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
					 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			 } else {
				 $(".accesstype2").show();
				 $(".accesstype1").hide();
				 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
				 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
				 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
				 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
				 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
				 $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
			 }
		  /*if($('#idm-request-assets-secure-remote-access #loggedinusertype').val() == 'Employee') {
				$("#idm-request-assets-secure-remote-access .connect-remotely-options").show();
				$(".accesstype2").hide();
				$(".accesstype1").hide();
             $('#idm-request-assets-secure-remote-access #apitype').val('certificateapi');
                if($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '2' || $('#idm-request-assets-secure-remote-access #remoteconnect').val() == '3' || $('#idm-request-assets-secure-remote-access #remoteconnect').val() == '4') {
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
                     $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
                        if($('#idm-request-assets-secure-remote-access #typereq').val('replacement')) {
                             //$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
                             $(".accesstype2").show();
                        }
                } else {
                    $(".accesstype1").show();
                }
         } else {
             $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
             $(".accesstype2").show();
             $(".accesstype1").hide();
             $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
        }*/
	  //$('#idm-request-assets-certificate #edit-assets #edit-submit').removeClass('disabled_button');
	 }

	 if($('#edit-request-for-2').attr('checked')){
	  $('#idm-request-assets-secure-remote-access #nam_id').val('not mgrselected');
	  $(".search-name").show();
	  $("#idm-request-assets-secure-remote-access #edit-name").val('');
     $(".accesstype2").hide();
     $(".accesstype1").hide();
     $('#idm-request-assets-secure-remote-access #apitype').val('');
     $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
     $("input[type='radio'][name='connect_remotely_options']:checked").each(function(){
         $('#edit-connect-remotely-options-1').prev('span').css('background-position', '');
         $('#edit-connect-remotely-options-1').attr('checked', false)
         $('#edit-connect-remotely-options-2').prev('span').css('background-position', '');
         $('#edit-connect-remotely-options-2').attr('checked', false)
         $('#edit-connect-remotely-options-3').prev('span').css('background-position', '');
         $('#edit-connect-remotely-options-3').attr('checked', false)
         $('#edit-connect-remotely-options-4').prev('span').css('background-position', '');
         $('#edit-connect-remotely-options-41').attr('checked', false)
     });
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
		 $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
	 }
 });

	
	 
	$('#idm-request-assets-provisioning-request #edit-request-access #edit-application-name').live('change',function(e) {
		var application_name = $(this).val();
		//alert(application_name);
		if(application_name == 'AST' || application_name == 'Medea INTL UNI' || application_name == 'Medea RSN' || application_name == 'Medea US') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == '' || application_name == 'MediaBroker' || application_name == 'Non-Linear Scheduling System' || application_name == 'SAP HCM' || application_name == 'SAP HCM NON PROD' || application_name == 'TNE' || application_name == 'WebScheduler') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'BlackBerry' || application_name == 'Forecaster' || application_name == 'PARIS' || application_name == 'ScheduALL Production Services' || application_name == 'ScheduALL Sound' || application_name == 'ScheduALL Tech Ops' || application_name == 'ScheduALL WWCS' || application_name == 'Series Life Cycle' || application_name == 'StartOver' || application_name == 'TVRocs' || application_name == 'TVRocs Local LITE' || application_name == 'Title Mapping Tool') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'CAMBAR') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'CSP') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'Cafe - iSeries (Prod)' || application_name == 'F&L CPG - iSeries (Prod)' || application_name == 'F&L CPG - iSeries (QA)' || application_name == 'F&L Digital Platforms - iSeries (Prod)' || application_name == 'F&L Digital Platforms - iSeries (QA)' || application_name == 'F&L TV - iSeries (Prod)' || application_name == 'F&L TV - iSeries (QA)' || application_name == 'F&L Women and Lifestyle- iSeries (Prod)' || application_name == 'F&L Women and Lifestyle- iSeries (QA)' || application_name == 'Focus Features F Logic System - iSeries (Prod)' || application_name == 'Focus Features F Logic System - iSeries (QA)') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'Cafe - iSeries (QA)') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'EATEC') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();			
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'FLIX (DEV & QA)' || application_name == 'FLIX (PROD)') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'Film Pacing') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'Global VPF') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'HP ICE/SIM') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'IRIS') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'Medea Affiliate Stations') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'Report.Web') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
			if($('#idm-request-assets-provisioning-request #reportdepartment').val() == 'Benefits') {
	            $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').show();
	            $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').show();
	            $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').show();
	        } else {
	            $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        }
			if($('#idm-request-assets-provisioning-request #reportdepartment').val() == 'HR') {
	            $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').show();
	            $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').show();
	            $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').show();
	        } else {
	            $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        }
			if($('#idm-request-assets-provisioning-request #reportdepartment').val() == 'Payroll') {
	            $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').show();
	            $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').show();
	            $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').show();
	        } else {
	            $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
	        }
		}
		else if(application_name == 'ShowTracker') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		else if(application_name == 'YARDI') {
			$('#idm-request-assets-provisioning-request #edit-request-access div.yardi-role').show();
			$('#idm-request-assets-provisioning-request #edit-request-access div.showtracker-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.report-document').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.medea-affiliate-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.iris-role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.required-access').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.territory').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.filmpacing-groupname').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.essbase-add-in').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.flix-group').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.eatec-model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.copy-profile').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.model').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.additional-request-details').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.role').hide();
			$('#idm-request-assets-provisioning-request #edit-request-access div.company-access').hide();
			$('#idm-request-assets-provisioning-request div.role label.error').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
	        $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
		}
		/*else {
			$('#idm-request-assets-secure-remote-access div.typeofrequest label.error').show();
			$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			//$('#idm-request-assets-secure-remote-access #edit-request-access div.serialno').hide();
		}*/
	});
	$('#idm-request-assets-provisioning-request #edit-request-access #edit-report-document').live('change',function(e) {
	 var report_document = $(this).val();
	 $('#idm-request-assets-provisioning-request #reportdepartment').val(report_document);
	 if(report_document == 'Benefits') {
         $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
         $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
     } else if (report_document == 'HR') {
         $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
         $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').hide();
     } else if (report_document == 'Payroll') {
         $('#idm-request-assets-provisioning-request #edit-request-access div.report-section').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.report-access').show();
         $('#idm-request-assets-provisioning-request #edit-request-access div.hr-report').hide();
         $('#idm-request-assets-provisioning-request #edit-request-access div.benefits-report').hide();
         $('#idm-request-assets-provisioning-request #edit-request-access div.payroll-report').show();
     }
	});
	$('#idm-request-assets-provisioning-request-2 #edit-provisioning #edit-report-document').live('change',function(e) {
		 var report_document = $(this).val();
		// $('#idm-request-assets-provisioning-request-2 #reportdepartment').val(report_document);
		 if(report_document == 'Benefits') {
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.benefits-report').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.report-section').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.report-access').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.hr-report').hide();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.payroll-report').hide();
	     } else if (report_document == 'HR') {
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.hr-report').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.report-section').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.report-access').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.benefits-report').hide();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.payroll-report').hide();
	     } else if (report_document == 'Payroll') {
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.report-section').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.report-access').show();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.hr-report').hide();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.benefits-report').hide();
	         $('#idm-request-assets-provisioning-request-2 #edit-provisioning div.payroll-report').show();
	     }
		});
	
	$('#idm-request-assets-secure-remote-access #edit-request-access #edit-devicetype').live('change',function(e) {
		var devicetype = $(this).val();
		if(devicetype != '') {
			$('#idm-request-assets-secure-remote-access div.devicetype label.error').hide();
		} else {
			$('#idm-request-assets-secure-remote-access div.devicetype label.error').show();
		}
	});
	$('#edit-reasonreplacement div.form-item-reasonreplacement').live('click',function(e) {
		 if($('#edit-reasonreplacement-1').attr('checked')){
			 $('#idm-request-assets-secure-remote-access div.reasonreplacement label.error').hide();
		 } else if($('#edit-reasonreplacement-2').attr('checked')){
			 $('#idm-request-assets-secure-remote-access div.reasonreplacement label.error').hide();
		 } else {
			 $('#idm-request-assets-secure-remote-access div.reasonreplacement label.error').show();
		 }
	});
	$('#edit-request-access div#edit-type-of-token').live('click',function(e) {
		 var current = $(this);
		if($('#edit-type-of-token-soft').attr('checked')){
			current.parents('.fieldset-wrapper').find('.typeofrequest').show();
			current.parents('.fieldset-wrapper').find('.devicetype').show();
			current.parents('.fieldset-wrapper').find('.type-of-token-request').show();
			current.parents('.fieldset-wrapper').find('.budget-code').show();
			current.parents('.fieldset-wrapper').find('.location').hide();
			current.parents('.fieldset-wrapper').find('.locationaddress').hide();
			current.parents('.fieldset-wrapper').find('.reason-replacement').hide();
			current.parents('.fieldset-wrapper').find('.select-token').hide();
			current.parents('.fieldset-wrapper').find('.request-description').html('Soft Token');
			current.parents('.fieldset-wrapper').find('#tokenrequest').val('Soft Token');
		}
		if($('#edit-type-of-token-hard').attr('checked')){
			current.parents('.fieldset-wrapper').find('.location').show();
			current.parents('.fieldset-wrapper').find('.locationaddress').show();
			current.parents('.fieldset-wrapper').find('.typeofrequest').show();
			current.parents('.fieldset-wrapper').find('.type-of-token-request').show();
			//current.parents('.fieldset-wrapper').find('.reason-replacement').show();
			current.parents('.fieldset-wrapper').find('.budget-code').show();
			current.parents('.fieldset-wrapper').find('.select-token').show();
			current.parents('.fieldset-wrapper').find('.devicetype').hide();
			current.parents('.fieldset-wrapper').find('.request-description').html('Hard Token');
			current.parents('.fieldset-wrapper').find('#tokenrequest').val('Hard Token');
		}
	});
	$('#idm-request-assets-rsa #edit-request-access #edit-location').live('change',function(e) {
			var location = $(this).val();
			if(location == 'Other - FedEx') {
				$('#idm-request-assets-rsa #edit-request-access div.fedexdeliveryaddress').show();
				$('#idm-request-assets-rsa #edit-request-access div.phoneno').show();
			}
			else {
				$('#idm-request-assets-rsa #edit-request-access div.fedexdeliveryaddress').hide();
				$('#idm-request-assets-rsa #edit-request-access div.phoneno').hide();
			}
	          $('.location .ajax_throbber img').show();
			   $.ajax({
				url: '/request/assets/rsa/options/'+location,
				success: function(data) {
					updateselectoptionslocation(data, '#edit-locationaddress', '#locationaddress');
					$('.location .ajax_throbber img').hide();
				}
			  });
	 });
 $('#idm-request-assets-rsa #edit-request-access .submit-buttons-row #edit-cancel').live('click',function() {
		   window.location.href='/';
		   return false;
 });
 $('#idm-request-assets-secure-remote-access #edit-remote-access input#edit-name').live('autocompleteSelect',function(e) {
		if(this.value) {
			$('#idm-request-assets-secure-remote-access #edit-remote-access #someoneelse_flag').val('1');
		} else {
			$('#idm-request-assets-secure-remote-access #edit-remote-access #someoneelse_flag').val('0');
		}
		if(!$("#idm-request-assets-secure-remote-access .fieldset-wrapper .search-name #autocomplete").find("div").hasClass("no-search-result")) {
         $("#idm-request-assets-secure-remote-access #nam_id").val('mgrselected');
     } else {
         $("#idm-request-assets-secure-remote-access #nam_id").val('not mgrselected');
     }
	});
 /*$("#idm-request-assets-secure-remote-access .fieldset-wrapper .search-name #autocomplete ul li div").live("click", function(){
     var usertype = $(this).children("span.myClass").text();
     $('#idm-request-assets-secure-remote-access #selectedusertype').val(usertype);
     var locationid = $(this).children("span.locationid").text();
     if(locationid.match("^(US|IDMUS|6040000|PR|CC)")) {
         locationid = 'US';
     } else {
         locationid = 'International';
     }
     if(usertype == 'Contractor' || locationid != 'US') {
			 $("#idm-request-assets-secure-remote-access .connect-remotely-options").hide();
			 $(".accesstype2").show();
			 $(".accesstype1").hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
			 $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
			 if($('#idm-request-assets-secure-remote-access #typereq').val() == 'replacement') {
              $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
          } else {
              $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
          }
			 //$('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
			 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
     } else {
         $('#idm-request-assets-secure-remote-access #remoteconnect').val('');
         $('#idm-request-assets-secure-remote-access #apitype').val('');
          $("#idm-request-assets-secure-remote-access .connect-remotely-options").show();
            if(($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '2') || ($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '3') || ($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '4')) {
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').show();
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').show();
                 $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').show();
                     if($('#idm-request-assets-secure-remote-access #typereq').val() == 'replacement') {
                         $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').show();
                     } else {
                         $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
                     }
					$(".accesstype2").show();
					$(".accesstype1").hide();
                 $('#idm-request-assets-secure-remote-access #apitype').val('rsaapi');
            } else {
                 if(($('#idm-request-assets-secure-remote-access #remoteconnect').val() == '1')) {
                      $(".accesstype2").hide();
                      $(".accesstype1").show();
                      $('#idm-request-assets-secure-remote-access #apitype').val('certificateapi');
                 } else {
                      $(".accesstype2").hide();
                      $(".accesstype1").hide();
                 }
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.typeofrequest').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.devicetype').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.personal-email').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-type').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.certificate-usage').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-class').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-type').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.make').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.model').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.asset-ownership').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.service-provider').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.os-version').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.wireless-number').hide();
                  $('#idm-request-assets-secure-remote-access #edit-request-access div.reasonreplacement').hide();
           }
     }
     if(!$(this).find("div").hasClass("no-search-result")) {
         $('#idm-request-assets-secure-remote-access #nam_id').val('mgrselected');
     } else {
         $('#idm-request-assets-secure-remote-access #nam_id').val('not mgrselected');
     }
 });*/
	$("#idm-request-assets-secure-remote-access #edit-remote-access input#edit-name").focusin(function() {
		$('#idm-request-assets-secure-remote-access #edit-remote-access #someoneelse_flag').val('0');
	});
	 $( "#idm-request-assets-secure-remote-access input[name='name']" ).keyup(function() {
	     $('#idm-request-assets-secure-remote-access #nam_id').val('not mgrselected');
	 });

	 $('#edit-wireless-cost-object').live('click',function(e) {
		 if($('#edit-wireless-cost-object-1').attr('checked')){
		     $(".cost-center").show();
		     $(".wbse-center").show();
		     $(".internal-order").show();
		 }
	  });

	 $('#idm-request-assets-vroozi-profile-mgtt #edit-accounting #edit-use-alternative-cost-object').live('change',function(e) {
			var usealternativecostobject = $(this).val();
			console.log(usealternativecostobject);
			if(usealternativecostobject == 'Yes') {
				$('#idm-request-assets-vroozi-profile-mgtt #edit-accounting div.alternative-company-code').show();
				$('#idm-request-assets-vroozi-profile-mgtt #edit-accounting div.alternative-cost-object-type').show();
				$('#idm-request-assets-vroozi-profile-mgtt #edit-accounting div.alternative-cost-object').show();
			}
			else if(usealternativecostobject == 'No'){
				$('#idm-request-assets-vroozi-profile-mgtt #edit-accounting div.alternative-company-code').hide();
				$('#idm-request-assets-vroozi-profile-mgtt #edit-accounting div.alternative-cost-object-type').hide();
				$('#idm-request-assets-vroozi-profile-mgtt #edit-accounting div.alternative-cost-object').hide();
			}
	 });
	 $('#idm-request-assets-wireless-attributess #edit-wireless #edit-wireless-cost-object').live('click',function(e) {
		 $('input[type="radio"]:checked').each(function() {
		     if (this.value == 'Cost Center') {
			     $(".cost-center").show();
			     $(".wbse-center").hide();
			     $(".internal-order").hide();
		     } else if (this.value == 'WBSE') {
			     $(".cost-center").hide();
			     $(".wbse-center").show();
			     $(".internal-order").hide();
		     } else if (this.value == 'Internal Order') {
			     $(".cost-center").hide();
			     $(".wbse-center").hide();
			     $(".internal-order").show();
		     }
		 });
	  });
 // Provisioning Request end
 //active directory group start
 $(".idm-adgroups-create-group #add_user").hide();
 $('.idm-adgroups-create-group .new-group').live('click',function(e) {
	$(".idm-adgroups-create-group #add_user").hide();
	$(".idm-adgroups-create-group #create_group").show();
	$(this).css("color","#977ee3");
	$('.idm-adgroups-create-group .add-the-user').css("color","#434343");
	$('.idm-adgroups-create-group .remove-from-group').css("color","#434343");
 });

 $('.idm-adgroups-create-group .add-the-user').live('click',function(e) {
	$(".idm-adgroups-create-group #add_user").show();
	$(".idm-adgroups-create-group #create_group").hide();
	$("..idm-adgroups-create-group .add-user .form-item-add-user").find("label").text("User(s) to be Added");
	$(this).css("color","#977ee3");
	$('.idm-adgroups-create-group .new-group').css("color","#434343");
	$('.idm-adgroups-create-group .remove-from-group').css("color","#434343");
	$('#idm-adgroups-create-group .add-user .icon-search_icon').css("left",408.88);
	$('#idm-adgroups-create-group #add_user .create_user_title').text("Add To Group");
 });

 $('.idm-adgroups-create-group .remove-from-group').live('click',function(e) {
	$(".idm-adgroups-create-group #add_user").show();
	$(".idm-adgroups-create-group #create_group").hide();
	$("..idm-adgroups-create-group .add-user .form-item-add-user").find("label").text("User(s) to be Removed");
	$(this).css("color","#977ee3");
	$('.idm-adgroups-create-group .new-group').css("color","#434343");
	$('.idm-adgroups-create-group .add-the-user').css("color","#434343");
	$('#idm-adgroups-create-group .add-user .icon-search_icon').css("left",432.88);
	$('#idm-adgroups-create-group #add_user .create_user_title').text("Remove From Group");
 });
 //active directory group end
		}
	}
	
	//RSA request for sailpoint functionalities started
		 $('#idm-rsa-manager-approval-sailpoint #edit-vendor-option').live('click',function(e) {
	  if($('#idm-rsa-manager-approval-sailpoint #edit-vendor-option-1').attr('checked')){
			$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-vendor-name").show();
		}
		 if($('#idm-rsa-manager-approval-sailpoint #edit-vendor-option-2').attr('checked')){
			$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-vendor-name").hide();
			$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor").hide();
			$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others").hide();
		}
		
		});
		
		$('#idm-rsa-manager-approval-sailpoint #edit-vendorname').live('change',function(e) {
			var vendorname = $(this).val();
			if(vendorname=='Other Vendor') {
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor").show();
			} else {
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor").hide();
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others").hide();
				//$("#idm-rsa-manager-approval-sailpoint #edit-othervendor").val('');
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others #edit-others").val('');
				$("#idm-rsa-manager-approval-sailpoint #edit-othervendor").val('').trigger("chosen:updated");
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor-validation').remove();
			}
	  });
		
		$('#idm-rsa-manager-approval-sailpoint #edit-othervendor').live('change',function(e) {
			var othervendorname = $(this).val();
			if(othervendorname=='0') {
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others").show();
			} else {
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others #edit-others").val('');
				$("#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others").hide();
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-othersfieldexist-validation').remove();
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others-validation').remove();
			}
	  });
		
		/*alert($('#idm-rsa-manager-approval-sailpoint #hidden_employee_type').val());
		if($('#idm-rsa-manager-approval-sailpoint #hidden_employee_type').val()=='employee') {
			alert("hihi");
			$("#idm-rsa-manager-approval-sailpoint #do-you-want-update").hide();
		} else {
			$("#idm-rsa-manager-approval-sailpoint #do-you-want-update").show();
		}*/
		//$('#idm-rsa-manager-approval-sailpoint #edit-comments').after("<label for='edit-comments' generated='true' class='error' style='display:none;position:relative;top:-3em;'>Please enter comment</label>");
	/*$('#idm-request-assets-secure-remote-access #edit-request-access #edit-devicetype').live('change',function(e) {
		var devicetype = $(this).val();
		if(devicetype != '') {
			$('#idm-request-assets-secure-remote-access div.devicetype label.error').hide();
		} else {
			$('#idm-request-assets-secure-remote-access div.devicetype label.error').show();
		}
	});*/
	
		//if($('#idm-rsa-manager-approval-sailpoint #hidden_radiobuttonoption_suppliername').val()=='show') {
			
			/*$('#idm-rsa-manager-approval-sailpoint #edit-vendor-option .form-item-vendor-option').live('click',function(e) {
				if($('#idm-rsa-manager-approval-sailpoint #hidden_radiobuttonoption_suppliername').val()=='show') {
				}
		 //if($('#edit-connect-remotely-options-1').attr('checked') || $('#edit-connect-remotely-options-2').attr('checked')){
		 });*/
		 $('#idm-request-assets-secure-remote-access-sailpoint .submit-stop').live('click',function(e) {
			return false;
		});

		$('#idm-rsa-manager-approval-sailpoint .submit-stop').live('click',function(e) {
			return false;
		});
		 $('#idm-rsa-manager-approval-sailpoint #edit-approve-leg').live('click',function(e) {
		if($('#idm-rsa-manager-approval-sailpoint #hidden_radiobuttonoption_suppliername').val()=='show') {
				//var validation_status=1;
				if($('#idm-rsa-manager-approval-sailpoint #edit-vendor-option-1').is(":not(:checked)") && $('#idm-rsa-manager-approval-sailpoint #edit-vendor-option-2').is(":not(:checked)")) {
					$('#idm-rsa-manager-approval-sailpoint .supplier-name-update-option-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .supplier-name-update-option').append("<div class='error supplier-name-update-option-validation custom-error-validation' style='clear:both;padding-left:0'>Please Select Any one Option</div>");
					var vendoroption_validation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .supplier-name-update-option-validation').remove();
					var vendoroption_validation_status=1;
				}
				
				if($('#idm-rsa-manager-approval-sailpoint #edit-vendor-option-1').is(":checked") && $('#idm-rsa-manager-approval-sailpoint #edit-vendorname').val()=='') {
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-vendor-name-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-vendor-name').append("<div class='error rsa-manager-approval-vendor-name-validation custom-error-validation' style='clear:both'>Please Select the Vendor</div>");
					var vendorvalidation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-vendor-name-validation').remove();
					var vendorvalidation_status=1;
				}
				
				
				if($('#idm-rsa-manager-approval-sailpoint #edit-vendorname').val()=='Other Vendor' && $('#idm-rsa-manager-approval-sailpoint #edit-othervendor').val()=='') {
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor').append("<div class='error rsa-manager-approval-other-vendor-validation custom-error-validation' style='clear:both'>Please Select Other Vendor</div>");
					var othervendorvalidation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor-validation').remove();
					var othervendorvalidation_status=1;
				}
				
				if($('#idm-rsa-manager-approval-sailpoint #edit-othervendor').val()=='0' && $('#idm-rsa-manager-approval-sailpoint #edit-others').val()=='') {
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others-validation').remove();
				$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-othersfieldexist-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others').append("<div class='error rsa-manager-approval-others-validation custom-error-validation' style='clear:both'>Please Enter Vendor Name</div>");
					var entervendorvalidation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-othersfieldexist-validation').remove();
					var other_field = $('#idm-rsa-manager-approval-sailpoint #edit-others').val().toLowerCase();
					
					var vendoroptions = $('#idm-rsa-manager-approval-sailpoint #edit-vendorname option');
					var vendor_values = $.map(vendoroptions ,function(vendoroption) {
						if(vendoroption.value!="") {
							return vendoroption.value.toLowerCase();
						}
					});

					var othervendoroptions = $('#idm-rsa-manager-approval-sailpoint #edit-othervendor option');
					var othervendor_values = $.map(othervendoroptions ,function(othervendoroption) {
						if(othervendoroption.value!="") {
							return othervendoroption.value.toLowerCase();
						}
					});
					var children = vendor_values.concat(othervendor_values);
						
					if(jQuery.inArray(other_field, children) != -1) {
						$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-othersfieldexist-validation').remove();
						$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others').append("<div class='error rsa-manager-approval-othersfieldexist-validation custom-error-validation' style='clear:both;width:44em'>Vendor already appears in one of the dropdown menus above. Please select the vendor from the dropdown</div>");
						var entervendorvalidation_status=0;
					} else {
						$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-othersfieldexist-validation').remove();
						var entervendorvalidation_status=1;
					}
				}
				
				if($('#idm-rsa-manager-approval-sailpoint #edit-comments').val()=='') {
				$('#idm-rsa-manager-approval-sailpoint .request-profile-comments-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .request-profile-comments').append("<div class='error request-profile-comments-validation custom-error-validation' style='clear:both;'>Please Enter Comments</div>");
					var commentsvalidation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .request-profile-comments-validation').remove();
					var commentsvalidation_status=1;
				}
				
				/*if(validation_status==0) {
					return false;
				}*/
				if(vendoroption_validation_status==1 && vendorvalidation_status==1 && othervendorvalidation_status==1 && entervendorvalidation_status==1 && commentsvalidation_status==1) {
					$("#idm-rsa-manager-approval-sailpoint #edit-approve-leg").addClass("submit-stop");
					return true;
				} else {
					return false;
				}
				
			}	
		 });
		 
		 $('#idm-rsa-manager-approval-sailpoint #edit-approve-leg').live('click',function(e) {
			if($('#idm-rsa-manager-approval-sailpoint #hidden_radiobuttonoption_suppliername').val()=='hide') {
				if($('#idm-rsa-manager-approval-sailpoint #edit-comments').val()=='') {
				$('#idm-rsa-manager-approval-sailpoint .request-profile-comments-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .request-profile-comments').append("<div class='error request-profile-comments-validation custom-error-validation' style='clear:both'>Please Enter Comments</div>");
					var validation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .request-profile-comments-validation').remove();
					var validation_status=1;
				}
				if(validation_status==0) {
					return false;
				}
				if(validation_status==1) {
					$("#idm-rsa-manager-approval-sailpoint #edit-approve-leg").addClass("submit-stop");
					return true;
				}
			}
		 });
		 
		 $('#idm-rsa-manager-approval-sailpoint #edit-reject-leg').live('click',function(e) {
			$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-others-validation').remove();
			$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-other-vendor-validation').remove();
			$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-vendor-name-validation').remove();
			$('#idm-rsa-manager-approval-sailpoint .supplier-name-update-option-validation').remove();
			$('#idm-rsa-manager-approval-sailpoint .rsa-manager-approval-othersfieldexist-validation').remove();
			if($('#idm-rsa-manager-approval-sailpoint #edit-comments').val()=='') {
				$('#idm-rsa-manager-approval-sailpoint .request-profile-comments-validation').remove();
					$('#idm-rsa-manager-approval-sailpoint .request-profile-comments').append("<div class='error request-profile-comments-validation custom-error-validation' style='clear:both'>Please Enter Comments</div>");
					var validation_status=0;
				} else {
					$('#idm-rsa-manager-approval-sailpoint .request-profile-comments-validation').remove();
					var validation_status=1;
				}
				if(validation_status==0) {
					return false;
				}
				if(validation_status==1) {
					$("#idm-rsa-manager-approval-sailpoint #edit-reject-leg").addClass("submit-stop");
					return true;
				}
		 
		 });
		 
		 $('#idm-rsa-manager-approval-sailpoint #edit-cancel-leg').live('click',function() {
		   window.location.href='/rsa/approvals/list';
		   return false;
		 });

		 $('#idm-rsa-vpnsupplier-approval-sailpoint .submit-stop').live('click',function(e) {
			return false;
		});

		$('#idm-rsa-vpnsupplier-approval-sailpoint #edit-skipreview-leg').live('click',function(e) {
			if($('#idm-rsa-vpnsupplier-approval-sailpoint #edit-comments').val()=='') {
				$('#idm-rsa-vpnsupplier-approval-sailpoint .request-profile-comments-validation').remove();
					$('#idm-rsa-vpnsupplier-approval-sailpoint .request-profile-comments').append("<div class='error request-profile-comments-validation custom-error-validation' style='clear:both;color:#d12a2a;font-size: 0.8em;padding-left: 13em;'>Please Enter Comments</div>");
					var validation_status=0;
				} else {
					$('#idm-rsa-vpnsupplier-approval-sailpoint .request-profile-comments-validation').remove();
					var validation_status=1;
				}
				if(validation_status==0) {
					return false;
				}
				if(validation_status==1) {
					$("#idm-rsa-vpnsupplier-approval-sailpoint #edit-skipreview-leg").addClass("submit-stop");
					return true;
				}
		 
		 });
		 
		 /*$('#idm-rsa-vpnsupplier-approval-sailpoint #edit-reject-leg').live('click',function(e) {
			if($('#idm-rsa-vpnsupplier-approval-sailpoint #edit-comments').val()=='') {
				$('#idm-rsa-vpnsupplier-approval-sailpoint .request-profile-comments-validation').remove();
					$('#idm-rsa-vpnsupplier-approval-sailpoint .request-profile-comments').append("<div class='error request-profile-comments-validation custom-error-validation' style='clear:both;color:#d12a2a;font-size: 0.8em;padding-left: 13em;'>Please Enter Comments</div>");
					var validation_status=0;
				} else {
					$('#idm-rsa-vpnsupplier-approval-sailpoint .request-profile-comments-validation').remove();
					var validation_status=1;
				}
				if(validation_status==0) {
					return false;
				}
				if(validation_status==1) {
					return true;
				}
		 });*/
		 
		 $('#idm-rsa-vpnsupplier-approval-sailpoint #edit-cancel-leg').live('click',function() {
		   window.location.href='/rsa/approvals/list';
		   return false;
		 });

		 $('#idm-request-assets-secure-remote-access-sailpoint #edit-cancel-leg').live('click',function() {
		   window.location.href='/assets';
		   return false;
		 });

			/*var vendor_values = [];
			$('#idm-request-assets-secure-remote-access-sailpoint #edit-vendorname option').each(function() { 
					vendor_values.push( $(this).attr('value') );
			});
			alert(vendor_values.toString());*/
			
			
		//}
	
	
})(jQuery);



/**
 * Special Effects AJAX framework command.
 */
Drupal.ajax.prototype.commands.showregion =  function(ajax, response, status) {
  //alert("Hello I'm Maged Eladawy...")  ; // this will be executed after the ajax call
  //alert(jQuery('#idm-request-assets-provisioning-request-2 #edit-provisioning #edit_organization_chosen .chosen-single span').text());
		 var organization = jQuery('#idm-request-assets-provisioning-request-2 #edit-provisioning #edit_organization_chosen .chosen-single span').text();
		 //alert(organization);
		 if(organization == 'Ad Sales National'){
			 jQuery(".sintec-onair-region").show();
		 } else {
			 jQuery(".sintec-onair-region").hide();
		 }
}

jQuery(function($) {
	$(document).ready(function(){
		 $("#idm-request-assets-secure-remote-access").submit(function( event ) {
				if($('#idm-request-assets-secure-remote-access #edit-remote-access-for-2').is(':checked') && $('#idm-request-assets-secure-remote-access #nam_id').val() == 'not mgrselected') {
					$('#idm-request-assets-secure-remote-access #edit-remote-access #edit-name').addClass('error');
					$('#idm-request-assets-secure-remote-access #edit-remote-access .form-item-name').next('label').show();
					event.preventDefault();
				}
		 });
		 $("#idm-request-assets-domain-tilde-account").submit(function( event ) {
				if($('#idm-request-assets-domain-tilde-account #edit-request-for-2').is(':checked') && $('#idm-request-assets-domain-tilde-account #nam_id').val() == 'not mgrselected') {
					$('#idm-request-assets-domain-tilde-account #edit-domain #edit-name').addClass('error');
					$('#idm-request-assets-domain-tilde-account #edit-domain .form-item-name').next('label').show();
					event.preventDefault();
				}
		 });
		 $("#idm-request-assets-domain-tilde-account").submit(function( event ) {
				if($('#idm-request-assets-domain-tilde-account #pro_id').val() == 'not proselected') {
					$('#idm-request-assets-domain-tilde-account #edit-copy-profile').addClass('error');
					$('#idm-request-assets-domain-tilde-account #edit-domaintilde .form-item-copy-profile').next('label').show();
					event.preventDefault();
				}
		 });
	});
});
function checkselectboxall() {
	jQuery( "#idm-request-assets-certificate select" ).each(function() {
		  if(jQuery(this).children('option').length < 2) {
			 jQuery(this).attr('disabled', 'disabled');
		  }else {
			 jQuery(this).removeAttr('disabled');
		  }
		  jQuery(this).trigger("chosen:updated");
	});
}

function updateselectoptions(data, selectId, selectDataId) {
	jQuery(selectId).children().remove();
	jQuery(selectId).append(jQuery(data).filter(selectDataId).html());
	//jQuery(selectId).val('').trigger("chosen:updated");
	//checkselectboxall();
	checkselectboxall();
}
function updateselectoptionslocation(data, selectId, selectDataId) {
	jQuery(selectId).children().remove();
	jQuery(selectId).append(jQuery(data).filter(selectDataId).html());
	jQuery( "#idm-request-assets-rsa select" ).each(function() {
	  jQuery(this).trigger("chosen:updated");
	});
}
function copy_profile_flag_validate(event) {
 //jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde .ajax_throbber').show();
 if(!jQuery("#idm-request-assets-domain-tilde-account").valid()){
   return false;
 }
  var valid = 0;
  var someoneelse_flag =  jQuery('#idm-request-assets-domain-tilde-account #edit-domain #someoneelse_flag').html();
  var someoneelse_sso = jQuery('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name').val();
  if (someoneelse_flag == 0) {
    jQuery.ajax({
      url: '/autocomplete/tilde/'+someoneelse_sso,
      async: false,
      success: function(data) {
        if(data != '') {
           //valid = sso_match(data, someoneelse_sso);
          data = JSON.stringify(data);
          var account = data.match(/([\w\s]+)\(([\d]+)\)*/);
          if(account[2]){
           if(someoneelse_sso.match(/[\d]+/)){
            if(account[2].trim() == someoneelse_sso.trim())
             valid = 1;
           }else if(account[1]){
            if(account[1].toLowerCase().trim() === someoneelse_sso.toLowerCase().trim()){
             valid = 1;
             jQuery('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name').val(account[2]);
            }
           }
          }
        }
      }
    });
  } else {
    valid = 1;
  }
  if(!valid){
     jQuery('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name').removeClass("valid");
     jQuery('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name').addClass("error");
     jQuery('<label for="edit-name" generated="true" class="error">Please enter a valid profile</label>').insertAfter(jQuery('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name'));
     event.preventDefault();
  }
  var valid_copy = 0;
  var copy_profile_flag =  jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde #copy_profile_flag').html();
  var copy_profile_sso = jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile').val();
  if (copy_profile_flag == 0) {
    jQuery.ajax({
      url: '/autocomplete/tilde/'+copy_profile_sso,
      async: false,
      success: function(data) {
        if(data != '') {
          valid_copy = sso_match(data, copy_profile_sso);
          /*data = JSON.stringify(data);
          var account = data.match(/([\w\s]+)\(([\d]+)\)*/
          //);
          /*if(account[2]){
           if(copy_profile_sso.match(/[\d]+/)){
            if(account[2].trim() == copy_profile_sso.trim())
             valid = 1;
           }else if(account[1]){
            if(account[1].toLowerCase().trim() === copy_profile_sso.toLowerCase().trim()){
             valid = 1;
             jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile').val(account[2]);
            }
           }
          }*/
        }
      }
    });
  } else {
	 valid_copy = 1;
  }
  if(!valid_copy){
     jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile').removeClass("valid");
     jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile').addClass("error");
     jQuery('<label for="edit-copy-profile" generated="true" class="error">Please enter a valid profile</label>').insertAfter(jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde input#edit-copy-profile'));
     event.preventDefault();
  }
  jQuery('#idm-request-assets-domain-tilde-account #edit-domaintilde .ajax_throbber').hide();
  return valid_copy;
}

function sso_match(data, usersearched_sso) {
    data = JSON.stringify(data);
    var account = data.match(/([\w\s]+)\(([\d]+)\)*/);
    if(account[2]){
        return false;
     if(usersearched_sso.match(/[\d]+/)){
      if(account[2].trim() == usersearched_sso.trim())
       valid = 1;
     }else if(account[1]){
      if(account[1].toLowerCase().trim() === usersearched_sso.toLowerCase().trim()){
       valid = 1;
       //jQuery('#idm-request-assets-domain-tilde-account #edit-domain input#edit-name').val(account[2]);
      }
     }
    }
    return valid;
}

/*updated wireless user search listing*/
 function myFunction(args) {
		/*alert(args);
		return false;*/
		jQuery("#idm-request-assets-wireless-attributess #search_user_hidden").val('');
		if(args==1) {
			var path = "/list/wireless-search-sso/";
			var user_data = jQuery('#edit-name').val();
			var user_arr = user_data.split('(');
			var final_arr = user_arr[1].split(')');
			var user_name = final_arr[0];
			//var user_name = jQuery('#edit-name').val();
		}
		if(args==2) {
			var path = "/list/wireless-search/";
			var user_name = jQuery('#edit-name').val();
		}
		if(user_name!='') {
			jQuery('#idm-request-assets-wireless-attributess .top_msg_stmt').remove();
			jQuery("#idm-request-assets-wireless-attributess .submit-buttons-row").hide();
			jQuery('#idm-request-assets-wireless-attributess .search_user_error').remove();
			jQuery("#idm-request-assets-wireless-attributess #LoadingImage").show();
			jQuery.ajax({
			url:path+user_name,
      dataType: 'json',
      success: function(json) {
				//var smartIp = localStorage.setItem('smartIp', JSON.stringify(json));
				if(json!='') {
						jQuery("#idm-request-assets-wireless-attributess #LoadingImage").hide();
						jQuery("#idm-request-assets-wireless-attributess #myTableContainer").show();
						jQuery("#idm-request-assets-wireless-attributess #searchResults").show();
						jQuery("#idm-request-assets-wireless-attributess .pagination").show();
						jQuery("#idm-request-assets-wireless-attributess .msg_stmt").show();
						jQuery("#idm-request-assets-wireless-attributess .noresult-found").hide();
						jQuery("#idm-request-assets-wireless-attributess .wireless-usersearch-submit").show();
						jQuery("#myTableContainer").showResults(json, {
						callback: callback,
						resultTarget: '#searchResults',
						pagesTarget: '.pagination',
						arrows: ['<span class="ui-icon ui-icon-triangle-1-n"></span>','<span class="ui-icon ui-icon-triangle-1-s"></span>']
					});
				 } else {
					 jQuery("#idm-request-assets-wireless-attributess #myTableContainer").show();
					 jQuery("#idm-request-assets-wireless-attributess .noresult-found").show();
					 jQuery("#idm-request-assets-wireless-attributess #LoadingImage").hide();
					 jQuery("#idm-request-assets-wireless-attributess #searchResults").hide();
					 jQuery("#idm-request-assets-wireless-attributess .pagination").hide();
					 jQuery("#idm-request-assets-wireless-attributess .msg_stmt").hide();
					 jQuery("#idm-request-assets-wireless-attributess .wireless-usersearch-submit").hide();
				 }
        }
        });
		} else {
			jQuery('#idm-request-assets-wireless-attributess .search_user_error').remove();
			jQuery("#idm-request-assets-wireless-attributess .form-item-name").after("<label class='search_user_error error'>Please Enter a Username to Search</label>");
			return false;
		}

	}
	/*updated wireless user search listing*/
	function callback() {
	 jQuery('#searchResults .check-bg .backg').live('click',function(e) {
		//jQuery(this).addClass('categories_selected');
		//var kk = jQuery(this).next("div").text();
		var kk = jQuery(this).attr("id");
		jQuery('#idm-request-assets-wireless-attributess #search_user_hidden').val(kk);
		jQuery(this).css("background-position","0px -56px");
		jQuery('#searchResults .check-bg .backg').not(this).removeAttr("style");
	  //jQuery("#myTableContainer-0").trigger("click");
	});
	}
