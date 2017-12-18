<div id="mobile-leave-group" class="mobile-group-profile mobile-leave-group">
    <div class="basic-profile">
        <div class="profile-actions">
			<div class="leave-alert alert-actions">
				<div class="alert-icon-message">
					<!-- <div class="icon-leave_alert_icon"></div> -->
					<div class="message">Are you sure you want to leave this group?</div>
				</div>
				<div class="actions">
					<button class="small_button hover-blue submit">Leave</button>
					<button class="small_button hover-grey cancel" onclick="window.history.go(-1)">Cancel</button>
				</div>
				<div class="ajax_throbber" style="display:none;"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
			</div>
		</div>
    </div>
    <input id="gid" type="hidden" value="<?php print $groupinfo['id'];?>" name="gid">
    <input id="gtype" type="hidden" value="<?php print isset($groupinfo['type'])? $groupinfo['type']:'DST';?>" name="gtype">
</div>