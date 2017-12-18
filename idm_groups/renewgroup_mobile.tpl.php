<?php
//echo '<pre>';
//print_r($groupinfo);
?>

<div id="mobile-renew-group" class="mobile-group-profile mobile-renew-group">
<div class="basic-profile">
	<!-- <div class="profile-actions" userType="<?php print isset($groupinfo['type'])? $groupinfo['type']:"None";?>"> -->
  <div class="profile-actions">
	<div class="renew-alert alert-actions">
	<?php $date = empty($groupinfo['enddate']) ? time() : strtotime($groupinfo['enddate']); ?>
		<!-- <ul userid=<?php print isset($groupinfo['sso'])? $groupinfo['sso']:"None";?> enddate="<?php print isset($groupinfo['enddate'])? $groupinfo['enddate']:""; ?>"> -->
    <ul>
			<li>
				<input type="radio" name="renew" value="1" required /><span class="duration">1 month ( <span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span> )</span>
			</li>
			<li>
				<input type="radio" name="renew" value="3" required /><span class="duration">3 months ( <span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span> )</span>
			</li>
			<li>
				<input type="radio" name="renew" value="6" required /><span class="duration">6 months ( <span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span> )</span>
			</li>
		</ul>
		<div class="actions">
			<input type="submit" class="small_button hover-blue submit" value="Submit" />
			<input type="button" class="small_button hover-grey cancel" value="Cancel" onclick="window.history.go(-1)"/>
		</div>
		<div class="ajax_throbber" style="display:none;"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
	</div>
	</div>
	</div>
  <input id="gid" type="hidden" value="<?php print $groupinfo['id'];?>" name="gid">
  <input id="gtype" type="hidden" value="<?php print isset($groupinfo['type'])? $groupinfo['type']:'DST';?>" name="gtype">
</div>
