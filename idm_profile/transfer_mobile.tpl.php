<div id="mobile-transfer-employee" class="user-info mobile-employee-profile">
    <div class="basic-profile">
        <div class="profile-actions" userType="<?php print isset($info['usertype'])? $info['usertype']:"None";?>">
            <div class="transfer-alert alert-actions">
                <div class="transfer-to">
                    <label>Transfer to</label>
                    <?php /*<input type="text" placeholder="Manager Name" manager_id="501517319" manager_name="Pradeep Venugopal" userid="<?php print isset($info['sso'])? $info['sso']:""; ?>"/> */ ?>
                    <?php print $manager_lookup_field; ?>
                </div>
                <div class="manager-unknown">
                    <input type="checkbox">
                    <div class="checkbox-row"></div>
                    <span>Manager Unknown</span>
                </div>
                <div class="actions">
                    <button class="small_button hover-blue disabled_button submit">Transfer</button>
                    <button onclick="window.history.go(-1)" class="small_button hover-grey cancel">Cancel</button>
                </div>
				<div class="ajax_throbber" style="display:none"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
            </div>
        </div>
    </div>
</div>