<?php
  global $user;
?>

  <div class="user-info">
  <div class="basic-profile">
  <?php if (!empty ($info['buttons_flag']) && $info['buttons_flag'] == 'functional') {?>
    <div class="profile-actions-mobile">
      <ul>
        <li class="transfer"><a href="/mobile-transfer"><button class="small_button hover-blue">Transfer</button></a></li>
		 <li class="delete"><button class="small_button hover-blue">Delete</button></li>
      </ul>
    </div>
  <?php } ?>
    <span class="profile-pic">
      <?php echo $info['profile_image']['profile_main'];?>
    </span>
    <div class="basic-info <?php print isset($info['usertype'])? $info['usertype']:"None";?>">
      <span class="display-name"><?php print $info['displayname']; ?></span>
      <span class="others">
 		<span class="label">SSO</span> <span class="profile-text"><?php print isset($info['sso'])? $info['sso']:"None"; ?></span>
		<span class="label">User Type</span> <span class="profile-text"><?php print isset($info['usertype'])? ucwords($info['usertype']):"None";?></span>
      </span>
    </div>
	<?php if (!empty ($info['buttons_flag']) && $info['buttons_flag'] == 'functional') {?>
      <div class="profile-actions" userType="<?php print isset($info['usertype'])? $info['usertype']:"None";?>" >
        <ul class="main-actions">
          <li><button class="small_button hover-blue" id="transfer-alert">Transfer</button></li>
          <li><button class="small_button hover-blue" id="terminate-alert">Terminate</button></li>
        </ul>
		<div class="transfer-alert alert-actions">
			<div class="transfer-to">
				<label>Transfer to</label>
          <?php print $manager_lookup_field; ?>
			</div>
			<div class="manager-unknown">
				<input type="checkbox">
				<div class="checkbox-row"></div>
				<span>Manager Unknown</span>
			</div>
			<div class="actions">
				<button class="small_button hover-blue disabled_button submit">Transfer</button>
				<button class="small_button hover-grey cancel">Cancel</button>
			</div>
      <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
		</div>
		<div class="terminate-alert alert-actions">
			<div class="alert-icon-message">
				<div class="icon-terminate_alert_icon"></div>
				<div class="message">Are you sure you want to terminate this functional account?</div>
			</div>
			<div class="actions" userid="<?php print isset($info['sso'])? $info['sso']:""; ?>">
				<button class="small_button hover-blue submit">Terminate</button>
				<button class="small_button hover-grey cancel">Cancel</button>
			</div>
      <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
		</div>
      </div>
    <?php } ?>

  <div class="contact-info other-info">
    <span class="header-label"><h3>Contact Information</h3></span>
    <div class="other-info-details">
      <?php if (isset($info['email']['work'])): ?>
       <span class="label">Email</span><span class="profile-text"><a class="email" href="mailto:<?php print $info['email']['work'] ?>"><?php print $info['email']['work']; ?></a></span>
      <?php else: ?>
        <span class="label">Email</span><span class="profile-text">None</span>
      <?php endif; ?>
      <span class="label">Business Phone</span><span class="profile-text"><?php print isset($info['phone']['work'])? $info['phone']['work']:"None"; ?></span>
      <span class="label">AMS ID</span><span class="profile-text"><?php print isset($info['amsapplicationId'])? $info['amsapplicationId']:"None"; ?></span>
      <span class="label">AMS Name</span><span class="profile-text"><?php print isset($info['amsapplicationName'])? $info['amsapplicationName']:"None"; ?></span>      
    </div>
  </div>
  <div class="job-info other-info">
    <span class="header-label"><h3>Job Information</h3></span>
    <div class="other-info-details">
      <span class="label">Start Date</span><span class="profile-text"><?php print isset($info['startdate'])? $info['startdate']:"None"; ?></span>
      <span class="label">End Date</span><span class="profile-text"><?php print isset($info['enddate'])?$info['enddate']:"None"; ?></span>
	  <span class="label">Supervisor/ Sponsor</span><span class="profile-text"><?php print isset($info['managerfullname'])?$info['managerfullname']:"None"; ?></span>
    </div>
  </div>
 </div>
</div>
