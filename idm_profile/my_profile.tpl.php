<?php
  global $user;
  ?>

  <div class="myprofile-info">
  <div class="basic-myprofile-info profile-info">
     <span class="header-label">
		<h3>My Profile</h3>
		<?php if (!isset($_SESSION['legacy'])) { ?>
		<a href="/edit-user"><img style="" src="/sites/all/themes/idmtheme/images/header_edit_icon.png"></a>
		<?php } ?>
	 </span>
    <span class="profile-pic">
      <?php if(!isset($_SESSION['legacy'])) { ?>
      <a href="/profile"><?php echo $info['profile_image']['profile_sidebar'];?></a>
      <?php } else { ?>
      <?php echo $info['profile_image']['profile_sidebar'];?>
      <?php } ?>
    </span>
    <div class="basic-myprofile-details profile-info">
    <?php if(!isset($_SESSION['legacy'])) { ?>
      <span class="display-name"><a href="/profile"><?php print (isset($variables['info']['displayname'])) ? $variables['info']['displayname'] : 'None'; ?></a></span>
      <?php } else { ?>
      <span class="display-name"><?php print (isset($variables['info']['displayname'])) ? $variables['info']['displayname'] : 'None'; ?></span>
      <?php } ?>
      <span class="others">
        <span class="profile-text"><?php print (isset($variables['info']['title'])) ? $variables['info']['title'] : 'None'; ?></span>
        <span class="profile-text"><?php print (isset($variables['info']['company'])) ? $variables['info']['company'] : 'None'; ?></span>
        <span class="profile-text">SSO: <?php print (isset($variables['info']['sso'])) ? $variables['info']['sso'] : 'None'; ?></span>
      </span>
    </div>
  </div>
  <div class="myprofile-contact-info profile-info">
    <div class="other-myprofile-details">
      <span class="label">Email</span><span class="profile-text">
      <?php if (isset($variables['info']['email']['work'])): ?>
      	<a class="email" href="mailto:<?php print $variables['info']['email']['work']; ?>"><?php print $variables['info']['email']['work']; ?></a>
      <?php else: ?>
        None
      <?php endif; ?>
      </span>
      <span class="label">Business Phone</span><span class="profile-text myprofile-mobile"><?php print (isset($variables['info']['phone']['work'])) ? $variables['info']['phone']['work'] : 'None'; ?></span>
      <span class="label">Address</span>
      <?php
      if (isset($variables['info']['address']['work'])): 
        if (!empty($variables['info']['address']['work']['streetaddress2'])):?>
      <span class="profile-text myprofile-adress">
      	<?php print "<span>".$variables['info']['address']['work']['streetaddress']."</span><br><span>".$variables['info']['address']['work']['streetaddress2']."</span><br><span>".$variables['info']['address']['work']['city'].", ".$variables['info']['address']['work']['state']." ".$variables['info']['address']['work']['zip']."</span>";?>
      </span>
      <?php 
        else:
      ?>
      <span class="profile-text myprofile-adress">
      	<?php print "<span>".$variables['info']['address']['work']['streetaddress']."</span><br><span>".$variables['info']['address']['work']['city'].", ".$variables['info']['address']['work']['state']." ".$variables['info']['address']['work']['zip']."</span>";?>
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
      <?php print (!empty($info['location']['work']['station'])) ? "<span>".$info['location']['work']['station']."</span>" : " " ; ?></span>
    </div>
  </div>
  </div>
