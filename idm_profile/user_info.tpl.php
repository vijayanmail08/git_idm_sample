<?php
  global $user;
?>

  <div class="user-info">
  <div class="basic-profile">
  <?php if (!empty ($info['buttons_flag']) && $info['buttons_flag'] == 'contractor') {?>
    <div class="profile-actions-mobile">
      <ul>
        <li class="transfer"><a href="/mobile-transfer/<?php print isset($info['sso'])? $info['sso']:""; ?>"><button class="small_button hover-blue">Transfer</button></a></li>
        <li class="renew"><a href="/mobile-renew/<?php print isset($info['sso'])? $info['sso']:""; ?>"><button class="small_button hover-blue">Set Expiration</button></a></li>
        <li class="delete"><a href="/mobile-terminate/<?php print isset($info['sso'])? $info['sso']:""; ?>"><button class="small_button hover-blue">Delete</button></a></li>
        <li class="revoke"><a href="/mobile-revoke/<?php print isset($info['sso'])? $info['sso']:""; ?>"><button class="small_button hover-blue">Revoke</button></a></li>
      </ul>
    </div>
  <?php } ?>
    <span class="profile-pic">
      <?php echo $info['profile_image']['profile_main'];?>
    </span>
    <div class="basic-info <?php print isset($info['usertype'])? $info['usertype']:"None";?>">
      <span class="display-name"><?php print $info['displayname']; ?></span>
      <span class="others">
        <span class="label">Job Title</span><span class="profile-text"><?php print isset($info['title'])? $info['title']:"None"; ?></span>
        <span class="label">Organization</span><span class="profile-text"><?php print isset($info['company'])? $info['company']:"None"; ?></span>
        <span class="label">SSO</span> <span class="profile-text"><?php print isset($info['sso'])? $info['sso']:"None"; ?></span>
        <?php if (!empty ($info['buttons_flag']) && $info['buttons_flag'] == 'profile') {?>
					<div class="edit-profile"><a id="edit-profile" href="/edit-user"><button onclick="window.location=this.parentNode.href;" class="edit-button hover-blue small_button" >Edit Profile</button></a></div>
        <?php } ?>
      </span>
    </div>
    <?php if (!empty ($info['buttons_flag']) && $info['buttons_flag'] == 'contractor') {?>
      <div class="profile-actions" userType="<?php print isset($info['usertype'])? $info['usertype']:"None";?>">
        <ul class="main-actions">
          <li><a href="/edit-user/<?php print isset($info['sso'])? $info['sso']:""; ?>"> <button class="small_button hover-blue"  onclick="window.location=this.parentNode.href;">Edit</button></a></li>
          <li><button class="small_button hover-blue" id="transfer-alert">Transfer</button></li>
          <li><button class="small_button hover-blue" id="renew-alert">Renew</button></li>
          <li><button class="small_button hover-blue" id="terminate-alert">Terminate</button></li>
          <?php
			if(in_array('Employee', $user->roles)) {
          ?>
          <li><button class="small_button hover-blue" id="revoke-alert">Revoke</button></li>
          <?php
		  }
          ?>
        </ul>
		<div id="transferalert" class="transfer-alert alert-actions">
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
		<div id="renewalert" class="renew-alert alert-actions">
		<?php $date = empty($info['enddate']) ? time() : strtotime($info['enddate']); ?>
			<ul userid="<?php print isset($info['sso'])? $info['sso']:""; ?>" enddate="<?php print isset($info['enddate'])? $info['enddate']:""; ?>">
				<li>
					<input type="radio" name="renew" value="1" class="styled form-radio"/><span class="duration">1 month(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
				</li>
				<li>
					<input type="radio" name="renew" value="3" class="styled form-radio"/><span class="duration">3 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
				</li>
				<li>
					<input type="radio" name="renew" value="6" class="styled form-radio"/><span class="duration">6 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
				</li>
			</ul>
			<div class="actions">
				<button class="small_button hover-blue disabled_button submit">Submit</button>
			</div>
			<div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
		</div>
		<div id="terminatealert" class="terminate-alert alert-actions">
			<div class="alert-icon-message">
				<div class="icon-terminate_alert_icon"></div>
				<div class="message">Are you sure you want to terminate this contractor?</div>
			</div>
			<div class="actions" userid="<?php print isset($info['sso'])? $info['sso']:""; ?>">
				<button class="small_button hover-blue submit">Terminate</button>
				<button class="small_button hover-grey cancel">Cancel</button>
			</div>
			<div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
		</div>
		<div id="revokealert" class="revoke-alert alert-actions">
			<div class="alert-icon-message">
				<div class="icon-revoke_alert_icon"></div>
				<div class="message">Are you sure you want to revoke this contractor?</div>
			</div>
			<div class="actions" userid="<?php print isset($info['sso'])? $info['sso']:""; ?>">
				<button class="small_button hover-blue submit">Revoke</button>
				<button class="small_button hover-grey cancel">Cancel</button>
			</div>
			<div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
		</div>
      </div>
    <?php } ?>

  </div>
  <div class="contact-info other-info">
    <span class="header-label"><h3>Contact Information</h3></span>
    <div class="other-info-details">
      <span class="label">Preferred Name</span><span class="profile-text"><?php print !empty($info['preferred_name'])? $info['preferred_name']:"None"; ?></span>
	  <span class="label">Legal Name</span><span class="profile-text"><?php print isset($info['legal_name'])? $info['legal_name']:"None"; ?></span>
      <?php if (isset($info['email']['work'])): ?>
       <span class="label">Email</span><span class="profile-text"><a class="email" href="mailto:<?php print $info['email']['work'] ?>"><?php print $info['email']['work']; ?></a></span>
      <?php else: ?>
        <span class="label">Email</span><span class="profile-text">None</span>
      <?php endif; ?>
      <span class="label">Business Phone</span><span class="profile-text"><?php print isset($info['phone']['work'])? $info['phone']['work']:"None"; ?></span>
      <span class="label">Mobile Phone</span><span class="profile-text"><?php print isset($info['phone']['mobile'])? $info['phone']['mobile']:"None"; ?></span>
      <span class="label">Fax</span><span class="profile-text"><?php print isset($info['phone']['fax'])? $info['phone']['fax']:"None"; ?></span>
      <span class="label">Address</span>
      <?php
      if(isset($info['address']['work'])):
      	if (!empty($info['address']['work']['streetaddress2'])):
      ?>
      	<span class="profile-text-address">
      		<?php print "<span>".$info['address']['work']['streetaddress'].'<br>'.$info['address']['work']['streetaddress2'].'<br>'.$info['address']['work']['city'].", ".$info['address']['work']['state']." ".$info['address']['work']['zip']."</span>"; ?>
      	</span>
      <?php
        else:
	  ?>
      	<span class="profile-text-address">
      		<?php print "<span>".$info['address']['work']['streetaddress'].'<br>'.$info['address']['work']['city'].", ".$info['address']['work']['state']." ".$info['address']['work']['zip']."</span>"; ?>
      	</span>
      <?php
        endif;
      else:
      ?>
      <span class="profile-text">None</span>
      <?php
      endif;
      ?>
      <span class="label">Work Location</span><span class="profile-text"><?php print (!empty($info['location']['work']['building'])) ? "<span>".$info['location']['work']['building']. "</span>" : " " ; ?>
      <?php print (!empty($info['location']['work']['floor'])) ? "<br><span>".$info['location']['work']['floor'].",</span>" : "<br>"  ; ?>
      <?php print (!empty($info['location']['work']['station'])) ? "<span>".$info['location']['work']['station']."</span>" : " " ; ?> </span>
      <span class="label">Personal Email</span><span class="profile-text"><?php print isset($info['vendor_email'])? $info['vendor_email']:"None"; ?></span>
      <?php if ($info['usertype'] != 'employee') { ?>
      <span class="label">Company</span><span class="profile-text"><?php print isset($info['custom_company'])? $info['custom_company']:"None"; ?></span>
      <?php } ?>
    </div>
  </div>
  <div class="job-info other-info">
    <span class="header-label"><h3>Job Information</h3></span>
    <div class="other-info-details">
      <span class="label">Start Date</span><span class="profile-text"><?php print isset($info['startdate'])? $info['startdate']:"None"; ?></span>
      <?php if ($info['usertype'] != 'employee') { ?>
        <span class="label">Expiration Date</span><span class="profile-text"><?php print isset($info['enddate'])? $info['enddate']:"None"; ?></span>
      <?php } ?>
      <span class="label">Supervisor</span><span class="profile-text"><?php print isset($info['managerfullname'])?$info['managerfullname']:"None"; ?></span>
	  <span class="label">Organization</span><span class="profile-text"><?php print isset($info['company'])?$info['company']:"None"; ?></span>
      <span class="label">Sub Business</span><span class="profile-text"><?php print isset($info['sub_business'])? $info['sub_business'] : "None"; ?></span>
    </div>
  </div>
 <!-- <div class="finacial-info other-info">
    <span class="header-label"><h3>Financial Information</h3></span>
    <div class="other-info-details">
       <span class="label">MFC</span><span class="profile-text"><?php // print isset($info['finance']['mfc'])? $info['finance']['mfc']  :"None"; ?></span>
       <span class="label">WBSE</span><span class="profile-text"><?php //print isset($info['finance']['wbse'])? $info['finance']['wbse']  :"None"; ?></span>
       <span class="label">Internal Order</span><span class="profile-text"><?php //print isset($info['finance']['internalorder'])? $info['finance']['internalorder']:"None"; ?></span>
       <span class="label">Currency</span><span class="profile-text"><?php //print isset($info['finance']['currency'])? $info['finance']['currency']:"None"; ?></span>
       <span class="label label-hierarchy">Hierarchy of Company Code</span><span class="profile-text"><?php //print isset($info['finance']['company'])? $info['finance']['company']:"None"; ?></span>
    </div>
  </div>-->
  </div>
