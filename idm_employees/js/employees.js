(function($) {
    Drupal.behaviors.idm_employees = {
	  attach: function(){
	   $(window).load(function(){
		   if($('.page-myworkers').length > 0 ){
			$(".page-myworkers #sticky-header").sticky({topSpacing: 0, center:true, className:"hey", getWidthFrom: "#mgr_employees" });
		   }
	   });
	   $(".mobile-myworkers-select").live('change', function() {
			var val = $( ".mobile-myworkers-select option:selected" ).val();
			if(val == "all") {
				get_all_employees();
			}
			if(val == "emp") {
				get_employees();
			}
			if(val == "cont") {
				get_contractors();
			}
			if(val == "func") {
				get_functional_accounts();
			}
	    });
	   $('#mgr_employees .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');

      // single check
      $('#mgr_employees .list .content .checkbox-row').live('click', function() {
        if ($(this).hasClass('icon-checked_icon')) {
          $(this).removeClass('icon-checked_icon');
          $(this).parents('li.employee_checked').find('div.employee_sso').removeClass('employee_sso_checked');
          $(this).parents('li.data_row').removeClass('employee_checked');
          $(this).parent().find('input').removeAttr('checked');
        } else {
          $(this).addClass('icon-checked_icon');
          $(this).parents('li.data_row').addClass('employee_checked');
          $(this).parents('li.data_row.employee_checked').find('.employee_sso').addClass('employee_sso_checked');
          $(this).parent().find('input').attr('checked', 'checked');
        }
        if ($(this).parents('ul.content').find('li.employee_checked').length > 1) {
          $('#mgr_employees .operations .actions li button#edit').addClass('disabled-button');
        } else {
          if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
          } else {
            $('#mgr_employees .operations .actions li button#edit').removeClass('disabled-button');
          }
        }
        if ($(this).parents('ul.content').find('li.employee_checked').length >= 1) {
          if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
            if ($(this).parents('ul.content').find('li.employee_checked').length == 1) {
              $('#mgr_employees .operations .actions li button#edit').addClass('hover-blue');
              $('#mgr_employees .operations .actions li button#edit').removeClass('disabled-button');
              //$('#mgr_employees .operations .actions li button#revoke').addClass('hover-blue');
              //$('#mgr_employees .operations .actions li button#revoke').removeClass('disabled-button');
            }
          } else {
            $('#mgr_employees .operations .actions li button#transfer').removeClass('disabled-button');
            $('#mgr_employees .operations .actions li button#renew').removeClass('disabled-button');
            $('#mgr_employees .operations .actions li button#terminate').removeClass('disabled-button');
            if($('li#contractors_tab').hasClass('hover-green') || $('li#all_employees_tab').hasClass('hover-green')) {
                $('#mgr_employees .operations .actions li button#revoke').removeClass('disabled-button');
            }
          }
        } else {
          $('#mgr_employees .operations .actions .transfer-alert #edit-transfer').val('');
          $('#mgr_employees .operations .actions .transfer-alert .manager-unknown .checkbox-row').removeClass('icon-approve_icon');
          $('#transfer-alert .actions .hover-blue').addClass('disabled_button')
          $('#mgr_employees div.transfer-alert').hide();
          $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
          $('#mgr_employees .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
          $('#mgr_employees .operations .actions .renew-alert-all .actions .submit').addClass('disabled_button');
          $('#mgr_employees div.renew-alert-all').hide();
          $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
          $('#mgr_employees div.terminate-alert').hide();
          $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
          $('#mgr_employees .operations .actions li button#edit').addClass('disabled-button');
          $('#mgr_employees .operations .actions li button#transfer').addClass('disabled-button');
          $('#mgr_employees .operations .actions li button#renew').addClass('disabled-button');
          $('#mgr_employees .operations .actions li button#terminate').addClass('disabled-button');
          $('#mgr_employees .operations .actions li button#revoke').addClass('disabled-button');
        }
        $all_checked = true;
        $('#mgr_employees .list .content .check-row').each(function() {
          if (!$(this).attr('checked')) {
            $all_checked = false;
          /*} else {
            if ($(this).parents('li.employee_checked').find('input#usertype').attr("value") == 'Employee' || $(this).parents('li.employee_checked').find('input#usertype').attr("value") == 'Functional') {
              $('#mgr_employees .operations .actions li button#revoke').addClass('disabled-button');
            }*/
          }
        });
        if ($all_checked) {
          $('#mgr_employees .operations .check-all .checkbox').addClass('icon-checked_icon');
          $('#mgr_employees .operations .check-all input').attr('checked', 'checked');
        } else {
          $('#mgr_employees .operations .check-all .checkbox').removeClass('icon-checked_icon');
          $('#mgr_employees .operations .check-all input').removeAttr('checked');
        }
        if($('li#contractors_tab').hasClass('hover-green') && $(this).parents('ul.content').find('li.employee_checked').length >= 1) {
            $('#mgr_employees .operations .actions li button#revoke').removeClass('disabled-button');
        }
        /*else {
            $('#mgr_employees .operations .actions li button#revoke').addClass('disabled-button');
        }*/
      });

	   $('#mgr_employees .operations .check-all .checkbox').live('click', function() {
			if ($(this).hasClass('icon-checked_icon')) {
				$(this).removeClass('icon-checked_icon');
				$(this).parent().find('input').removeAttr('checked');
				$('#mgr_employees .list .content .checkbox-row').each(function() {
					$(this).removeClass('icon-checked_icon');
					$(this).parents('li').removeClass('employee_checked');
				});
				$('#mgr_employees .list .content .check-row').each(function() {
					$(this).removeAttr('checked');
				});
				$('#mgr_employees .operations .actions .transfer-alert #edit-transfer').val('');
				$('#mgr_employees .operations .actions .transfer-alert .manager-unknown .checkbox-row').removeClass('icon-approve_icon');
				$('#transfer-alert .actions .hover-blue').addClass('disabled_button');
				$('#mgr_employees div.transfer-alert').hide();
		        $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
		        $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
		        $('#mgr_employees .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
		        $('#mgr_employees .operations .actions .renew-alert-all .actions .submit').addClass('disabled_button');
				$('#mgr_employees div.renew-alert-all').hide();
		        $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
		        $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
				$('#mgr_employees div.terminate-alert').hide();
		        $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
		        $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
				$('#mgr_employees .operations .actions li button#transfer').addClass('disabled-button');
				$('#mgr_employees .operations .actions li button#renew').addClass('disabled-button');
				$('#mgr_employees .operations .actions li button#terminate').addClass('disabled-button');
		        $('#mgr_employees .operations .actions li button#revoke').addClass('hover-blue');
		        $('#mgr_employees .operations .actions li button#revoke').removeClass('grey-light');
				$('#mgr_employees .operations .actions li button#revoke').addClass('disabled-button');
			}
			else {
				$('#mgr_employees .operations .actions li button#edit').addClass('disabled-button');
				$('#mgr_employees .operations .actions li button#transfer').removeClass('disabled-button');
				$('#mgr_employees .operations .actions li button#renew').removeClass('disabled-button');
				$('#mgr_employees .operations .actions li button#terminate').removeClass('disabled-button');
				$('#mgr_employees .operations .actions li button#revoke').removeClass('disabled-button');
				$(this).addClass('icon-checked_icon');
				$(this).parent().find('input').attr('checked', 'checked');
				$(this).parent().find('input').attr('checked', 'checked');
				$('#mgr_employees .list .content .checkbox-row').each(function() {
					$(this).addClass('icon-checked_icon');
					$(this).parents('li').addClass('employee_checked');
				});
				$('#mgr_employees .list .content .check-row').each(function() {
					$(this).attr('checked', 'checked');
				});
			}
	   });
       $('#mgr_employees .main-content ul.header li#header-cols .cell').live('click', function() {
         sortOrder = '';
         if ($(this).find('.sort-order div').hasClass('active')) {
           if ($(this).find('.sort-order div').hasClass('desc')) {
             $(this).find('.sort-order div').removeClass('desc').addClass('asc');
             sortOrder = 'asc';
           }
           else if ($(this).find('.sort-order div').hasClass('asc')) {
             $(this).find('.sort-order div').removeClass('asc').addClass('desc');
             sortOrder = 'desc';
           }
         }
         else {
           $(this).parent().find('.cell').each(function() {
             $(this).find('.sort-order div').removeClass('active');
           });
           $(this).find('.sort-order div').addClass('active');
         }
         sortValue = $(this).find('h3.col').html();
         switch (sortValue) {
           case 'SSO':
             sortBy = 'id';
             break;
           case 'Name':
             sortBy = 'givenname';
             break;
           case 'End Date':
             sortBy = 'enddate';
             break;
         }
         var sortOrderList = $(this).find('.sort-order div').attr('class').split(/\s+/);
         $.each( sortOrderList, function(index, item){
           if (item === 'asc') {
             sortOrder = 'ascending';
           } else if ( item === 'desc'){
             sortOrder = 'descending';
           }
         });
         get_employee_sort(sortBy,sortOrder);
       });

	   $('#mgr_employees .operations .search_bar input').live('focus', function() {
			if($(this).val() == 'search workers') {
				$(this).val('').focus();
			}
	   });
	   $('#mgr_employees .operations .search_bar input').live('blur', function() {
			if($(this).val() == '') {
				$(this).val('search workers');
			}
	   });
   //Edit user
    $('#mgr_employees .operations .actions li button#edit.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#mgr_employees .operations .actions li button#edit').live('click', function() {
      if ($(this).html() == "Edit" ) {
		if (!$('#mgr_employees .list .content .employee_checked').length) {
			alert('Please select one user to perform the operation.');
			return false;
		}
		else if ($('#mgr_employees .list .content .employee_checked').length > 1) {
			return false;
		}
		else {
    	  var userIds = '';
    	  $('#mgr_employees .list .content .employee_checked').each(function() {
    	    userIds += ','+$(this).find('.employee_sso p a').html();
    	  });
    	  userIds = userIds.substring(1, userIds.length);
    	  var result = userIds.split(",");
    	  userId = result['0'];
    	  url = "/edit-user/"+userId;
    	  window.location.href = url;
    	}
      }
      });

 //Transfer Bulk on Employees page
    $('#mgr_employees .operations .actions li button#transfer.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#mgr_employees .operations .actions li button#transfer').live('click', function() {
      if ($(this).html() == "Transfer" ) {
		    if (!$('#mgr_employees .list .content .employee_checked').length) {
		      alert('Please select at least one user to perform the operation.');
		      return false;
		    } else {
          if ($(this).hasClass('hover-blue')) {
            var userIds = '';
            var usertypes = '';
            $('#mgr_employees .list .content .employee_checked').each(function() {
            if($(this).find('input#usertype').val() == 'Employee') {
              userIds += ','+$(this).find('.employee_sso p a').html();
              //highlight
              if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
              } else {
                $(this).find('.employee_sso p a').css('background-color', 'yellow');
              }
              //alert(userIds);
            }
            usertypes += ','+$(this).find('input#usertype').val();
            });
            if (usertypes.indexOf("Employee") >= 0) {
              if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
                $('#mgr_employees .operations .actions li button#terminate').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#renew').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#transfer').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#terminate').removeClass('hover-blue');
                $('#mgr_employees .operations .actions li button#renew').removeClass('hover-blue');
                $('#mgr_employees .operations .actions li button#transfer').removeClass('hover-blue');
              } else {
                alert('The selected workers contain one or more Employees. It is not possible to renew employees. Please uncheck the employees and try again.');
              }
            } else {
              //userIds += ','+$(this).find('.employee_sso p a').html();
              //userIds = userIds.substring(1, userIds.length);
              //alert(userIds);
              $(this).removeClass('hover-blue');
              $(this).addClass('grey-light');
              $(this).parents('#mgr_employees').find('div.transfer-alert').show();
              $(this).parents('#mgr_employees').find('div.terminate-alert').hide();
              $(this).parents('#mgr_employees').find('div.renew-alert-all').hide();
              $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
              $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
              $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
              $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
            }
          } else {
            $(this).removeClass('grey-light');
            $(this).addClass('hover-blue');
            $(this).parents('#mgr_employees').find('div.transfer-alert').hide();
            $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
            $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
          }
		    }
      }
   });

   $('#mgr_employees .operations .actions .transfer-alert .manager-unknown .checkbox-row').live('click', function() {
    if ($(this).hasClass('icon-approve_icon')) {
      $(this).removeClass('icon-approve_icon');
      $(this).parent().find('input').removeAttr('checked');
      $(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button');
      $(this).parents('.transfer-alert').find('.transfer-to input').removeAttr('readonly');
		}
		else {
      $(this).addClass('icon-approve_icon');
      $(this).parent().find('input').attr('checked', 'checked');
      $(this).parents('.transfer-alert').find('.transfer-to input').val('').attr('readonly', true);
      $(this).parents('.transfer-alert').find('.actions .hover-blue').removeClass('disabled_button');
		}
	});

  $('#mgr_employees .operations .actions .transfer-alert .transfer-to input').live('autocompleteSelect', function() {
		if ($(this).val().length) {
      $(this).parents('.transfer-alert').find('.actions .hover-blue').removeClass('disabled_button');
		}
		else {
      if (!$(this).attr('readonly'))
        $(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button');
		}
	});

  $('#mgr_employees .operations .actions .transfer-alert .transfer-to input').live('blur, keyup', function() {
	 $(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button');
  });

$(".profile-alert-actions-msg img").live('click',function(e) {
  $(".profile-alert-actions-msg").hide();
});

   //Transfer Bulk Cancel button fnction
  $('#mgr_employees .operations .actions .transfer-alert .actions .cancel').live('click', function() {
    $(this).parents('.actions').find('#transfer').addClass('hover-blue').removeClass('grey-light');
    $('#mgr_employees .operations .actions .transfer-alert').hide();
  });
  //Transfer Bulk submit with ajax
  $('#mgr_employees .operations .actions .transfer-alert .actions .submit').live('click', function() {
    var current = $(this);
    //Managerid
    var managerId = new Array(0, 0);
    var managerData = current.parents('.alert-actions').find('input').val();
    if(managerData.length != 0){
     managerId = managerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
    }
    if ( jQuery( ".l-content .profile-alert-actions-msg" ).length ) {
        jQuery( ".l-content .profile-alert-actions-msg" ).hide();
     }
     if ( jQuery( ".l-content .error_request-msg" ).length ) {
        jQuery( ".l-content .error_request-msg" ).hide();
     }
    if (!$('#mgr_employees .list .content .employee_checked').length)
    {
		alert('Please select some contractor to perform the operation.');
		return false;
    }
    else {
      var userIds = '';
      $('#mgr_employees .list .content .employee_checked').each(function() {
        userIds += ','+$(this).find('.employee_sso p a').html();
      });
      userIds = userIds.substring(1, userIds.length);
      if (! current.hasClass('disabled_button')) {
      current.parents('.actions').parents('.transfer-alert').find('.ajax_throbber').show();
      //$('#mgr_employees').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
      $.ajax({
        url: '/transfer-employee-all/'+userIds+'/'+managerId[1],
        success: function(data) {
          if (data != '') {
              current.parents('.actions').parents('.transfer-alert').find('.ajax_throbber').hide();
              current.parents('.transfer-alert .alert-actions').hide();
              current.parents('.alert-actions').find('.transfer-to input').val('').removeAttr('readonly');
              current.parents('.alert-actions').find('.manager-unknown input').removeAttr('checked');
              current.parents('.alert-actions').find('.actions .hover-blue').addClass('disabled_button');
              current.parents('.alert-actions').find('.manager-unknown .checkbox-row').removeClass('icon-approve_icon');
              current.parents('#mgr_employees').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
              $('#mgr_employees .list .content .employee_checked .checkbox-row').removeClass('icon-checked_icon');
              current.parents('.transfer-alert').hide();
              $('#mgr_employees .list .content .employee_checked').find('.employee_sso').removeClass('employee_sso_checked');
              $('#mgr_employees .list .content .employee_checked').removeClass('employee_checked');
            if ( data.charAt(0) == "/" ) {
              //location.href = data;
            } else {
              //$('#mgr_employees').before(data);
                if(data.indexOf("success") != -1) {
                   // data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
                    data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>';
                } else {
                    data = '<div class="error_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
                }
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#mgr_employees').before(data);
            }
          }
        },
      });
      }
    }
});

//Terminate Bulk on Employees page
    $('#mgr_employees .operations .actions li button#terminate.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#mgr_employees .operations .actions li button#terminate').live('click', function() {
      if ($(this).html() == "Terminate" ) {
        if (!$('#mgr_employees .list .content .employee_checked').length) {
          alert('Please select at least one user to perform the operation.');
          return false;
        } else {
          if ($(this).hasClass('hover-blue')) {
            var userIds = '';
            var usertypes = '';
            $('#mgr_employees .list .content .employee_checked').each(function() {
              if($(this).find('input#usertype').val() == 'Employee') {
                userIds += ','+$(this).find('.employee_sso p a').html();
                //highlight
                if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
                } else {
                  $(this).find('.employee_sso p a').css('background-color', 'yellow');
                }
                //alert(userIds);
              }
              usertypes += ','+$(this).find('input#usertype').val();
            });
            if (usertypes.indexOf("Employee") >= 0) {
              if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
                $('#mgr_employees .operations .actions li button#terminate').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#renew').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#transfer').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#terminate').removeClass('hover-blue');
                $('#mgr_employees .operations .actions li button#renew').removeClass('hover-blue');
                $('#mgr_employees .operations .actions li button#transfer').removeClass('hover-blue');
              } else {
                alert('The selected workers contain one or more Employees. It is not possible to renew employees. Please uncheck the employees and try again.');
              }
            } else {
              //userIds += ','+$(this).find('.employee_sso p a').html();
              //userIds = userIds.substring(1, userIds.length);
              //alert(userIds);
              $(this).removeClass('hover-blue');
              $(this).addClass('grey-light');
              $(this).parents('#mgr_employees').find('div#terminate-alert').show();
              $(this).parents('#mgr_employees').find('div#transfer-alert').hide();
              $(this).parents('#mgr_employees').find('div#renew-alert-all').hide();
              $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
              $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
              $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
              $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
            }
          } else {
            $(this).removeClass('grey-light');
            $(this).addClass('hover-blue');
            $(this).parents('#mgr_employees').find('div#terminate-alert').hide();
            $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
            $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
          }
        }
      }
    });

   //Terminate Bulk Cancel button fnction
  $('#mgr_employees .operations .actions .terminate-alert .actions .cancel').live('click', function() {
    $(this).parents('.actions').find('#terminate').addClass('hover-blue').removeClass('grey-light');
    $('#mgr_employees .operations .actions .terminate-alert').hide();
  });

  //Terminate Bulk submit with ajax
  $('#mgr_employees .operations .actions .terminate-alert .actions .submit').live('click', function() {
    var current = $(this);
    var userIds = $('#mgr_employees .list .content .checkbox-row');
    if ( jQuery( ".l-content .profile-alert-actions-msg" ).length ) {
        jQuery( ".l-content .profile-alert-actions-msg" ).hide();
     }
     if ( jQuery( ".l-content .error_request-msg" ).length ) {
        jQuery( ".l-content .error_request-msg" ).hide();
     }
    if (!$('#mgr_employees .list .content .employee_checked').length)
    {
       alert('Please select some contractor to perform the operation.');
       return false;
    }
    else {
      var userIds = '';
      $('#mgr_employees .list .content .employee_checked').each(function() {
        userIds += ','+$(this).find('.employee_sso p a').html();
      });
      userIds = userIds.substring(1, userIds.length);
      current.parents('.actions').parents('.terminate-alert').find('.ajax_throbber').show();
      $.ajax({
        url: '/terminate-employee-all/'+userIds,
        success: function(data) {
          if (data != '') {
              //$('#mgr_employees').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
              current.parents('#mgr_employees').find('.list .main-content .content .employee_checked').hide();
              current.parents('.actions').parents('.terminate-alert').find('.ajax_throbber').hide();
              $('.terminate-alert').hide();
              current.parents('.alert-actions').find('.terminate-to input').val('').removeAttr('readonly');
              current.parents('.alert-actions').find('.manager-unknown input').removeAttr('checked');
              //current.parents('.alert-actions').find('.actions .hover-blue').addClass('disabled_button');
              current.parents('.alert-actions').find('.manager-unknown .checkbox-row').removeClass('icon-approve_icon');
              current.parents('#mgr_employees').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
              $('#mgr_employees .list .content .employee_checked').find('.employee_sso').removeClass('employee_sso_checked');
              $('#mgr_employees .list .content .employee_checked').removeClass('employee_checked');
              if ( data.charAt(0) == "/" ) {
                //location.href = data;
              } else {
                //$('#mgr_employees').before(data);
                if(data.indexOf("success") != -1) {
                   // data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
                    data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>';
                } else {
                    data = '<div class="error_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
                }
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#mgr_employees').before(data);
              }
          }
        },
      });
    }
  });

//Revoke Bulk on Employees page
  $('#mgr_employees .operations .actions li button#revoke.disabled-button').live('click', function(event) {
    //event.stopImmediatePropagation();
    //return(false);
  });
  $('#mgr_employees .operations .actions li button#revoke').live('click', function() {
      if ($(this).hasClass('disabled-button') && !$('li#contractors_tab').hasClass('hover-green')) {
         return false;
      }
    if ($(this).html() == "Revoke" ) {
      if (!$('#mgr_employees .list .content .employee_checked').length) {
        alert('Please select at least one user to perform the operation.');
        return false;
      } else {
        if ($(this).hasClass('hover-blue')) {
          var userIds = '';
          var usertypes = '';
          $('#mgr_employees .list .content .employee_checked').each(function() {
            if($(this).find('input#usertype').val() == 'Employee' || $(this).find('input#usertype').val() == 'Functional') {
              userIds += ','+$(this).find('.employee_sso p a').html();
              //highlight
              if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
              } else {
                $(this).find('.employee_sso p a').css('background-color', 'yellow');
              }
              //alert(userIds);
            }
            usertypes += ','+$(this).find('input#usertype').val();
          });
          if (usertypes.indexOf("Employee") >= 0 || usertypes.indexOf("Functional") >= 0) {
            if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
              $('#mgr_employees .operations .actions li button#terminate').addClass('disabled-button');
              $('#mgr_employees .operations .actions li button#renew').addClass('disabled-button');
              $('#mgr_employees .operations .actions li button#transfer').addClass('disabled-button');
              $('#mgr_employees .operations .actions li button#terminate').removeClass('hover-blue');
              $('#mgr_employees .operations .actions li button#renew').removeClass('hover-blue');
              $('#mgr_employees .operations .actions li button#transfer').removeClass('hover-blue');
            } else {
              alert('The selected workers contain one or more Employees/Functional Accounts. It is not possible to revoke employees/functional accounts. Please uncheck the employees/functional accounts and try again.');
            }
          } else {
            //userIds += ','+$(this).find('.employee_sso p a').html();
            //userIds = userIds.substring(1, userIds.length);
            //alert(userIds);
            $(this).removeClass('hover-blue');
            $(this).addClass('grey-light');
            $(this).parents('#mgr_employees').find('div#revoke-alert').show();
            $(this).parents('#mgr_employees').find('div#terminate-alert').hide();
            $(this).parents('#mgr_employees').find('div#transfer-alert').hide();
            $(this).parents('#mgr_employees').find('div#renew-alert-all').hide();
            $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
            $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
            $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
            $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
          }
        } else {
          $(this).removeClass('grey-light');
          $(this).addClass('hover-blue');
//          $(this).parents('#mgr_employees').find('div#terminate-alert').hide();
          $(this).parents('#mgr_employees').find('div#revoke-alert').hide();
          $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
          $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
          $('#mgr_employees .operations .actions li button#renew').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#renew').removeClass('grey-light');
        }
      }
    }
  });

 //Revoke Bulk Cancel button fnction
$('#mgr_employees .operations .actions .revoke-alert .actions .cancel').live('click', function() {
  $(this).parents('.actions').find('#revoke').addClass('hover-blue').removeClass('grey-light');
  $('#mgr_employees .operations .actions .revoke-alert').hide();
});

//Revoke Bulk submit with ajax
$('#mgr_employees .operations .actions .revoke-alert .actions .submit').live('click', function() {
  var current = $(this);
  var userIds = $('#mgr_employees .list .content .checkbox-row');
  if ( jQuery( ".l-content .profile-alert-actions-msg" ).length ) {
      jQuery( ".l-content .profile-alert-actions-msg" ).hide();
   }
   if ( jQuery( ".l-content .error_request-msg" ).length ) {
      jQuery( ".l-content .error_request-msg" ).hide();
   }
  if (!$('#mgr_employees .list .content .employee_checked').length)
  {
     alert('Please select some contractor to perform the operation.');
     return false;
  }
 // else if ($('#mgr_employees .list .content .employee_checked').length > 1)
  //{
     //alert('Please select one contractor to perform the operation.');
     //return false;
  //}
  else {
    var userIds = '';
    $('#mgr_employees .list .content .employee_checked').each(function() {
      userIds += ','+$(this).find('.employee_sso p a').html();
    });
    userIds = userIds.substring(1, userIds.length);
    current.parents('.actions').parents('.revoke-alert').find('.ajax_throbber').show();
    $.ajax({
      url: '/revoke-employee-all/'+userIds,
      success: function(data) {
        if (data != '') {
            //$('#mgr_employees').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
            current.parents('#mgr_employees').find('.list .main-content .content .employee_checked').hide();
            current.parents('.actions').parents('.revoke-alert').find('.ajax_throbber').hide();
            $('.revoke-alert').hide();
            current.parents('.alert-actions').find('.revoke-to input').val('').removeAttr('readonly');
            current.parents('.alert-actions').find('.manager-unknown input').removeAttr('checked');
            //current.parents('.alert-actions').find('.actions .hover-blue').addClass('disabled_button');
            current.parents('.alert-actions').find('.manager-unknown .checkbox-row').removeClass('icon-approve_icon');
            current.parents('#mgr_employees').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
            $('#mgr_employees .list .content .employee_checked').find('.employee_sso').removeClass('employee_sso_checked');
            $('#mgr_employees .list .content .employee_checked').removeClass('employee_checked');
            if ( data.charAt(0) == "/" ) {
              //location.href = data;
            } else {
              //$('#mgr_employees').before(data);
              if(data.indexOf("success") != -1) {
                 // data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
                  data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>';
              } else {
                  data = '<div class="error_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
              }
              $("html, body").animate({ scrollTop: 0 }, "slow");
              $('#mgr_employees').before(data);
            }
        }
      },
    });
  }
});

  $('#mgr_employees .operations .actions .renew-alert-all ul li .radio').live('click', function() {
       var current = $(this);
       current.parents('.renew-alert-all').find('.actions button.submit').removeClass('disabled_button');
       });

  //Renew Bulk Cancel button function
  $('#mgr_employees .operations .actions .renew-alert-all .actions .cancel').live('click', function() {
    $(this).parents('.actions').find('#renew').addClass('hover-blue').removeClass('grey-light');
    $('#mgr_employees .operations .actions .renew-alert-all').hide();
  });

  //Renew Bulk click option on Employees page
    $('#mgr_employees .operations .actions li button#renew.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#mgr_employees .operations .actions li button#renew').live('click', function() {
      if ($(this).html() == "Renew" ) {
        if (!$('#mgr_employees .list .content .employee_checked').length) {
          alert('Please select at least one user to perform the operation.');
          return false;
        }
        else {
        if ($(this).hasClass('hover-blue')) {
          var userIds = '';
          var usertypes = '';
          $('#mgr_employees .list .content .employee_checked').each(function() {
            if($(this).find('input#usertype').val() == 'Employee') {
              userIds += ','+$(this).find('.employee_sso p a').html();
              //highlight
              if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
              } else {
                $(this).find('.employee_sso p a').css('background-color', 'yellow');
              }
              //alert(userIds);
            }
            usertypes += ','+$(this).find('input#usertype').val();
          });
          if (usertypes.indexOf("Employee") >= 0) {
              if ($('#mgr_employees .list .list-tabs li#employees_tab').hasClass('hover-green')) {
                $('#mgr_employees .operations .actions li button#terminate').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#renew').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#transfer').addClass('disabled-button');
                $('#mgr_employees .operations .actions li button#terminate').removeClass('hover-blue');
                $('#mgr_employees .operations .actions li button#renew').removeClass('hover-blue');
                $('#mgr_employees .operations .actions li button#transfer').removeClass('hover-blue');
              } else {
                alert('The selected workers contain one or more Employees. It is not possible to renew employees. Please uncheck the employees and try again.');
              }
          } else {
          //userIds += ','+$(this).find('.employee_sso p a').html();
          //userIds = userIds.substring(1, userIds.length);
          //alert(userIds);
          $(this).removeClass('hover-blue');
          $(this).addClass('grey-light');
          $(this).parents('#mgr_employees').find('div#renew-alert-all').show();
          $(this).parents('#mgr_employees').find('div#transfer-alert').hide();
          $(this).parents('#mgr_employees').find('div#terminate-alert').hide();
          $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
          $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
          }
        } else {
          $(this).removeClass('grey-light');
          $(this).addClass('hover-blue');
          $(this).parents('#mgr_employees').find('div#renew-alert-all').hide();
          $('#mgr_employees .operations .actions li button#transfer').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#transfer').removeClass('grey-light');
          $('#mgr_employees .operations .actions li button#terminate').addClass('hover-blue');
          $('#mgr_employees .operations .actions li button#terminate').removeClass('grey-light');
          $('#mgr_employees .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
          $('#mgr_employees .operations .actions .renew-alert-all .actions .submit').addClass('disabled_button');
          }
        }
      }
    });

   //Renew Bulk submit with ajax
  $('#mgr_employees .operations .actions .renew-alert-all .actions .submit').live('click', function() {
    var renewContractor = [];
    var current = $(this);
    if ((current.hasClass('disabled_button')) != true) {
      var userIds = $('#mgr_employees .list .content .checkbox-row');
      if (!$('#mgr_employees .list .content .employee_checked').length)
      {
         alert('Please select some contractor to perform the operation.');
      }
      else {
      //renew option
        var renew_time = current.parents('.alert-actions').find('input[name=renew]:checked').val();
        var renew_date = current.parents('.alert-actions').find('input[name=renew]:checked').parent().find('.duration .date').attr('renew_date');
      if ( typeof renew_time != 'undefined') {
        var userIds = '';
        $('#mgr_employees .list .content .employee_checked').each(function() {
          userIds += ','+$(this).find('.employee_sso p a').html();
          var endDates = $(this).find('input#exp_date').attr('value');
          var initial_end_date = new Date(endDates);
          var new_end_date = new Date(renew_date);
          if (new_end_date < initial_end_date) {
            renewContractor.push(false);
          } else {
            renewContractor.push(true);
          }
        });
        if ($.inArray(false, renewContractor ) != -1){
          var $dialog = $('<div class="error_renew_message">Selected end date is less than Contractor\'s end date for one or more of the contractors selected. Are you sure you want to reduce the end date of the Contractor</div>').dialog({
            title: 'IDM',
            modal: true,
            height:210,
            width: 350,
            dialogClass: 'renew-dialog',
            resizable: false,
            buttons: {
              "Yes": function() {
                $( this ).dialog( "close" );
                setTimeout(function(){ jQuery( ".ui-widget" ).remove(); }, 100);
                renewAllContractorAjaxFunction(userIds,current,renew_time);
              },
              Cancel: function() {
                $( this ).dialog( "close" );
                setTimeout(function(){ jQuery( ".ui-widget" ).remove(); }, 100);
                return;
              }
            }
          });
          $dialog.dialog('open');
        }
        else {
          renewAllContractorAjaxFunction(userIds,current,renew_time);
        }
      }
      }
    }
  });
  $(".search_bar.employess div#autocomplete ul li.selected").live('click', function() {
	  //console.log($(this).html());
      var current = $(this);
      //Managerid
      var employeeId = new Array(0, 0);
      var employeeData = current.find('div').html();
      if(employeeData.length != 0){
       employeeId = employeeData.match(new RegExp(/[\(|>]([\d]+)[\)|<]/));
       var noresulttxt = employeeData.search("noresult");
       if(employeeId == null || noresulttxt != -1) {
           $(".search_bar #employee-search").val('');
           $(".search_bar #employee-search").focus();
           return false;
       }
	   if (employeeId.length != 0) window.location = "/profile/" + employeeId[1];
      }
  });
  $(".search_bar.employess div#autocomplete ul li.selected").live('hover', function() {
	  if ($('.search_bar.employess div#autocomplete ul li.selected div.noresult').length) {
	    $(this).css("background-color", "white");
        $(this).css("color", "#000000");
	  }
  });
  $("#edit-mgr div#autocomplete ul li.selected").live('hover', function() {
	  if ($('#edit-mgr div#autocomplete ul li.selected div.noresult').length) {
	    $(this).css("background", "white");
        $(this).css("color", "#818181");
	  }
  });
  $("#edit-functional div#autocomplete ul li.selected").live('hover', function() {
	  if ($('#edit-functional div#autocomplete ul li.selected div.noresult').length) {
	    $(this).css("background", "white");
        $(this).css("color", "#000000");
	  }
  });
  $("#mgr_employees div#autocomplete ul li.selected").live('hover', function() {
	  if ($('#mgr_employees div#autocomplete ul li.selected div.noresult').length) {
	    $(this).css("background", "white");
        $(this).css("color", "#000000");
	  }
  });
	$(".check-all-arrow").live('click', function() {
		var X=$(this).attr('id');
		if(X==1) {
		$(".check-all-options").hide();
		  $(this).attr("id","0");
		}
		else {
		  $(".check-all-options").show();
		  $(this).attr("id","1");
		}
	  });
	  $(".check-all-arrow").live('mouseup', function() {
		return false;
	  });
	  $('.check-all-options .check-options-all').live('click', function() {
		$('#mgr_employees .operations .check-all .checkbox').removeClass('icon-checked_icon');
		$('#mgr_employees .operations .check-all .checkbox').trigger('click');
		$(".check-all-options").hide();
		$(".check-all-arrow").attr("id","0");
	  });
	  $('.check-all-options .check-options-none').live('click', function() {
		$('#mgr_employees .operations .check-all .checkbox').addClass('icon-checked_icon');
		$('#mgr_employees .operations .check-all .checkbox').trigger('click');
		$(".check-all-options").hide();
		$(".check-all-arrow").attr("id","0");
	  });
	  $(document).ready(function() {
		  var userType = location.search.split('userType=')[1] ? location.search.split('userType=')[1] : 'all';
		  if (userType == 'contractor' || userType == 'functional') {
		    jQuery('.add-contractor').show();
		    jQuery('.add-contractor a').attr('href','/create/'+userType);
		    jQuery('.add-contractor .desktop_text').text('Add '+userType);
		    jQuery('.add-contractor').addClass('desktop_icon');
		  }
		  $(document).click(function(event) {
                if ($('body').hasClass('page-myworkers')) {
                  if($(event.target).parents().index($('#renew-alert-all')) == -1 && $(event.target).parents().index($('.ui-widget')) == -1) {
                    if($('#renew-alert-all').is(":visible")) {
                        if(event.target.id != 'renew') {
                          if($("#renew-alert-all").parent().attr('class') == 'actions') {
                            $('#renew-alert-all').hide();
                            $('.actions #renew').removeClass('grey-light');
                            $('.actions #renew').addClass('hover-blue');
                          }
                        }
                    }
                  }
                  if($(event.target).parents().index($('#transfer-alert')) == -1) {
                    if($('#transfer-alert').is(":visible")) {
                      if(event.target.id != 'transfer') {
                        if($("#transfer-alert").parent().attr('class') == 'actions') {
                          $('#transfer-alert').hide();
                          $('.actions #transfer').removeClass('grey-light');
                          $('.actions #transfer').addClass('hover-blue');
                        }
                      }
                      }
                  }
                  if($(event.target).parents().index($('#terminate-alert')) == -1) {
                    if($('#terminate-alert').is(":visible")) {
                      if(event.target.id != 'terminate') {
                        if($("#terminate-alert").parent().attr('class') == 'actions') {
                          $('#terminate-alert').hide();
                          $('.actions #terminate').removeClass('grey-light');
                          $('.actions #terminate').addClass('hover-blue');
                        }
                      }
                      }
                  }
                  if($(event.target).parents().index($('#revoke-alert')) == -1) {
                      if($('#revoke-alert').is(":visible")) {
                        if(event.target.id != 'revoke') {
                          if($("#revoke-alert").parent().attr('class') == 'actions') {
                            $('#revoke-alert').hide();
                            $('.actions #revoke').removeClass('grey-light');
                            $('.actions #revoke').addClass('hover-blue');
                          }
                        }
                        }
                    }
                }//if page type
			})
		});
	}
   }
})(jQuery);

