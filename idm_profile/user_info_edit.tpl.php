<?php
  global $user;
  ?>
  <div class="user-info">
  <div class="basic-profile">
    <span class="profile-pic">
      <?php echo $info['profile_image']['profile_main'];?>
    </span>
    <div class="basic-info">
      <span class="display-name"><?php print $info->displayName; ?></span>
      <span class="others">
        <span class="label">Job Title</span><span class="profile-text">Creative Director</span>
        <span class="label">Organization</span><span class="profile-text">NBC Universal</span>
        <span class="label">SSO</span> <span class="profile-text"><?php print $info->userName; ?></span>
      </span>
    </div>
    <input type="submit" id="save-profile" value="Save" class="save-button">
    <input type="submit" id="cancel-profile" value="Cancel" class="cancel-button">
  </div>
  <div class="contact-info other-info">
    <span class="header-label"><h3>Contact Information</h3></span>
    <div class="other-info-details">
      <span class="label">Email</span><span class="profile-text"><a class="email" href="mailto:<?php print $info->emails[0]->value; ?>"><?php print $info->emails[0]->value; ?></a></span>
      <span class="label">Business Phone</span><span class="profile-text"><input type="text" id="phone" value="<?php print isset($info->phoneNumbers)? $info->phoneNumbers[0]->value:"None"; ?>"></span>
      <span class="label">Mobile</span><span class="profile-text"><input type="text" id="mobile" value="<?php print isset($info->mobile)? $info->mobile->value:"None"; ?>"></span>
      <span class="label">Address</span><span class="profile-text"><?php print isset($info->addresses)? $info->addresses[0]->streetAddress."<br>".$info->addresses[0]->locality." ".$info->addresses[0]->region." ".$info->addresses[0]->postalCode:"None"; ?></span>
      <span class="label">Work Location</span><span class="profile-text"><input type="text" id="mobile" value="<?php print isset($info->location)? $info->location->value:"None";?>"></span>
      <span class="label">Fax</span><span class="profile-text"><input type="text" id="mobile" value="<?php print isset($info->fax)? $info->phone->fax:"None"; ?>"></span>
      <span class="label">Personal Email:</span><span class="profile-text"><input type="text" id="mobile" value="<?php print isset($info->emails[1])? $info->emails[1]->value:"None"; ?>"></span>
    </div>
  </div>
  <div class="job-info other-info">
    <span class="header-label"><h3>Job Information</h3></span>
    <div class="other-info-details">
      <span class="label">Start Date</span><span class="profile-text"><?php print isset($info->mfc)? $info->mobile->value:"None"; ?></span>
      <span class="label">Supervisor</span><span class="profile-text"><?php print isset($info->managerfullname)?$info->managerfullname:"None"; ?></span>
      <span class="label">HR Manager</span><span class="profile-text"><?php print isset($info->mobile)? $info->mobile->value:"None"; ?></span>
    </div>
  </div>
  <div class="finacial-info other-info">
    <span class="header-label"><h3>Financial Information</h3></span>
    <div class="other-info-details">
       <span class="label">MFC</span><span class="profile-text"><?php print isset($info->mfc)? $info->mobile->value:"None"; ?></span>
       <span class="label">WBSE</span><span class="profile-text"><?php print isset($info->mobile)? $info->mobile->value:"None"; ?></span>
       <span class="label">Internal Order</span><span class="profile-text"><?php print isset($info->mobile)? $info->mobile->value:"None"; ?></span>
       <span class="label">Currency</span><span class="profile-text"><?php print isset($info->mobile)? $info->mobile->value:"None"; ?></span>
       <span class="label label-hierarchy">Hierarchy of Company Code</span><span class="profile-text"><?php print isset($info->mobile)? $info->mobile->value:"None"; ?></span>
    </div>
  </div>
  </div>

