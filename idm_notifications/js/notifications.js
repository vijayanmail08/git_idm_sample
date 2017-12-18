(function($) {
    Drupal.behaviors.idm_notifications = {
	  attach: function(){
      /*
		  $("#block-idm-notifications-renew #header_arrow, #block-idm-notifications-approve #header_arrow, #block-idm-notifications-tasks #header_arrow").live('click', function() {
			order = $(this).attr('class');
			$(this).removeClass(order);
			$(this).parents('#table_wrapper').find("tr:gt(0)").toggle();
			$(this).parents('.renews-content').find(".viewall_div").toggle();
			$(this).parents('.approve-content').find(".viewall_div").toggle();
			$(this).parents('.submitted-content').find(".viewall_div").toggle();
			if (order == 'expand') {
				$(this).addClass('collapse');
			}
			else {
				$(this).addClass('expand');
			}
		  });
      */
		}
	}
  Drupal.ajaxApprovalBlockRequest= function () {
    $.ajax({
      url: 'ajax/approvalrequests/1',
      type: "GET",
      dataType: "json",
      data: 'nocache=1',
      cache: false,
      success: function (data) {
        $('#block-idm-notifications-approve').html(data);
        var approve_count = parseInt($('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html());
        var total_notification_count = parseInt($('.menu-notifications .notice-count').html());
        if(isNaN(total_notification_count)){
          total_notification_count = 0;
        }
        if(isNaN(approve_count)){
          approve_count = 0;
        }
        total_notification_count = total_notification_count + approve_count;
        if(total_notification_count == 0){
          total_notification_count = "!";
        }
        $('.menu-notifications .notice-count').html(total_notification_count);
      }
    });
  }
  $(document).ready(function () {
    if(($('#block-idm-notifications-approve .ajax_throbber').length > 0) && ($('#block-idm-notifications-approve .approve-content').length == 0)){
      Drupal.ajaxApprovalBlockRequest();
    }
  });

  $("#block-idm-notifications-renew #header_arrow, #block-idm-notifications-approve #header_arrow, #block-idm-notifications-tasks #header_arrow, #block-idm-notifications-expiringgroups #header_arrow").live('click', function() {
    order = $(this).attr('class');
    $(this).removeClass(order);
    $(this).parents('#table_wrapper').find("tr:gt(0)").toggle();
    $(this).parents('.renews-content').find(".viewall_div").toggle();
    $(this).parents('.approve-content').find(".viewall_div").toggle();
    $(this).parents('.submitted-content').find(".viewall_div").toggle();
    $(this).parents('.expiringgroups-content').find(".viewall_div").toggle();
    if (order == 'expand') {
      $(this).addClass('collapse');
    }
    else {
      $(this).addClass('expand');
    }
  });

  //detail api call
 /* $('.approve-content .data_row .approve-reject-request').live('click', function() {
		var current = $(this);
		var customId = current.parents('.data_row').attr('custom_id');
		$.ajax({
			url: '/approve-reject-request/'+customId,
			success: function(data) {
				current.parents('.approve-table').before(data);
				if (data.indexOf("error") == -1) {
					current.parents('.data_row').hide();
				}
			},
		});
	});*/

  //approve through form
/*	$('.submit-approve-reject .submit-button').live('click', function() {
		var current = $(this);
		var customId = $('.workitemid-approve-reject input').val();
		var customAction = 'approve'
		$.ajax({
			url: '/approve-request/'+customId+'/'+customAction,
			success: function(data) {
				current.parents('#contractor_details-info').before(data);
			},
		});
	});
*/
  //reject through form
/*	$('.submit-approve-reject .reject-button').live('click', function() {
    var current = $(this);
		var customId = $('.workitemid-approve-reject input').val();
		var customAction = 'reject'
		$.ajax({
			url: '/approve-request/'+customId+'/'+customAction,
			success: function(data) {
				current.parents('#contractor_details-info').before(data);
			},
		});
	});
*/
  //cancel through form
/*	$('.submit-approve-reject .cancel-button').live('click', function() {
		var customId = $('.workitemid-approve-reject input').val();
		var customAction = 'cancel'
    location.href = '/';
	});
*/
$(".profile-alert-actions-msg img").live('click',function(e) {
  $(".profile-alert-actions-msg").hide();
});
$(".profile-alert-actions-msg-renew img").live('click',function(e) {
  $(".profile-alert-actions-msg-renew").hide();
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
  //approve
	$('.approve-content .data_row .employee_button_td .actions .sprite-icons-copy').live('click', function() {
		var current = $(this);
		var customId = current.parents('.data_row').attr('custom_id');
		var cus_id = current.parents('.data_row').attr('cus_id');
		current.parents('.actions').find('.ajax_throbber').show();
		//var requestor = current.parents('.data_row').find('.employee_requestor_td .employee').html();
		var approve_count = parseInt($('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html());
        var total_notification_count = parseInt($('.menu-notifications .notice-count').html());
        //console.log('new approve count ', approve_count);
		var customAction = 'approve'
		$.ajax({
			url: '/approve-request/'+customId+'/'+customAction+'/'+cus_id,
			success: function(data) {
				current.parents('.approve-table').before(data);
				current.parents('.actions').find('.ajax_throbber').hide();
				if (data.indexOf("error") == -1) {
					current.parents('.data_row').hide();
					$('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html(approve_count-1);
                    $('.menu-notifications .notice-count').html(total_notification_count-1);
				}
			},
		});
	});

	//reject
	$('.approve-content .data_row .employee_button_td .actions .sprite-icons-cross').live('click', function() {
		var current = $(this);
		var customId = current.parents('.data_row').attr('custom_id');
		var cus_id = current.parents('.data_row').attr('cus_id');
		current.parents('.actions').find('.ajax_throbber').show();
		//var requestor = current.parents('.data_row').find('.employee_requestor_td .employee').html();
		var approve_count = parseInt($('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html());
        var total_notification_count = parseInt($('.menu-notifications .notice-count').html());
		var customAction = 'reject'
		$.ajax({
			url: '/approve-request/'+customId+'/'+customAction+'/'+cus_id,
			success: function(data) {
				current.parents('.approve-table').before(data);
				current.parents('.actions').find('.ajax_throbber').hide();
				if (data.indexOf("error") == -1) {
					current.parents('.data_row').hide();
					$('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html(approve_count-1);
                    $('.menu-notifications .notice-count').html(total_notification_count-1);
				}
			},
		});
	});
	$('.approve-content .viewall_div .viewall_button .button').live('click', function() {
		var current = $(this);
		$.ajax({
			url: '/approve-view-all',
			success: function(data) {
				current.parents('.approve-content').find('.approve-table table tbody').append(data);
				current.parents('.viewall_div').hide();
			},
		});
	});
	$('.submitted-content .viewall_div .viewall_button .button').live('click', function() {
		var current = $(this);
		$('.viewall_div').addClass('viewall_button');
		$('.viewall_button').attr('style', 'display:none');
		$.ajax({
			url: '/submitted-view-all',
			success: function(data) {
				current.parents('.submitted-content').find('.submitted-table table tbody').append(data);
				current.parents('.viewall_div').hide();
			},
		});
	});
	$('.approve-content #header-cols .employee_button_td .approve-all').live('click', function() {
		var current = $(this);
		var customIdAll = current.attr('custom_id');
		var customAction = 'approve';
    var approve_count = parseInt($('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html());
    var total_notification_count = parseInt($('.menu-notifications .notice-count').html());
		current.parents('.employee_button_td').find('.ajax_throbber').show();
		$.ajax({
			url: '/approve-request-all/'+customIdAll+'/'+customAction,
			dataType: 'json',
			success: function(data) {
				var obj = JSON.stringify(data);
				var json = $.parseJSON(obj);

        if (json.success_string == null){
          var success_string = '';
        } else {
          var success_string = json.success_string;
        }
        if (json.error_string == null){
          var error_string = '';
        } else {
          var error_string = json.error_string;
        }
        if (json.success_custom_ids) {
          var success_custom_ids = json.success_custom_ids;
        }
        if (json.error_custom_ids) {
          var error_custom_ids = json.error_custom_ids;
        }
        if (json.success_count) {
          var success_count = parseInt(json.success_count);
        }
        if (json.error_count) {
          var error_count = parseInt(json.error_count);
        }
				current.parents('.approve-table').before('<div class="approve_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted.<br> Successful requests: <br> '+success_string+'<br> Not Successful requests: <br> '+error_string+' </div>');
        if (success_count){
          $('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html(approve_count-success_count);
					if(!isNaN(total_notification_count)) {
						$('.menu-notifications .notice-count').html(total_notification_count-success_count);
					}
        } else {
          //$('#block-idm-notifications-approve').find('#table_header h2 span.approve_count').html(approve_count);
          //$('.menu-notifications .notice-count').html(total_notification_count);
        }
        if (success_custom_ids) {
          $.each(success_custom_ids, function(index, value) {
            //$('tr:not([class="approve-table"])[custom_id="'+value+'"]').hide();
            current.parents('.approve-table').find('tr[custom_id="'+value +'"]').remove();
          });
        }
				if (success_count == approve_count ) {
					current.parents('.approve-content').find('.viewall_div').remove();
					current.parents('.approve-table').find('#header-cols').remove();
				}
        current.parents('.employee_button_td').find('.ajax_throbber').hide();
			},
		});
	});

    //renew view all
    $('.renews-content .viewall_div .viewall_button .button').live('click', function() {
      var current = $(this);
      $.ajax({
        url: '/renew-view-all',
        success: function(data) {
                current.parents('.renews-content').find('.renews-table table tbody').append(data);
                current.parents('.viewall_div').hide();
        },
      });
    });

     $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td div.renew-alert-all ul li .radio').live('click', function() {
       var current = $(this);
       current.parents('.renew-alert-all').find('.actions button.submit').removeClass('disabled_button');
       });

	//renew all button click action
    $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td button.renew-all-contractor-button ').live('click', function() {
      var userIdAll = $(this).parents('td.employee_button_td').find('.renew-alert-all ul').attr('userid');
      if (userIdAll != '') {
        if ($(this).hasClass('hover-blue')) {
          $(this).removeClass('hover-blue');
          $(this).addClass('grey-light');
        } else {
          $(this).removeClass('grey-light');
          $(this).addClass('hover-blue');
        }
        $('div.renew-alert-contractor-all').toggle();
        $('.renew-alert-each').hide();

        $('button.renew-button').each(function() {
          if ($(this).hasClass('grey-light')) {
            $('button.renew-button').removeClass('grey-light');
            $('button.renew-button').addClass('hover-green');
          }
        });
        $('.renew-alert-contractor-all .ajax_throbber').hide();
      }
		});

    //renew all submit action
    $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td .renew-alert-all .actions button.submit').live('click', function() {
      var renewContractorAll = [];
      var current = $(this);
      if ((current.hasClass('disabled_button')) != true) {
      //renew option
      var renew_time = current.parents('.alert-actions-all').find('input[name=renew]:checked').val();
      var renew_date = current.parents('.alert-actions-all').find('input[name=renew]:checked').parent().find('.duration .date').attr('renew_date');
	  //renew sso_id
      var ren_count = parseInt($('#block-idm-notifications-renew').find('h2 span.ren_count').html());
      var userType = current.parents('.basic-profile').find('.profile-actions').attr('usertype');
      var userIdAll = current.parents('.alert-actions-all').find('ul').attr('userid');
      var expDateAll = current.parents('.alert-actions-all').find('ul').attr('exp_date_all');
      var expDateAllArray = expDateAll.split(',');
      for (var i = 0; i < expDateAllArray.length; i++) {
        var initial_end_date = new Date(expDateAllArray[i]);
        var new_end_date = new Date(renew_date);
        if (new_end_date < initial_end_date) {
          renewContractorAll.push(false);
        } else {
          renewContractorAll.push(true);
        }
      }
      if ($.inArray(false, renewContractorAll ) != -1){
        var $dialog = $('<div class="error_renew_message">Selected end date is less than Contractor\'s end date for one or more of the contractors. Are you sure you want to reduce the end date of the Contractor</div>').dialog({
          title: 'IDM',
          modal: true,
          height:210,
          width: 350,
          dialogClass: 'renew-dialog',
          resizable: false,
          buttons: {
            "Yes": function() {
              $( this ).dialog( "close" );
              renewContractorAllAjaxFunction(current,renew_time,userIdAll,ren_count);
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
        renewContractorAllAjaxFunction(current,renew_time,userIdAll,ren_count);
      }
    }
  });

    $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td div.renew-alert ul li .radio').live('click', function() {
       var current = $(this);
       var userid = current.parents('.renew-alert').find('ul').attr('userid');
       var customid = current.parents('.renew-alert').find('.actions button.submit').attr('custom_id');
       if (userid == customid) {
        current.parents('.renew-alert').find('.actions button.submit').removeClass('disabled_button');
       }
    });

    //renew each button click action
    $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td button.renew-button ').live('click', function() {
      var id = $(this).attr('id');
      if ($(this).hasClass('hover-green')) {
		$('.renew-alert-all').hide();
		$('.renew-alert').hide();
		$('.renew-button').removeClass('grey-light');
		$('.renew-button').addClass('hover-green');
        $(this).removeClass('hover-green');
        $(this).addClass('grey-light');
		$('#rb-'+id).toggle();
      } else {
		$('.renew-alert-all').hide();
		$('.renew-alert').hide();
		$('.renew-button').removeClass('grey-light');
		$('.renew-button').addClass('hover-green');
      }
      $('button.renew-all-button').addClass('hover-blue');
      $('button.renew-all-button').removeClass('grey-light');
      $('.renew-alert .ajax_throbber').hide();
    });

	//renew each submit action
    $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td .renew-alert .actions button.submit').live('click', function() {
      var current = $(this);
      if ((current.hasClass('disabled_button')) != true) {
        var custom_id = $(this).attr('custom_id');
        var customId = '#'+custom_id;
        var userId = current.parents('.alert-actions').find('ul').attr('userid');
        var username = current.parents('.alert-actions').find('ul').attr('username');
        var renew_time = current.parents('.alert-actions').find('input[name=renew]:checked').val();
        var renew_date = current.parents('.alert-actions').find('input[name=renew]:checked').parent().find('.duration .date').attr('renew_date');
        var userType = current.parents('.basic-profile').find('.profile-actions').attr('usertype');
        var expire_date = current.parents('.data_row').find('.employee_expire_td p').html();
        var initial_end_date = new Date(expire_date);
        var new_end_date = new Date(renew_date);
        if (new_end_date < initial_end_date) {
          var $dialog = $('<div class="error_renew_message">Selected end date is less than the Contractor\'s end date. Are you sure you want to reduce the end date of the Contractor.</div>').dialog({
            title: 'IDM',
            modal: true,
            height:210,
            width: 350,
            dialogClass: 'renew-dialog',
            resizable: false,
            buttons: {
              "Yes": function() {
                $( this ).dialog( "close" );
                renewContractorAjaxFunction(renew_time,current,customId,userId,custom_id,username,renew_date);
              },
              Cancel: function() {
                $( this ).dialog( "close" );
                return;
              }
            }
          });
          $dialog.dialog('open');
		} else {
          renewContractorAjaxFunction(renew_time,current,customId,userId,custom_id,username,renew_date);
		}
      }
	});

    //renew contractors radio checked for view all records
    $('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td .renew-alert .main-actions span.radio').live('click', function() {
        var par_div = $(this).closest('div[class^="renew-alert"]').attr('id');
        $("#"+par_div+" .main-actions .radio").each(function () {
            $(this).css('background-position', '0px 0px');
            $(this).next('input').attr('checked', '');
        });
        $(this).css('background-position', '0px -56px');
        $(this).next('input').attr('checked', 'checked');
    });

    //renew groups radio checked for view all records
    $('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_button_td .renew-alert .main-actions span.radio').live('click', function() {
        var par_div1 = $(this).closest('div[class^="renew-alert"]').attr('id');
        $("#"+par_div1+" .main-actions .radio").each(function () {
            $(this).css('background-position', '0px 0px');
            $(this).next('input').attr('checked', '');
        });
        $(this).css('background-position', '0px -56px');
        $(this).next('input').attr('checked', 'checked');
    });

    //expiringgroups view all
    $('.expiringgroups-content .viewall_div .viewall_button .button').live('click', function() {
      var current = $(this);
      $.ajax({
        url: '/expiringgroups-view-all',
        success: function(data) {
                current.parents('.expiringgroups-content').find('.expiringgroups-table table tbody').append(data);
                current.parents('.viewall_div').hide();
        },
      });
    });

	//expire group renew each button click action
    $('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_button_td button.renew-button ').live('click', function() {
      var id = $(this).attr('id');
      if ($(this).hasClass('hover-green')) {
		$('.renew-alert-all').hide();
		$('.renew-alert').hide();
		$('.renew-button').removeClass('grey-light');
		$('.renew-button').addClass('hover-green');
        $(this).removeClass('hover-green');
        $(this).addClass('grey-light');
		$('#rb-'+id).toggle();
      } else {
		$('.renew-alert-all').hide();
		$('.renew-alert').hide();
		$('.renew-button').removeClass('grey-light');
		$('.renew-button').addClass('hover-green');
      }
      $('button.renew-all-button').addClass('hover-blue');
      $('button.renew-all-button').removeClass('grey-light');
      $('.renew-alert .ajax_throbber').hide();
    });

	// expire group enable renew enable submit
	$('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_button_td div.group-alert-actions ul li .radio').live('click', function() {
       var current = $(this);
       var gid = current.parents('.group-alert-actions').find('ul').attr('gid');
       var customid = current.parents('.group-alert-actions').find('.actions button.submit').attr('custom_id');
       if (gid == customid) {
        current.parents('.group-alert-actions').find('.actions button.submit').removeClass('disabled_button');
       }
    });

	// expire group enable renew submit
	$('#block-idm-notifications-expiringgroups .group-alert-actions .actions .submit').live('click',function() {
      var current = $(this);
      var gid = current.parents('.group-alert-actions').attr('gid');
      var gtype = current.parents('.group-alert-actions').attr('gtype');
      var renew_time = current.parents('.group-alert-actions').find('input[name=renew]:checked').val();
      current.parents('.group-alert-actions').find('input[name=renew]').removeAttr('checked');
      if (! current.hasClass('disabled_button') && (typeof renew_time != 'undefined')) {
        current.parents('.group-alert-actions').find('.ajax_throbber').show();
        $.ajax({
          url: '/extend/group/'+gtype+'/'+gid+'/'+renew_time,
          success: function(data) {
            if (data != '') {
              if (data == 'success') {
                $('.l-content').find('.group-renew-msg').remove();
                $('#block-idm-notifications-renew').before('<div class="group-renew-msg approve_request-msg"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div>');
                $("html, body").animate({ scrollTop: 0 }, "slow");
                var ren_count = parseInt(jQuery('#block-idm-notifications-expiringgroups').find('h2 span.ren_count_expiring_groups').html())-1;
                jQuery('#block-idm-notifications-expiringgroups').find('h2 span.ren_count_expiring_groups').html(ren_count);
                var total_notification_count = parseInt(jQuery('.menu-notifications .notice-count').html());
                jQuery('.menu-notifications .notice-count').html(total_notification_count-1);
              } else {
                $('.l-content').find('.error_request-msg').remove();
                $('#block-idm-notifications-renew').before(data);
                $("html, body").animate({ scrollTop: 0 }, "slow");
              }
            }
            if($("#block-idm-notifications-expiringgroups .expiringgroups-table .data_row").length == 1) {
                $("#block-idm-notifications-expiringgroups .expiringgroups-content").remove();
            }else{
                current.parents('.data_row').remove();
            }
            current.parents('.group-alert-actions').find('.ajax_throbber').hide();
            current.parents('.group-alert-actions').hide();
            current.parents('.expiringgroups_button_td').find('.renew-button').removeClass('grey-light').addClass('hover-green');
          }
        });
      }
    });

	//renew all group button click action
    $('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_all_button_td button.renew-all-group-button ').live('click', function() {
      var userIdAll = $(this).parents('td.expiringgroups_all_button_td').find('.renew-alert-all ul').attr('userid');
      if (userIdAll != '') {
        if ($(this).hasClass('hover-blue')) {
          $(this).removeClass('hover-blue');
          $(this).addClass('grey-light');
        } else {
          $(this).removeClass('grey-light');
          $(this).addClass('hover-blue');
        }
        $('div.renew-alert-group-all').toggle();
        $('.renew-alert-each').hide();

        $('button.renew-button').each(function() {
          if ($(this).hasClass('grey-light')) {
            $('button.renew-button').removeClass('grey-light');
            $('button.renew-button').addClass('hover-green');
          }
        });
        $('.renew-alert-group-all .ajax_throbber').hide();
      }
	});
	$('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_all_button_td div.renew-alert-all ul li .radio').live('click', function() {
       var current = $(this);
       current.parents('.renew-alert-all').find('.actions button.submit').removeClass('disabled_button');
    });

	//expiring groups renew all submit action
	$('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_all_button_td .renew-alert-all .actions button.submit').live('click', function() {
	  var renewGroupAll = [];
	  var current = $(this);
	  if ((current.hasClass('disabled_button')) != true) {
		  //renew option
		  var renew_time = current.parents('.alert-actions-all').find('input[name=renewgroup]:checked').val();
		  var renew_date = current.parents('.alert-actions-all').find('input[name=renewgroup]:checked').parent().find('.duration .date').attr('expiringgroups_date');
		  var ren_count = parseInt($('#block-idm-notifications-expiringgroups').find('h2 span.ren_count_expiring_groups').html());
		  var groupType = current.parents('.alert-actions-all').find('.main-actions-all').attr('gtype');
		  var groupIdAll = current.parents('.alert-actions-all').find('.main-actions-all').attr('gid_all');
		  var expDateAll = current.parents('.alert-actions-all').find('.main-actions-all').attr('exp_date_all');
		  var expDateAllArray = expDateAll.split(',');
		  for (var i = 0; i < expDateAllArray.length; i++) {
        var initial_end_date = new Date(expDateAllArray[i]);
        var new_end_date = new Date(renew_date);
        if (new_end_date < initial_end_date) {
          renewGroupAll.push(false);
        } else {
          renewGroupAll.push(true);
        }
		  }
		  if ($.inArray(false, renewGroupAll ) != -1){
        var $dialog = $('<div class="error_renew_message">Selected end date is less than Group\'s end date for one or more of the groups. Are you sure you want to reduce the end date of the Group</div>').dialog({
          title: 'IDM',
          modal: true,
          height:210,
          width: 350,
          dialogClass: 'renew-dialog',
          resizable: false,
          buttons: {
          "Yes": function() {
            $( this ).dialog( "close" );
            renewGroupAllAjaxFunction(current,renew_time,groupIdAll,ren_count);
          },
          Cancel: function() {
            $( this ).dialog( "close" );
            return;
          }
          }
        });
        $dialog.dialog('open');
		  } else {
			  renewGroupAllAjaxFunction(current,renew_time,groupIdAll,ren_count);
			}
	  }
	});

})(jQuery);

function renewContractorAjaxFunction(renew_time,current,customId,userId,custom_id,username,renew_date) {
  if ( typeof renew_time != 'undefined') {
    current.parents('.alert-actions').find('.ajax_throbber').show();
    jQuery(customId).removeClass('grey-light');
    jQuery(customId).addClass('hover-green');
    current.parents('.alert-actions').find('input[name=renew]').removeAttr('checked');
    current.parents('.alert-actions').find('input[name=renew]').removeAttr('checked');
    jQuery.ajax({
      url: '/renew-employee/'+userId+'/'+renew_time,
      success: function(data) {
        if (data != '') {
          if (data == 'success') {
            var ren_count = parseInt(jQuery('#block-idm-notifications-renew').find('h2 span.ren_count').html())-1;
            jQuery('#block-idm-notifications-renew').find('h2 span.ren_count').html(ren_count);
            var total_notification_count = parseInt(jQuery('.menu-notifications .notice-count').html());
            jQuery('.menu-notifications .notice-count').html(total_notification_count-1);
            current.parents('.data_row').hide();
            //current.parents('.renews-table').before('<div class="profile-alert-actions-msg-renew renew"><div class="inner-msg">'+username+' renewed until '+renew_date+'.</div></div>');
          } else {
            current.parents('.renews-table').before(data);
            jQuery('div#rb-'+custom_id).hide();
          }
        }
      },
    });
  }
}

function renewContractorAllAjaxFunction(current,renew_time,userIdAll,ren_count) {
  if (( typeof renew_time != 'undefined') && (userIdAll != '')){
    // current.parents('.renews-table').before('<div class="profile-alert-actions-msg renew"><div class="inner-msg">Request has been submitted. Please allow up to 60 minutes for the data to flow to downstream applications.</div></div>');
    current.parents('.renews-table').before('<div class="profile-alert-actions-msg-renew renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+ren_count+' contractors renewed.</div>');
    current.parents('.alert-actions').find('input[name=renew]').removeAttr('checked');
    jQuery('#block-idm-notifications-renew .renews-content #table_wrapper td.employee_button_td .renew-all-button').addClass('hover-blue').removeClass('grey-light');
    jQuery('.renew-alert-all .ajax_throbber').hide();
    jQuery('.renew-alert-all').hide();
    jQuery('.renew-alert-all .ajax_throbber').show();
    jQuery.ajax({
      url: '/renew-employee-all/'+userIdAll+'/'+renew_time,
      success: function(data) {
        if (data != '') {
          if ( data.charAt(0) == "/" ) {
            //location.href = "/";
            //current.parents('.renews-table').before(data);
          } else {
            //current.parents('.renews-table').before(data);
          }
        }
      },
    });
  }
}

function renewGroupAllAjaxFunction(current,renew_time,groupIdAll,ren_count) {
  if (( typeof renew_time != 'undefined') && (groupIdAll != '')){
    current.parents('.expiringgroups-table').before('<div class="profile-alert-actions-msg-renew renew"><img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'+ren_count+' groups renewed.</div>');
    current.parents('.renew-alert-group-all').find('input[name=renewgroup]').removeAttr('checked');
    jQuery('#block-idm-notifications-expiringgroups .expiringgroups-content #table_wrapper td.expiringgroups_all_button_td .renew-all-button').addClass('hover-blue').removeClass('grey-light');
    jQuery('.renew-alert-group-all .ajax_throbber').hide();
    jQuery('.renew-alert-group-all').hide();
    jQuery('.renew-alert-group-all .ajax_throbber').show();
    jQuery.ajax({
      url: '/renew-group-all/'+groupIdAll+'/'+renew_time,
      success: function(data) {
        if (data != '') {
          if ( data.charAt(0) == "/" ) {
            //location.href = "/";
            //current.parents('.renews-table').before(data);
          } else {
            //current.parents('.renews-table').before(data);
          }
        }
      },
    });
  }
}
