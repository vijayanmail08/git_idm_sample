(function($) {
    Drupal.behaviors.idm_groups = {
	  attach: function(){
	   /*$(window).load(function(){
		   if($('.page-myworkers').length > 0 ){
			$(".page-myworkers #sticky-header").sticky({topSpacing: 0, center:true, className:"hey", getWidthFrom: "#idm_groups" });
		   }
	   });*/
	   $('#idm_groups .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
	   $('#idm_groups .list .content .checkbox-row').live('click', function() {
			if ($(this).hasClass('icon-checked_icon')) {
				$(this).removeClass('icon-checked_icon');
				$(this).parents('li.group_checked').find('div.group_sso').removeClass('group_sso_checked');
				$(this).parents('li.data_row').removeClass('group_checked');
				$(this).parent().find('input').removeAttr('checked');
			}
			else {
				$(this).addClass('icon-checked_icon');
				$(this).parents('li.data_row').addClass('group_checked');
				$(this).parents('li.data_row.group_checked').find('.group_sso').addClass('group_sso_checked');
				$(this).parent().find('input').attr('checked', 'checked');
			}
			if ($(this).parents('ul.content').find('li.group_checked').length > 1) {
				$('#idm_groups .operations .actions li button#edit').addClass('disabled-button');
			}
			else {
				$('#idm_groups .operations .actions li button#edit').removeClass('disabled-button');
			}
			if ($(this).parents('ul.content').find('li.group_checked').length >= 1) {
				$('#idm_groups .operations .actions li button#transfer').removeClass('disabled-button');
				$('#idm_groups .operations .actions li button#renew').removeClass('disabled-button');
				$('#idm_groups .operations .actions li button#terminate').removeClass('disabled-button');
			}
			else {
				$('#idm_groups .operations .actions .transfer-alert #edit-transfer').val('');
				$('#idm_groups .operations .actions .transfer-alert .manager-unknown .checkbox-row').removeClass('icon-approve_icon');
				$('#transfer-alert .actions .hover-blue').addClass('disabled_button')
				$('#idm_groups div.transfer-alert').hide();
		        $('#idm_groups .operations .actions li button#transfer').addClass('hover-blue');
		        $('#idm_groups .operations .actions li button#transfer').removeClass('grey-light');
		        $('#idm_groups .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
		        $('#idm_groups .operations .actions .renew-alert-all .actions .submit').addClass('disabled_button');
				$('#idm_groups div.renew-alert-all').hide();
		        $('#idm_groups .operations .actions li button#renew').addClass('hover-blue');
		        $('#idm_groups .operations .actions li button#renew').removeClass('grey-light');
				$('#idm_groups div.terminate-alert').hide();
		        $('#idm_groups .operations .actions li button#terminate').addClass('hover-blue');
		        $('#idm_groups .operations .actions li button#terminate').removeClass('grey-light');
				$('#idm_groups .operations .actions li button#edit').addClass('disabled-button');
				$('#idm_groups .operations .actions li button#transfer').addClass('disabled-button');
				$('#idm_groups .operations .actions li button#renew').addClass('disabled-button');
				$('#idm_groups .operations .actions li button#terminate').addClass('disabled-button');
			}
			$all_checked = true;
			$('#idm_groups .list .content .check-row').each(function() {
				if (!$(this).attr('checked')) {
					$all_checked = false;
				} else {
					if ($(this).parents('li.group_checked').find('input#usertype').attr("value") == 'group' || $(this).parents('li.group_checked').find('input#usertype').attr("value") == 'Functional') {
						$('#idm_groups .operations .actions li button#renew').addClass('disabled-button');
					}
				}
			});
			if ($all_checked) {
				$('#idm_groups .operations .check-all .checkbox').addClass('icon-checked_icon');
				$('#idm_groups .operations .check-all input').attr('checked', 'checked');
			}
			else {
				$('#idm_groups .operations .check-all .checkbox').removeClass('icon-checked_icon');
				$('#idm_groups .operations .check-all input').removeAttr('checked');
			}
	   });
	   $('#idm_groups .operations .check-all .checkbox').live('click', function() {
			if ($(this).hasClass('icon-checked_icon')) {
				$(this).removeClass('icon-checked_icon');
				$(this).parent().find('input').removeAttr('checked');
				$('#idm_groups .list .content .checkbox-row').each(function() {
					$(this).removeClass('icon-checked_icon');
					$(this).parents('li').removeClass('group_checked');
				});
				$('#idm_groups .list .content .check-row').each(function() {
					$(this).removeAttr('checked');
				});
				$('#idm_groups .operations .actions .transfer-alert #edit-transfer').val('');
				$('#idm_groups .operations .actions .transfer-alert .manager-unknown .checkbox-row').removeClass('icon-approve_icon');
				$('#transfer-alert .actions .hover-blue').addClass('disabled_button');
				$('#idm_groups div.transfer-alert').hide();
		        $('#idm_groups .operations .actions li button#transfer').addClass('hover-blue');
		        $('#idm_groups .operations .actions li button#transfer').removeClass('grey-light');
		        $('#idm_groups .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
		        $('#idm_groups .operations .actions .renew-alert-all .actions .submit').addClass('disabled_button');
				$('#idm_groups div.renew-alert-all').hide();
		        $('#idm_groups .operations .actions li button#renew').addClass('hover-blue');
		        $('#idm_groups .operations .actions li button#renew').removeClass('grey-light');
				$('#idm_groups div.terminate-alert').hide();
		        $('#idm_groups .operations .actions li button#terminate').addClass('hover-blue');
		        $('#idm_groups .operations .actions li button#terminate').removeClass('grey-light');
				$('#idm_groups .operations .actions li button#transfer').addClass('disabled-button');
				$('#idm_groups .operations .actions li button#renew').addClass('disabled-button');
				$('#idm_groups .operations .actions li button#terminate').addClass('disabled-button');
			}
			else {
				$('#idm_groups .operations .actions li button#edit').addClass('disabled-button');
				$('#idm_groups .operations .actions li button#transfer').removeClass('disabled-button');
				$('#idm_groups .operations .actions li button#renew').removeClass('disabled-button');
				$('#idm_groups .operations .actions li button#terminate').removeClass('disabled-button');
				$(this).addClass('icon-checked_icon');
				$(this).parent().find('input').attr('checked', 'checked');
				$(this).parent().find('input').attr('checked', 'checked');
				$('#idm_groups .list .content .checkbox-row').each(function() {
					$(this).addClass('icon-checked_icon');
					$(this).parents('li').addClass('group_checked');
				});
				$('#idm_groups .list .content .check-row').each(function() {
					$(this).attr('checked', 'checked');
				});
			}
	   });
       $('#idm_groups .main-content ul.header li#header-cols .cell').live('click', function() {
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
         get_group_sort(sortBy,sortOrder);
       });

	  /* $('#idm_groups .operations .search_bar input').live('focus', function() {
			if($(this).val() == 'Search groups') {
				$(this).val('').focus();
			}
	   });
	   $('#idm_groups .operations .search_bar input').live('blur', function() {
			if($(this).val() == '') {
				$(this).val('Search groups');
			}
	   });*/
   //Edit user
    $('#idm_groups .operations .actions li button#edit.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#idm_groups .operations .actions li button#edit').live('click', function() {
      if ($(this).html() == "Edit" ) {
		if (!$('#idm_groups .list .content .group_checked').length) {
			alert('Please select one group to perform the operation.');
			return false;
		}
		else if ($('#idm_groups .list .content .group_checked').length > 1) {
			return false;
		}
		else {
      var gIds = '';
      $('#idm_groups .list .content .group_checked').each(function() {
		gIds += ','+$(this).find('.group_sso').attr('gid');
      });
      gIds = gIds.substring(1, gIds.length);
      var result = gIds.split(",");
      gId = result['0'];
      url = "/edit-group/"+gId;
      window.location = url;
      }
    }
  });

  //Transfer Bulk on groups page
    $('#idm_groups .operations .actions li button#transfer.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#idm_groups .operations .actions li button#transfer').live('click', function() {
      if ($(this).html() == "Transfer" ) {
		if (!$('#idm_groups .list .content .group_checked').length) {
		   alert('Please select at least one group to perform the operation.');
		   return false;
		}
		else {
	        if ($(this).hasClass('hover-blue')) {
	            $(this).removeClass('hover-blue');
	            $(this).addClass('grey-light');
	            $(this).parents('#idm_groups').find('div.transfer-alert').show();
	            $(this).parents('#idm_groups').find('div.terminate-alert').hide();
	            $(this).parents('#idm_groups').find('div.renew-alert-all').hide();
	            $('#idm_groups .operations .actions li button#terminate').addClass('hover-blue');
	            $('#idm_groups .operations .actions li button#terminate').removeClass('grey-light');
	            $('#idm_groups .operations .actions li button#renew').addClass('hover-blue');
	            $('#idm_groups .operations .actions li button#renew').removeClass('grey-light');
	          } else {
	            $(this).removeClass('grey-light');
	            $(this).addClass('hover-blue');
	            $(this).parents('#idm_groups').find('div.transfer-alert').hide();
	            $('#idm_groups .operations .actions li button#terminate').addClass('hover-blue');
	            $('#idm_groups .operations .actions li button#terminate').removeClass('grey-light');
	            $('#idm_groups .operations .actions li button#renew').addClass('hover-blue');
	            $('#idm_groups .operations .actions li button#renew').removeClass('grey-light');
	          }
		}
      }
   });

   $('#idm_groups .operations .actions .transfer-alert .manager-unknown .checkbox-row').live('click', function() {
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

  $('#idm_groups .operations .actions .transfer-alert .transfer-to input').live('autocompleteSelect', function() {
		if ($(this).val().length) {
      $(this).parents('.transfer-alert').find('.actions .hover-blue').removeClass('disabled_button');
		}
		else {
      if (!$(this).attr('readonly'))
        $(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button');
		}
	});

  $('#idm_groups .operations .actions .transfer-alert .transfer-to input').live('blur, keyup', function() {
	 $(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button');
  });

   //Transfer Bulk Cancel button fnction
  $('#idm_groups .operations .actions .transfer-alert .actions .cancel').live('click', function() {
    $(this).parents('.actions').find('#transfer').addClass('hover-blue').removeClass('grey-light');
    $('#idm_groups .operations .actions .transfer-alert').hide();
  });

  //Transfer Bulk submit with ajax
  $('#idm_groups .operations .actions .transfer-alert .actions .submit').live('click', function() {
    var current = $(this);
    //Managerid
    var managerId = new Array(0, 0);
    var managerData = current.parents('.alert-actions').find('input').val();
    if(managerData.length != 0){
     managerId = managerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
    }
    if (!$('#idm_groups .list .content .group_checked').length)
    {
		alert('Please select some group to perform the operation.');
		return false;
    }
    else {
      var groupIds = '';
      $('#idm_groups .list .content .group_checked').each(function() {
         groupIds += ','+$(this).find('.group_sso').attr('gid');
      });
      groupIds = groupIds.substring(1, groupIds.length);
      if (! current.hasClass('disabled_button')) {
      $('.profile-alert-actions-msg').remove();
      current.parents('.actions').parents('.transfer-alert').find('.ajax_throbber').show();
      current.parents('.alert-actions').find('.transfer-to input').val('').removeAttr('readonly');
      current.parents('.alert-actions').find('.manager-unknown input').removeAttr('checked');
      current.parents('.alert-actions').find('.actions .hover-blue').addClass('disabled_button');
      current.parents('.alert-actions').find('.manager-unknown .checkbox-row').removeClass('icon-approve_icon');
      current.parents('#idm_groups').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
      $('#idm_groups .list .content .group_checked .checkbox-row').removeClass('icon-checked_icon');
      //current.parents('.transfer-alert').hide();
      $('#idm_groups .list .content .group_checked').find('.group_sso').removeClass('group_sso_checked');
      $('#idm_groups .list .content .group_checked').removeClass('group_checked');
      $.ajax({
        url: '/transfer-group-all/'+groupIds+'/'+managerId[1],
        success: function(data) {
          if (data != '') {
            if ( data.charAt(0) == "/" ) {
              //location.href = data;
            } else {
                current.parents('.actions').parents('.transfer-alert').find('.ajax_throbber').hide();
                current.parents('.transfer-alert .alert-actions').hide();
                current.parents('.transfer-alert').hide();
                $('#idm_groups').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
              //$('#idm_groups').before(data);
            }
          }
        },
      });
      }
    }
});

//Terminate Bulk on groups page
    $('#idm_groups .operations .actions li button#terminate.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#idm_groups .operations .actions li button#terminate').live('click', function() {
      if ($(this).html() == "Terminate" ) {
		if (!$('#idm_groups .list .content .group_checked').length) {
			   alert('Please select at least one group to perform the operation.');
			   return false;
			}
		else {
	        if ($(this).hasClass('hover-blue')) {
	          $(this).removeClass('hover-blue');
	          $(this).addClass('grey-light');
	          $(this).parents('#idm_groups').find('div#terminate-alert').show();
	          $(this).parents('#idm_groups').find('div#transfer-alert').hide();
	          $(this).parents('#idm_groups').find('div#renew-alert-all').hide();
	          $('#idm_groups .operations .actions li button#transfer').addClass('hover-blue');
	          $('#idm_groups .operations .actions li button#transfer').removeClass('grey-light');
	          $('#idm_groups .operations .actions li button#renew').addClass('hover-blue');
	          $('#idm_groups .operations .actions li button#renew').removeClass('grey-light');
	        } else {
	          $(this).removeClass('grey-light');
	          $(this).addClass('hover-blue');
	          $(this).parents('#idm_groups').find('div#terminate-alert').hide();
	          $('#idm_groups .operations .actions li button#transfer').addClass('hover-blue');
	          $('#idm_groups .operations .actions li button#transfer').removeClass('grey-light');
	          $('#idm_groups .operations .actions li button#renew').addClass('hover-blue');
	          $('#idm_groups .operations .actions li button#renew').removeClass('grey-light');
	        }
		}
      }
   });

   //Terminate Bulk Cancel button fnction
  $('#idm_groups .operations .actions .terminate-alert .actions .cancel').live('click', function() {
    $(this).parents('.actions').find('#terminate').addClass('hover-blue').removeClass('grey-light');
    $('#idm_groups .operations .actions .terminate-alert').hide();
  });

  //Terminate Bulk submit with ajax
  $('#idm_groups .operations .actions .terminate-alert .actions .submit').live('click', function() {
    var my_groups_count_html =  $('#idm_groups .list-tabs #my_groups_tab .secondary span').html();
    var my_groups_count = my_groups_count_html.match(/\(([\d]+)\)/);
    var selected_groups = 0;
    var current = $(this);
    if (!$('#idm_groups .list .content .group_checked').length)
    {
       alert('Please select some group to perform the operation.');
       return false;
    }
    else {
        var groupIds = '';
        $('#idm_groups .list .content .group_checked').each(function() {
           groupIds += ','+$(this).find('.group_sso').attr('gid');
           selected_groups++;
        });
        groupIds = groupIds.substring(1, groupIds.length);
      current.parents('.actions').parents('.terminate-alert').find('.ajax_throbber').show();
	  $('.profile-alert-actions-msg').remove();
	  current.parents('.alert-actions').find('.terminate-to input').val('').removeAttr('readonly');
	  current.parents('.alert-actions').find('.manager-unknown input').removeAttr('checked');
	  //current.parents('.alert-actions').find('.actions .hover-blue').addClass('disabled_button');
	  current.parents('.alert-actions').find('.manager-unknown .checkbox-row').removeClass('icon-approve_icon');
	  current.parents('#idm_groups').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
    $('#idm_groups .list .content .group_checked').find('.group_sso').removeClass('group_sso_checked');
      $.ajax({
        url: '/terminate-group-all/'+groupIds,
        success: function(data) {
          if (data != '') {
            if ( data.charAt(0) == "/" ) {
              //location.href = data;
            } else {
              current.parents('.actions').parents('.terminate-alert').find('.ajax_throbber').hide();
              $('.terminate-alert').hide();
              $('#idm_groups').find('.list .main-content .content .group_checked').hide();
              $('#idm_groups .list .content .group_checked').removeClass('group_checked');
              if(my_groups_count[1]){
               $('#idm_groups .list-tabs #my_groups_tab .secondary span').html('('+(my_groups_count[1] - selected_groups)+')');
              }
              $('#idm_groups').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
              //$('#idm_groups').before(data);
            }
          }
        },
      });
    }
  });

  $('#idm_groups .operations .actions .renew-alert-all ul li .radio').live('click', function() {
       var current = $(this);
       current.parents('.renew-alert-all').find('.actions button.submit').removeClass('disabled_button');
       });

  //Renew Bulk Cancel button function
  $('#idm_groups .operations .actions .renew-alert-all .actions .cancel').live('click', function() {
    $(this).parents('.actions').find('#renew').addClass('hover-blue').removeClass('grey-light');
    $('#idm_groups .operations .actions .renew-alert-all').hide();
  });

  //Renew Bulk click option on groups page
    $('#idm_groups .operations .actions li button#renew.disabled-button').live('click', function(event) {
      //event.stopImmediatePropagation();
      //return(false);
    });
    $('#idm_groups .operations .actions li button#renew').live('click', function() {
        if ($(this).html() == "Renew" ) {
			if (!$('#idm_groups .list .content .group_checked').length) {
				alert('Please select at least one group to perform the operation.');
				return false;
			}
			else {
		        if ($(this).hasClass('hover-blue')) {
		          $(this).removeClass('hover-blue');
		          $(this).addClass('grey-light');
		          $(this).parents('#idm_groups').find('div#renew-alert-all').show();
		          $(this).parents('#idm_groups').find('div#transfer-alert').hide();
				  $(this).parents('#idm_groups').find('div#terminate-alert').hide();
		          $('#idm_groups .operations .actions li button#transfer').addClass('hover-blue');
		          $('#idm_groups .operations .actions li button#transfer').removeClass('grey-light');
				  $('#idm_groups .operations .actions li button#terminate').addClass('hover-blue');
		          $('#idm_groups .operations .actions li button#terminate').removeClass('grey-light');
		        } else {
		          $(this).removeClass('grey-light');
		          $(this).addClass('hover-blue');
		          $(this).parents('#idm_groups').find('div#renew-alert-all').hide();
				  $('#idm_groups .operations .actions li button#transfer').addClass('hover-blue');
		          $('#idm_groups .operations .actions li button#transfer').removeClass('grey-light');
				  $('#idm_groups .operations .actions li button#terminate').addClass('hover-blue');
		          $('#idm_groups .operations .actions li button#terminate').removeClass('grey-light');
		          $('#idm_groups .operations .actions .renew-alert-all').find('input[name=renew]').removeAttr('checked');
		          $('#idm_groups .operations .actions .renew-alert-all .actions .submit').addClass('disabled_button');
		        }
		  }
      }
   });

   //Renew Bulk submit with ajax
  $('#idm_groups .operations .actions .renew-alert-all .actions .submit').live('click', function() {
    var renewGroup = [];
    var current = $(this);
    if ((current.hasClass('disabled_button')) != true) {
      var userIds = $('#idm_groups .list .content .checkbox-row');
      if (!$('#idm_groups .list .content .group_checked').length)
      {
         alert('Please select some group to perform the operation.');
      }
      else {
      //renew option
        var renew_time = current.parents('.alert-actions').find('input[name=renew]:checked').val();
        var renew_date = current.parents('.alert-actions').find('input[name=renew]:checked').parent().find('.duration .date').attr('renew_date');
      if ( typeof renew_time != 'undefined') {
        var groupIds = '';
        $('#idm_groups .list .content .group_checked').each(function() {
          groupIds += ','+$(this).find('.group_sso').attr('gid');
          var endDates = $(this).find('input#exp_date').attr('value');
          var initial_end_date = new Date(endDates);
          var new_end_date = new Date(renew_date);
          if (new_end_date < initial_end_date) {
              renewGroup.push(false);
          } else {
              renewGroup.push(true);
          }
        });
        if ($.inArray(false, renewGroup ) != -1){
          var $dialog = $('<div class="error_renew_message">Selected end date is less than Group\'s end date for one or more of the groups selected. Are you sure you want to reduce the end date of the Group</div>').dialog({
            title: 'IDM',
            modal: true,
            height:210,
            width: 350,
            dialogClass: 'renew-dialog',
            resizable: false,
            buttons: {
              "Yes": function() {
                $( this ).dialog( "close" );
                renewAllGroupAjaxFunction(groupIds,current,renew_time);
              },
              Cancel: function() {
                $( this ).dialog( "close" );
                return;
              }
            }
          });
          $dialog.dialog('open');
        }
        else {
             renewAllGroupAjaxFunction(groupIds,current,renew_time);
        }
      }
      }
    }
  });
 /* $(".search_bar.employess div#autocomplete ul li.selected").live('click', function() {
	  console.log($(this).html());
      var current = $(this);
      //Managerid
      var groupId = new Array(0, 0);
      var groupData = current.find('div').html();
      if(groupData.length != 0){
       groupId = groupData.match(new RegExp(/[\w\s]+\(([\d]+)\)*///));
	//   if (groupId.length != 0) window.location = "/profile/" + groupId[1];
    //  }
//  });
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
		$('#idm_groups .operations .check-all .checkbox').removeClass('icon-checked_icon');
		$('#idm_groups .operations .check-all .checkbox').trigger('click');
		$(".check-all-options").hide();
		$(".check-all-arrow").attr("id","0");
	  });
	  $('.check-all-options .check-options-none').live('click', function() {
		$('#idm_groups .operations .check-all .checkbox').addClass('icon-checked_icon');
		$('#idm_groups .operations .check-all .checkbox').trigger('click');
		$(".check-all-options").hide();
		$(".check-all-arrow").attr("id","0");
	  });
	    $(document).ready(function() {
        if ($("#idm-groups-create-group").length) {
          $("#helpquestion").tooltip({
          position: { my: "left top+10", at: "right top" },
          content: '<img class="question-tooltip" src="/sites/all/themes/idmtheme/images/uploadmemeber.png" />' });
        }

        /*if ($('#idm_groups .list .list-tabs select#mobile-groups-page-options').is(':visible')) {
          get_my_memberships();
        }*/

		  var userType = location.search.split('userType=')[1] ? location.search.split('userType=')[1] : 'all';
		  if (userType == 'contractor' || userType == 'functional') {
		    jQuery('.add-contractor').show();
		    jQuery('.add-contractor a').attr('href','/create/'+userType);
		    jQuery('.add-contractor .desktop_text').text('Add '+userType);
		    jQuery('.add-contractor').addClass('desktop_icon');
		  }
		  $(document).click(function(event) {
				if ($('body').hasClass('page-groups')) {
					if($(event.target).parents().index($('#renew-alert-all')) == -1) {
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
					//transfer operation on edit group page
					if(jQuery(event.target).parents().index(jQuery('#transferalert')) == -1) {
						if(jQuery('#transferalert').is(":visible")) {
							if(event.target.id != 'transfer-group') {
								if(jQuery("#transferalert").parent().attr('class') == 'group-actions') {
									jQuery('#transferalert').hide();
									jQuery('.main-edit-actions #transfer-group').removeClass('grey-light');
									jQuery('.main-edit-actions #transfer-group').addClass('hover-blue');
								}
							}
						}
					}
					//renew opertaion on edit group page
					if(jQuery(event.target).parents().index(jQuery('#renewalert')) == -1) {
						if(jQuery('#renewalert').is(":visible")) {
							if(event.target.id != 'renew-group') {
								if(jQuery("#renewalert").parent().attr('class') == 'group-actions') {
									jQuery('#renewalert').hide();
									jQuery('.main-edit-actions #renew-group').removeClass('grey-light');
									jQuery('.main-edit-actions #renew-group').addClass('hover-blue');
								}
							}
						}
					}
					//terminate opertaion on edit group page
					if(jQuery(event.target).parents().index(jQuery('#terminatealert')) == -1) {
						if(jQuery('#terminatealert').is(":visible")) {
							if(event.target.id != 'terminate-group') {
								if(jQuery("#terminatealert").parent().attr('class') == 'group-actions') {
									jQuery('#terminatealert').hide();
									jQuery('.main-edit-actions #terminate-group').removeClass('grey-light');
									jQuery('.main-edit-actions #terminate-group').addClass('hover-blue');
								}
							}
						}
					}
					if(jQuery(event.target).parents().index(jQuery('#groupleave')) == -1) {
						if(jQuery('#groupleave').is(":visible")) {
							if(event.target.id != 'leave-group') {
								if(jQuery("#groupleave").parent().attr('class') == 'group-actions') {
									jQuery('#groupleave').hide();
									jQuery('.main-actions #leave-group').removeClass('grey-light');
									jQuery('.main-actions #leave-group').addClass('hover-blue');
								}
							}
						}
					}
					if(jQuery(event.target).parents().index(jQuery('#addgroupmanager')) == -1) {
						if(jQuery('#addgroupmanager').is(":visible")) {
							if(event.target.id != 'group-add-manager') {
								if(jQuery("#addgroupmanager").parent().attr('class') == 'group-manager') {
									jQuery('#addgroupmanager').hide();
									jQuery('.main-actions #group-add-manager').removeClass('grey-light');
									jQuery('.main-actions #group-add-manager').addClass('hover-blue');
								}
							}
						}
					}
					if(jQuery(event.target).parents().index(jQuery('#addgroupmember')) == -1) {
						if(jQuery('#addgroupmember').is(":visible")) {
							if(event.target.id != 'group-add-member') {
								if(jQuery("#addgroupmember").parent().attr('class') == 'group-members') {
									jQuery('#addgroupmember').hide();
									jQuery('.main-actions #group-add-member').removeClass('grey-light');
									jQuery('.main-actions #group-add-member').addClass('hover-blue');
								}
							}
						}
					}
				}//if page type
			})
		});
    $('.group-info .group-actions .main-actions li button').live('click', function() {
      var current = $(this);
      if ($(this).hasClass('hover-blue')) {
        if (current.hasClass('mobile-leave-group')) {
          //mobile
          var gid = current.parents('.group-actions').attr('gid');
          var gtype = current.parents('.group-actions').attr('gtype');
          url = "/mobile-leavegroup/"+gtype+"/"+gid;
          window.location = url;
        } else {
          //desktop
          $(this).removeClass('hover-blue').addClass('grey-light');
          var id = $(this).attr('id');
          $(this).parents('.group-actions').find('.'+id).show();
        }
      }
      else {
        $(this).parents('.main-actions').find('button').addClass('hover-blue').removeClass('grey-light');
        $(this).parents('.group-actions').find('.alert-actions').hide();
      }
    });
	$('.group-info .group-actions .main-actions li button#edit-group').live('click', function() {
    var gid = $(this).parents('.group-actions').attr('gid');
    url = "/edit-group/"+gid;
    window.location = url;
 });

 $(".profile-alert-actions-msg img").live('click',function(e) {
   $(".profile-alert-actions-msg").hide();
 });
 $(".error_request-msg img").live('click',function(e) {
   $(".error_request-msg").hide();
 });
 $(".approve_request-msg img").live('click',function(e) {
   $(".approve_request-msg").hide();
 });
 $(".messages--status img").live('click',function(e) {
   $(".messages--status").hide();
 });
 $(".messages--error img").live('click',function(e) {
   $(".messages--error").hide();
 });
//hiding previous success/failure message
$('#edit-group .edit-group-actions .main-edit-actions input.small_button, #idm_groups .list ul.content .leave-group .actions .submit, #idm_groups .list ul.content .small_button, #join-group, #leave-group, #idm_groups .operations .actions li button').live('click', function() {
  $(".profile-alert-actions-msg").remove();
  $(".error_request-msg").remove();
  $(".approve_request-msg").remove();
});

 //function to show renew terminate and transfer dialog box
	$('#edit-group .edit-group-actions .main-edit-actions input.small_button').live('click', function() {
      if ($(this).hasClass('hover-blue')) {
	    if(!$(this).hasClass('disabled_button')) {
          if($(this).parents('.fieldset-wrapper').find('.main-edit-actions input').hasClass('grey-light')) {
              $(this).parents('.fieldset-wrapper').find('.main-edit-actions input.small_button').removeClass('grey-light').addClass('hover-blue');
          }
          $(this).removeClass('hover-blue').addClass('grey-light');
        }
        var id = $(this).attr('id');
        if($(this).parents('.fieldset-wrapper').find('.group-actions .alert-actions').is(':visible')) {
            $(this).parents('.fieldset-wrapper').find('.group-actions .alert-actions').hide();
        }
        $(this).parents('.fieldset-wrapper').find('.'+id).show();
      }
      else {
        $(this).parents('.main-edit-actions').find('input.small_button').addClass('hover-blue').removeClass('grey-light');
        $(this).parents('.fieldset-wrapper').find('.alert-actions').hide();
      }
    });
    //function to make renew submit button blue
    $('.main-edit-actions .group-actions #renewalert ul li .radio').live('click', function() {
      var current = $(this);
      current.parents('.renew-group').find('.actions input#renew-group-submit').removeClass('disabled_button');
    });
    //Terminate cancel button
    $('.edit-group-actions .group-actions #terminatealert .actions input#terminate-group-cancel').live('click', function() {
      $(this).parents('.main-edit-actions').find('#terminate-group').addClass('hover-blue').removeClass('grey-light');
      $('.edit-group-actions .main-edit-actions .group-actions .terminate-group').hide();
    });

   //Transfer desktop + mobile transfer changes start

   //Desktop Transfer cancel button
    $('.edit-group-actions .group-actions #transferalert .actions input#transfer-group-cancel').live('click', function() {
      $(this).parents('.main-edit-actions').find('#transfer-group').addClass('hover-blue').removeClass('grey-light');
      $('.edit-group-actions .main-edit-actions .group-actions .transfer-group').hide();
    });
    //Desktop + Mobile Transfer auto search field focus
    $('.edit-group-actions .group-actions .transfer-group .transfer-to #edit-transfer, #mobile-transfer-group .transfer-group .transfer-to #edit-transfer').focus(function(){
     // $(this).parents('.group-actions').find('.actions #transfer-group-submit').removeClass('disabled_button');
    });
    //Desktop + Mobile Transfer auto search field autocompleteSelect
    $('.edit-group-actions .group-actions .transfer-group .transfer-to #edit-transfer, #mobile-transfer-group .transfer-group .transfer-to #edit-transfer').live('autocompleteSelect', function() {
      if ($(this).val().length) {
        $(this).parents('.transfer-alert').find('.actions .hover-blue').removeClass('disabled_button');
      } else {
        if (!$(this).attr('readonly'))
          $(this).parents('.transfer-alert').find('.actions .hover-blue').addClass('disabled_button');
      }
    });
    //Desktop + Mobile Transfer auto search field keyup and blur
    $('.edit-group-actions .group-actions .transfer-group .transfer-to #edit-transfer, #mobile-transfer-group .transfer-group .transfer-to #edit-transfer').live('blur, keyup', function() {
      $(this).parents('.transfer-alert').find('.actions input#transfer-group-submit').addClass('disabled_button');
    });
    //Mobile tranfer cancel start
    $('#mobile-transfer-group .transfer-group .actions input#transfer-group-cancel').live('click', function() {
      window.location = "/groups";
    });
    //Mobile tranfer cancel end

    //Mobile transfer submit start
    $('#mobile-transfer-group .transfer-group .actions #transfer-group-submit').live('click',function() {
      var current = $(this);
      var gid = $('#gid').val();
      var gtype = $('#gtype').val();
      var transferId = new Array(0, 0);
      var managerData = $('#edit-transfer').val();
      if(managerData.length != 0) {
        transferId = managerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
      }
      var ownerId = new Array(0, 0);
      var ownerData = $('#edit-groupmanager').val();
      if(ownerData.length != 0) {
        ownerId = ownerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
      }
      if(! current.hasClass('disabled_button')) {
        current.parents('.transfer-group').find('.ajax_throbber').show();
        $.ajax({
          url: '/transfer/group/'+gtype+'/'+gid+'/'+ownerId[1]+'/'+transferId[1],
          success: function(data) {
            if (data != '') {
              if (data == 'success') {
            $('.approve_request-msg').remove();
                window.location = "/groups";
              }
              else {
                current.parents('#mobile-transfer-group').before(data);
              }
            }
            current.parents('.transfer-group').find('.ajax_throbber').hide();
          }
       });
      }
    });
    //Mobile transfer submit end

    //Mobile groups page start
    //$("#idm_groups .list .list-tabs select.mobile-groups-page-options").change(function () {
    //$("#idm_groups .list .list-tabs select.mobile-groups-page-options").live('change', function() {
	$("#idm_groups .list select.mobile-groups-page-options").live('change', function() {
      var group_tab_type = "";
      $("select option:selected").each(function() {
        var group_tab_type = $(this).val();
        if (group_tab_type == 'my_memberships')
        {
          get_my_memberships();
        } else {
          get_my_groups();
        }
      });
    })
    //.change();
    //Mobile groups page end

	//Mobile Leave button operations on groups listing page start
    $('#mobile-leave-group .leave-alert .actions .submit').live('click',function() {
      var current = $(this);
      var gid = $('#gid').val();
      var gtype = $('#gtype').val();
	    current.parents('.profile-actions').find('.ajax_throbber').show();
      $.ajax({
          url: '/leave/group/'+gtype+'/'+gid,
          success: function(data) {
            if (data != '') {
			        current.parents('.profile-actions').find('.ajax_throbber').hide();
              if (data == "success" ) {
				        window.location = '/groups';
              } else {
                $('#mobile-leave-group').before(data);
              }
            }
          }
      });
    });
	//Mobile Leave button operations on groups listing page end

    //Mobile Edit buttons on each row in groups listing page
    /*
    $('#idm_groups .list ul.content .small_button').live('click',function() {
      var current = $(this);
      if (current.attr('text_id') == 'Leave') {
        //current.parents('.leave-group').find('.ajax_throbber').show();
        //current.parents('.leave-group').show();
        if (current.hasClass('grey-light')) {
          current.removeClass('grey-light');
          current.parents('.group_exp').find('.leave-group').hide();
        }
        else {
          $('.leave-group').hide();
          $('#idm_groups .list ul.content .small_button').removeClass('grey-light');
          current.addClass('grey-light');
          current.parents('.group_exp').find('.leave-group').show();
        }
      }
      else if(current.attr('text_id') == 'Edit') {
	      var gid = current.parents('.group_exp').find('.group_sso').attr('gid');
        url = "/edit-group/"+gid;
        window.location = url;
      }
    });
    */
    //Mobile transfer unknown checkbox start
    /*
    $('#mobile-transfer-group .transfer-alert .manager-unknown div.checkbox-row').live('click', function() {
      if ($(this).hasClass('icon-approve_icon')) {
        $(this).removeClass('icon-approve_icon');
        $(this).parent().find('input').removeAttr('checked');
        $(this).parents('.transfer-group').find('.actions .hover-blue').addClass('disabled_button').attr('disabled', 'disabled');
        $(this).parents('.transfer-group').find('.transfer-to input').removeAttr('readonly');
      }
      else {
        $(this).addClass('icon-approve_icon');
        $(this).parent().find('input').attr('checked', 'checked');
        $(this).parents('.transfer-group').find('.transfer-to input').val('').attr('readonly', true);
        $(this).parents('.transfer-group').find('.actions .hover-blue').removeClass('disabled_button').removeAttr('disabled');
      }
    });
    */
    //Mobile transfer unknown checkbox end

    /*$('.group-info .group-actions .renew-group ul li .radio').live('click', function() {
      var current = $(this);
      current.parents('.renew-group').find('.actions button.submit').removeClass('disabled_button');
    });
    $('.group-info .group-manager .manager .value .group-delete').live('click', function() {
      $(this).hide();
      $(this).prev().hide();
    });
    $('.group-info .group-manager .header-title .group-add').live('click', function() {
      var id = $(this).attr('id');
      $(this).parents('.group-manager').find('.'+id).toggle();
    });
    $('.group-info .group-members .header-title .group-add').live('click', function() {
      var id = $(this).attr('id');
      $(this).parents('.group-members').find('.'+id).toggle();
    });
    $('.group-info .group-actions .transfer-group .transfer-to #edit-transfer').focus(function(){
      $(this).parents('.transfer-group').find('.actions button.submit').removeClass('disabled_button');
    });
    $('.group-info .group-manager .group-add-manager .transfer-to #add-manager').focus(function(){
      $(this).parents('.group-add-manager').find('.actions button.submit').removeClass('disabled_button');
    });
    $('.group-info .group-members .group-add-member .transfer-to #add-member').focus(function() {
      $(this).parents('.group-add-member').find('.actions button.submit').removeClass('disabled_button');
    });*/

    //checkbox for transfer operation
    $('.idm-groups-create-group .fieldset-wrapper .group-actions .transfer-group .manager-unknown .checkbox-row').live('click', function() {
      if ($(this).hasClass('icon-approve_icon')) {
        $(this).removeClass('icon-approve_icon');
        $(this).parent().find('input').removeAttr('checked');
        $(this).parents('.transfer-group').find('.actions .hover-blue').addClass('disabled_button').attr('disabled', 'disabled');
        $(this).parents('.transfer-group').find('.transfer-to input').removeAttr('readonly');
      }
      else {
        $(this).addClass('icon-approve_icon');
        $(this).parent().find('input').attr('checked', 'checked');
        $(this).parents('.transfer-group').find('.transfer-to input').val('').attr('readonly', true);
        $(this).parents('.transfer-group').find('.actions .hover-blue').removeClass('disabled_button').removeAttr('disabled');
      }
    });
    $('.group-info .group-manager .group-add-manager .manager-unknown .checkbox-row').live('click', function() {
      if ($(this).hasClass('icon-approve_icon')) {
        $(this).removeClass('icon-approve_icon');
        $(this).parent().find('input').removeAttr('checked');
        $(this).parents('.group-add-manager').find('.actions .hover-blue').addClass('disabled_button').attr('disabled', 'disabled');
        $(this).parents('.group-add-manager').find('.transfer-to input').removeAttr('readonly');
      }
      else {
        $(this).addClass('icon-approve_icon');
        $(this).parent().find('input').attr('checked', 'checked');
        $(this).parents('.group-add-manager').find('.transfer-to input').val('').attr('readonly', true);
        $(this).parents('.group-add-manager').find('.actions .hover-blue').removeClass('disabled_button').removeAttr('disabled');
      }
    });
    $('.group-info .group-members .group-add-member .member-unknown .checkbox-row').live('click', function() {
      if ($(this).hasClass('icon-approve_icon')) {
        $(this).removeClass('icon-approve_icon');
        $(this).parent().find('input').removeAttr('checked');
        $(this).parents('.group-add-member').find('.actions .hover-blue').addClass('disabled_button').attr('disabled', 'disabled');
        $(this).parents('.group-add-member').find('.transfer-to input').removeAttr('readonly');
      }
      else {
        $(this).addClass('icon-approve_icon');
        $(this).parent().find('input').attr('checked', 'checked');
        $(this).parents('.group-add-member').find('.transfer-to input').val('').attr('readonly', true);
        $(this).parents('.group-add-member').find('.actions .hover-blue').removeClass('disabled_button').removeAttr('disabled');
      }
     });
	 $('#idm-groups-create-group #edit-group .request .checkbox-row').live('click', function() {
		if ($(this).hasClass('icon-checked_icon')) {
			$(this).removeClass('icon-checked_icon');
			$(this).parent().find('input').removeAttr('checked');
		}
		else {
			$(this).addClass('icon-checked_icon');
			$(this).parent().find('input').attr('checked', 'checked');
		}
	});
    $('#edit_createfor_chosen').live('click',function(e) {
	   if($('#edit_createfor_chosen span').html() == 'Someone else'){
		  $(".search-groupmanager").show();
	   }
	   else{
		  $(".search-groupmanager").hide();
	   }
    });

     //Leave operation on groups detail page
    $('.group-info .leave-group .actions .submit').live('click',function() {
      var current = $(this);
      var gid = current.parents('.group-actions').attr('gid');
      var gtype = current.parents('.group-actions').attr('gtype');
	  var gname = current.parents('.group-actions').attr('gname');
      if (! current.hasClass('disabled_button')) {
        current.parents('.leave-group').find('.ajax_throbber').show();
        $.ajax({
          url: '/leave/group/'+gtype+'/'+gid,
          success: function(data) {
            current.parents('.leave-group').find('.ajax_throbber').hide();
            current.parents('.leave-group').hide();
            //current.parents('.group-actions').find('.main-actions li #leave-group').removeClass('grey-light').addClass('hover-blue');
            current.parents('.group-actions').find('.main-actions li #leave-group').attr('disabled', true);
            if (data != '') {
              if (data == "success" ) {
                //window.location = '/groups';
				$('.profile-alert-actions-msg').remove();
                $('.group-info').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">You have left the group '+gname+' .</div>');
				var loggedinsso = $('.logged-in-sso').attr('id');
	            jQuery('.group-members').find('#rj-sso-'+loggedinsso).hide();
				var count = $('.member-count').html();
				var newcount = Number(count)-1;
				$('.member-count').html(newcount);
				if(newcount > 0){
					$('.group-info .download-members').show();
				} else {
					$('.group-info .download-members').hide();
				}
                current.parents('.group-actions').find('.main-actions li #leave-group').removeClass('grey-light').addClass('hover-blue').attr('id', 'join-group');
                current.parents('.group-actions').find('.main-actions li #join-group').removeAttr('disabled');
                current.parents('.group-actions').find('.main-actions li #join-group').html('Join');
              } else {
                $('.group-info').before(data);
				$('#leave-group').removeClass('grey-light');
				$('#leave-group').addClass('hover-blue');
              }
           }
          }
        });
      }
    });

    //Join operation on groups detail page
    $('#join-group').live('click',function() {
      var current = $(this);
      var gid = current.parents('.group-actions').attr('gid');
      var gtype = current.parents('.group-actions').attr('gtype');
	  var gname = current.parents('.group-actions').attr('gname');
      if (! current.hasClass('disabled_button')) {
        //current.parents('.leave-group').find('.ajax_throbber').show();
        current.parents('.group-actions').find('div#join-loader').show();
        $.ajax({
          url: '/join/group/'+gtype+'/'+gid,
          success: function(data) {
	        current.parents('.group-actions').find('div#join-loader').hide();
            //current.parents('.group-actions').find('.main-actions li #join-group').removeClass('grey-light').addClass('hover-blue');
            current.parents('.group-actions').find('.main-actions li #join-group').attr('disabled', true);
            if (data != '') {
              if (data == "success" ) {
                $('.l-content').find('.messages--status').hide();
                $('.profile-alert-actions-msg').remove();
                $('.group-info').before('<div class="profile-alert-actions-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">You are now a member of the group '+gname+' .</div>');
                var loggedinsso = $('.logged-in-sso').attr('id');
                var loggedindisplay = $('.logged-in-display').attr('id');
                $('<div id="rj-sso-'+loggedinsso+'" class="member-name"><a target="_blank" href="/profile/'+loggedinsso+'"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg"> '+loggedindisplay+' </a></div>').appendTo(".group-members .value");
                var count = $('.member-count').html();
                var newcount = Number(count)+1;
                $('.member-count').html(newcount);
                if(newcount > 0){
					$('.group-info .download-members').show();
				}
                var gp_membercount = $('.group-membercount').html();
                var text = gp_membercount;
                var regex = /(\d+)/g;
                newgpcount = text.match(regex);
                var newgpcount = Number(newgpcount)+1;
                if(newgpcount > 1) {
                    newgpcount = newgpcount+" Members";
                } else {
                    newgpcount = newgpcount+" Member";
                }
                $('.group-membercount').html(newgpcount);
                current.parents('.group-actions').find('.main-actions li #join-group').removeClass('grey-light').addClass('hover-blue').attr('id', 'leave-group');
                current.parents('.group-actions').find('.main-actions li #leave-group').removeAttr('disabled');
                current.parents('.group-actions').find('.main-actions li #leave-group').html('Leave');
              }else {
                  $('.l-content').find('.messages--status').hide();
                  $('.group-info').before(data);
               }
            }
          }
        });
      }
    });

     //Leave button popup on groups listing page  or Edit buttons on each row in groups listing page
    $('#idm_groups .list ul.content .small_button').live('click',function() {
      var current = $(this);
      if (current.attr('text_id') == 'Leave') {
        $('.l-content').find('.messages--status').hide();
        //current.parents('.leave-group').find('.ajax_throbber').show();
        //current.parents('.leave-group').show();
        //Leave button on mobile page
        if (current.parents('.group_exp').find('p.desktop-exp-date').css('display') == 'none') {
          var gid = current.parents('.group_exp').find('.group_sso').attr('gid');
          var gtype = current.parents('.group_exp').find('.group_sso').attr('gtype');
		  var gname = current.parents('.group_exp').find('.group_sso').attr('gname');
          url = "/mobile-leavegroup/"+gtype+"/"+gid;
          window.location = url;
        } else {//Leave button on groups listing desktop page
          if (current.hasClass('grey-light')) {
            current.removeClass('grey-light');
            current.parents('.group_exp').find('.leave-group').hide();
          }
          else {
            $('.leave-group').hide();
            $('#idm_groups .list ul.content .small_button').removeClass('grey-light');
            current.addClass('grey-light');
            current.parents('.group_exp').find('.leave-group').show();
          }
        }
      }
      else if(current.attr('text_id') == 'Edit') {
	      var gid = current.parents('.group_exp').find('.group_sso').attr('gid');
        url = "/edit-group/"+gid;
        window.location = url;
      }
    });

    $('#idm_groups .list ul.content .leave-group .actions .cancel').live('click', function() {
        $(this).parents('.group_exp .leave-group').hide();
		$('#idm_groups .list ul.content .small_button').removeClass('grey-light');
    });

    //Leave and Edit button operations on groups listing page
    $('#idm_groups .list ul.content .leave-group .actions .submit').live('click',function() {
      var current = $(this);
      var gid = current.parents('.group_exp').find('.group_sso').attr('gid');
	  var gtype = current.parents('.group_exp').find('.group_sso').attr('gtype');
	  var gname = current.parents('.group_exp').find('.group_sso').attr('gname');
      //var gtype = current.parents('.group-actions').attr('gtype');
	  $('.leave-group').hide();
	  $('#idm_groups .list ul.content .small_button').removeClass('grey-light');
	  current.parents('.group_exp').find('.ajax_throbber').show();
      $.ajax({
          url: '/leave/group/'+gtype+'/'+gid,
          success: function(data) {
            if (data != '') {
              if (data == "success" ) {
                $('.profile-alert-actions-msg').remove();
                $('#idm_groups').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">You have left the group '+gname+' .</div>');
                //alert(Drupal.settings.basePath);
                //alert('You left the group');
                //window.location = '/groups?membership=true';
                //location.pathname = '/groups';
                current.parents('.group_exp').find('.ajax_throbber').hide();
                current.parents('.data_row').hide();
                //alert(current.parents('.list').find('li#my_memberships_tab div.secondary span').html());
                var mymebership_old_count = trim(current.parents('.list').find('li#my_memberships_tab div.secondary span').html());
                var mymebership_new_count = Number(mymebership_old_count)-1;
                mymebership_new_count = '('+mymebership_new_count+')';
                current.parents('.list').find('li#my_memberships_tab div.secondary span').html(mymebership_new_count);
              } else {
	              current.parents('.group_exp').find('.ajax_throbber').hide();
	              current.attr('');
                $('#idm_groups').before(data);
              }
            }
          }
      });
    });
    //renew operation in edit group page
    $('.renew-group .actions #renew-group-submit, #mobile-renew-group .renew-alert .actions .submit').live('click',function() {
      var current = $(this);
      var gid = $('#gid').val();
      var gtype = $('#gtype').val();
      //var gid = current.parents('.group-actions').attr('gid');
      //var gtype = current.parents('.group-actions').attr('gtype');
      var renew_time = current.parents('.alert-actions').find('input[name=renew]:checked').val();
      var renew_date = current.parents('.alert-actions').find('input[name=renew]:checked').parent().find('.duration .date').attr('renew_date');
      if ( typeof renew_time != 'undefined') {
        if (! current.hasClass('disabled_button')) {
        if(current.parents().hasClass('mobile-renew-group')) {
          current.parents('.mobile-renew-group').find('.ajax_throbber').show();
        } else {
          current.parents('.renew-group').find('.ajax_throbber img').show();
        }
        $.ajax({
          url: '/extend/group/'+gtype+'/'+gid+'/'+renew_time,
          success: function(data) {
          if (data != '') {
            if (data == 'success') {
              $('.approve_request-msg').remove();
              window.location = "/groups";
              //url = "/groups";
              //window.location = url;
              //if(current.parents().hasClass('mobile-renew-group')) {
                //current.parents('.mobile-renew-group').before('<div class="approve_request-msg">Request completed.</div>');
              //}
            } else {
              current.parents('.idm-groups-create-group').before(data);
            }
          }
          if(current.parents().hasClass('mobile-renew-group')) {
            current.parents('.mobile-renew-group').find('.ajax_throbber').hide();
          } else {
            current.parents('.renew-group').find('.ajax_throbber img').hide();
          }
          current.parents('.renew-group').hide();
          current.parents('.edit-group-actions').find('.main-edit-actions #renew-group').removeClass('grey-light').addClass('hover-blue');
          }
        });
        }
      }
    });
    //terminate opertaion on edit-group page
    $('.terminate-group .actions #terminate-group-submit, #mobile-terminate-group .terminate-alert .actions .submit').live('click',function() {
      var current = $(this);
      var gid = $('#gid').val();
      var gtype = $('#gtype').val();
      //var gid = current.parents('.fieldset-wrapper').attr('gid');
      //var gtype = current.parents('.fieldset-wrapper').attr('gtype');
      if(! current.hasClass('disabled_button')) {
        if(current.parents().hasClass('mobile-terminate-group')) {
          current.parents('.mobile-terminate-group').find('.ajax_throbber').show();
        } else {
          current.parents('.terminate-group').find('.ajax_throbber img').show();
        }
        $.ajax({
          url: '/terminate/group/'+gtype+'/'+gid,
          success: function(data) {
            if (data != '') {
              if (data == 'success') {
                $('.approve_request-msg').remove();
                window.location = "/groups";
                //window.location.delay('2000');
              } else {
                current.parents('.idm-groups-create-group').before(data);
              }
            }
            if(current.parents().hasClass('mobile-terminate-group')) {
              current.parents('.mobile-terminate-group').find('.ajax_throbber').hide();
            } else {
              current.parents('.terminate-group').find('.ajax_throbber img').hide();
            }
            current.parents('.terminate-group').hide();
            current.parents('.edit-group-actions').find('.main-edit-actions #terminate-group').removeClass('grey-light').addClass('hover-blue');
          }
        });
      }
    });
	//transfer operation on edit group page
	$('#edit-group .transfer-group .actions #transfer-group-submit').live('click',function() {
    var current = $(this);
    var gid = $('#gid').val();
	  var gtype = $('#gtype').val();
	  var transferId = new Array(0, 0);
	  var managerData = $('#edit-transfer').val();
    if(managerData.length != 0) {
      transferId = managerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
    }
    var ownerId = new Array(0, 0);
    var ownerData = $('#edit-groupmanager').val();
	  if(ownerData.length != 0) {
      ownerId = ownerData.match(new RegExp(/[\w\s]+\(([\d]+)\)*/));
    }
    if(! current.hasClass('disabled_button')) {
      current.parents('.transfer-group').find('.ajax_throbber img').show();
      $.ajax({
        url: '/transfer/group/'+gtype+'/'+gid+'/'+ownerId[1]+'/'+transferId[1],
        success: function(data) {
          if (data != '') {
            if (data == 'success') {
		      $('.approve_request-msg').remove();
              window.location = "/groups";
              //url = "/groups";
              //window.location = url;
              //current.parents('.idm-groups-create-group').before('<div class="approve_request-msg">Request completed.</div></br>');
            }
            else {
              current.parents('.idm-groups-create-group').before(data);
            }
          }
          current.parents('.transfer-group').find('.ajax_throbber img').hide();
          current.parents('.transfer-group').hide();
          current.parents('.edit-group-actions').find('.main-edit-actions #transfer-group').removeClass('grey-light').addClass('hover-blue');
        }
     });
    }
	});
    //cancel button opertaion on group detail page
    $('.group-actions .alert-actions .actions button.cancel').live('click', function() {
      var div_class = $(this).parents('.alert-actions').attr('class').split(' ')[0];
      $(this).parents('.group-actions').find('#'+div_class).removeClass('grey-light').addClass('hover-blue');
      $(this).parents('.group-actions .alert-actions').hide();
    });
	$(document).ready(function(){
		if($('#idm-groups-create-group #edit-managers #usertype').val() == 'employee') {
			if($('#idm-groups-create-group #edit-group #edit-createfor').val() == 0) {
				$('#idm-groups-create-group #edit-managers #edit-approver div').html('No approval required');
				$('#idm-groups-create-group #edit-managers .approvertime').hide();
			}
		}
		if($('#idm-groups-create-group #edit-managers #usertype').val() == 'contractor') {
			if($('#idm-groups-create-group #edit-group #edit-createfor').val() == 0) {
				user_detail = $('#idm-groups-create-group #edit-managers #edit-primary-manager .primay_manager_self').html();
				var regExp = /\(([^)]+)\)/;
				var matches = regExp.exec(user_detail);
				// matches[1] contains the value between the parentheses
				userid = matches[1];
				$.ajax({
					url: '/getmanager/'+userid,
					success: function(data) {
						$('#idm-groups-create-group #edit-managers #edit-approver div').html(data);
						$('#idm-groups-create-group #edit-managers .approvertime').show();
            $('#idm-groups-create-group #approver_sso').val(data);
					}
				});
				$('#idm-groups-create-group #edit-managers #edit-approver div').html('No approval required');
				$('#idm-groups-create-group #edit-managers .approvertime').hide();
			}
			/*else {
				alert('dfdfdf');
				user_detail = $('#idm-groups-create-group #edit-managers #edit-primary-manager .primay_manager_self').html();
				var regExp = /\(([^)]+)\)/;
				var matches = regExp.exec(user_detail);
				// matches[1] contains the value between the parentheses
				userid = matches[1];
				$.ajax({
					url: '/getmanager/'+userid,
					success: function(data) {
						$('#idm-groups-create-group #edit-managers #edit-approver div').html(data);
						$('#idm-groups-create-group #edit-managers .approvertime').show();
					}
				});
				$('#idm-groups-create-group #edit-managers #edit-approver div').html('No approval required');
				$('#idm-groups-create-group #edit-managers .approvertime').hide();
			}*/
		}
	});
	$('#idm-groups-create-group #edit-group #edit-createfor').live('change',function(e) {
		var create_for = $(this).val();
		if(create_for == 1) {
			$('#idm-groups-create-group #nam_id').val('not mgrselected');
			$('#idm-groups-create-group #edit-groupmanager').val('');
			$('#idm-groups-create-group #edit-managers #edit-approver div').html('');
			$('#idm-groups-create-group #edit-managers .approvertime').hide();
			$('#idm-groups-create-group #edit-managers div.primay_manager_self').hide();
			$('#idm-groups-create-group #edit-managers div.primay_manager_other').hide();
			$('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_myself').hide();
			$('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_someoneelse').hide();
		}
		if(create_for == 0) {
			$('#idm-groups-create-group #nam_id').val('mgrselected');
			if($('#idm-groups-create-group #edit-managers #usertype').val() == 'employee') {
				$('#idm-groups-create-group #edit-managers #edit-approver div').html('No approval required');
				$('#idm-groups-create-group #edit-managers .approvertime').hide();
				$('#idm-groups-create-group #edit-managers div.primay_manager_self').show();
				$('#idm-groups-create-group #edit-managers div.primay_manager_other').hide();
				$('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_myself').show();
				$('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_someoneelse').hide();
			}
			else {
				//userid = $('#idm-groups-create-group #edit-managers #edit-primary-manager').val();
				user_detail = $('#idm-groups-create-group #edit-managers #edit-primary-manager .primay_manager_self').html();
				var regExp = /\(([^)]+)\)/;
				var matches = regExp.exec(user_detail);
				// matches[1] contains the value between the parentheses
				userid = matches[1];
				$.ajax({
		            url: '/getmanager/'+userid,
		            success: function(data) {
                        $('#idm-groups-create-group #edit-managers #edit-approver div').html(data);
						$('#idm-groups-create-group #edit-managers .approvertime').show();
            $('#idm-groups-create-group #approver_sso').val(data);
		            }
		        });
        $('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_myself').show();
        $('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_someoneelse').hide();
			}
		}
	});
	$('#idm-groups-create-group input#edit-groupmanager').live('autocompleteSelect',function(e) {
		if(!$(this).find("div").hasClass("no-search-result")) {
	          $(this).parents('div.search-groupmanager').next('#nam_id').val('mgrselected');
	    } else {
	          $(this).parents('div.search-groupmanager').next('#nam_id').val('not mgrselected');
	    }
		var groupmanager = $(this).val();
		var regExp = /\(([^)]+)\)/;
		var matches = regExp.exec(groupmanager);
		// matches[1] contains the value between the parentheses
		user_sso = matches[1];
		if($('#idm-groups-create-group #edit-managers #usertype').val() == 'employee') {
			$('#idm-groups-create-group #edit-managers #edit-approver div').html(groupmanager);
			$('#idm-groups-create-group #edit-managers .approvertime').show();
      $('#idm-groups-create-group #approver_sso').val(groupmanager);
			$('#idm-groups-create-group #edit-managers div.primay_manager_self').hide();
			$('#edit-primary-manager div.primay_manager_other').html(groupmanager);
			$('#idm-groups-create-group #edit-managers div.primay_manager_other').show();
		}
		else {
			$('#edit-primary-manager div.primay_manager_other').html(groupmanager);
			//$('#idm-groups-create-group #edit-managers div.primay_manager_other').show();
				$.ajax({
	            url: '/getusertype/'+user_sso,
	            success: function(data) {
                    $('#idm-groups-create-group #edit-managers #edit-approver div').html(data);
					$('#idm-groups-create-group #edit-managers .approvertime').show();
          $('#idm-groups-create-group #approver_sso').val(data);
	            }
	        });
		}

		some_one_else = '<a href="/profile/'+user_sso+'"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg"> '+groupmanager+'</a>';
		$('#idm-groups-create-group #edit-managers #group_managers_all div.primay_manager_someoneelse').html(some_one_else);
		$('#idm-groups-create-group #edit-managers div#group_managers_all .primay_manager_someoneelse').show();
	});
	 $('#edit-membership-types').live('click',function(e) {
		if($('#edit-membership-types-public').attr('checked')){
				$('#idm-groups-create-group #edit-privacy .hide-group-membership-content-private').hide();
				$('#idm-groups-create-group #edit-privacy .hide-group-membership-content-public').show();
				$("#edit-hide-group-membership-false").attr('checked', 'checked');
				$("#edit-hide-group-membership-true").prev('.radio').removeAttr("style");
				$("#edit-hide-group-membership-false").prev('.radio').attr( "style", "background-position: 0px -56px;" );
		 }
		 if($('#edit-membership-types-private').attr('checked')){
				$('#idm-groups-create-group #edit-privacy .hide-group-membership-content-public').hide();
				$('#idm-groups-create-group #edit-privacy .hide-group-membership-content-private').show();
				$("#edit-hide-group-membership-true").attr("checked", "checked");
				$("#edit-hide-group-membership-false").prev('.radio').removeAttr("style");
				$("#edit-hide-group-membership-true").prev('.radio').attr( "style", "background-position: 0px -56px;" );
		 }
	 });
	 $('#idm-groups-create-group #edit-group .alternate_email_add').live('click',function(e) {
		 var alternate_email = $('#edit-alternate-email-input').val();
		 if(alternate_email == ''){
			$('#idm-groups-create-group #edit-alternate-email-input').addClass('error');
			$('#idm-groups-create-group label#empty_error').show();
			$('#idm-groups-create-group label#valid_error').hide();
		 }
		 else if( !validatealternateEmail(alternate_email)) {
			$('#idm-groups-create-group label#empty_error').hide();
			$('#idm-groups-create-group #edit-alternate-email-input').addClass('error');
			$('#idm-groups-create-group label#valid_error').show();
		 }
		 else {
			 $('#idm-groups-create-group label#valid_error').hide();
			 $('#idm-groups-create-group label#empty_error').hide();
			 $(".alternate_email").append('<div>'+alternate_email+'</div>');
			 alternate_emails = $('#altername_email').val();
			 if(alternate_emails != '') {
				 alternate_emails = alternate_emails + ','+alternate_email;
			 }
			 else {
				 alternate_emails = alternate_email;
			 }
			 //alert(alternate_emails);
			 $('#altername_email').val(alternate_emails);
			 $('#edit-alternate-email-input').val('');
		 }
	 });
	 $('#idm-groups-create-group .additional-managers input#edit-managers--2').live('autocompleteSelect',function(e) {
		 var groupmanager = $(this).val();
		 $(this).val('');
		 additional_managers_ssos = $('#additional_managers_sso').val();
		// var regExp = /\(([^)]+)\)/;
		// var matches = regExp.exec(groupmanager);
		 // matches[1] contains the value between the parentheses
		 //additional_managers_sso = matches[1];
		 var str = groupmanager;
		 var res = str.split("--");
		 additional_managers_sso = res[1];
		 $('#idm-groups-create-group div#manager').append(res[0]);
		 if(additional_managers_ssos != '') {
			 additional_managers_ssos = additional_managers_ssos + ','+additional_managers_sso;
		 }
		 else {
			 additional_managers_ssos = additional_managers_sso;
		 }
		 $('#additional_managers_sso').val(additional_managers_ssos);
	 });

     $('#idm-groups-create-group #edit-managers #manager .group-delete').live('click', function() {
	     var id = $(this).attr("id");
		 additional_managers_ssos = $('#additional_managers_sso').val();
		 var additional_managers_ssos_removed = removeValue(additional_managers_ssos, id);
		 $('#additional_managers_sso').val(additional_managers_ssos_removed);
        $(this).hide();
        $(this).prev().hide();
     });
$('#idm-groups-create-group .restrictions input#edit-restrictions').live('autocompleteSelect',function(e) {
  $(this).parents('fieldset#edit-privacy').find('#restrictions_id').val('mgrselected');
  $(this).removeClass('error');
  $('#idm-groups-create-group #edit-restrictions .restrictions label.error').hide();
  var groupmanager = $(this).val();
  var group_restrictions_count = $('#group_restrictions_count').html();
  $(this).val('');
  var restrictions_ssos = $('#restrictions_sso').val();
  var str = groupmanager;
  var res = str.split("--");
  var restrictions_sso = res[1];
  var second = restrictions_sso;
  var first = restrictions_ssos;
  if($.inArray(second, first.split(',')) > -1 ) {  // found
	  $(this).addClass('error');
	  $('#idm-groups-create-group #edit-privacy .restrictions label.error').show();
	  return false;
  } else {
	  $(this).removeClass('error');
	  $('#idm-groups-create-group #edit-privacy .restrictions label.error').hide();
  }

  $('#idm-groups-create-group div#group_restrictions').append(res[0]);
  if(restrictions_ssos != '') {
    restrictions_ssos = restrictions_ssos + ',' + restrictions_sso;
  }
  else {
    restrictions_ssos = restrictions_sso;
  }
  $('#restrictions_sso').val(restrictions_ssos);

  var restrictions_name = res[2];
  var restrictions_names = $('#restrictions_names').val();
  if(restrictions_names != '') {
    restrictions_names = restrictions_names + ',' + restrictions_name;
  }
  else {
    restrictions_names = restrictions_name;
  }
  $('#restrictions_names').val(restrictions_names);

  group_restrictions_count++;
  $('#group_restrictions_count').html(group_restrictions_count);
});

//Add an Alternate email start
$('#idm-groups-create-group #edit-group .alternate_email_input .address_plus_icon').live('click',function(e) {
  var group_new_email = $('#idm-groups-create-group #edit-group .alternate_email_input .form-item-alternate-email-input input#edit-alternate-email-input').val();
  var email_id = $('#idm-groups-create-group #edit-email').val();
  var email_id = email_id+'@nbcuni.com';
  var alternateemails = [];
  $("#idm-groups-create-group div#alternateemails .mgr-name").each(function( index ) {
	  alternateemails.push($(this).html().toLowerCase());
  });
  var emailIndex = $.inArray(group_new_email.toLowerCase(), alternateemails);
  //alert((validateEmail(group_new_email)));
  if ((group_new_email == '') || (!validatealternateEmail(group_new_email))){
    //$('#idm-groups-create-group label#empty_error').hide();
    $('#idm-groups-create-group input#edit-alternate-email-input').addClass('error');
    $('#idm-groups-create-group label#enter_alternateemail').show();
    //$('#idm-groups-create-group label#valid_error').hide();
  }
  else if ((group_new_email != '') && (validatealternateEmail(group_new_email))){
	  $('#idm-groups-create-group div#alternateemails').show();
	  if(group_new_email == email_id) {
		    $('#idm-groups-create-group input#edit-alternate-email-input').addClass('error');
		    $('#idm-groups-create-group label#enter_alternateemail_unique').show();
	  } else if(emailIndex != -1) {
		    $('#idm-groups-create-group input#edit-alternate-email-input').addClass('error');
		    $('#idm-groups-create-group label#enter_alternateemail_unique').show();
	  }
	  else {
	      $('#idm-groups-create-group label#enter_alternateemail').hide();
	      $('#idm-groups-create-group #edit-group .alternate_email_input .form-item-alternate-email-input input#edit-alternate-email-input').val('');
	      var group_new_emails = $('#new_alternate_email').val();
	      $('#idm-groups-create-group div#alternateemails').append('<div class="mgr-name">'+group_new_email+'</div><div class="group-delete" id='+group_new_email+'></div>');
	      if(group_new_emails != '') {
	        group_new_emails = group_new_emails + ','+group_new_email;
	      } else {
	        group_new_emails = group_new_email;
	      }
	      $('#new_alternate_email').val(group_new_emails);
	  }
  }
});
//Add a Alternate email end

//Remove a Alternate email start
$('#idm-groups-create-group #edit-group #alternateemails .group-delete').live('click', function() {
  var id = $(this).attr("id");
  if ($(this).hasClass('group-delete-old')) {
    //collecting del profile ids
    var group_new_email_del = $('#new_alternate_email_del').val();
    if(group_new_email_del != '') {
      group_new_email_del = group_new_email_del + ','+id;
    } else {
      group_new_email_del = id;
    }
    $('#new_alternate_email_del').val(group_new_email_del);
  }
  var group_new_emails = $('#new_alternate_email').val();
  //new code to convert this into array start
  var group_new_emails_array = group_new_emails.split(',');
  //new code to convert this into array end
  //removing the manager from the UI list
  var group_new_emails_removed = removeValuefromlist(group_new_emails_array, id);
  $('#new_alternate_email').val(group_new_emails_removed);

//  $(this).hide();
//  $(this).prev().hide();
  $(this).prev().remove();
  $(this).remove();
});
//Remove a Alternate email end

//Add a Manager start
$('#idm-groups-create-group #edit-managers .add_new_manager input#edit-add-new-manager').live('autocompleteSelect',function(e) {
  $(this).parents('fieldset#edit-managers').find('#managers_id').val('mgrselected');
  $(this).removeClass('error');
  $('#idm-groups-create-group #edit-managers .add_new_manager label.error').hide();
  var group_new_manager = $(this).val();
  var managers_count = $('#new_managers_count').val();
  $(this).val('');
  var str_manager = group_new_manager;
  var res_manager = str_manager.split("--");
  var newmanager_sso = res_manager[1];

  var newmanager_ssos = $('#new_manager_sso').val();
  var second = newmanager_sso;
  var first = newmanager_ssos;
  if($.inArray(second, first.split(',')) > -1 ) {  // found
	  $(this).addClass('error');
	  $('#idm-groups-create-group #edit-managers .add_new_manager label.error').show();
	  return false;
  } else {
	  $(this).removeClass('error');
	  $('#idm-groups-create-group #edit-managers .add_new_manager label.error').hide();
  }

  $('#idm-groups-create-group div#group_managers_all').append(res_manager[0]);
  if(newmanager_ssos != '') {
    newmanager_ssos = newmanager_ssos + ','+newmanager_sso;
  }
  else {
    newmanager_ssos = newmanager_sso;
  }
  $('#new_manager_sso').val(newmanager_ssos);

  var newmanager_name = res_manager[2];
  var newmanager_names = $('#new_manager_names').val();
  if(newmanager_names != '') {
    newmanager_names = newmanager_names + ','+newmanager_name;
  }
  else {
    newmanager_names = newmanager_name;
  }
  $('#new_manager_names').val(newmanager_names);

  managers_count++;
//$('#new_managers_count').html(managers_count);
  $('#new_managers_count').val(managers_count);

  /*
  var group_new_manager = $(this).val();
  $(this).val('');
  var newmanager_ssos = $('#new_manager_sso').val();
  var regExp = /\(([^)]+)\)/;
  var matches = regExp.exec(group_new_manager);
  newmanager_sso = matches[1];
  //var gid = $('fieldset#edit-group .fieldset-wrapper #gid').val();
  //var gtype = $('fieldset#edit-group .fieldset-wrapper #gtype').val();
  $('#idm-groups-create-group div#group_managers_all').append('<div class="new-mgr-name"><a href="/profile/'+newmanager_sso+'">'+group_new_manager+'</a></div><div class="new-mgr-delete" id='+newmanager_sso+'></div>');
  if(newmanager_ssos != '') {
    newmanager_ssos = newmanager_ssos + ','+newmanager_sso;
  } else {
    newmanager_ssos = newmanager_sso;
  }
  $('#new_manager_sso').val(newmanager_ssos);
  */
});
//Add a Manager end

//Remove a Manager start
$('#idm-groups-create-group #edit-managers #group_managers_all .new-mgr-delete').live('click', function() {
  var id = $(this).attr("id");
  var ssoname = $(this).attr("ssoname");
  var managers_count = $('#new_managers_count').val();
  if ($(this).hasClass('new-mgr-delete-old')) {
    //collecting del profile ids
    var newmanager_sso_del = $('#new_manager_sso_del').val();
    if(newmanager_sso_del != '') {
      newmanager_sso_del = newmanager_sso_del + ','+id;
    } else {
      newmanager_sso_del = id;
    }
    $('#new_manager_sso_del').val(newmanager_sso_del);
  }
    var newmanager_ssos = $('#new_manager_sso').val();
    //new code to convert this into array start
    var newmanager_ssos_array = newmanager_ssos.split(',');
    //new code to convert this into array end
    //removing the manager id from the UI list
    var newmanager_ssos_removed = removeValuefromlist(newmanager_ssos_array, id);
    $('#new_manager_sso').val(newmanager_ssos_removed);

    var newmanager_names = $('#new_manager_names').val();
    //new code to convert this into array start
    var newmanager_names_array = newmanager_names.split(',');
    //new code to convert this into array end
    //removing the manager name from the UI list
    var newmanager_names_removed = removeValuefromlist(newmanager_names_array, ssoname);
    $('#new_manager_names').val(newmanager_names_removed);

	managers_count--;
	//$('#new_managers_count').html(managers_count);
  $('#new_managers_count').val(managers_count);

  $(this).hide();
  $(this).prev().hide();
  $(this).prev('div').prev().hide();
});
//Remove a Manager end

//Add a Member start
/*
$('#idm-groups-create-group #edit-managers .add_new_member input#edit-add-new-member').live('autocompleteSelect',function(e) {
  var group_new_member = $(this).val();
  $(this).val('');
  var newmember_ssos = $('#new_member_sso').val();
  var regExp = /\(([^)]+)\)/;
  var matches = regExp.exec(group_new_member);
  newmember_sso = matches[1];
  //var gid = $('fieldset#edit-group .fieldset-wrapper #gid').val();
  //var gtype = $('fieldset#edit-group .fieldset-wrapper #gtype').val();
  $('#idm-groups-create-group div#group_members_all').append('<div class="new-member-name"><a href="/profile/'+newmember_sso+'"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg">&nbsp;&nbsp;'+ group_new_member+'</a></div><div class="new-member-delete" id='+newmember_sso+'></div>');
  if(newmember_ssos != '') {
    newmember_ssos = newmember_ssos + ','+newmember_sso;
  } else {
    newmember_ssos = newmember_sso;
  }
  $('#new_member_sso').val(newmember_ssos);
});
*/

$('#idm-groups-create-group #edit-managers .add_new_member input#edit-add-new-member').live('autocompleteSelect',function(e) {
  var group_new_member = $(this).val();
  var member_count = $('#group_members_count').html();
  $(this).val('');
  var str_member = group_new_member;
  var res_member = str_member.split("--");
  var newmember_sso = res_member[1];

  var newmember_ssos = $('#new_member_sso').val();
  var second = newmember_sso;
  var first = newmember_ssos;
  if($.inArray(second, first.split(',')) > -1 ) {  // found
	  $(this).addClass('error');
	  $('#idm-groups-create-group #edit-managers .add_new_member label.error').show();
	  return false;
  } else {
	  $(this).removeClass('error');
	  $('#idm-groups-create-group #edit-managers .add_new_member label.error').hide();
  }
  $('#idm-groups-create-group div#group_members_all').append(res_member[0]);
  if(newmember_ssos != '') {
    newmember_ssos = newmember_ssos + ','+newmember_sso;
  }
  else {
    newmember_ssos = newmember_sso;
  }
  $('#new_member_sso').val(newmember_ssos);

  var newmember_name = res_member[2];
  var newmember_names = $('#new_member_names').val();
  if(newmember_names != '') {
    newmember_names = newmember_names + ','+newmember_name;
  }
  else {
    newmember_names = newmember_name;
  }
  $('#new_member_names').val(newmember_names);

  member_count++;
  $('#group_members_count').html(member_count);
});

//Add a Member end

//Remove a Member start
$('#idm-groups-create-group #edit-managers #group_members_all .new-member-delete').live('click', function() {
  var id = $(this).attr("id");
  var ssoname = $(this).attr("ssoname");
  var member_count = $('#group_members_count').html();
  if ($(this).hasClass('new-member-delete-old')) {
    //collecting del profile ids
    var newmember_sso_del = $('#new_member_sso_del').val();
    if(newmember_sso_del != '') {
      newmember_sso_del = newmember_sso_del + ','+id;
    } else {
      newmember_sso_del = id;
    }
    $('#new_member_sso_del').val(newmember_sso_del);
  }
    var newmember_ssos = $('#new_member_sso').val();
    //new code to convert this into array start
    var newmember_ssos_array = newmember_ssos.split(',');
    //for (var i = 0; i < newmember_ssos_array.length; i++) {
    //alert(newmember_ssos_array[i]);
    //}
    //new code to convert this into array end
    //removing the member id from the UI list
    var newmember_ssos_removed = removeValuefromlist(newmember_ssos_array, id);
    $('#new_member_sso').val(newmember_ssos_removed);

    var newmember_names = $('#new_member_names').val();
    //new code to convert this into array start
    var newmember_names_array = newmember_names.split(',');
    //new code to convert this into array end
    //removing the member name from the UI list
    var newmember_names_removed = removeValuefromlist(newmember_names_array, ssoname);
    $('#new_member_names').val(newmember_names_removed);

	member_count--;
    $('#group_members_count').html(member_count);

  $(this).hide();
  $(this).prev().hide();
  $(this).prev('div').prev().hide();
});
//Remove a Member end
	/*
     $('#idm-groups-create-group #edit-privacy #group_restrictions .group-delete').live('click', function() {
	     var id = $(this).attr("id");
	     restrictions_ssos = $('#restrictions_sso').val();
		 var restrictions_ssos_removed = removeValue(restrictions_ssos, id);
		 $('#restrictions_sso').val(restrictions_ssos_removed);
        $(this).hide();
        $(this).prev().hide();
     });
	 */

//Remove a restriction start
$('#idm-groups-create-group #edit-privacy #group_restrictions .group-delete').live('click', function() {
  var id = $(this).attr("id");
  var ssoname = $(this).attr("ssoname");
  var group_restrictions_count = $('#group_restrictions_count').html();
  if ($(this).hasClass('new-res-delete-old')) {
    //collecting del profile ids
    var res_sso_del = $('#restrictions_sso_del').val();
    if(res_sso_del != '') {
      res_sso_del = res_sso_del + ','+id;
    } else {
      res_sso_del = id;
    }
    $('#restrictions_sso_del').val(res_sso_del);
  }
  var res_ssos = $('#restrictions_sso').val();
  //new code to convert this into array start
  var res_ssos_array = res_ssos.split(',');
  //new code to convert this into array end
  //removing the member from the UI list
  var res_ssos_removed = removeValuefromlist(res_ssos_array, id);
  $('#restrictions_sso').val(res_ssos_removed);

  var res_names = $('#restrictions_names').val();
  //new code to convert this into array start
  var res_names_array = res_names.split(',');
  //new code to convert this into array end
  //removing the manager name from the UI list
  var res_names_removed = removeValuefromlist(res_names_array, ssoname);
  $('#restrictions_names').val(res_names_removed);

  group_restrictions_count--;
  $('#group_restrictions_count').html(group_restrictions_count);

  $(this).hide();
  $(this).prev().hide();
  $(this).prev('div').prev().hide();
});
//Remove a restriction end

     $('#idm-groups-create-group .group-submit-buttons #edit-cancel').live('click',function() {
		   window.location.href='/groups';
		   return false;
	 });

     $( "#idm-groups-create-group .check_availability_button_displayname button, #idm-groups-create-group .check_availability_button_displayname_mobile").live('click',function(e) {
			display_name = $('#idm-groups-create-group #edit-displayname').val();
			if(display_name == ''){
				$('#idm-groups-create-group #edit-displayname').addClass('error');
				$('#idm-groups-create-group #enter_displayname').css("display", "block");
			}
			else if (display_name.indexOf('  ') >= 0) {
                $('#idm-groups-create-group #enter_displayname').html('A blank space cannot follow another blank space.');
				$('#idm-groups-create-group #edit-displayname').addClass('error');
				$('#idm-groups-create-group #enter_displayname').css("display", "block");
				$('#idm-groups-create-group #enter_displayname').addClass('error');
            }
			else if(display_name.lastIndexOf(" ") > -1 && (display_name.indexOf(" ") == 0 || display_name.lastIndexOf(" ") == (display_name.length-1)))
            {
                $('#idm-groups-create-group #enter_displayname').html('Display Name starting or ending with white space is not allowed.');
				$('#idm-groups-create-group #edit-displayname').addClass('error');
				$('#idm-groups-create-group #enter_displayname').css("display", "block");
				$('#idm-groups-create-group #enter_displayname').addClass('error');
            }
			else if (IsSpecialCharDisplaynameChecking(display_name))
            {
                $('#idm-groups-create-group #enter_displayname').html("Display name can have only A-Z, a-z, 0-9, . , & , _ , ' , -, / , ( , ) , [ , ] , ',' , : , + , ~ , ? and white space characters.");
				$('#idm-groups-create-group #edit-displayname').addClass('error');
				$('#idm-groups-create-group #enter_displayname').css("display", "block");
				$('#idm-groups-create-group #enter_displayname').addClass('error');
            }
			else if (display_name.length > 64)
            {
                $('#idm-groups-create-group #enter_displayname').html("Display Name can not be of more than 64 characters.");
				$('#idm-groups-create-group #edit-displayname').addClass('error');
				$('#idm-groups-create-group #enter_displayname').css("display", "block");
				$('#idm-groups-create-group #enter_displayname').addClass('error');
            }
			/*else if( !validateDisplayName(display_name)) {
				$('#idm-groups-create-group #edit-displayname').addClass('error');
				$('#idm-groups-create-group #enter_displayname').css("display", "block");
				$('#idm-groups-create-group #enter_displayname').addClass('error');
			}*/
			else{
				if(!$('#idm-groups-create-group #edit-displayname').hasClass('error')) {
					$( "#idm-groups-create-group .check_availability_button_displayname .ajax_throbber").css("display","block");
					$('#idm-groups-create-group .displayname_parent .available_displayname').css("display","none");
					$('#idm-groups-create-group .taken_displayname').css("display", "none");
					display_name = $('#idm-groups-create-group #edit-displayname').val();
				           $.ajax({
				            url: '/checkgroupdisplayname/'+display_name,
				            success: function(data) {
				              if ($.trim(data) >= 1) {
		                         $("#idm-groups-create-group .check_availability_button_displayname .ajax_throbber").css("display","none");
				                 $('#idm-groups-create-group #edit-displayname').addClass('error');
								 $('#idm-groups-create-group .displayname_parent .available_displayname').css("display","none");
				                 $('#idm-groups-create-group .taken_displayname').css("display", "block");
								 $('#idm-groups-create-group .displayname_parent #enter_displayname').css("display", "none");
				                 $('#idm-groups-create-group #edit-submit').addClass('disabled_button');
				               }
				              else {
		                         $("#idm-groups-create-group .check_availability_button_displayname .ajax_throbber").css("display","none");
		                         $('#idm-groups-create-group #edit-displayname').removeClass('error');
				                 $('#idm-groups-create-group .taken_displayname').css("display", "none");
								 $('#idm-groups-create-group .displayname_parent .available_displayname').css("display","block");
								 $('#idm-groups-create-group .displayname_parent #enter_displayname').css("display", "none");
				                 $('#idm-groups-create-group #edit-submit').removeClass('disabled_button');
				              }
				            }
				    });
				}
			}
	});
     $( "#idm-groups-create-group .check_availability_button_email button, #idm-groups-create-group .check_availability_button_email_mobile").live('click',function(e) {
			email_id = $('#idm-groups-create-group #edit-email').val();
			if(email_id == ''){
				$('#idm-groups-create-group #edit-email').addClass('error');
				$('#idm-groups-create-group #enter_email').css("display", "block");
			}
			else if($('#idm-groups-create-group #edit-email').hasClass('error')){
				$('#idm-groups-create-group #edit-email').addClass('error');
				$('#idm-groups-create-group #enter_email').css("display", "block");
			}
			/*else if( !validateEmail(email_id)) {
				$('#idm-groups-create-group #edit-email').addClass('error');
				$('#idm-groups-create-group #enter_email').css("display", "block");
			}*/
			else{
			$( "#idm-groups-create-group .check_availability_button_email .ajax_throbber").css("display","block");
			$('#idm-groups-create-group .email .available_email').css("display","none");
            $('#idm-groups-create-group .email .taken_email').css("display", "none");
				emailid = $('#idm-groups-create-group #edit-email').val();
		           $.ajax({
		            url: '/checkgroupemail/'+emailid,
		            success: function(data) {
		              if ($.trim(data) >= 1) {
                         $("#idm-groups-create-group .check_availability_button_email .ajax_throbber").css("display","none");
		                 $('#idm-groups-create-group #edit-email').addClass('error');
						 $('#idm-groups-create-group .email .available_email').css("display","none");
		                 $('#idm-groups-create-group .email .taken_email').css("display", "block");
		                 $('#idm-groups-create-group #edit-submit').addClass('disabled_button');
		               }
		              else {
                         $("#idm-groups-create-group .check_availability_button_email .ajax_throbber").css("display","none");
                         $('#idm-groups-create-group #edit-email').removeClass('error');
		                 $('#idm-groups-create-group .email .taken_email').css("display", "none");
						 $('#idm-groups-create-group .email .available_email').css("display","block");
		                 $('#idm-groups-create-group #edit-submit').removeClass('disabled_button');
		              }
		            }
		    });
			}
	});
     $( "#idm-groups-create-group .check_availability_button_alteremail button, #idm-groups-create-group .check_availability_button_alteremail_mobile").live('click',function(e) {
			email_id = $('#idm-groups-create-group #edit-alternate-email-input').val();
			if(email_id == ''){
				$('#idm-groups-create-group #edit-alternate-email-input').addClass('error');
				$('#idm-groups-create-group .alternate_email_input #enter_alternateemail').css("display", "block");
				$('#idm-groups-create-group .alternate_email_input .available_alternateemail').css("display","none");
                $('#idm-groups-create-group .alternate_email_input .taken_alternateemail').css("display", "none");
			}
			else if( !validatealternateEmail(email_id)) {
				$('#idm-groups-create-group #edit-alternate-email-input').addClass('error');
				$('#idm-groups-create-group .alternate_email_input #enter_alternateemail').css("display", "block");
			}
			else{
			$( "#idm-groups-create-group .check_availability_button_alteremail .ajax_throbber").css("display","block");
			$('#idm-groups-create-group .alternate_email_input .available_alternateemail').css("display","none");
			$('#idm-groups-create-group .alternate_email_input .taken_alternateemail').css("display", "none");
				emailid = $('#idm-groups-create-group #edit-alternate-email-input').val();
		           $.ajax({
		            url: '/checkgroupemail/'+emailid,
		            success: function(data) {
		              if ($.trim(data) >= 1) {
                      $("#idm-groups-create-group .check_availability_button_alteremail .ajax_throbber").css("display","none");
		                 $('#idm-groups-create-group #edit-alternate-email-input').addClass('error');
						 $('#idm-groups-create-group .alternate_email_input .available_alternateemail').css("display","none");
		                 $('#idm-groups-create-group .alternate_email_input .taken_alternateemail').css("display", "block");
						 //$('#idm-groups-create-group .alternate_email_input #enter_alternateemail').css("display", "none");
		                 $('#idm-groups-create-group #edit-submit').addClass('disabled_button');
		               }
		              else {
                         $("#idm-groups-create-group .check_availability_button_alteremail .ajax_throbber").css("display","none");
                         $('#idm-groups-create-group #edit-alternate-email-input').removeClass('error');
		                 $('#idm-groups-create-group .alternate_email_input .taken_alternateemail').css("display", "none");
						 $('#idm-groups-create-group .alternate_email_input .available_alternateemail').css("display","block");
						 //$('#idm-groups-create-group .alternate_email_input #enter_alternateemail').css("display", "none");
		                 $('#idm-groups-create-group #edit-submit').removeClass('disabled_button');
		              }
		            }
		    });
			}
		});
        $( "#idm-groups-create-group input#edit-displayname").focusin(function(){
            $('#idm-groups-create-group .displayname_parent .taken_displayname').css("display", "none");
			$('#idm-groups-create-group .displayname_parent .available_displayname').css("display","none");
		});
        $( "#idm-groups-create-group input#edit-email").focusin(function(){
            $('#idm-groups-create-group .email .taken_email').css("display", "none");
			$('#idm-groups-create-group .email .available_email').css("display","none");
		});
        $( "#idm-groups-create-group input#edit-alternate-email-input").focusin(function(){
            $('#idm-groups-create-group .alternate_email_input .taken_alternateemail').css("display", "none");
			$('#idm-groups-create-group .alternate_email_input .available_alternateemail').css("display","none");
		});
		$( "#idm-groups-create-group" ).submit(function( event ) {
			if($('#idm-groups-create-group input#edit-submit').hasClass("disabled_button")){
				event.preventDefault();
				if($('#idm-groups-create-group .error_email').is(':visible') || $('#idm-groups-create-group .error').is(':visible') || $('#idm-groups-create-group .error_alternateemail').is(':visible')) {
					$('#idm-groups-create-group .email input#edit-email').addClass('error');
					$('#idm-groups-create-group .alternate_email_input input#edit-alternate-email-input').addClass('error');
				}
			}
		});
		$('#idm-groups-create-group #edit-displayname').keyup(function() {
			var final_email = $(this).val();
			if($("#idm-groups-create-group #email-changed").val() == 0){
				final_email = final_email.toLowerCase();  // converting lowercase
				final_email = final_email.replace(/ /g,".");  // Replacing space into dot
				var myString = final_email;
				var mySplitResult = myString.split(".");
				str = '';
				for(i = 0; i < mySplitResult.length; i++){
					if(i == 0) {
						str = mySplitResult[i];
					}
					else {
						if(i == 1) {
							str = str + "." + mySplitResult[i];
						}
						else {
							str = str + mySplitResult[i];
						}
					}
					final_email = str;
				}
				final_email = final_email.replace(/[^a-z0-9\.]/gi,''); // Allowing alpha numeric
			    $('#idm-groups-create-group #edit-email').val(final_email);
			}
		});
		$('#idm-groups-create-group #edit-email').change(function() {
			$("#idm-groups-create-group #email-changed").val("1");
		});

    $("textarea").keypress(function(e){
        var lengthF = $(this).val();

        if (lengthF.length > 120){
            e.preventDefault();
        }
    });
    $("#idm_groups div#autocomplete ul li.selected").live('hover', function() {
        if ($('#idm_groups div#autocomplete ul li.selected div.noresult').length) {
           $(this).css("background", "white");
           $(this).css("color", "#000000");
        }
     });
   $("#edit-group div#autocomplete ul li.selected").live('hover', function() {
        if ($('#edit-group div#autocomplete ul li.selected div.noresult').length) {
           $(this).css("background", "white");
           $(this).css("color", "#000000");
        }
   });
   $("#edit-privacy div#autocomplete ul li.selected").live('hover', function() {
         if ($('#edit-privacy div#autocomplete ul li.selected div.noresult').length) {
           $(this).css("background", "white");
           $(this).css("color", "#000000");
         }
     });
   $("#edit-managers div#autocomplete ul li.selected").live('hover', function() {
        if ($('#edit-managers div#autocomplete ul li.selected div.noresult').length) {
          $(this).css("background", "white");
          $(this).css("color", "#000000");
        }
   });
	$( "#member_csv_import_button").live('click',function(e) {
		$( ".form-item-file-upload").show();
		$("#idm-groups-create-group .group-submit-buttons").css("bottom", "-150px");
		return false;
	});

	$( "#member_csv_form .file-uploader .form-submit").live('click',function(e) {
		$( "#member_csv_form .file-uploader .error").hide();
		$( "#member_csv_form .file-uploader .success").hide();
		$( "#member_csv_form .ajax_throbber").show();
	});

	if ($("#mobile-groups-page-options").hasClass('mobile-groups-page-options')) {
	  $("#mobile-groups-page-options").chosen({
		  disable_search_threshold: 10
	  });
  }

  $('#idm_groups .operations .search_bar input').live('focus', function() {
    if($(this).val() == 'Find Group') {
      $(this).val('').focus();
    }
  });
  $('#idm_groups .operations .search_bar input').live('blur', function() {
    if($(this).val() == '') {
      $(this).val('Find Group');
    }
  });
  $("#idm-groups-create-group .fieldset-wrapper .search-groupmanager #autocomplete ul li div").live("click", function(){
      if(!$(this).find("div").hasClass("no-search-result")) {
          $(this).parents('div.search-groupmanager').next('#nam_id').val('mgrselected');
      } else {
          $(this).parents('div.search-groupmanager').next('#nam_id').val('not mgrselected');
      }
  });
  $( "#idm-groups-create-group input[name='groupmanager']" ).keyup(function() {
      $(this).parents('fieldset#edit-group').find('#nam_id').val('not mgrselected');
  });
  $("#idm-groups-create-group .fieldset-wrapper .add_new_manager #autocomplete").live("click", function(){
		  var group_new_manager = $('#idm-groups-create-group #edit-managers .add_new_manager input#edit-add-new-manager').val();
		  var str_manager = group_new_manager;
		  var res_manager = str_manager.split("--");
		  var newmanager_sso = res_manager[1];

		  var newmanager_ssos = $('#new_manager_sso').val();
		  var second = newmanager_sso;
		  var first = newmanager_ssos;
      if(!$(this).find("div").hasClass("no-search-result") && $.inArray(second, first.split(',')) > -1) {
          $(this).parents('fieldset#edit-managers').find('#managers_id').val('mgrselected');
          $("#idm-groups-create-group input[name='add_new_manager']").removeClass('error');
          $('#idm-groups-create-group #edit-managers .form-item-add-new-manager').next('label').hide();
      } else {
          $(this).parents('fieldset#edit-managers').find('#managers_id').val('');
      }
  });
  $( "#idm-groups-create-group input[name='add_new_manager']" ).keyup(function() {
	  if($(this).val() == '') {
		  $(this).parents('fieldset#edit-managers').find('#managers_id').val('');
		  $(this).removeClass('error');
		  $('#idm-groups-create-group #edit-managers .form-item-add-new-manager').next('label').hide();
	  } else {
		  $(this).parents('fieldset#edit-managers').find('#managers_id').val('not mgrselected');
	  }
  });
  /*$("#idm-groups-create-group .fieldset-wrapper .restrictions #autocomplete").live("click", function(){
      if(!$(this).find("div").hasClass("no-search-result")) {
          $(this).parents('fieldset#edit-privacy').find('#restrictions_id').val('mgrselected');
          $("#idm-groups-create-group input[name='restrictions']").removeClass('error');
          $('#idm-groups-create-group #edit-privacy .form-item-restrictions').next('label').hide();
      } else {
          $(this).parents('fieldset#edit-privacy').find('#restrictions_id').val('');
      }
  });*/
  $( "#idm-groups-create-group input[name='restrictions']" ).keyup(function() {
	  if($(this).val() == '') {
		  $(this).parents('fieldset#edit-privacy').find('#restrictions_id').val('');
		  $(this).removeClass('error');
		  $('#idm-groups-create-group #edit-privacy .form-item-restrictions').next('label').hide();
	  } else {
		  $(this).parents('fieldset#edit-privacy').find('#restrictions_id').val('not mgrselected');
	  }
  });

  $("#idm-groups-create-group .fieldset-wrapper .add_new_member #autocomplete").live("click", function(){
	  var group_new_member = $('#idm-groups-create-group #edit-managers .add_new_member input#edit-add-new-member').val();
	  var str_member = group_new_member;
	  var res_member = str_member.split("--");
	  var newmember_sso = res_member[1];

	  var newmember_ssos = $('#new_member_sso').val();
	  var second = newmember_sso;
	  var first = newmember_ssos;
      if(!$(this).find("div").hasClass("no-search-result") && $.inArray(second, first.split(',')) > -1 ) {
          $(this).parents('fieldset#edit-managers').find('#members_id').val('mgrselected');
          $("#idm-groups-create-group input[name='add_new_member']").removeClass('error');
          $('#idm-groups-create-group #edit-managers .form-item-add-new-member').next('label').hide();
      } else {
          $(this).parents('fieldset#edit-managers').find('#members_id').val('');
      }
  });
  $( "#idm-groups-create-group input[name='add_new_member']" ).keyup(function() {
	  if($(this).val() == '') {
		  $(this).parents('fieldset#edit-managers').find('#members_id').val('');
		  $(this).removeClass('error');
		  $('#idm-groups-create-group #edit-managers .form-item-add-new-member').next('label').hide();
	  } else {
		  $(this).parents('fieldset#edit-managers').find('#members_id').val('not mgrselected');
	  }
  });

	$(document).ready(function()
	{
		var options = {
		complete: function(response)
		{
			if(response.responseText.indexOf("Error") < 0 && response.responseText.indexOf("Data Error") < 0) {
				try {
					var members = $.parseJSON(response.responseText);
					var member_count = $('#group_members_count').html();
					var new_member_ssos = $('#new_member_sso').val();
					var newmember_names = $('#new_member_names').val();
					var gid = $('#gid').val();
					var output = "";
					var update_count = 0;
					for (i = 1; i < members.length; i++) {
						var elementid = $("#group_members_all").html();
						var elementidpos = elementid.indexOf(members[i][3]);
						if(gid == members[i][2] && elementidpos < 0) {
							if(members[i][3].indexOf("g") > -1) {

								output = output + '<div class="new-member-name"><div class="new-member-icon"><a href="/group/DST/'+members[i][3]+'"><img src="/sites/all/themes/idmtheme/images/asseticon.jpg"></a></div><div class="new-member-link"><a href="/group/DST/'+members[i][3]+'">'+members[i][4]+' ('+members[i][5]+')</a></div>';
								output = output + '<div id="'+members[i][3]+'" ssoname="'+members[i][4]+'" class="new-member-delete"></div></div>';
							} else {
								//output = output + '<div class="new-member-name"><div class="new-member-icon"><a href="/group/DST/'+members[i][3]+'"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg">&nbsp;&nbsp;'+members[i][4]+'</a></div><div class="new-member-link"><a href="/profile/'.$value_member['sso'].'" class="pm_no_parimary">'.$value_member['display_name'].'</a></div></div>';
								//output = output + '<div id="'+members[i][3]+'" ssoname="'+members[i][4]+'" class="new-member-delete"></div>';
								output = output + '<div class="new-member-name"><div class="new-member-icon"><a href="/profile/'+members[i][3]+'" class="pm_no_parimary"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg"></a></div><div class="new-member-link"><a href="/profile/'+members[i][3]+'" class="pm_no_parimary">'+members[i][4]+'</a></div><div class="new-member-delete new-member-delete-old" id="'+members[i][3]+'" ssoname="'+members[i][4]+'"></div></div>';
							}
							if(new_member_ssos != '') {
								new_member_ssos = new_member_ssos + ',' + members[i][3];
							} else {
								new_member_ssos = members[i][3];
							}
							if(newmember_names != '') {
								newmember_names = newmember_names + ','+ members[i][4];
							}
							else {
								newmember_names = members[i][4];
							}
							update_count++
							member_count++;
						}
					}
					$( "#member_csv_form .file-uploader .success").html(update_count +" out of " + members[0][0] +" members imported");
					$( "#member_csv_form .file-uploader .success").show();
					$('#group_members_all').append(output);
					$('#new_member_sso').val(new_member_ssos);
					$('#new_member_names').val(newmember_names);
					$('#group_members_count').html(member_count);
					$( "#member_csv_form .ajax_throbber").hide();
					$( "#member_csv_form .file-uploader .error").hide();
					$( "#member_csv_form .file-uploader .dataerror").hide();
				}catch (e) {
					$( "#member_csv_form .file-uploader .error").show();
					$( "#member_csv_form .file-uploader .success").hide();
					$( "#member_csv_form .file-uploader .dataerror").hide();
				}
			} else {
				if(response.responseText == 'Error') {
					$( "#member_csv_form .file-uploader .error").show();
					$( "#member_csv_form .file-uploader .success").hide();
					$( "#member_csv_form .file-uploader .dataerror").hide();
				} else {
					$( "#member_csv_form .file-uploader .dataerror").show();
					$( "#member_csv_form .file-uploader .dataerror").append(response.responseText);
					$( "#member_csv_form .file-uploader .success").hide();
					$( "#member_csv_form .file-uploader .error").hide();
				}
			}
		},
		error: function()
		{
			$( "#member_csv_form .file-uploader .dataerror").hide();
			$( "#member_csv_form .file-uploader .error").show();
			$( "#member_csv_form .file-uploader .success").hide();
		}
		};
		$("#member_csv_form").ajaxForm(options);
	  });

	}
  }
})(jQuery);

jQuery(function($) {
	$(document).ready(function(){
		 $("#idm-groups-create-group").submit(function( event ) {
				if($('#idm-groups-create-group #edit-group #edit-createfor').val() == '1' && $('#idm-groups-create-group #nam_id').val() == 'not mgrselected') {
					$('#idm-groups-create-group #edit-group #edit-groupmanager').addClass('error');
					$('#idm-groups-create-group #edit-group .form-item-groupmanager').next('label').show();
					event.preventDefault();
				}
				if($('#idm-groups-create-group #managers_id').val() == 'not mgrselected') {
					$('#idm-groups-create-group #edit-managers #edit-add-new-manager').addClass('error');
					$('#idm-groups-create-group #edit-managers .form-item-add-new-manager').next('label').show();
					event.preventDefault();
				}
				if($('#idm-groups-create-group #restrictions_id').val() == 'not mgrselected') {
					$('#idm-groups-create-group #edit-privacy #edit-restrictions').addClass('error');
					$('#idm-groups-create-group #edit-privacy .form-item-restrictions').next('label').show();
					event.preventDefault();
				}
				if($('#idm-groups-create-group #members_id').val() == 'not mgrselected') {
					$('#idm-groups-create-group #edit-managers #edit-add-new-member').addClass('error');
					$('#idm-groups-create-group #edit-managers .form-item-add-new-member').next('label').show();
					event.preventDefault();
				}
		 });
	});
});

function get_all_groups() {
  jQuery('.messages--status').hide();
  //jQuery('#idm_groups .content').empty();
  jQuery('#idm_groups .content').html('');
  jQuery('#idm_groups .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#all_groups_tab a').addClass('active');
  jQuery('li#all_groups_tab').addClass('hover-green');
  var sortBy = 'expirationdate';
  var sortOrder = 'descending';
  //jQuery('#idm_groups div.header-row').load(Drupal.settings.basePath +'grouplist/allgroups/'+sortBy+'/'+sortOrder + ' div.header-row-content');
  //jQuery('#idm_groups div.data-row').load(Drupal.settings.basePath +'grouplist/allgroups/'+sortBy+'/'+sortOrder + ' div.data-row-content');
  jQuery.ajax({
      url: 'grouplist/allgroups/'+sortBy+'/'+sortOrder,
      success: function(data) {
        if (data != '') {
           jQuery('#idm_groups div.header-row').html(jQuery(data).find('div.header-row-content').html());
           jQuery('#idm_groups div.data-row').html(jQuery(data).find('div.data-row-content').html());
        }
      }
  });
  jQuery('.add-group, .mobile-group').show();
  jQuery('.add-group a, .mobile-group a').attr('href','/create/group');
  jQuery('.add-group .desktop_text').text('Add group');
  jQuery('.add-group').addClass('desktop_icon');
}

function get_my_memberships() {
  jQuery('.messages--status').hide();
  jQuery('.profile-alert-actions-msg').hide();
  //jQuery('#idm_groups .content').empty();
  jQuery('#idm_groups .content').html('');
  jQuery('#idm_groups .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#my_memberships_tab a').addClass('active');
  jQuery('li#my_memberships_tab').addClass('hover-green');
  var sortBy = 'expirationdate';
  var sortOrder = 'descending';
  jQuery.ajax({
      url: 'grouplist/mymemberships/'+sortBy+'/'+sortOrder,
      success: function(data) {
        if (data != '') {
           jQuery('#idm_groups div.header-row').html(jQuery(data).find('div.header-row-content').html());
           jQuery('#idm_groups div.data-row').html(jQuery(data).find('div.data-row-content').html());
		   jQuery('#idm_groups .list .content .group_exp .mobile-exp').css('display','none');
		   jQuery('#idm_groups .list .content .group_exp .mobile-exp-date').css('display','none');
           //jQuery('#idm_groups .list .content .group_exp .mobile-exp').css('display','none');
           //jQuery('#idm_groups .list .content .group_exp .mobile-exp-date').css('display','none');
           jQuery('#idm_groups .list .main-content ul li .group_members').css('border-right','none');
        }
      }
  });
  jQuery('.add-group, .mobile-group').show();
  jQuery('.add-group a, .mobile-group a').attr('href','/create/group');
  jQuery('.add-group .desktop_text').text('Add group');
  jQuery('.add-group').addClass('desktop_icon');
  //jQuery('#idm_groups .download a').attr('href', '/download_group/mymemberships');
  jQuery('#idm_groups .list #sticky-header .operations').addClass('disable_operations');
  //jQuery("#idm_groups .list .list-tabs #mobile-groups-page-options").val("my_memberships");
  jQuery("#idm_groups .list #mobile-groups-page-options").val("my_memberships");
  //jQuery('#idm_groups .list #sticky-header .disable_operations .check-all').css('display','none !important');
  //jQuery('#idm_groups .list #sticky-header .disable_operations .four_operations').css('display','none !important');
  //jQuery('#idm_groups .list #sticky-header .disable_operations .download').css('display','none !important');
}

function get_my_groups() {
  jQuery('.messages--status').hide();
  jQuery('.profile-alert-actions-msg').hide();
  jQuery('#idm_groups .content').empty();
  jQuery('#idm_groups .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#my_groups_tab a').addClass('active');
  jQuery('li#my_groups_tab').addClass('hover-green');
  var sortBy = 'expirationdate';
  var sortOrder = 'descending';
  jQuery.ajax({
      url: 'grouplist/mygroups/'+sortBy+'/'+sortOrder,
      success: function(data) {
        if (data != '') {
           jQuery('#idm_groups div.header-row').html(jQuery(data).find('div.header-row-content').html());
           jQuery('#idm_groups div.data-row').html(jQuery(data).find('div.data-row-content').html());
           jQuery('#idm_groups .list .content .group_members').removeAttr('style');
        }
      }
  });
  jQuery('.add-group, .mobile-group').show();
  jQuery('.add-group a, .mobile-group a').attr('href','/create/group');
  jQuery('.add-group .desktop_text').text('Add group');
  jQuery('.add-group').addClass('desktop_icon');
  //jQuery('#idm_groups .check-all').css('display','block');
  //jQuery('#idm_groups .four_operations').css('display','block');
  //jQuery('#idm_groups .download a').attr('href', '/download_group/mygroups');
  //jQuery('#idm_groups .download').css('display','block');
  jQuery('#idm_groups .list #sticky-header .operations').removeClass('disable_operations');
  //jQuery("#idm_groups .list .list-tabs #mobile-groups-page-options").val("my_groups");
  jQuery("#idm_groups .list #mobile-groups-page-options").val("my_groups");
}

function renewAllGroupAjaxFunction(groupIds,current,renew_time) {
  groupIds = groupIds.substring(1, groupIds.length);
  jQuery('.profile-alert-actions-msg').remove();
  current.parents('.actions').parents('.renew-alert-all').find('.ajax_throbber').show();
  if ( jQuery( ".l-content .profile-alert-actions-msg" ).length ) {
	  jQuery( ".l-content .profile-alert-actions-msg" ).hide();
  }
  jQuery('#idm_groups .list .content .group_checked .checkbox-row').removeClass('icon-checked_icon');
  current.parents('.alert-actions').find('input[name=renew]').removeAttr('checked');
  current.parents('#idm_groups').find('.operations .actions .small_button').addClass('hover-blue').removeClass('grey-light');
  jQuery('#idm_groups .list .content .group_checked').find('.group_sso').removeClass('group_sso_checked');
  jQuery('#idm_groups .list .content .group_checked').removeClass('group_checked');
  jQuery.ajax({
    url: '/renew-group-all/'+groupIds+'/'+renew_time,
    success: function(data) {
      if (data != '') {
        if ( data.charAt(0) == "/" ) {
          //location.href = data;
        } else {
              jQuery('.renew-alert-all').hide();
              current.parents('.actions').parents('.renew-alert-all').find('.ajax_throbber').hide();
              jQuery('#idm_groups').before('<div class="profile-alert-actions-msg renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
          //$('#idm_groups').before(data);
        }
      }
    },
  });
}

function validatealternateEmail(email) {
	  //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  var emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	  if(emailReg.test(email) ) {
	    return true;
	  } else {
	    return false;
	  }
}

function removeValue(list, value) {
	  list = list.split(',');
	  list.splice(list.indexOf(value), 1);
	  return list.join(',');
}

function removeValuefromlist(list, value) {
  var emailIndex = jQuery.inArray(value, list); // returns the position of group_new_email
  if (emailIndex != -1)
  {
    list.splice(emailIndex, 1);
  }
  return list.join(',');
}

function trim(s) {
	var l=0; var r=s.length -1;
	while(l < s.length && s[l] == '(')
	{	l++; }
	while(r > l && s[r] == ')')
	{	r-=1;	}
	return s.substring(l, r+1);
}

/*function validateDisplayName(displayname) {
 var letters = /^[A-Za-z0-9\-\_\ ]+$/;
 if(displayname.match(letters)) {
   return true;
 }
 else {
   return false;
 }
}*/

function IsSpecialCharDisplaynameChecking(sText)
{
    var ValidChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.&_/(),:+~[]?'- 0123456789@";
    var IsSpecialCharDisplaynameChecking = true;
    var Char;

    for (i = 0; i < sText.length; i++)
    {
        if (ValidChars.indexOf(sText.substr(i,1)) == -1)
        {
            IsSpecialCharDisplayname = true;
            break;
        }
        else
        {
            IsSpecialCharDisplaynameChecking = false;
        }
    }
    return IsSpecialCharDisplaynameChecking;
}
