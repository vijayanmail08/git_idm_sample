<?php

function rest_api_check_settings() {
	$form = array(
	'rest_api_check_url' => array(
	'#type' => 'textfield',
	'#title' => t('REST API URL'),
	'#default_value' => $url = variable_get('rest_api_check_url', 'http://3.3.175.127:8080/idm-api/rest'),
	'#description' => t('REST API URL configuration.'),
	'#required' => TRUE,
	),
	'rest_api_check_http_auth_username' => array(
	'#type' => 'textfield',
	'#title' => t('HTTP Authentication Username'),
	'#default_value' => variable_get('rest_api_check_http_auth_username', '999999001'),
	'#description' => t('HTTP Authentication Username.'),
	'#required' => TRUE,
	),
	'rest_api_check_http_auth_pass' => array(
	'#type' => 'textfield',
	'#title' => t('HTTP Authentication Password'),
	'#default_value' => variable_get('rest_api_check_http_auth_pass', 'test123test'),
	'#description' => t('HTTP Authentication Password.'),
	'#required' => TRUE,
	),
	'ctools_object_cache_ttl' => array(
		'#type' => 'textfield',
		'#title' => t('TTL for API Cache'),
		'#default_value' => variable_get('ctools_object_cache_ttl', '300'),
		'#description' => t('The API calls are cached in Drupal. Set the TTL for those entries in seconds here'),
		'#required' => TRUE,
		),
	'rest_api_check_sailpoint_url' => array(
	'#type' => 'textfield',
	'#title' => t('REST API SAILPOINT URL'),
	'#default_value' => $url = variable_get('rest_api_check_sailpoint_url', 'http://stg.identity.inbcu.com'),
	'#description' => t('REST API Sailpoint URL configuration.'),
	'#required' => TRUE,
	),
	'rest_api_check_sailpoint_http_auth_username' => array(
	'#type' => 'textfield',
	'#title' => t('HTTP Sailpoint Authentication Username'),
	'#default_value' => variable_get('rest_api_check_sailpoint_http_auth_username', 'spadmin'),
	'#description' => t('HTTP Sailpoint Authentication Username.'),
	'#required' => TRUE,
	),
	'rest_api_check_sailpoint_http_auth_pass' => array(
	'#type' => 'textfield',
	'#title' => t('HTTP Sailpoint Authentication Password'),
	'#default_value' => variable_get('rest_api_check_sailpoint_http_auth_pass', 'admin'),
	'#description' => t('HTTP Sailpoint Authentication Password.'),
	'#required' => TRUE,
	)
	);
	return system_settings_form($form);
}

/**
 * Implementation of account settings configuration.
 */