function get_functional_accounts(x) {
  jQuery('#mgr_employees .content').empty();
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#functional_accounts_tab a').addClass('active');
  jQuery('li#functional_accounts_tab').addClass('hover-green');
  jQuery('#mgr_employees .operations .download a').attr('href','/download/functional');
  if(x > 0) {
	  jQuery('#mgr_employees .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
	  var sortBy = 'id';
	  var sortOrder = 'ascending';
	  //jQuery('#mgr_employees div.main-content').load(Drupal.settings.basePath +'emplist/functional/'+sortBy+'/'+sortOrder + ' div.emp-content');
	  //jQuery('#mgr_employees div.header-row').load(Drupal.settings.basePath +'emplist/functional/'+sortBy+'/'+sortOrder + ' div.header-row-content');
	  //jQuery('#mgr_employees div.data-row').load(Drupal.settings.basePath +'emplist/functional/'+sortBy+'/'+sortOrder + ' div.data-row-content');
	  jQuery.ajax({
	      url: 'emplist/functional/'+sortBy+'/'+sortOrder,
	      success: function(data) {
	        if (data != '') {
                jQuery('div.list-tabs').next('.header-row').show();
	            jQuery('#mgr_employees div.header-row').html(jQuery(data).find('div.header-row').html());
	            jQuery('#mgr_employees div.data-row').html(jQuery(data).find('div.data-row').html());
	        }
	      }
	  });
  }
  if(x == 0) {
	  jQuery('div.list-tabs').next('.header-row').hide();
	  jQuery('#mgr_employees div.data-row').css('margin', 'auto');
	  jQuery('#mgr_employees div.data-row').css('width', '1213px');
	  jQuery('#mgr_employees div.data-row .data-row-content .content').html("<li class='no-record-found'>No Records Found</li>");
  }
  jQuery('.add-contractor, .mobile-contractor').show();
  jQuery('.add-contractor a, .mobile-contractor a').attr('href','/create/functional');
  jQuery('.add-contractor .desktop_text').text('Add functional');
  jQuery('.add-contractor').addClass('desktop_icon');
  jQuery('#mgr_employees .operations .actions li button#revoke').addClass('disabled-button');
}

function get_contractors(x) {
  jQuery('#mgr_employees .content').empty();
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#contractors_tab a').addClass('active');
  jQuery('li#contractors_tab').addClass('hover-green');
  jQuery('#mgr_employees .operations .download a').attr('href','/download/contractor');
  if(x > 0){
	  jQuery('#mgr_employees .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
	  var sortBy = 'id';
	  var sortOrder = 'ascending';
	  //jQuery('#mgr_employees div.main-content').load(Drupal.settings.basePath +'emplist/contractor/'+sortBy+'/'+sortOrder + ' div.emp-content');
	  //jQuery('#mgr_employees div.header-row').load(Drupal.settings.basePath +'emplist/contractor/'+sortBy+'/'+sortOrder + ' div.header-row-content');
	 // jQuery('#mgr_employees div.data-row').load(Drupal.settings.basePath +'emplist/contractor/'+sortBy+'/'+sortOrder + ' div.data-row-content');
	  jQuery.ajax({
	      url: 'emplist/contractor/'+sortBy+'/'+sortOrder,
	      success: function(data) {
	        if (data != '') {
               jQuery('div.list-tabs').next('.header-row').show();
	           jQuery('#mgr_employees div.header-row').html(jQuery(data).find('div.header-row').html());
	           jQuery('#mgr_employees div.data-row').html(jQuery(data).find('div.data-row').html());
	        }
	      }
	  });
  }
  if(x == 0) {
	  jQuery('div.list-tabs').next('.header-row').hide();
	  jQuery('#mgr_employees div.data-row').css('margin', 'auto');
	  jQuery('#mgr_employees div.data-row').css('width', '1213px');
	  jQuery('#mgr_employees div.data-row .data-row-content .content').html("<li class='no-record-found'>No Records Found</li>");
  }
  jQuery('.add-contractor, .mobile-contractor').show();
  jQuery('.add-contractor a, .mobile-contractor a').attr('href','/create/contractor');
  jQuery('.add-contractor .desktop_text').text('Add contractor');
  jQuery('.add-contractor').addClass('desktop_icon');
  //jQuery('#mgr_employees .operations .actions li button#revoke').removeClass('disabled-button');
}

function get_employees(x) {
  jQuery('#mgr_employees .content').empty();
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#employees_tab a').addClass('active');
  jQuery('li#employees_tab').addClass('hover-green');
  jQuery('#mgr_employees .operations .download a').attr('href','/download/employee');
  if(x > 0){
	  jQuery('#mgr_employees .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
	  var sortBy = 'id';
	  var sortOrder = 'ascending';
	  //jQuery('#mgr_employees div.main-content').load(Drupal.settings.basePath +'emplist/employee/'+sortBy+'/'+sortOrder + ' div.emp-content');
	  //jQuery('#mgr_employees div.header-row').load(Drupal.settings.basePath +'emplist/employee/'+sortBy+'/'+sortOrder + ' div.header-row-content');
	  //jQuery('#mgr_employees div.data-row').load(Drupal.settings.basePath +'emplist/employee/'+sortBy+'/'+sortOrder + ' div.data-row-content');
	  jQuery.ajax({
	      url: 'emplist/employee/'+sortBy+'/'+sortOrder,
	      success: function(data) {
	        if (data != '') {
                jQuery('div.list-tabs').next('.header-row').show();
	            jQuery('#mgr_employees div.header-row').html(jQuery(data).find('div.header-row').html());
	            jQuery('#mgr_employees div.data-row').html(jQuery(data).find('div.data-row').html());
	        }
	      }
	  });
  }
  if(x == 0) {
	  jQuery('div.list-tabs').next('.header-row').hide();
	  jQuery('#mgr_employees div.data-row').css('margin', 'auto');
	  jQuery('#mgr_employees div.data-row').css('width', '1213px');
	  jQuery('#mgr_employees div.data-row .data-row-content .content').html("<li class='no-record-found'>No Records Found</li>");
  }
  jQuery('.add-contractor, .mobile-contractor').hide();
  jQuery('#mgr_employees .operations .actions li button#revoke').addClass('disabled-button');
}

function get_all_employees(x) {
  jQuery('#mgr_employees .content').empty();
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#all_employees_tab a').addClass('active');
  jQuery('li#all_employees_tab').addClass('hover-green');
  jQuery('#mgr_employees .operations .download a').attr('href','/download/all');
  if(x > 0){
	  jQuery('#mgr_employees .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
	  var sortBy = 'id';
	  var sortOrder = 'ascending';
	  //jQuery('#mgr_employees div.main-content').load(Drupal.settings.basePath +'emplist/all/'+sortBy+'/'+sortOrder + ' div.emp-content');
	  //jQuery('#mgr_employees div.header-row').load(Drupal.settings.basePath +'emplist/all/'+sortBy+'/'+sortOrder + ' div.header-row-content');
	  //jQuery('#mgr_employees div.data-row').load(Drupal.settings.basePath +'emplist/all/'+sortBy+'/'+sortOrder + ' div.data-row-content');
	  jQuery.ajax({
	      url: 'emplist/all/'+sortBy+'/'+sortOrder,
	      success: function(data) {
	        if (data != '') {
                jQuery('div.list-tabs').next('.header-row').show();
	            jQuery('#mgr_employees div.header-row').html(jQuery(data).find('div.header-row').html());
	            jQuery('#mgr_employees div.data-row').html(jQuery(data).find('div.data-row').html());
	        }
	      }
	  });
  }
  if(x == 0) {
	  jQuery('div.list-tabs').next('.header-row').hide();
	  jQuery('#mgr_employees div.data-row').css('margin', 'auto');
	  jQuery('#mgr_employees div.data-row').css('width', '1213px');
	  jQuery('#mgr_employees div.data-row .data-row-content .content').html("<li class='no-record-found'>No Records Found</li>");
  }
  jQuery('.add-contractor, .mobile-contractor').hide();
  //jQuery('#mgr_employees .operations .actions li button#revoke').removeClass('disabled-button');
}

function get_employee_sort(sortBy,sortOrder) {
  jQuery('#mgr_employees .content').empty();
  jQuery('#mgr_employees .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  var userTabType = '';
  jQuery('.list .list-tabs ul li').each(function() {
    if (jQuery(this).hasClass('hover-green')) {
      userTabType = this.id;
    }
  });
  if(userTabType == 'all_employees_tab'){
    userType = 'all';
  }
  if(userTabType == 'employees_tab'){
    userType = 'employee';
  }
  if(userTabType == 'contractors_tab'){
    userType = 'contractor';
  }
  if(userTabType == 'functional_accounts_tab'){
    userType = 'functional';
  }
  jQuery('#mgr_employees ul.content').load(Drupal.settings.basePath +'emplist/'+userType+'/'+sortBy+'/'+sortOrder + ' ul.content');
}

function renewAllContractorAjaxFunction(userIds,current,renew_time) {
  userIds = userIds.substring(1, userIds.length);
  current.parents('.actions').parents('.renew-alert-all').find('.ajax_throbber').show();
  if ( jQuery( ".l-content .profile-alert-actions-msg" ).length ) {
	  jQuery( ".l-content .profile-alert-actions-msg" ).hide();
  }
  if ( jQuery( ".l-content .error_request-msg" ).length ) {
      jQuery( ".l-content .error_request-msg" ).hide();
   }
  //jQuery('#mgr_employees').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
  jQuery.ajax({
    url: '/renew-employee-all/'+userIds+'/'+renew_time,
    success: function(data) {
      if (data != '') {
          jQuery('#mgr_employees .list .content .employee_checked .checkbox-row').removeClass('icon-checked_icon');
          current.parents('.alert-actions').find('input[name=renew]').removeAttr('checked');
          current.parents('.actions').parents('.renew-alert-all').find('.ajax_throbber').hide();
          jQuery('.renew-alert-all').hide();
          current.parents('#mgr_employees').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
          jQuery('#mgr_employees .list .content .employee_checked').find('.employee_sso').removeClass('employee_sso_checked');
          jQuery('#mgr_employees .list .content .employee_checked').removeClass('employee_checked');
        if ( data.charAt(0) == "/" ) {
          //location.href = data;
        } else {
              if(data.indexOf("success") != -1) {
                 // data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
                  data = '<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>';
              } else {
                  data = '<div class="error_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+data+'</div>';
              }
              jQuery("html, body").animate({ scrollTop: 0 }, "slow");
              jQuery('#mgr_employees').before(data);
        }
      }
    },
  });
}
