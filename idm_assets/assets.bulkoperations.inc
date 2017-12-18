<?php
  DEFINE("MESSAGING_ADMINISTRATOR", "Messaging Administrator");
  DEFINE("DEFAULT_GROUP_PREFIX", "@");
  DEFINE('ADD', 'add');
  DEFINE('MODIFY', 'modify');
  DEFINE('DELETE', 'delete');

  function idm_assets_bulk_operations_form(){

   global $user;
   if (empty($userid)) {
    $userid = empty($user->name) ? '' : $user->name;
   }
   $userData = _idm_profile_get_user($userid);
   $userDataRoles = array();
   if(isset($userData['roles'])){
    foreach ($userData['roles'] as $key => $val) {
      $userDataRoles[] = $val->value;
    }
    if(in_array('Vroozi Administrator', $user->roles)) {
        $attribute = 'Vroozi Attribute';
    } else {
        $attribute = 'Wireless Attribute';
    }
   }

    $operations = array(
      'setvalues' => t('Set values'),
    );
    drupal_static('operations', $operations);

    $form['bulkop'] =  array(
      '#type' => 'fieldset',
    );
    $form['bulkop']['title'] = array(
      '#markup' => 'Bulk Wireless Attribute Process',
      '#prefix' => '<div class="title"><h2>',
      '#suffix' => '</h2></div>'
    );
    $form['bulkop']['attribute'] = array(
      '#type' => 'hidden',
      '#default_value' => $attribute,
      '#attributes' => array (
       'id' => 'attribute'
      ),
    );

    $form['bulkop']['operation'] = array(
      '#title' => t('Operation'),
      '#type' => 'select',
      '#options' => $operations,
      '#chosen' => true,
      '#required' => true
     );

    $form['bulkop']['upload'] = array(
      '#type' => 'file',
      '#title' => t('Select csv'),
      '#size' => 40,
      '#prefix' => '<span title="This field is required." class="form-required for-upload">*</span>',
    );
    $form['bulkop']['submit'] = array (
      '#type' => 'submit',
      '#value' => t('Submit'),
      '#attributes' => array('class' => array('small_button hover-blue')),
      '#prefix' => '<div class="domain-submit-buttons" >',
    );
  $form['bulkop']['cancel'] = array (
    '#type' => 'submit',
    '#value' => t('Cancel'),
    '#attributes' => array('class' => array('small_button hover-grey')),
    '#suffix' => '</div>',
  );
    return $form;
  }

  function idm_assets_bulk_operations_form_validate($form, &$form_state){
    $errors = array();
    $op_success = FALSE;
    $operations = drupal_static('operations');
    $service_url = variable_get('rest_api_check_url').'/workflow/request/bulkOp/WirelessApplicationRequest?requestor=206426150';
    $action = $form_state['values']['operation'];
    
    foreach($_FILES['files']['name'] AS $op => $upload){
      if(!empty($upload)){
      	$file = file_save_upload($op, array('file_validate_extensions' => array('csv')));
				if ($file) {
          if ($file = file_move($file, 'public://bulk-upload/')) {
            $errors[$action] = array();
            if($action != 'manage_groups'){
              $request = idm_assets_bulk_operations_prepare_list_request($file, $errors[$action], $action);
            } else {
              idm_assets_bulk_operations_manage_wireless($file);
              file_delete($file);
              return;
            }
            if(!$request){
              $error_message = implode("<br>", $errors[$action]);
              form_set_error($op, filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.$error_message, $allowed_tags = array('img','br')));
            }else{
              $response = idm_profile_execute_curl($service_url, json_encode($request), 'PUT');
              $results = json_decode($response);
              $custom_messages = array();
              foreach($results as $result){
			  $custom_messages[] = $result;
                if(isset($custom_messages[1]) == 'success'){
                  $op_success = TRUE;
                }elseif(!empty($result->errorMessage)){
                  drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.ucfirst($operations[$action]).' operation failed for the SSO '.$result->id.'. The error is "'.$result->errorMessage.'"<br>', 'error', $allowed_tags = array('img')));
                }
              }
            }
            file_delete($file);
          }else{
            form_set_error($op, '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('Failed to write the uploaded file the site\'s file folder.'));
          }
        }else{
          form_set_error($op, '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('No file was uploaded.'));
        }
      }else{
        form_set_error($op, '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('No file was uploaded.'));
      }
    }
  }

  function idm_assets_bulk_operations_prepare_list_request($file, &$errors, $action){
    global $user;
    $required_column_headers = array(
      'setvalues' => array('allowed_texts' => array('%USER_ID%'), 'type' => 'alphanumeric')
    );
    if(($file_handle = fopen($file->uri, 'r')) !== FALSE){
      $row = 0;
      $request = $resources = $users = array();
      $request['requestor'] = $user->name;
      $request['role'] = MESSAGING_ADMINISTRATOR;
      $request['resources'] = array();
      $create_request["resources"] = array();
      $attributes = array();
      
      while(($data = fgetcsv($file_handle, 1000, ",")) !== FALSE){
      	if($row != 0){
      	  $data = array_combine($headers, $data);
      	  foreach($data AS $key => $value){
      	  	if($key == '%USER_ID%') {
	            if(empty($value)){
	              $errors[] = t("The $key is empty in the row $row");
	            }
						}
						/*if($key == '%TELECOM_COMPANY_CODE%') {
	            if(!empty($value) && strlen($value)!=4){
	             $errors[] = t("The $key count less than or greater than four characters not allowed at row $row");
	            }
						}*/
          }      	  
      	  $attributes[] = idm_assets_bulk_operations_wireless_create($data, $headers);      	  
      	} else {
          $headers = $data;
      	}
       $row++;
      }
	 if (empty($errors)) {
	  $create_success = idm_assets_bulk_operations_call_api($attributes);
	 }
    }
    return (empty($errors)) ? $request : FALSE;
  }

  function idm_assets_bulk_operations_manage_wireless($file){
    global $user;
    $request = array();
    $create_success = $update_success = $delete_success = FALSE;

    if(($file_handle = fopen($file->uri, 'r')) !== FALSE){
      $row = 0;
      $create_request["resources"] = $delete_request["resources"] = $update_request["resources"] = array();
      $basic_request['requestor'] = $user->name;
      $basic_request['role'] = MESSAGING_ADMINISTRATOR;
      while(($data = fgetcsv($file_handle, 1000, ",")) !== FALSE){
      	if($row != 0){
      	} else {
       	    $headers = $data;       	    
       }
      $row++;       
      }
      die;
    }
    if(!empty($create_request["resources"])){
      $create_success = idm_groups_bulk_operations_call_api(array_merge($basic_request, $create_request), ADD);
    }
  }

  function idm_assets_bulk_operations_call_api($request){
    $status = FALSE;
    
    if(!empty($request)){      
	    global $user;
	    $requestorid = $user->name;
	    $request_info = new stdClass();
	    $wireless_info = array();
	    $service_url = variable_get('rest_api_check_url');
	    $service_url .= '/workflow/request/bulkOp/WirelessApplicationRequest?requestor='.$requestorid;
	    $method = 'PUT';
  
	  $request_info->schemas = array (
			'urn:scim:schemas:core:1.0'
	  );
	  $entitlements = new stdClass();
	  $attributes = array();
	  $key = 0;
	  foreach($request as $value) {
	  	$attributes[$key]['attributes'] = $value;
	  	$key++;
	  }
	  $request_info->id = $requestorid;
	  $request_info->applicationName = 'WirelessApplicationRequest';
	  $request_info->entitlements = $attributes;
	  $user_json = json_encode($request_info);
      $response = idm_profile_execute_curl($service_url, $user_json, $method);
      $results = json_decode($response);
	  $custom_message = array();
	 foreach($results as $result){
		$custom_message[] = $result;
        if(isset($custom_message[1]) == 'Success'){
          $status = TRUE;
		  if(isset($custom_message[2])){
		  $first_array = explode("[",$custom_message[2]);
		  }
		  if(isset($first_array[1])){
		  $second_array = explode("]",$first_array[1]);
		  }
		  if(isset($second_array[0])){
          $up_userids = str_replace('"','',$second_array[0]);
		  }

		  if(isset($up_userids)!=''){
          drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">Successfully updated following user ids '.$up_userids.'<br>', $allowed_tags = array('img')));
		  }
        } else if($custom_message[0]=='Unknown error occured in Wireless Updation'){
				 drupal_set_message(t('Unknown error occured in Wireless Updation'), 'error');
				}
      }
    }
    
    return $status;
  }

  function idm_assets_bulk_operations_wireless_create($data, $headers){
  	$key = 0;
	$wireless_info[$key]['type'] = 'userName';
	$wireless_info[$key++]['value'] = empty($data["%USER_ID%"]) ? '' : $data["%USER_ID%"];
	$wireless_info[$key]['type'] = 'custom_telecomaccountcode';
	$wireless_info[$key++]['value'] = empty($data["%TELECOM_ACCOUNT_CODE%"]) ? '' : $data["%TELECOM_ACCOUNT_CODE%"];
	$wireless_info[$key]['type'] = 'custom_telecomcompanycode';
	$wireless_info[$key++]['value'] = empty($data["%TELECOM_COMPANY_CODE%"]) ? '' : $data["%TELECOM_COMPANY_CODE%"];
	$wireless_info[$key]['type'] = 'custom_telecomcostcenter';
	$wireless_info[$key++]['value'] = empty($data["%TELECOM_COST_CENTER%"]) ? '' : $data["%TELECOM_COST_CENTER%"];
	$wireless_info[$key]['type'] = 'custom_telecominternalorder';
	$wireless_info[$key++]['value'] = empty($data["%TELECOM_INTERNAL_ORDER%"]) ? '' : $data["%TELECOM_INTERNAL_ORDER%"];
	$wireless_info[$key]['type'] = 'custom_telecomprofitcenter';
	$wireless_info[$key++]['value'] = empty($data["%TELECOM_PROFIT_CENTER%"]) ? '' : $data["%TELECOM_PROFIT_CENTER%"];
	$wireless_info[$key]['type'] = 'custom_telecomwbse';
	$wireless_info[$key++]['value'] = empty($data["%TELECOM_WBSE%"]) ? '' : $data["%TELECOM_WBSE%"];
    return $wireless_info;
  }