(function($) {
    Drupal.behaviors.idm_portal = {
	  attach: function(){
	    $('#block-idm-portal-my-staff ul.header li#header-cols .cell').live('click', function() {
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
           case 'Expiration':
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
         //get_mystaff_sort(sortBy,sortOrder);
       });
       $('.recommends-content .recommends-div ul.content .recommends .info .external_asset_link').live('click',function() {
         $url = $(this).attr('ext_url');
         //var $dialog = $('<div class="external_link_dialog">you are being redirected to legacy IDM website.</br><a target=_blank href='+$url+'>Click here</a>'+' to proceed.<br><a href="#" onclick="funcClose();">Click here</a>'+' to close.</div>').dialog({
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
       });
	   /*
       $('.header-wrapper .l-region--navigation ul.menu li.menu-groups').live('click',function(event) {
         event.preventDefault();
         $url = $(this).find('a').attr('href');
         var $dialog = $('<div class="external_link_dialog">You are being redirected to legacy IDM website. <a target=_blank href='+$url+'>Click here</a>'+' to proceed.</br>Use close icon to close the dialog box.</div>').dialog({
           title: 'IDM',
           modal: true,
           height:150,
           width: 350,
           dialogClass: 'close',
           resizable: false,
         });
         $dialog.dialog('open');
         setTimeout(function () {$dialog.dialog('close');window.open($url, '_blank');}, 7000);
       });*/
       $('.user-hover-profile .operations ul li:nth-child(2)').live('click',function(event) {
         event.preventDefault();
         $url = $(this).find('a').attr('href');
         var $dialog = $('<div class="external_link_dialog">You are being redirected to legacy IDM website. <a target=_blank href='+$url+'>Click here</a>'+' to proceed.</br>Use close icon to close the dialog box.</div>').dialog({
           title: 'IDM',
           modal: true,
           height:150,
           width: 350,
           dialogClass: 'close',
           resizable: false,
         });
         $dialog.dialog('open');
         setTimeout(function () {$dialog.dialog('close');window.open($url, '_blank');}, 7000);
       });
     }
   }
})(jQuery);

function funcClose() {
  jQuery('div.ui-dialog').hide();
}

function get_mystaff_sort(sortBy,sortOrder) {
  jQuery('#block-idm-portal-my-staff .content').empty();
  jQuery('#block-idm-portal-my-staff .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  var userTabType = '';
  jQuery('.list .list-tabs ul li').each(function() {
    if (jQuery(this).hasClass('hover-green')) {
      userTabType = this.id;
    }
  });
  if(userTabType == 'employees_tab'){
    userType = 'employee';
  }
  if(userTabType == 'contractors_tab'){
    userType = 'contractor';
  }
  if(userTabType == 'functional_tab'){
    userType = 'functional';
  }
  jQuery('#block-idm-portal-my-staff ul.content').load(Drupal.settings.basePath +'mystaff/'+userType+'/'+sortBy+'/'+sortOrder + ' ul.content li');
}
function get_mystaff_employees() {
  jQuery('#block-idm-portal-my-staff .content').empty();
  jQuery('#block-idm-portal-my-staff .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#employees_tab a').addClass('active');
  jQuery('li#employees_tab').addClass('hover-green');
  var sortBy = 'id';
  var sortOrder = 'ascending';
  jQuery('#block-idm-portal-my-staff .main-content').load(Drupal.settings.basePath +'mystaff/employee/'+sortBy+'/'+sortOrder + ' .main-content');
}

function get_mystaff_contractors() {
  jQuery('#block-idm-portal-my-staff .content').empty();
  jQuery('#block-idm-portal-my-staff .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#contractors_tab a').addClass('active');
  jQuery('li#contractors_tab').addClass('hover-green');
  var sortBy = 'id';
  var sortOrder = 'ascending';
  jQuery('#block-idm-portal-my-staff .main-content').load(Drupal.settings.basePath +'mystaff/contractor/'+sortBy+'/'+sortOrder + ' .main-content');
}

function get_mystaff_functional_accounts() {
  jQuery('#block-idm-portal-my-staff .content').empty();
  jQuery('#block-idm-portal-my-staff .content').append( "<li class='loader'><img src='/sites/all/themes/idmtheme/images/ajax-loader.gif'></li>" );
  jQuery('div.list-tabs li').removeClass('hover-green');
  jQuery('div.list-tabs li a').removeClass('active');
  jQuery('li#functional_tab a').addClass('active');
  jQuery('li#functional_tab').addClass('hover-green');
  var sortBy = 'id';
  var sortOrder = 'ascending';
  jQuery('#block-idm-portal-my-staff .main-content').load(Drupal.settings.basePath +'mystaff/functional/'+sortBy+'/'+sortOrder + ' .main-content');
}