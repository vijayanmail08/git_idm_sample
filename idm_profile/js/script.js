jQuery(function($) {
    if($.mask != undefined){
        $.mask.definitions['9'] = '';
        $.mask.definitions['x']='[0-9]';
        if($('#phone_code').length){
         $("#edit-phone").mask("+"+$('#phone_code').val()+" (xxx) xxx-xxxx");
        }else if($('#edit-phone').length) {
          $("#edit-phone").mask("(xxx) xxx-xxxx");
        }

        if($('#idm-profile-edit-user-profile #edit-mobile').length){
         $("#idm-profile-edit-user-profile #edit-mobile").mask("+"+$('#phone_code').val()+" (xxx) xxx-xxxx");
         $("#idm-profile-edit-user-profile #edit-fax").mask("+"+$('#phone_code').val()+" (xxx) xxx-xxxx");
        }else if($('#edit-mobile').length) {
          $("#edit-phone").mask("(xxx) xxx-xxxx");
          $("#edit-fax").mask("(xxx) xxx-xxxx");
        }

        if($('.page-homepage #block-idm-profile-profile-progress .completion_module .actions .field').length){
         $(".page-homepage #block-idm-profile-profile-progress .completion_module .actions .field").mask("+"+$('#phone_code').val()+" (xxx) xxx-xxxx");
        }else if($('.completion_module .actions .field').length) {
          $(".completion_module .actions .field").mask("(xxx) xxx-xxxx");
        }

    }
        if($('.address.adr_label').length) {
          $(".address.adr_label").css("display","none");
        }
	var knob_val = 0;
	var placeholder_progress = $("#block-idm-profile-profile-progress .completion_module .submit_field input[type='text']").val();
	/*$('html').live("click", function(e) {
	  if (!e) e = window.event;
	  //if clicked element is not your element and parents aren't your div
	  if ((e.target || e.srcElement).class != 'profile-actions' && $((e.target || e.srcElement)).parents('.profile-actions').length == 0) {
		if ($('.profile-actions').length) {
			$('.profile-actions').find('.alert-actions').hide();		$('.main-actions').find('button').addClass('hover-blue').removeClass('grey-light');
		}
	  }
	}); */
	$(document).keyup(function(e) {
	  if (e.keyCode == 27) {
		if ($('.profile-actions').length) {
			$('.profile-actions').find('.alert-actions').hide();
			$('.main-actions').find('button').addClass('hover-blue').removeClass('grey-light');
		}
	  }
	});
	if ($(".knob").length) {
		var knob_val = $(".knob").val();
		var next_val = $('.knob-field').val();
		var fgcolor = "#ffffff";
		var bgcolor = "#8a68b2";
		if (knob_val == 100 && $('.lt-ie9').length) {
			fgcolor = "#8a68b2";
			bgcolor = "#ffffff";
		}
		$(".knob").knob({
			"fgColor":fgcolor,
			"bgColor":bgcolor,
			"width":"70",
			"height":"70",
			"min":"0",
			"readOnly": true,
			"thickness":".2",
			draw : function (value) {
				$(".knob").val((100-knob_val)+"%");
			}
		});
		//$(".knob").val(knob_val).trigger('change').val(knob_val+"%");
	}
	$('.knob').live('blur', function(e) {
		$(".knob").val(knob_val);
	});
	$('.knob-field').live('blur', function(e) {
		$(".knob-field").val(next_val);
	});
  $(".error_request-msg img").live('click',function(e) {
    $(".error_request-msg").hide();
  });
  $(".approve_request-msg img").live('click',function(e) {
    $(".approve_request-msg").hide();
  });
	$('#block-idm-profile-profile-progress .actions button').live('click', function() {
		var parent = $(this).parents('.completion_module');
		var field_val = parent.find('.field').val();
		var field_class = $(this).attr('field');
		if (field_class == 'location'){
			field_val = parent.find('.field_1').val() + 'wlspidm' + parent.find('.field_2').val() + 'wlspidm' + parent.find('.field_3').val();
		}
		var err_msg = validate_field(field_val, field_class);
		if (err_msg != ''){
			parent.addClass('error').find('.field').addClass('error');
			parent.find('.error_wrapper.error').show().find('.error_message').html(err_msg);
		}
		else {
			parent.find('.ajax_throbber').css("display","block");
			$.ajax({
				url: '/progress/save/'+field_class+'/'+field_val,
				success: function(data) {
					if (data == 'success') {
						parent.find('.completion_circle div').remove();
						parent.find('.completion_circle input.knob-field').show();
						parent.find('.submit_field.actions').remove();
						parent.removeClass('error').find('.error').remove();
						parent.find('.ajax_throbber').css("display","none");
						if ($(".knob-field").val() != 0) {
							parent.find('.more_updates').show();
							parent.find('.progress_text').html('Your '+field_class+' has been updated!');
						}
						else {
							parent.find('.more_updates').show();
							parent.find('.progress_text').html('Congratulations! <br>Your profile has been completed!');
						}
						var knob_val = $(".knob-field").val();
						var fgcolor = "#FFFFFF";
						var bgcolor = "#8a68b2";
						if (knob_val == 100 && $('.lt-ie9').length) {
							fgcolor = "#8a68b2";
							bgcolor = "#FFFFFF";
						}
						$(".knob-field").knob({
							"fgColor":fgcolor,
							"bgColor":bgcolor,
							"width":"70",
							"height":"70",
							"min":"0",
							"readOnly": true,
							"thickness":".2",
							draw : function (value) {
								$(".knob-field").val((100-knob_val)+"%");
							}
						});
					}
					parent.find('.ajax_throbber').css("display","none");
				}
			  });
		}
	});
	$('#idm-create-new-contractor #edit-mgr .checkbox-row').live('click', function() {
		if ($(this).hasClass('icon-checked_icon')) {
			$(this).removeClass('icon-checked_icon');
			$(this).parent().find('input').removeAttr('checked');
			$('#idm-create-new-contractor #edit-mgr .region').css("display", "none");
			$('#idm-create-new-contractor #edit-contractor .email').find('span').show();
			$('#idm-create-new-contractor #edit-contractor .email .form-item-email').find('span').hide();
			$('#idm-create-new-contractor #edit-contractor .email label').css("margin-left", "0");
			//$('#idm-create-new-contractor #edit-contractor .email label#enter_email').css("display", "block");
			$('#idm-create-new-contractor #edit-contractor .email label#error_email').css("display", "block");
			$('#idm-create-new-contractor #edit-contractor .email label#success').css("display", "block");
			//$('#idm-create-new-contractor #edit-contractor .email input').addClass("required");
			//$('#idm-create-new-contractor #edit-contractor .email input').addClass("error");
			$('#request_check').val('0');
		}
		else {
			$(this).addClass('icon-checked_icon');
			$(this).parent().find('input').attr('checked', 'checked');
			$('#idm-create-new-contractor #edit-mgr .region').css("display", "block");
			$('#idm-create-new-contractor #edit-contractor .email').find('span').hide();
			$('#idm-create-new-contractor #edit-contractor .email label').css("margin-left", "0.7%");
			$('#idm-create-new-contractor #edit-contractor .email label#enter_email').css("display", "none");
			$('#idm-create-new-contractor #edit-contractor .email label#error_email').css("display", "none");
			$('#idm-create-new-contractor #edit-contractor .email label#success').css("display", "none");
			$('#idm-create-new-contractor #edit-contractor .email input').removeClass("required");
			$('#idm-create-new-contractor #edit-contractor .email input').removeClass("error");
			$('#request_check').val('1');
		}
	});
	$('#idm-create-new-functional-account #edit-mgr .checkbox-row').live('click', function() {
		if ($(this).hasClass('icon-approve_icon')) {
			$(this).removeClass('icon-approve_icon');
			$(this).parent().find('input').removeAttr('checked');
		}
		else {
			$(this).addClass('icon-approve_icon');
			$(this).parent().find('input').attr('checked', 'checked');
		}
	});
	$('.user-info .basic-profile .profile-actions .main-actions li button').live('click', function() {
		if ($(this).html() != "Edit" ) {
			if ($(this).hasClass('hover-blue')) {
			    $(this).parents('.main-actions').find('button').addClass('hover-blue').removeClass('grey-light');
				$(this).removeClass('hover-blue').addClass('grey-light');
				var id = $(this).attr('id');
			$(this).parents('.profile-actions').find('.alert-actions').hide();
			$(this).parents('.profile-actions').find('.'+id).show();
			}
			else {
				$(this).parents('.main-actions').find('button').addClass('hover-blue').removeClass('grey-light');
				$(this).parents('.profile-actions').find('.alert-actions').hide();
			}
		}
	});
	$('.user-info .basic-profile .profile-actions .terminate-alert .actions .cancel').live('click', function() {
		$(this).parents('.profile-actions').find('#terminate-alert').addClass('hover-blue').removeClass('grey-light');
		$(this).parents('.terminate-alert').hide();
	});
	$('.user-info .basic-profile .profile-actions .transfer-alert .actions .cancel').live('click', function() {
		$(this).parents('.profile-actions').find('#transfer-alert').addClass('hover-blue').removeClass('grey-light');
		$(this).parents('.transfer-alert').hide();
	});
	$('.user-info .basic-profile .profile-actions .revoke-alert .actions .cancel').live('click', function() {
		$(this).parents('.profile-actions').find('#revoke-alert').addClass('hover-blue').removeClass('grey-light');
		$(this).parents('.revoke-alert').hide();
	});
	$('.user-info .basic-profile .profile-actions .transfer-alert .manager-unknown .checkbox-row, #mobile-transfer-employee .transfer-alert .manager-unknown .checkbox-row').live('click', function() {
		if ($(this).hasClass('icon-approve_icon')) {
			$(this).removeClass('icon-approve_icon');
			$(this).parent().find('input').removeAttr('checked');
			$(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button').attr('disabled', 'disabled');
			$(this).parents('.transfer-alert').find('.transfer-to input').removeAttr('readonly');
		}
		else {
			$(this).addClass('icon-approve_icon');
			$(this).parent().find('input').attr('checked', 'checked');
			$(this).parents('.transfer-alert').find('.transfer-to input').val('').attr('readonly', true);
			$(this).parents('.transfer-alert').find('.actions .hover-blue').removeClass('disabled_button').removeAttr('disabled');
		}
	});
	$('.user-info .basic-profile .profile-actions .transfer-alert .transfer-to input, #mobile-transfer-employee .transfer-alert .transfer-to input').live('blur, keyup', function() {
		if ($(this).val().length) {
			$(this).parents('.transfer-alert').find('.actions .hover-blue').removeClass('disabled_button').removeAttr('disabled');
		}
		else {
			if (!$(this).attr('readonly'))
				$(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button').attr('disabled', 'disabled');
		}
	});

	/* Profile actions submit with ajax*/
	$('.page-profile .transfer-alert .actions .submit, #mobile-transfer-employee .transfer-alert .actions .submit').live('click', function() {
		var current = $(this);
        var managerId = new Array(0, 0);
		var userId = current.parents('.alert-actions').find('input').attr('userid');
		var managerData = current.parents('.alert-actions').find('input').val();
        if(managerData.length != 0){
         managerId = managerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
        }
		var userType = current.parents('.basic-profile').find('.profile-actions').attr('usertype');
		//var managerName = current.parents('.alert-actions').find('input').attr('manager_name');
		if (! current.hasClass('disabled_button')) {
			current.parents('.profile-actions').find('.transfer-alert .ajax_throbber').show();
			$.ajax({
				url: '/transfer-employee/'+userId+'/'+managerId[1],
				success: function(data) {
					if ( data != '' ) {
						if ( data.charAt(0) == "/" ) {
							$('.profile-alert-actions-msg').remove();
							location.href = data+'/'+userType+'?userType='+userType;
						}else {
							current.parents('.user-info').before(data);
							if($(".basic-profile").parent().hasClass("mobile-employee-profile")) {
								setTimeout(function(){ window.location = "/profile/"+userId; }, 5000);
							};
						}
					}
					current.parents('.profile-actions').find('.transfer-alert .ajax_throbber').hide();
					//current.parents('.user-info .job-info .other-info-details .profile-text:eq(2)').html(managerId[1]);
					current.parents('.alert-actions').hide();
					current.parents('.alert-actions').find('.transfer-to input').val('').removeAttr('readonly');
					current.parents('.alert-actions').find('.manager-unknown input').removeAttr('checked');
					current.parents('.alert-actions').find('.actions .hover-blue').addClass('disabled_button');
					current.parents('.alert-actions').find('.manager-unknown .checkbox-row').removeClass('icon-approve_icon');
					current.parents('.profile-actions').find('.main-actions button').addClass('hover-blue').removeClass('grey-light');
				},
			});
		}
	});

	$('.user-info .basic-profile .profile-actions .renew-alert ul li .radio').live('click', function() {
       var current = $(this);
       current.parents('.renew-alert').find('.actions button.submit').removeClass('disabled_button');
	});

	$('.user-info .basic-profile .profile-actions .renew-alert .actions .submit, #mobile-renew-employee .renew-alert .actions .submit').live('click', function() {
		var current = $(this);
		var userId = current.parents('.alert-actions').find('ul').attr('userid');
		var renew_time = current.parents('.alert-actions').find('input[name=renew]:checked').val();
		var renew_date = current.parents('.alert-actions').find('input[name=renew]:checked').parent().find('.duration .date').attr('renew_date');
		var userType = current.parents('.basic-profile').find('.profile-actions').attr('usertype');
        var expire_date = current.parents('.alert-actions').find('ul').attr('enddate');
        var initial_end_date = new Date(expire_date);
        var new_end_date = new Date(renew_date);
        if (new_end_date < initial_end_date) {
          var $dialog = $('<div class="error_renew_message">Selected end date is less than the Contractor\'s end date. Are you sure you want to reduce the end date of the Contractor.</div>').dialog({
            title: 'IDM',
            modal: true,
            height:210,
            width: 272,
            dialogClass: 'renew-dialog',
            resizable: false,
            buttons: {
              "Yes": function() {
                $( this ).dialog( "close" );
                renewProfileAjaxFunction(renew_time,current,userId);
              },
              Cancel: function() {
                $( this ).dialog( "close" );
                return;
              }
            }
          });
          $dialog.dialog('open');
        } else {
          renewProfileAjaxFunction(renew_time,current,userId);
        }
	});
	$('.page-profile .terminate-alert .actions .submit, #mobile-terminate-employee .terminate-alert .actions .submit').live('click', function() {
		var current = $(this);
		var userId = current.parents('.alert-actions').find('.actions').attr('userid');
		var userType = current.parents('.basic-profile').find('.profile-actions').attr('usertype');
		current.parents('.profile-actions').find('.terminate-alert .ajax_throbber').show();
		$.ajax({
			url: '/terminate-employee/'+userId,
			success: function(data) {
				if (data != '') {
					if ( data.charAt(0) == "/" ) {
						$('.profile-alert-actions-msg').remove();
						location.href = data+'/'+userType+'?userType='+userType;
					}
					else {
						current.parents('.user-info').before(data);
					}
				}
				current.parents('.alert-actions').hide();
				current.parents('.profile-actions').find('.terminate-alert .ajax_throbber').hide();
				current.parents('.profile-actions').find('.main-actions button').addClass('hover-blue').removeClass('grey-light');
			},
		});
	});
	$('.page-profile .revoke-alert .actions .submit, #mobile-revoke-employee .revoke-alert .actions .submit').live('click', function() {
		var current = $(this);
		var userId = current.parents('.alert-actions').find('.actions').attr('userid');
		var userType = current.parents('.basic-profile').find('.profile-actions').attr('usertype');
		current.parents('.profile-actions').find('.revoke-alert .ajax_throbber').show();
		$.ajax({
			url: '/revoke-employee/'+userId,
			success: function(data) {
				if (data != '') {
					if ( data.charAt(0) == "/" ) {
						$('.profile-alert-actions-msg').remove();
						location.href = data+'/'+userType+'?userType='+userType;
					}
					else {
						current.parents('.user-info').before(data);
					}
				}
				current.parents('.alert-actions').hide();
				current.parents('.profile-actions').find('.revoke-alert .ajax_throbber').hide();
				current.parents('.profile-actions').find('.main-actions button').addClass('hover-blue').removeClass('grey-light');
			},
		});
	});
	$("#block-idm-profile-profile-progress .completion_module .submit_field input[type='text']").live("blur", function() {
		if ($(this).val() == '') {
			$(this).val(placeholder_progress);
		}
	});
	$("#block-idm-profile-profile-progress .completion_module .submit_field input[type='text']").live("focus", function() {
		if ($(this).val().match("Enter")) {
			$(this).val('').focus();
		}
	});
	$("#idm-profile-edit-user-profile .profile-pic .profile-edit a").live("click", function(e) {
		e.preventDefault();
		var childWindow = window.open('/profile-upload', '_blank', "height=400,width=980");
		if ($('.lt-ie9').length) {
			childWindow.attachEvent('onunload', function() {
				childWindow.close();
				$.ajax({
					url: '/post-profile-upload',
					success: function(data) {
						location.reload();
					},
				});
			});
		}
		else {
			childWindow.onbeforeunload = function(){
				childWindow.close();
				$.ajax({
					url: '/post-profile-upload',
					success: function(data) {
						location.reload();
					},
				});
			}
		}
	});
        $('#idm-create-new-contractor input#edit-name').live('autocompleteSelect',function(e) {
            if(!$("#idm-create-new-contractor .fieldset-wrapper .name #autocomplete").find("div").hasClass("no-search-result")) {
                $("#idm-create-new-contractor .fieldset-wrapper .name").next('#nam_id').val('mgrselected');
            } else {
                $("#idm-create-new-contractor .fieldset-wrapper .name").next('#nam_id').val('not mgrselected');
            }
           empName = $(this).val();
           empId = empName.substring(empName.lastIndexOf(" ") + 2, empName.length-1);
           $.ajax({
            url: '/getaddress/'+empId,
            success: function(data) {
              if ($.trim(data) == "") {
                $("#idm-create-new-contractor  .address.adr_tf #edit-address").val("");
                $("#idm-create-new-contractor  .address.adr_label").css("display","none");
                $("#idm-create-new-contractor  .address.adr_tf").css("display","block");
                $('#idm-create-new-contractor #address_id').val("");
                if($('#idm-create-new-contractor input#edit-phone').length) {
                  $('#idm-create-new-contractor input#edit-phone').mask("(xxx) xxx-xxxx");
                }
               }
              else {
                var loc_arr = data.split('=');
                $("#idm-create-new-contractor  .address.adr_label").css("display","block");
                $("#idm-create-new-contractor  .address.adr_tf").css("display","none");
                $('#idm-create-new-contractor #edit-address-label .address-label').html($.trim(loc_arr[1]));
                $('#idm-create-new-contractor .address #edit-address').val($.trim(loc_arr[1]));
                $('#idm-create-new-contractor #edit-mgr #work_location').val($.trim(loc_arr[1]));
                $('#idm-create-new-contractor #address_id').val($.trim(loc_arr[0]));
                if($('#idm-create-new-contractor input#edit-phone').length) {
                  $('#idm-create-new-contractor input#edit-phone').mask("+"+loc_arr[2]+" (xxx) xxx-xxxx");
                }
              }
            }
          });
        })
        $('#idm-create-new-functional-account input#edit-name').live('autocompleteSelect',function(e) {
            if(!$("#idm-create-new-functional-account .fieldset-wrapper .name #autocomplete").find("div").hasClass("no-search-result")) {
                $("#idm-create-new-functional-account .fieldset-wrapper .name").next('#nam_id').val('mgrselected');
            } else {
                $("#idm-create-new-functional-account .fieldset-wrapper .name").next('#nam_id').val('not mgrselected');
            }
        });
        $('#idm-create-new-functional-account input#edit-application-id').live('autocompleteSelect',function(e) {
            if(!$("#idm-create-new-functional-account fieldset#edit-functional .fieldset-wrapper .preferred-name #autocomplete").find("div").hasClass("no-search-result")) {
                $('#idm-create-new-functional-account #appid_id').val('mgrselected');
            } else {
                $('#idm-create-new-functional-account #appid_id').val('not mgrselected');
            }
        });
        $("#idm-create-new-contractor input#edit-address").live('autocompleteSelect', function(event) {
            var values = $(this).val().split('|');;
            $('#idm-create-new-contractor #edit-address-label .address-label').html($.trim(values[1]));
            $('#idm-create-new-contractor .address #edit-address').val($.trim(values[1]));
            $('#idm-create-new-contractor #address_id').val($.trim(values[0]));
            $("#idm-create-new-contractor  .address.adr_label").css("display","block");
            $("#idm-create-new-contractor  .address.adr_tf").css("display","none");
            if($('#idm-create-new-contractor input#edit-phone').length) {
              $('#idm-create-new-contractor input#edit-phone').mask("+"+values[2]+" (xxx) xxx-xxxx");
            }
        });
        $("#idm-create-new-contractor input#edit-address").focusout(function(){
            var work_location = $('#idm-create-new-contractor #edit-mgr #work_location').val();
            $('#idm-create-new-contractor #edit-mgr #edit-address').val(work_location);
        });
        $('#idm-create-new-contractor .address.adr_label button').live('click',function(e) {
           e.preventDefault();
           $("#idm-create-new-contractor  .address.adr_label").css("display","none");
           $("#idm-create-new-contractor  .address.adr_tf").css("display","block");
        });

        if ($.browser.msie) {
		   if($.browser.version == '9.0') {
		        $('#idm-create-new-functional-account input#edit-application-id').live('autocompleteSelect',function(e) {
		         var application_data = $(this).val().split(/(.*)[\s]+([\d]+)/);
		         if(application_data[1] != 'undefined'){
		          $('#idm-create-new-functional-account input#edit-application-name').val(application_data[1].trim());
		          $('#idm-create-new-functional-account input#edit-application-name').removeClass('error');
		          $(".form-item-application-name  .error").css("display","none");
		         }
		        });
		   }
		   else {
			   $('#idm-create-new-functional-account input#edit-application-id').live('change',function(e) {
				   var application_data = $(this).val().split(" ");
		            for(i = 0; i < application_data.length; i++){
						if(i == application_data.length -1){
							app_id = application_data[i];
						}
		            }
		            var application_data = $(this).val().replace(app_id, '');
		            $('#idm-create-new-functional-account input#edit-application-name').val(application_data);
			          $('#idm-create-new-functional-account input#edit-application-name').removeClass('error');
			          $(".form-item-application-name  .error").css("display","none");
			        });
		   }
		}
        else {
	        $('#idm-create-new-functional-account input#edit-application-id').live('autocompleteSelect',function(e) {
		         var application_data = $(this).val().split(/(.*)[\s]+([\d]+)/);
		         if(application_data[1] !== undefined){
		          $('#idm-create-new-functional-account input#edit-application-name').val(application_data[1].trim());
		          $('#idm-create-new-functional-account input#edit-application-name').removeClass('error');
		          $(".form-item-application-name  .error").css("display","none");
		         }
		        });
        }
		$("#block-idm-profile-profile-progress .completion_module .upload-picture").live("click", function(e) {
			e.preventDefault();
			var parent = $(this).parents('.completion_module');
			var childWindow = window.open('/profile-upload', '_blank', "height=400,width=980");
			if ($('.lt-ie9').length) {
				childWindow.attachEvent('onunload', function() {
					childWindow.close();
					$.ajax({
						url: '/post-profile-upload',
						success: function(data) {
							parent.find('.completion_circle div').remove();
							parent.find('.completion_circle input.knob-field').show();
							parent.find('.submit_field.actions').remove();
							parent.find('.more_updates').show();
							parent.find('.progress_text').html('Congratulations! Your profile has been completed!');
							var knob_val = $(".knob-field").val();
							var fgcolor = "#FFFFFF";
							var bgcolor = "#8a68b2";
							if (knob_val == 100 && $('.lt-ie9').length) {
								fgcolor = "#8a68b2";
								bgcolor = "#FFFFFF";
							}
							$(".knob-field").knob({
								"fgColor":fgcolor,
								"bgColor":bgcolor,
								"width":"70",
								"height":"70",
								"min":"0",
								"readOnly": true,
								"thickness":".2",
								draw : function (value) {
									$(".knob-field").val((100-knob_val)+"%");
								}
							});
						},
					});
				});
			}
			else {
				childWindow.onbeforeunload = function(){
					var user_sso = Drupal.settings.props.prop1;
					//var user_sso = '206426190';
				    var imageUrl = 'http://supportcentral.inbcu.com/images/person/temp/'+user_sso+'.jpg';
				      imageExists(imageUrl, function(exists) {
				        //Show the result
				        //alert('Fileexists=' + exists);
				        if(exists == true) {
	                        parent.find('.ajax_throbber').css("display","block");
							$.ajax({
								url: '/post-profile-upload',
								success: function(data) {
									parent.find('.completion_circle div').remove();
									parent.find('.completion_circle input.knob-field').show();
									parent.find('.submit_field.actions').remove();
									parent.find('.more_updates').show();
									parent.find('.ajax_throbber').css("display","none");
									parent.find('.progress_text').html('Congratulations! Your profile has been completed!');
									var knob_val = $(".knob-field").val();
									var fgcolor = "#FFFFFF";
									var bgcolor = "#8a68b2";
									if (knob_val == 100 && $('.lt-ie9').length) {
										fgcolor = "#8a68b2";
										bgcolor = "#FFFFFF";
									}
									$(".knob-field").knob({
										"fgColor":fgcolor,
										"bgColor":bgcolor,
										"width":"70",
										"height":"70",
										"min":"0",
										"readOnly": true,
										"thickness":".2",
										draw : function (value) {
											$(".knob-field").val((100-knob_val)+"%");
										}
									});
								},
							});
							childWindow.close();
				        } else {
                            childWindow.close();
				        }
				      });
				}
			}
		});
		$('#idm-create-new-functional-account #edit-functional .contractor-submit-buttons #edit-cancel, #idm-create-new-contractor #edit-contractor .contractor-submit-buttons #edit-cancel').live('click',function() {
		   window.location.href='/';
		   return false;
		 });
		$(document).ready(function() {
			$(document).click(function(event) {
				if($(event.target).parents().index($('#renewalert')) == -1 && $(event.target).parents().index($('.renew-dialog')) == -1) {
					if($('#renewalert').is(":visible")) {
						if(event.target.id != 'renew-alert') {
							if($("#renewalert").parent().attr('class') == 'profile-actions') {
								$('#renewalert').hide();
								$('.main-actions #renew-alert').removeClass('grey-light');
								$('.main-actions #renew-alert').addClass('hover-blue');
							}
						}
				    }
				}
				if($(event.target).parents().index($('#transferalert')) == -1) {
					if($('#transferalert').is(":visible")) {
						if(event.target.id != 'transfer-alert') {
							if($("#transferalert").parent().attr('class') == 'profile-actions') {
								$('#transferalert').hide();
								$('.main-actions #transfer-alert').removeClass('grey-light');
								$('.main-actions #transfer-alert').addClass('hover-blue');
							}
						}
				    }
				}
				if($(event.target).parents().index($('#terminatealert')) == -1) {
					if($('#terminatealert').is(":visible")) {
						if(event.target.id != 'terminate-alert') {
							if($("#terminatealert").parent().attr('class') == 'profile-actions') {
								$('#terminatealert').hide();
								$('.main-actions #terminate-alert').removeClass('grey-light');
								$('.main-actions #terminate-alert').addClass('hover-blue');
							}
						}
				    }
				}
				if($(event.target).parents().index($('#revokealert')) == -1) {
					if($('#revokealert').is(":visible")) {
						if(event.target.id != 'revoke-alert') {
							if($("#revokealert").parent().attr('class') == 'profile-actions') {
								$('#revokealert').hide();
								$('.main-actions #revoke-alert').removeClass('grey-light');
								$('.main-actions #revoke-alert').addClass('hover-blue');
							}
						}
				    }
				}
			})
		});
		$(document).ready(function(){
			$( "#idm-create-new-contractor .check_availability_button button, #idm-create-new-contractor .check_availability_mobile a").live('click',function(e) {
				//if($("#idm-create-new-contractor").valid() == true) {
				email_id = $('#idm-create-new-contractor #edit-email').val();
				if(email_id == ''){
					$('#idm-create-new-contractor #edit-email').addClass('error');
					$('#idm-create-new-contractor #enter_email').css("display", "block");
				}
				else if( !validateEmail(email_id)) {
					$('#idm-create-new-contractor #edit-email').addClass('error');
					$('#idm-create-new-contractor #enter_email').css("display", "block");
				}
				else{
				$( "#idm-create-new-contractor .check_availability_button .ajax_throbber").css("display","block");
					emailid = $('#idm-create-new-contractor #edit-email').val();
			           $.ajax({
			            url: '/checkemail/'+emailid,
			            success: function(data) {
			              if ($.trim(data) >= 1) {
	                         $( "#idm-create-new-contractor .check_availability_button .ajax_throbber").css("display","none");
			                 $('#idm-create-new-contractor #edit-email').addClass('error');
							 $('#idm-create-new-contractor .success').css("display","none");
			                 $('#idm-create-new-contractor .error_email').css("display", "block");
			                 $('#idm-create-new-contractor #edit-submit').addClass('disabled_button');
			                 $('#idm-create-new-contractor #edit-submit-add-more').addClass('disabled_button');
			               }
			              else {
                             $("#idm-create-new-contractor .check_availability_button .ajax_throbber").css("display","none");
                             $('#idm-create-new-contractor #edit-email').removeClass('error');
			                 $('#idm-create-new-contractor .error_email').css("display", "none");
							 $('#idm-create-new-contractor .success').css("display","block");
			                 $('#idm-create-new-contractor #edit-submit').removeClass('disabled_button');
			                 $('#idm-create-new-contractor #edit-submit-add-more').removeClass('disabled_button');
			              }
			            }
			    });
				}
			});
			$( "#idm-create-new-contractor input#edit-email").focusin(function(){
				if ($("#idm-create-new-contractor #edit-email").is(':visible')) {
					//$('#idm-create-new-contractor #edit-email').removeClass('error');
				}
                $('#idm-create-new-contractor .error_email').css("display", "none");
				$('#idm-create-new-contractor .success').css("display","none");
			});
			$( "#idm-create-new-contractor, #idm-create-new-functional-account").submit(function( event ) {
				if($('#idm-create-new-contractor input#edit-submit').hasClass("disabled_button") || $('#idm-create-new-contractor input#edit-submit-add-more').hasClass("disabled_button")){
					event.preventDefault();
					if($('#idm-create-new-contractor .error_email').is(':visible') || $('#idm-create-new-contractor .error').is(':visible')) {
						$('#idm-create-new-contractor #edit-email').addClass('error');
					}
				}
				if($(this).find('#edit-mgr #nam_id').val() == 'not mgrselected') {
				   $(this).find('#edit-mgr #edit-name').addClass('error');
				   $(this).find('#edit-mgr .form-item-name').next('label').show();
				   event.preventDefault();
			    }
				if($(this).find('#edit-functional #appid_id').val() == 'not mgrselected') {
				   $(this).find('#edit-functional #edit-application-id').addClass('error');
				   $(this).find('#edit-functional .form-item-application-id').next('label').show();
				   event.preventDefault();
				}
				/*if($('#idm-create-new-contractor #nam_id').val() == 'not mgrselected') {
					$('#idm-create-new-contractor #edit-name').addClass('error');
					$('#idm-create-new-contractor #edit-mgr .form-item-name').next('label').show();
					event.preventDefault();
				}*/
				/*if($('#idm-create-new-functional-account #nam_id').val() == 'not mgrselected') {
					$('#idm-create-new-functional-account #edit-name').addClass('error');
					$('#idm-create-new-functional-account #edit-mgr .form-item-name').next('label').show();
					event.preventDefault();
				}*/
			});
		});
		  $("#transferalert div#autocomplete ul li.selected").live('hover', function() {
			  if ($('#transferalert div#autocomplete ul li.selected div.noresult').length) {
			    $(this).css("background", "white");
		        $(this).css("color", "#818181");
			  }
		  });

      $(".messages--status img").live('click',function(e) {
        $(".messages--status").hide();
      });
      $(".messages--error img").live('click',function(e) {
        $(".messages--error").hide();
      });
      $("#idm-create-new-contractor #edit_company_chosen .chosen-results").live("click", function(e) {
          var company_other = $("#idm-create-new-contractor #edit_company_chosen .chosen-single span").html();
          if(company_other == 'Other') {
              $("#idm-create-new-contractor .companyother").show();
          } else {
              $("#idm-create-new-contractor .companyother").hide();
          }
          if(company_other != 'Select') {
              $('#idm-create-new-contractor #edit-contractor div.company label.error').hide();
          }
          if(company_other == 'Select') {
              $('#idm-create-new-contractor #edit-contractor div.company label.error').show();
          }
      });
      $("#idm-create-new-contractor .fieldset-wrapper .name #autocomplete ul li div, #idm-create-new-functional-account .fieldset-wrapper .name #autocomplete ul li div").live("click", function(){
          if(!$(this).find("div").hasClass("no-search-result")) {
              $(this).parents('div.name').next('#nam_id').val('mgrselected');
          } else {
              $(this).parents('div.name').next('#nam_id').val('not mgrselected');
          }
      });
      $("#idm-create-new-functional-account .fieldset-wrapper .form-item-application-id #autocomplete ul li div").live("click", function(){
          if(!$(this).find("div").hasClass("no-search-result")) {
              $('#idm-create-new-functional-account #appid_id').val('mgrselected');
          } else {
              $('#idm-create-new-functional-account #appid_id').val('not mgrselected');
          }
      });
     /*$( "#idm-create-new-contractor input[name='name'], #idm-create-new-functional-account input[name='name']" ).change(function() {
            $(this).parents('fieldset#edit-mgr').find('#nam_id').val('mgrselected');
      });*/
      $( "#idm-create-new-contractor input[name='name'], #idm-create-new-functional-account input[name='name']" ).keyup(function() {
            $(this).parents('fieldset#edit-mgr').find('#nam_id').val('not mgrselected');
      });
      $( "#idm-create-new-functional-account input[name='application_id']" ).keyup(function() {
          $(this).parents('fieldset#edit-functional').find('#appid_id').val('not mgrselected');
      });
});

function validate_field(field_val, field_class) {
	error_message = '';
	switch(field_class) {
		case 'mobile':
		case 'phone':
			var regex = /^\d{10}$/
			if(!regex.test(field_val)) {
				error_message = 'Please enter a valid phone';
			}
			break;
	}
	return '';
}

function renewProfileAjaxFunction(renew_time,current,userId) {
  if ( typeof renew_time != 'undefined') {
    current.parents('.renew-alert').find('.ajax_throbber').show();
    jQuery.ajax({
      url: '/renew-employee/'+userId+'/'+renew_time,
      success: function(data) {
        if (data != '') {
          if (data == 'success') {
            //$('.profile-alert-actions-msg').remove();
            //location.href = data+'/'+userType+'?userType='+userType;
            current.parents('.user-info').before('<div class="approve_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
            if(jQuery(".basic-profile").parent().find("#mobile-renew-employee")) {
                    setTimeout(function() {
                    // redirecting after 5 seconds
                    window.location = '/profile/'+userId;
                }, 5000);
           }
          } else {
            current.parents('.user-info').before(data);
          }
        }
        current.parents('.profile-actions').find('.renew-alert .ajax_throbber').hide();
        //current.parents('.user-info .job-info .other-info-details .profile-text:eq(1)').html(renew_date);
        current.parents('.alert-actions').hide();
        current.parents('.alert-actions').find('input[name=renew]').removeAttr('checked');
        current.parents('.profile-actions').find('.main-actions button').addClass('hover-blue').removeClass('grey-light');
      },
    });
  }
}
function validateEmail(email) {
	  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  if( !emailReg.test(email) ) {
	    return false;
	  } else {
	    return true;
	  }
}

function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
}