function account_settings() {
	$form = array(
	's_account' => array(
	'#type' => 'textfield',
	'#title' => t('Account Name'),
	'#default_value' => variable_get('s_account', 'nbcuiamnew'),
	'#description' => t('IDM Omniture sitecatalyst account name.'),
	'#required' => TRUE,
	),
	'tilde_request_approvers' => array(
	'#type' => 'textfield',
	'#title' => t("Default approver's SSO"),
	'#default_value' => variable_get('tilde_request_approvers', '206426150'),
	'#description' => t('Tilde request default approver'),
	'#required' => TRUE,
	),
	'idm_password_change_url' => array (
	'#type' => 'textfield',
	'#title' => t('Password Change URL'),
	'#default_value' => variable_get('idm_password_change_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
	'#description' => t('Worker password change URL.'),
	'#required' => TRUE,
	),
	);
	return system_settings_form($form);
}

/**
 * Implementation of other account settings configuration.
 */
function other_settings() {
  $form = array (
    'no_proxy' => array (
      '#type' => 'select',
      '#options' => array('1' => 'No', '0' => 'Yes'),
      '#default_value' => variable_get('no_proxy', 'No'),
      '#title' => t('Use Proxy'),
      '#description' => t('No proxy configuration.'),
      '#required' => TRUE,
    ),
    'emp_dir_solr' => array (
      '#type' => 'textfield',
      '#title' => t('Solar Sync'),
      '#description' => t('Solr base URL configuration.'),
      '#default_value' => variable_get('emp_dir_solr','http://dev.idmportal.inbcu.com:8080/solr/collection1'),
      '#required' => TRUE,
    ),
    'idm_contact_emailid' => array (
      '#type' => 'textfield',
      '#title' => t('Contact EmailID'),
      '#default_value' => variable_get('idm_contact_emailid','identityservicessupportIDM@nbcuni.com'),
      '#description' => t('IDM Support Team EmailID.'),
      '#required' => TRUE,
    ),
    'app_reg_role_change' => array (
      '#type' => 'textfield',
      '#title' => t('Asset Application Registration - Role Change URL'),
      '#description' => t('Asset Application Registration - Role Change URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('app_reg_role_change','http://iam.inbcu.com/idm/user/processLaunch.jsp?newView=true&id=NBC_WF_APPREG_CallApplicationRegistration&op_action=appreg&op_requesttype=appregRolechng'),
      '#required' => TRUE,
    ),
    'app_reg_provisioning' => array (
      '#type' => 'textfield',
      '#title' => t('Asset Application Registration - Provisioning URL'),
      '#description' => t('Asset Application Registration - Provisioning URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('app_reg_provisioning','http://iam.inbcu.com/idm/user/processLaunch.jsp?newView=true&id=NBC_WF_APPREG_Prov_CallApplicationRegistration&op_action=appreg&op_requesttype=appregProv'),
      '#required' => TRUE,
    ),
    'admin_fin_attribute' => array (
      '#type' => 'textfield',
      '#title' => t('Administer Financial Attributes URL'),
      '#description' => t('Administer Financial Attributes URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('admin_fin_attribute','http://iam.inbcu.com/idm/NBC/worker/user/NBCTNESearchUser.jsp?&tandeApprover='),
      '#required' => TRUE,
    ),
    'req_for_sponser' => array (
      '#type' => 'textfield',
      '#title' => t('Request for Sponsor URL'),
      '#description' => t('Request for Sponsor URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('req_for_sponser','http://iam.inbcu.com/idm/NBC/worker/user/RequestSponsor.jsp'),
      '#required' => TRUE,
    ),
    'supportcentral_get_url' => array (
      '#type' => 'textfield',
      '#title' => t('Support Central Get URL'),
      '#description' => t('Support Central Get URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('supportcentral_get_url','http://supportcentral.inbcu.com/images/person/temp/'),
      '#required' => TRUE,
    ),
    'supportcentral_upload_url' => array (
      '#type' => 'textfield',
      '#title' => t('Support Central Upload URL'),
      '#description' => t('Support Central Upload URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('supportcentral_upload_url','https://supportcentral.inbcu.com/profile/photo_HR_upload.asp?ohr_id='),
      '#required' => TRUE,
    ),
    'notifications_approve_url' => array (
      '#type' => 'textfield',
      '#title' => t('Notifications Approve Legacy URL'),
      '#description' => t('Notifications Approve URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('notifications_approve_url','http://iam.inbcu.com/idm/user/request/PendingItems/myApprovals.jsp'),
      '#required' => TRUE,
    ),
    'notifications_request_url' => array (
      '#type' => 'textfield',
      '#title' => t('Notifications Request Legacy URL'),
      '#description' => t('Notifications Request URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('notifications_request_url','http://iam.inbcu.com/idm/user/request/PendingItems/myRequests.jsp'),
      '#required' => TRUE,
    ),
    'audit_and_report_attribute' => array (
      '#type' => 'textfield',
      '#title' => t('Asset Auditing and Reporting URL'),
      '#description' => t('Asset Auditing and Reporting URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('audit_and_report_attribute','http://iam.inbcu.com/idm/user/processLaunch.jsp?newView=true&id=NBC_WF_ARR_CallMain&op_action=reqAccess&op_requesttype=New'),
      '#required' => TRUE,
    ),
    'app_access_url' => array (
      '#type' => 'textfield',
      '#title' => t('Application Access URL'),
      '#description' => t('Application Access URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('app_access_url','http://iam.inbcu.com/idm/user/processLaunch.jsp?newView=true&id=NBC_WF_Common_CallProvision&op_action=reqAccess&op_requesttype=New&redirect=0'),
      '#required' => TRUE,
    ),
    'rsa_cancel_redirect' => array (
      '#type' => 'textfield',
      '#title' => t('RSA Cancel Button Redirect'),
      '#description' => t('RSA Cancel Button Redirect URL configuration.'),
      //'#size' => 32,
      '#maxlength' => 160,
      '#default_value' => variable_get('rsa_cancel_redirect','http://stage.iam.inbcu.com'),
      '#required' => TRUE,
    ),
		'rsa_help_link' => array (
			'#type' => 'textfield',
			'#title' => t('RSA Help Link'),
			'#description' => t('RSA Help Link Configuration.'),
			'#maxlength' => 160,
			'#default_value' => variable_get('rsa_help_link','https://wiki.nbcuni.ge.com/pages/viewpage.action?pageId=80946512&preview=/80946512/80946514/New%20RSA%20Token%20Request%20Process_Ver1.1.docx'),
			'#required' => TRUE,
		),
    'dropbox_gid' => array (
      '#type' => 'textfield',
      '#title' => t('Drop Box Group ID'),
      '#description' => t('Drop Box Group ID configuration.'),
      '#maxlength' => 160,
      '#default_value' => variable_get('dropbox_gid','gr1006746'),
      '#required' => TRUE,
    ),
    'dropbox_gtype' => array (
      '#type' => 'textfield',
      '#title' => t('Drop Box Group Type'),
      '#description' => t('Drop Box Group Type configuration.'),
      '#maxlength' => 160,
      '#default_value' => variable_get('dropbox_gtype','DST'),
      '#required' => TRUE,
    ),
    'dropbox_cron_sender_ids' => array (
      '#type' => 'textfield',
      '#title' => t('Dropbox Cron Sender E-mail Ids'),
      '#description' => t('Dropbox Cron Sender E-mail Ids.'),
      '#maxlength' => 160,
      '#default_value' => variable_get('dropbox_cron_sender_ids','nbcuniidmsupportteam@nbcuni.com'),
      '#required' => TRUE,
    ),
    'dropbox_cron_recipients_ids' => array (
      '#type' => 'textfield',
      '#title' => t('Dropbox Cron Recipients E-mail Ids'),
      '#description' => t('Dropbox Cron Recipients E-mail Ids.'),
      '#maxlength' => 160,
      '#default_value' => variable_get('dropbox_cron_recipients_ids','meenu.gupta@igate.com'),
      '#required' => TRUE,
    ),
    'idm_admin_user_sso' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Admin Users SSO List'),
      '#description' => t('IDM Admin Users SSO Configaration.'),
      '#maxlength' => 160,
      '#default_value' => variable_get('idm_admin_user_sso','206416150,206464634,206464632'),
      '#required' => TRUE,
    ),
	);
  return system_settings_form($form);
}

/**
 * Implementation of waveset url settings configuration.
 */
function waveseturl_settings() {
  $form = array (
    'idm_waveset_myworkers_main_page_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset myworkers main page URL'),
      '#description' => t('IDM Waveset myworkers main page URL configuration.'),
      '#default_value' => variable_get('idm_waveset_myworkers_main_page_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
  'idm_waveset_create_contractor_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset create contractor URL'),
      '#description' => t('IDM Waveset create contractor URL configuration.'),
      '#default_value' => variable_get('idm_waveset_create_contractor_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    'idm_waveset_create_functional_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset create functional URL'),
      '#description' => t('IDM Waveset create functional URL configuration.'),
      '#default_value' => variable_get('idm_waveset_create_functional_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    'idm_waveset_groups_main_page_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset groups main page URL'),
      '#description' => t('IDM Waveset groups main page URL configuration.'),
      '#default_value' => variable_get('idm_waveset_groups_main_page_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    'idm_waveset_create_group_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset create group URL'),
      '#description' => t('IDM Waveset create group URL configuration.'),
      '#default_value' => variable_get('idm_waveset_create_group_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    /*
    'idm_waveset_edit_group_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset edit group URL'),
      '#description' => t('IDM Waveset edit group URL configuration.'),
      '#default_value' => variable_get('idm_waveset_edit_group_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    */
    'idm_waveset_create_tilde_account_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset request assets tilde URL'),
      '#description' => t('IDM Waveset request assets tilde URL configuration.'),
      '#default_value' => variable_get('idm_waveset_create_tilde_account_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    'idm_waveset_create_personally_owned_mobile_account_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset create personally owned mobile account URL'),
      '#description' => t('IDM Waveset create personally owned mobile account URL configuration.'),
      '#default_value' => variable_get('idm_waveset_create_personally_owned_mobile_account_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    'idm_waveset_edit_user_profile_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset edit user profile URL'),
      '#description' => t('IDM Waveset edit user profile URL configuration.'),
      '#default_value' => variable_get('idm_waveset_edit_user_profile_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    /*
    'idm_waveset_home_page_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset home page URL'),
      '#description' => t('IDM Waveset home page URL configuration.'),
      '#default_value' => variable_get('idm_waveset_home_page_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    'idm_waveset_support_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset support URL'),
      '#description' => t('IDM Waveset support URL configuration.'),
      '#default_value' => variable_get('idm_waveset_support_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),
    */
    /* 'idm_waveset_download_all_employees_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset download all employees URL'),
      '#description' => t('IDM Waveset download all employees URL configuration.'),
      '#default_value' => variable_get('idm_waveset_download_all_employees_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),*/
    /*'idm_waveset_download_mygroups_url' => array (
      '#type' => 'textfield',
      '#title' => t('IDM Waveset download mygroups URL'),
      '#description' => t('IDM Waveset download mygroups URL configuration.'),
      '#default_value' => variable_get('idm_waveset_download_mygroups_url','https://sso.stg.inbcu.com/nbcucentral/app/pwchange.jsp'),
      '#required' => TRUE,
    ),*/
    );
  return system_settings_form($form);
}

?>
