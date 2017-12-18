<?php
	global $user;
	$profile_id = empty($user->name) ? '' : $user->name;
	$primary_manager_lookup_field = idm_profile_get_manager_lookup_field($profile_id, 'edit-transfer', 'autocomplete/groupmanager');
	$gid = arg(1); $download_link = "/download_group_members/".$gid;
?>
<div class="main-mobile-buttons">
	<div class="mobile-edit-actions">
		<input type="button" class="small_button hover-blue" id="transfer-group" value="Transfer" onclick="window.location='/mobile-transfergroup/DST/<?php echo $gid; ?>'">
		<input type="button" class="small_button hover-blue" id="renew-group" value="Renew" onclick="window.location='/mobile-renewgroup/DST/<?php echo $gid; ?>'">
		<input type="button" class="small_button hover-blue" id="terminate-group" value="Terminate" onclick="window.location='/mobile-terminategroup/DST/<?php echo $gid; ?>'">
	</div> 
</div>
<fieldset id="edit-group" class="group-info form-wrapper">
<div class="fieldset-wrapper">
  <div class="edit-group-actions">
    <?php print drupal_render($form['group']['title']);?>
    <div class="main-edit-actions">
      <div><input type="button" class="small_button hover-blue" id="renew-group" value="Renew"></div>
      <div><input type="button" class="small_button hover-blue" id="terminate-group" value="Terminate"></div>
      <div><input type="button" class="small_button hover-blue" id="transfer-group" value="Transfer"></div>
      <!--div><a href="<?php //print $download_link; ?>"><input type="button" class="" id="download-group" value="Download Members"></a></div-->
      <!-- <div class="download">
        <a href="<?php print $download_link; ?>">
          <div class="download_button hover-blue small_button">
            <div class="download-icon"></div>
          </div>
        </a>
      </div> -->
      <div class="group-actions">
        <div id="renewalert" class="renew-group renew-alert alert-actions">
          <ul>
            <li>
              <input type="radio" name="renew" value="6" class="styled form-radio"/><span class="duration">6 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
            </li>
            <li>
              <input type="radio" name="renew" value="12" class="styled form-radio"/><span class="duration">12 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+12 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+12 month")); ?></span>)</span>
            </li>
            <li>
              <input type="radio" name="renew" value="18" class="styled form-radio"/><span class="duration">18 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+18 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+18 month")); ?></span>)</span>
            </li>
          </ul>
          <div class="actions">
            <input type="button" id="renew-group-submit" class="small_button hover-blue disabled_button submit" value="Submit">

          </div>
          <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
        </div>
        <div id="terminatealert" class="terminate-group terminate-alert alert-actions">
          <div class="alert-icon-message">
            <div class="icon-terminate_alert_icon"></div>
            <div class="message">Are you sure you want to terminate this group?</div>
          </div>
          <div class="actions">
            <input type="button" id="terminate-group-submit" class="small_button hover-blue submit" value="Terminate">
            <input type="button" id="terminate-group-cancel" class="small_button hover-grey cancel" value="Cancel">
          </div>
          <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
        </div>
        <div id="transferalert" class="transfer-group transfer-alert alert-actions">
          <div class="transfer-to">
            <label>Transfer to</label>
            <?php
            print !empty($primary_manager_lookup_field) ? $primary_manager_lookup_field : ""; ?>
          </div>
          <div class="manager-unknown"></div>
          <div class="actions">
             <input type="button" id="transfer-group-submit" class="small_button hover-blue disabled_button submit" value="Transfer">
             <input type="button" id="transfer-group-cancel" class="small_button hover-grey cancel" value="Cancel">
          </div>
          <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
        </div>
      </div>
    </div>
  </div>
<?php
print drupal_render($form['group']['gid']);
print drupal_render($form['group']['gtype']);
?>
<div class="createfor hidden" style="display:none">
<?php
print drupal_render($form['group']['createfor']);
print drupal_render($form['group']['groupmanager']);
?>
</div>
<?php
print drupal_render($form['group']['displayname_parent']);
print drupal_render($form['group']['displayname']);
print drupal_render($form['group']['email']);
print drupal_render($form['group']['description']);
print drupal_render($form['group']['alternate_email_input']);
print drupal_render($form['group']['new_alternate_email']);
print drupal_render($form['group']['new_alternate_email_del']);
print drupal_render($form['group']['expiration_date']);
print drupal_render($form['group']['comments']);
?>
</div></fieldset>
<fieldset id="edit-privacy" class="privacy-info form-wrapper"><div class="fieldset-wrapper">
<?php
print drupal_render($form['privacy']['title']);
print drupal_render($form['privacy']['membership_types']);
print drupal_render($form['privacy']['hide_group_membership']);
print drupal_render($form['privacy']['hide_from_addresslists']);
print drupal_render($form['privacy']['delegation_group']);
print drupal_render($form['privacy']['restrictions']);
print drupal_render($form['privacy']['restrictions_hidden']);
print drupal_render($form['privacy']['restrictions_sso']);
print drupal_render($form['privacy']['restrictions_names']);
print drupal_render($form['privacy']['restrictions_sso_del']);
print drupal_render($form['privacy']['security_group']);
?>
</div></fieldset>
<fieldset id="edit-managers" class="manager-info form-wrapper"><div class="fieldset-wrapper">
<?php
print drupal_render($form['managers']['title']);
print drupal_render($form['managers']['primary_manager']);
print drupal_render($form['managers']['managers']);
print drupal_render($form['managers']['additional_managers_sso']);
print drupal_render($form['managers']['approver']);
print drupal_render($form['managers']['approvertime']);
print drupal_render($form['managers']['add_new_manager']);
print drupal_render($form['managers']['managers_hidden']);
print drupal_render($form['managers']['new_manager_sso']);
print drupal_render($form['managers']['new_manager_names']);
print drupal_render($form['managers']['new_manager_sso_del']);
print drupal_render($form['managers']['new_managers_count']);
?>
<span class="ajax_throbber" id="new_manager_ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></span>
<?php
print drupal_render($form['managers']['add_new_member']);
print drupal_render($form['managers']['members_hidden']);
print drupal_render($form['managers']['new_member_sso']);
print drupal_render($form['managers']['new_member_names']);
print drupal_render($form['managers']['new_member_sso_del']);
?>
<span class="ajax_throbber" id="new_member_ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></span>
<?php
print drupal_render($form['managers']['usertype']);
print drupal_render($form['managers']['submit']);
print drupal_render($form['managers']['cancel']);
print drupal_render($form['form_build_id']);
print drupal_render($form['form_token']);
print drupal_render($form['form_id']);

?>
</div></fieldset>
