<div id="mobile-terminate-employee" class="user-info mobile-employee-profile">
    <div class="basic-profile">
        <div class="profile-actions" userType="<?php print isset($info['usertype'])? $info['usertype']:"None";?>">
			<div class="terminate-alert alert-actions">
				<div class="alert-icon-message">
					<div class="icon-terminate_alert_icon"></div>
					<div class="message">Are you sure you want to terminate this contractor?</div>
				</div>
				<div class="actions" userid="<?php print isset($info['sso'])? $info['sso']:""; ?>">
					<button class="small_button hover-blue submit">Terminate</button>
					<button class="small_button hover-grey cancel" onclick="window.history.go(-1)">Cancel</button>
				</div>
				<div class="ajax_throbber" style="display:none;"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
			</div>
		</div>
    </div>
</div>