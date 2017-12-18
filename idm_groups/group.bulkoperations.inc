<?php
  DEFINE("MESSAGING_ADMINISTRATOR", "Messaging Administrator");
  DEFINE("DEFAULT_GROUP_PREFIX", "@");
  DEFINE('ADD', 'add');
  DEFINE('MODIFY', 'modify');
  DEFINE('DELETE', 'delete');

  function idm_groups_bulk_operations_form(){
    $operations = array(
      'members' => t('Add/remove members'),
      'owners' => t('Add/remove managers'),
      'allowedtosend' => t('Add/remove delivery restriction list'),
      'alternateemails' => t('Add/remove alternate emails'),
      'manage_groups' => t('Add/update/remove groups')
    );
    drupal_static('operations', $operations);

    $form['bulkop'] =  array(
      '#type' => 'fieldset',
    );
    $form['bulkop']['title'] = array(
      '#markup' => 'Group Bulk Operations',
      '#prefix' => '<div class="title"><h2>',
      '#suffix' => '</h2></div>'
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
      //'#suffix' => '</div>'
    );
    $form['bulkop']['submit'] = array (
      '#type' => 'submit',
      '#value' => t('Submit'),
      '#attributes' => array('class' => array('small_button hover-blue')),
      '#prefix' => '<div class="domain-submit-buttons" >',
    );
    return $form;
  }

  function idm_groups_bulk_operations_form_validate($form, &$form_state){
    $errors = array();
    $op_success = FALSE;
    $operations = drupal_static('operations');
    drupal_static('group_types', array("Distribution" => "DST", "Delegation" => "DLG"));
    $service_url = variable_get('rest_api_check_url').'/internal/groups/bulkOp';
    $action = $form_state['values']['operation'];

    foreach($_FILES['files']['name'] AS $op => $upload){
      if(!empty($upload)){
        $file = file_save_upload($op, array('file_validate_extensions' => array('csv')));
        if ($file) {
          if ($file = file_move($file, 'public://bulk-upload/')) {
            $errors[$action] = array();
            if($action != 'manage_groups'){
              $request = idm_groups_bulk_operations_prepare_list_request($file, $errors[$action], $action);
            }else{
              idm_groups_bulk_operations_manage_groups($file);
              file_delete($file);
              return;
            }
            if(!$request){
              $error_message = implode("<br>", $errors[$action]);
              form_set_error($op, filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.$error_message, $allowed_tags = array('img')));
			  //form_set_error($op, $error_message);
            }else{
              $response = idm_profile_execute_curl($service_url, json_encode($request), 'PUT');
              $results = json_decode($response);
              foreach($results->results AS $result){
                if($result->op_status == 'success'){
                  $op_success = TRUE;
                  drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.ucfirst($operations[$action]).' operation successfull for the group ID '.$result->id.'<br>', $allowed_tags = array('img')));
				  //drupal_set_message(ucfirst($operations[$action]).' operation successfull for the group ID '.$result->id.'<br>');
                  ctools_object_cache_clear('api', 'group_info_'.$result->id);
                }elseif(!empty($result->errorMessage)){
                  drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.ucfirst($operations[$action]).' operation failed for the group ID '.$result->id.'. The error is "'.$result->errorMessage.'"<br>', 'error', $allowed_tags = array('img')));
				  //drupal_set_message(ucfirst($operations[$action]).' operation failed for the group ID '.$result->id.'. The error is "'.$result->errorMessage.'"<br>', 'error');
                }
              }
              /*drupal_set_message('REQUEST<pre>' . print_r(json_encode($request), TRUE) . '</pre>');
              drupal_set_message('RESULT<pre>' . print_r($response, TRUE) . '</pre>');*/
            }
            file_delete($file);
            if($op_success && ($action == 'members' || $action == 'owners')){
              ctools_object_cache_clear('api', 'group_data_mygroups');
              ctools_object_cache_clear('api', 'group_data_mymemberships');
            }
          }else{
            form_set_error($op, '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('Failed to write the uploaded file the site\'s file folder.'));
			//form_set_error($op, t('Failed to write the uploaded file the site\'s file folder.'));
          }
        }else{
          form_set_error($op, '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('No file was uploaded.'));
		  //form_set_error($op, t('No file was uploaded.'));
        }
      }else{
        form_set_error($op, '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('No file was uploaded.'));
		//form_set_error($op, t('No file was uploaded.'));
      }
    }
  }

  function idm_groups_bulk_operations_prepare_list_request($file, &$errors, $action){
    global $user;
    $required_column_headers = array(
      'members' => array('allowed_texts' => array('Member', 'Members'), 'type' => 'alphanumeric'),
      'owners' => array('allowed_texts' => array('Manager', 'Managers'), 'type' => 'alphanumeric'),
      'allowedtosend' => array('allowed_texts' => array('DeliveryRestriction', 'DeliveryRestrictions'), 'type' => 'alphanumeric'),
      'alternateemails' => array('allowed_texts' => array('Alternate Email', 'Alternate Emails'), 'type' => 'email')
    );
    if(($file_handle = fopen($file->uri, 'r')) !== FALSE){
      $row = 0;
      $request = $resources = $members = array();
      $request['requestor'] = $user->name;
      $request['role'] = MESSAGING_ADMINISTRATOR;
      $request['resources'] = array();
      while(($data = fgetcsv($file_handle, 1000, ",")) !== FALSE){
        if($row != 0){
          $gid_key = FALSE;
          foreach($data AS $key => $value){
            if(empty($value)){
              $errors[] = t("The $headers[$key] is empty in the row $row");
            }
          }

          $resources['type'] = "DST";
          $group_id_hkey = isset($flipped_headers['GROUPID']) ? $flipped_headers['GROUPID'] : $flipped_headers['Groupid'];
          $resources['id'] = $data[$group_id_hkey];
          $required_column = $required_column_headers[$action]['allowed_texts'];
          $allowed_value_type = $required_column_headers[$action]['type'];

          if(!idm_groups_bulk_operations_validate_group_id($resources['id'])){
            $errors[] = t("Invalid value entered for Group ID in row $row");
          }
          if(empty($flipped_headers[$required_column[0]])){
            if(empty($flipped_headers[$required_column[1]])){
              $errors[] = t("Couldn't find the required column '$required_column[0]' or '$required_column[1]' in the csv");
              return FALSE;
            }else{
              $required_column = $required_column[1];
            }
          }else{
            $required_column = $required_column[0];
          }
          $resource_id = $data[$flipped_headers[$required_column]];

          if($allowed_value_type == 'email'){
            if(idm_groups_bulk_operations_validate_email($resource_id)){
               $members['value'] = $resource_id;
            }else{
              $errors[] = t("Invalid email entered for $required_column in row $row");
            }
          }elseif($allowed_value_type == 'integer' || $allowed_value_type == 'alphanumeric'){
            if((strpos($resource_id, 'g')) === 0 && $allowed_value_type == 'alphanumeric'){
              if(idm_groups_bulk_operations_validate_group_id($resource_id)){
                $members['value'] = "cn=".$resource_id.",ou=Groups,dc=tfayd,dc=com";
              }else{
                $errors[] = t("Invalid group id entered for $required_column in row $row");
              }
            }else{
              if(idm_groups_bulk_operations_validate_sso($resource_id)){
                $members['value'] = "uid=".$resource_id.",ou=worker,dc=tfayd,dc=com";
              }else{
                $errors[] = t("Invalid sso entered for $required_column in row $row");
              }
            }
          }
          $members['op'] = strtolower($data[$flipped_headers['Operation']]);
          //Find the same groups
          foreach($request['resources'] AS $rkey => $resource){
            if($resource['id'] == $data[$group_id_hkey]){
              $gid_key = $rkey;
              break;
            }
          }
          if($gid_key === FALSE){
            $new_element_key = count($request['resources']);
            $request['resources'][$new_element_key] = $resources;
            $request['resources'][$new_element_key][$action][]= $members;
          }else{
            $request['resources'][$gid_key][$action][] = $members;
          }
        }else{
          $headers = $data;
          $flipped_headers = array_flip($headers);
        }
        $row++;
      }
    }
    return (empty($errors)) ? $request : FALSE;
  }

  function idm_groups_bulk_operations_manage_groups($file){
    global $user;
    $request = array();
    $create_success = $update_success = $delete_success = FALSE;

    if(($file_handle = fopen($file->uri, 'r')) !== FALSE){
      $row = 0;
      $create_request["resources"] = $delete_request["resources"] = $update_request["resources"] = array();
      $basic_request['requestor'] = $user->name;
      $basic_request['role'] = MESSAGING_ADMINISTRATOR;
      while(($data = fgetcsv($file_handle, 1000, ",")) !== FALSE){
       if($row++ == 0){
         $headers = array_flip($data);
       }
       $operation = strtolower($data[1]);
       switch($operation){
         case ADD:
          $create_request["resources"][] = idm_groups_bulk_operations_create($data, $headers);
          break;
         case MODIFY:
          $update_request["resources"][] = idm_groups_bulk_operations_update($data, $headers, $row);
          break;
         case DELETE:
           $delete_request["resources"][] = idm_groups_bulk_operations_delete($data, $headers);
          break;
       }
      }
    }
    if(!empty($create_request["resources"])){
      $create_success = idm_groups_bulk_operations_call_api(array_merge($basic_request, $create_request), ADD);
    }
    if(!empty($update_request["resources"])){
      $update_success = idm_groups_bulk_operations_call_api(array_merge($basic_request, $update_request), MODIFY);
    }
    if(!empty($delete_request["resources"])){
      $delete_success = idm_groups_bulk_operations_call_api(array_merge($basic_request, $delete_request), DELETE);
    }
    if($create_success || $update_success){
      ctools_object_cache_clear('api', 'group_data_mygroups');
      ctools_object_cache_clear('api', 'group_data_mymemberships');
    }
  }

  function idm_groups_bulk_operations_call_api($request, $operation){
    $status = FALSE;
    if(!empty($request)){
      $service_url = variable_get('rest_api_check_url');
      $service_url .= ($operation == ADD) ? '/internal/groups/create/bulkOp' :  '/internal/groups/bulkOp';
      $method = ($operation == ADD) ? 'POST' : ($operation == MODIFY ? 'PUT' : 'DELETE');
      $response = idm_profile_execute_curl($service_url, json_encode($request), $method);
      $results = json_decode($response);
      foreach($results->results AS $result){
        if($result->op_status == 'success'){
          $status = TRUE;
          drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.ucfirst($operation).' operation successful for the group ID '.$result->id.'<br>', $allowed_tags = array('img')));
		  //drupal_set_message(ucfirst($operation).' operation successful for the group ID '.$result->id.'<br>');
          if($operation != ADD){
            ctools_object_cache_clear('api', 'group_info_'.$result->id);
          }
          if($operation == DELETE){
            idm_groups_clear_group_data_cache($result->id);
          }
        }elseif(!empty($result->errorMessage)){
          drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.ucfirst($operation).' operation failed for the group ID '.$result->id.'. The error is "'.$result->errorMessage.'"<br>', 'error', $allowed_tags = array('img')));
		  //drupal_set_message(ucfirst($operation).' operation failed for the group ID '.$result->id.'. The error is "'.$result->errorMessage.'"<br>', 'error');
        }elseif($result->op_status = 'error' && !empty($result->message)){
          $message = '';
          if(is_array($result->message)) {
            foreach($result->message as $key => $value) {
              if($message == ''){
                $message = $value;
              }
              else {
                $message = $message.'<br>'.$value;
              }
            }
          }
          else {
            $message = $result->message;
          }
          drupal_set_message(filter_xss('<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.ucfirst($operation).' operation failed. The error is "'.$message.'"<br>', 'error', $allowed_tags = array('img')));
		  //drupal_set_message(ucfirst($operation).' operation failed. The error is "'.$message.'"<br>', 'error');
        }
      }
      /*drupal_set_message('URL ' . $service_url . '</br>');
      drupal_set_message('REQUEST<pre>' . print_r(json_encode($request), TRUE) . '</pre>');
      drupal_set_message('<br>RESULT<pre>' . print_r($response, TRUE) . '</pre><br>');*/
    }
    return $status;
  }

  function idm_groups_bulk_operations_create($data, $headers){
    $group_types = drupal_static('group_types');
    //$request["displayName"] = DEFAULT_GROUP_PREFIX.' '.$data[$headers["DisplayName"]];
    $pos = strpos($data[$headers["DisplayName"]], DEFAULT_GROUP_PREFIX);
	if ($pos !== false) {
		$request["displayName"] = $data[$headers["DisplayName"]];
	} else {
		$request["displayName"] = DEFAULT_GROUP_PREFIX.' '.$data[$headers["DisplayName"]];
	}
    $request["description"] = $data[$headers["Description"]];
    $request["emails"][] = array("type" => "primary", "value" => $data[$headers["SMTPAddress"]]);
    if($data[$headers["SecondarySMTP"]]) {
      $request["alternateemails"] = idm_groups_bulk_operations_get_alternate_emails($data[$headers["SecondarySMTP"]]);
    }
    $request["owners"][] = array("primary" => "true", "value" => "uid=".$data[$headers["PrimaryManager"]].",ou=worker,dc=tfayd,dc=com");
    $request["hidemembership"] = $data[$headers["HideMembership"]];
    $request["membershippolicy"] = (strtolower($request["hidemembership"]) == "true") ? "private" : "public";
    $request["expiration"] = $data[$headers["GroupExpiration"]];
    if($request["expiration"] != 'FALSE'){
      $request["expirationdate"] = date('d-M-Y', strtotime($data[$headers["GroupExpirationDate"]]));
    }
    $request["type"] = $group_types[ucfirst($data[$headers["GroupType"]])];
    $request["securitygroup"] = $data[$headers["SecurityGroup"]];
    $request["comments"] = $data[$headers["Comments"]];
    $request["ou"] = "ou=groups,dc=tfayd,dc=com";
    $request["orgsegmentid"] = "60000008";
    $request["organizationid"] = "604200011";
    return $request;
  }

  function idm_groups_bulk_operations_update($data, $headers, $row){
    $group_types = drupal_static('group_types');

    $request['type'] =  !empty($data[$headers["GroupType"]]) ? $group_types[ucfirst($data[$headers["GroupType"]])] : "DST";
    if(!empty($data[$headers["Groupid"]])){
      $request["id"] = $data[$headers["Groupid"]];
    }else{
      form_set_error('manage_groups', '<img width="20" src="/sites/all/themes/idmtheme/images/close_red.png">'.t('Group id is missing for update in the row '.$row));
	  //form_set_error('manage_groups', t('Group id is missing for update in the row '.$row));
    }
    if(!empty($data[$headers["DisplayName"]])){
    //  $request["displayName"] = DEFAULT_GROUP_PREFIX.' '.$data[$headers["DisplayName"]];
	    $pos = strpos($data[$headers["DisplayName"]], DEFAULT_GROUP_PREFIX);
		if ($pos !== false) {
			$request["displayName"] = $data[$headers["DisplayName"]];
		} else {
			$request["displayName"] = DEFAULT_GROUP_PREFIX.' '.$data[$headers["DisplayName"]];
		}
    }
    if(!empty($headers["Description"])){
      $request["description"] = $data[$headers["Description"]];
    }
    if(!empty($data[$headers["SMTPAddress"]])){
      $request["emails"][] = array("type" => "primary", "value" => $data[$headers["SMTPAddress"]]);
    }
    if(!empty($data[$headers["SecondarySMTP"]])){
      $request["alternateemails"] = idm_groups_bulk_operations_get_alternate_emails($data[$headers["SecondarySMTP"]]);
    }
    if(!empty($data[$headers["PrimaryManager"]])){
      $request["owners"][] = array("primary" => "true", "value" => "uid=".$data[$headers["PrimaryManager"]].",ou=worker,dc=tfayd,dc=com");
    }
    if(!empty($data[$headers["HideMembership"]])){
      $request["hidemembership"] = $data[$headers["HideMembership"]];
    }
    if(!empty($request["hidemembership"])){
      $request["membershippolicy"] = (strtolower($request["hidemembership"]) == "true") ? "private" : "public";
    }
    if(!empty($data[$headers["GroupExpirationDate"]])){
      $request["expirationdate"] = date('d-M-Y', strtotime($data[$headers["GroupExpirationDate"]]));
      $request["expiration"] = "TRUE";
    }else{
      if(!empty($data[$headers["GroupExpiration"]])){
        if($data[$headers["GroupExpiration"]] == "FALSE"){
          $request["expirationdate"] = "";
          $request["expiration"] = "FALSE";
        }
      }
    }
    if(!empty($data[$headers["SecurityGroup"]])){
      $request["securitygroup"] = $data[$headers["SecurityGroup"]];
    }
    if(!empty($data[$headers["Comments"]])){
      $request["comments"] = $data[$headers["Comments"]];
    }
    return $request;
  }

  function idm_groups_bulk_operations_delete($data, $headers){
    $group_types = drupal_static('group_types');
    $request['id'] = $data[$headers["Groupid"]];
    $request['type'] =  !empty($data[$headers["GroupType"]]) ? $group_types[ucfirst($data[$headers["GroupType"]])] : "DST";
    return $request;
  }

  function idm_groups_bulk_operations_get_alternate_emails($mail_list){
    $mails = explode(';', $mail_list);
    if(!empty($mails)){
      foreach($mails AS $mail){
        $alternate_emails[] = array("value" => $mail);
      }
    }else{
      $alternate_emails[] = array("value" => $mail_list);
    }
    return $alternate_emails;
  }

  function idm_groups_bulk_operations_validate_sso($sso){
    return preg_match('/[\d]{9}/',$sso);
  }

  function idm_groups_bulk_operations_validate_group_id($gid){
    return preg_match('/[g(r?)\d]{9}/',$gid);
  }

  function idm_groups_bulk_operations_validate_resource_id($resource_id){
    return (idm_groups_bulk_operations_validate_sso($resource_id) || idm_groups_bulk_operations_validate_group_id($resource_id));
  }

  function idm_groups_bulk_operations_validate_email($text){
    return preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $text);
  }

  /**
  *  Funtion to transfer bulk groups
  **/
  function idm_groups_bulk_transfer_group_all($groupidall='' , $managerid='') {
    global $user;
    $requestorid = empty($user->name) ? '' : $user->name;
    $url = variable_get('rest_api_check_url', 'http://3.3.175.127:8080/idm-api/rest');
    $url .= '/internal/groups/bulkOp';
    $group = new stdClass();
    $group->requestor = $requestorid;
    if (in_array('Messaging Administrator', $user->roles)) {
      $group->role = 'Messaging Administrator';
    }
    $user->resources = array();
    $each_resource = array();
    $var = array();
    $i = 0;
    $groupidallArray = array();
    $groupidallArray = explode(",",$groupidall);
    foreach($groupidallArray as $groupid){
      $each_resource['type'] = 'DST';
      $each_resource['id'] = $groupid;
      $each_resource['owners'][0]['value'] = 'uid='. $managerid.',ou=worker,dc=tfayd,dc=com';
      $each_resource['owners'][0]['op'] = 'add';
      $each_resource['owners'][0]['primary'] = 'true';
      $var[$i] = $each_resource;
      $i++;
    }
    $group->resources = $var;
    $group_json = json_encode($group);
    $method = 'PUT';
    $result = idm_profile_execute_curl($url, $group_json, $method);
    $result_json = json_decode($result);
    $each_failure_status = array();
    $each_success_status = array();
    $j = 0;
    for($j=0;$j<$i;$j++) {
      if(!empty($result_json->results[$j]->errorMessage)) {
      $each_failure_status[$j] = $result_json->results[$j]->errorMessage.' '.$result_json->results[$j]->id;
      }
      if($result_json->results[$j]->op_status == SUCCESS) {
      $each_success_status[$j] = $result_json->results[$j]->op_status.' '.$result_json->results[$j]->id;
      ctools_object_cache_clear('api', 'group_info_'.$results[$j]->id);
      idm_groups_clear_group_data_cache($gid);
      }
    }
    $each_failure_status_msg = implode('<br>',$each_failure_status);
    $each_success_status_msg = implode('<br>',$each_success_status);
    print $each_failure_status_msg.'<br>'.$each_success_status_msg;
    ctools_object_cache_clear('api', 'group_data_mygroups');
    ctools_object_cache_clear('api', 'group_data_mymemberships');
  }

  /**
  *  Funtion to renew bulk groups
  **/
  function idm_groups_bulk_renew_group_all($groupidall='' , $duration='') {
    global $user;
    $requestorid = empty($user->name) ? '' : $user->name;
    $url = variable_get('rest_api_check_url', 'http://3.3.175.127:8080/idm-api/rest');
    $url .= '/internal/groups/bulkOp';
    $group = new stdClass();
    $group->requestor = $requestorid;
    if (in_array('Messaging Administrator', $user->roles)) {
      $group->role = 'Messaging Administrator';
    }
    $user->resources = array();
    $each_resource = array();
    $var = array();
    $i = 0;
    $groupidallArray = array();
    $groupidallArray = explode(",",$groupidall);
     foreach($groupidallArray as $groupid){
      //$user_info = _idm_profile_get_user($userid);
        $group_info = _idm_groups_get_group_info($gtype = 'DST',$groupid);
    //  $initial_end_date = strtotime(empty($group_info['expirationdate']) ? '' : $group_info['expirationdate']);
    //  if($initial_end_date){
        $end_date = date("d-M-Y", idm_portal_strtotime("+".$duration." month"));
        /**TODO - Remove the type once the dependency is removed from the API **/
        $each_resource['type'] = $group_info['type'];
        $each_resource['id'] = $groupid;
        $each_resource['expirationdate'] = $end_date;
        $each_resource['expiration'] = "TRUE";
        $var[$i] = $each_resource;
        $i++;
    //  }
    }
    $group->resources = $var;
    $group_json = json_encode($group);
    $method = 'PUT';
    $result = idm_profile_execute_curl($url, $group_json, $method);
    $result_json = json_decode($result);
    $each_failure_status = array();
    $each_success_status = array();
    $j = 0;
    for($j=0;$j<$i;$j++) {
      if(!empty($result_json->results[$j]->errorMessage)) {
      $each_failure_status[$j] = $result_json->results[$j]->errorMessage.' '.$result_json->results[$j]->id;
      }
      if($result_json->results[$j]->op_status == SUCCESS) {
      $each_success_status[$j] = $result_json->results[$j]->op_status.' '.$result_json->results[$j]->id;
      }
    }
    $each_failure_status_msg = implode('<br>',$each_failure_status);
    $each_success_status_msg = implode('<br>',$each_success_status);
    print $each_failure_status_msg.'<br>'.$each_success_status_msg;
    ctools_object_cache_clear('api', 'group_data_mygroups');
    ctools_object_cache_clear('api', 'group_data_mymemberships');
    ctools_object_cache_clear('api', 'expiringgroups_count');
    ctools_object_cache_clear('api', 'group_data_expiringgroups');
  }

  /**
  *  Funtion to terminate bulk groups
  **/
  function idm_groups_bulk_terminate_group_all($groupidall='') {
    global $user;
    $requestorid = empty($user->name) ? '' : $user->name;
    $url = variable_get('rest_api_check_url', 'http://3.3.175.127:8080/idm-api/rest');
    $url .= '/internal/groups/bulkOp';
    $group = new stdClass();
    $group->requestor = $requestorid;
    if (in_array('Messaging Administrator', $user->roles)) {
      $group->role = 'Messaging Administrator';
    }
    $user->resources = array();
    $each_resource = array();
    $var = array();
    $i = 0;
    $groupidallArray = array();
    $groupidallArray = explode(",",$groupidall);
     foreach($groupidallArray as $groupid){
        $each_resource['id'] = $groupid;
        $each_resource['type'] = 'DST';
        $var[$i] = $each_resource;
        $i++;
    }
    $group->resources = $var;
    $group_json = json_encode($group);
    $method = 'DELETE';
    $result = idm_profile_execute_curl($url, $group_json, $method);
    $result_json = json_decode($result);
    $each_failure_status = array();
    $each_success_status = array();
    $j = 0;
    for($j=0;$j<$i;$j++) {
      if(!empty($result_json->results[$j]->errorMessage)) {
      $each_failure_status[$j] = $result_json->results[$j]->errorMessage.' '.$result_json->results[$j]->id;
      }
      if($result_json->results[$j]->op_status == SUCCESS) {
      $each_success_status[$j] = $result_json->results[$j]->op_status.' '.$result_json->results[$j]->id;
      }
    }
    $each_failure_status_msg = implode('<br>',$each_failure_status);
    $each_success_status_msg = implode('<br>',$each_success_status);
    print $each_failure_status_msg.'<br>'.$each_success_status_msg;
    ctools_object_cache_clear('api', 'group_data_mygroups');
    ctools_object_cache_clear('api', 'group_data_mymemberships');
  }

  /**
 * Clear the data cached for a particular group
 * Useful for clearing the groups data for all logged in user who are related to a group being updated/deleted
 * @param type $gid
 */
  function idm_groups_clear_group_data_cache($gid){
   $no_rows_deleted = db_delete('ctools_object_cache')
       ->condition('obj', 'api')
       ->condition('data', '%'.db_like($gid).'%', 'LIKE')
       ->execute();
  }