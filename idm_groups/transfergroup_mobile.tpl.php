<?php
//echo '<pre>';
//print_r($groupinfo);
//print_r($groupinfo['group_managers'][0]);
//print $groupinfo['group_managers'][0]['preferredname_display'];
?>
<div id="mobile-transfer-group" class="mobile-group-profile mobile-transfer-group">
    <div class="basic-profile">
        <!-- <div class="profile-actions" userType="<?php print isset($info['usertype'])? $info['usertype']:"None";?>"> -->
		<div class="profile-actions">
            <div class="transfer-group transfer-alert alert-actions">
                <div class="transfer-to">
                    <label>Transfer to</label>
                    <?php /*<input type="text" placeholder="Manager Name" manager_id="501517319" manager_name="Pradeep Venugopal" userid="<?php print isset($info['sso'])? $info['sso']:""; ?>"/> */ ?>
                    <?php print $manager_lookup_field; ?>
                </div>
                <input id="edit-groupmanager" type="hidden" value="<?php print $groupinfo['group_managers'][0]['preferredname_display'].' ('.$groupinfo['group_managers'][0]['manager_sso'].') ';?>">
                <!-- <div class="manager-unknown">
                    <input type="checkbox">
                    <div class="checkbox-row"></div>
                    <span>Manager Unknown</span>
                </div> -->
                <div class="actions">
                  <input type="button" id="transfer-group-submit" class="small_button hover-blue disabled_button submit" value="Transfer">
                  <input type="button" id="transfer-group-cancel" class="small_button hover-grey cancel" value="Cancel">
                  <!-- <button id="transfer-group-submit" class="small_button hover-blue disabled_button submit">Transfer</button>
                  <button id="transfer-group-cancel" onclick="window.history.go(-1)" class="small_button hover-grey cancel">Cancel</button> -->
                </div>
				<div class="ajax_throbber" style="display:none"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
            </div>
        </div>
    </div>
	<input id="gid" type="hidden" value="<?php print $groupinfo['id'];?>" name="gid">
	<input id="gtype" type="hidden" value="<?php print isset($groupinfo['type'])? $groupinfo['type']:'DST';?>" name="gtype">
</div>