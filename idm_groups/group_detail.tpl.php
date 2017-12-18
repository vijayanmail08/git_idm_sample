 <?php
 $gid = arg(1); $download_link = "/download_group_members/".$variables['group_info']['id'];
 ?>
 <div class="group-info">
  <div class="group-breadcrum">
  <a href="/groups">Groups</a> > <?php print isset($variables['group_info']['title']) ? $variables['group_info']['title'] : "None";?>
  </div>
  <div class="group-summary">
    <div class="group-title"><?php print isset($variables['group_info']['title']) ? wordwrap($variables['group_info']['title'],30,"<br>\n") : "None";?></div>
    <div class="group-desc"><?php print isset($variables['group_info']['description']) ? $variables['group_info']['description'] : "None";?></div>
    <div class="membercount">
		<div class="icon-lock_icon icon"></div><div class="group-membercount"><?php print isset($variables['group_member_count']) ? $variables['group_member_count'].ngettext(' Member', ' Members', $variables['group_member_count']) : "None";?></div>
    </div>
  </div>
  <div class="group-actions" gname="<?php print isset($variables['group_info']['title']) ? $variables['group_info']['title'] : "";?>" gid="<?php print isset($variables['group_info']['id']) ? $variables['group_info']['id'] : "";?>" gtype="<?php print isset($variables['group_info']['type']) ? $variables['group_info']['type'] : "";?>">
    <ul class="main-actions">
      <?php if(isset($variables['manager_flag'])): ?>
      <li><button class="small_button hover-blue" id="edit-group">Edit</button></a></li>
      <?php else: ?>
      <!-- <li><button class="small_button hover-blue" id="edit-group"></button></a></li> -->
      <?php endif; ?>
      <!--<li><button class="small_button hover-blue" id="transfer-group">Transfer</button></li>
      <li><button class="small_button hover-blue" id="renew-group">Renew</button></li>
      <li><button class="small_button hover-blue" id="terminate-group">Terminate</button></li>-->
      <?php if($variables['group_info']['is_member']): ?>
        <li><button class="small_button hover-blue desktop-leave-group" id="leave-group">Leave</button></li>
		<li><button class="small_button hover-blue mobile-leave-group" id="leave-group">Leave</button></li>
      <?php else: ?>
        <li><button class="small_button hover-blue desktop-join-group" id="join-group">Join</button></li>
        <li><button class="small_button hover-blue mobile-join-group" id="join-group">Join</button></li>
     <?php endif; ?>
    </ul>
    <div id="grouprenew" class="renew-group alert-actions">
      <ul>
        <li>
          <input type="radio" name="renew" value="6" class="styled form-radio"/><span class="duration">6 month(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
        </li>
        <li>
          <input type="radio" name="renew" value="12" class="styled form-radio"/><span class="duration">12 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+12 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+12 month")); ?></span>)</span>
        </li>
        <li>
          <input type="radio" name="renew" value="18" class="styled form-radio"/><span class="duration">18 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+18 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+18 month")); ?></span>)</span>
        </li>
      </ul>
      <div class="actions">
        <button class="small_button hover-blue disabled_button submit">Submit</button>
      </div>
      <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
    </div>
    <div id="grouptransfer" class="transfer-group alert-actions">
      <div class="transfer-to">
        <label>Transfer to</label>
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
    <div id="groupterminate" class="terminate-group alert-actions">
      <div class="alert-icon-message">
        <div class="icon-terminate_alert_icon"></div>
        <div class="message">Are you sure you want to terminate this group?</div>
      </div>
      <div class="actions">
        <button class="small_button hover-blue submit">Terminate</button>
        <button class="small_button hover-grey cancel">Cancel</button>
      </div>
      <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
    </div>
    <div id="groupleave" class="leave-group alert-actions">
      <div class="alert-icon-message">
        <div class="icon-terminate_alert_icon"></div>
        <div class="message">Are you sure you want to leave this group?</div>
      </div>
      <div class="actions">
        <button class="small_button hover-blue submit">Leave</button>
        <button class="small_button hover-grey cancel">Cancel</button>
      </div>
      <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
    </div>
    <div class="ajax_throbber" id="join-loader"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
  </div>
  <div class="group-details">
    <div class="header-title"><h3>Contact Information</h3></div>
    <div class="email"><span class="label">Email</span><span class="value"><a class="group_email" href="mailto:<?php print isset($variables['group_info']['email']['primary']) ? $variables['group_info']['email']['primary'] : ''; ?>"><?php print isset($variables['group_info']['email']['primary']) ? $variables['group_info']['email']['primary'] : '' ; ?></a></span></div>
	<div class="id"><span class="label">ID</span><span class="value"><?php print isset($variables['group_info']['id'])? $variables['group_info']['id']:"None"; ?></span></div>
	<!-- <div class="business"><span class="label">Business</span><span class="value"></span></div> -->
	<div class="createdby"><span class="label">Created By</span><span class="value">
	<?php 
	  print '<div class="creator-sso"><img src="/sites/all/themes/idmtheme/images/outline-person-icon.svg"> <a href="/profile/'.$variables['group_info']['group_creator_sso'].'" target="_blank">'.$variables['group_info']['group_creator_preferredname_display'].'</a></div>';
	?></span></div>
	<div class="createdon"><span class="label">Created</span><span class="value"><?php print isset($variables['group_info']['groupcreatedon'])? $variables['group_info']['groupcreatedon']:"None"; ?></span></div>
	<div class="expires"><span class="label">Expires</span><span class="value"><?php print isset($variables['group_info']['expirationdate'])? $variables['group_info']['expirationdate']:"Never"; ?></span></div>
	<!-- <div class="comments-textarea"><span class="label">Comments</span><span class="value">
	  <label for="comments"><?php print isset($variables['group_info']['comments'])? ucfirst(wordwrap($variables['group_info']['comments'],30,"<br>\n")):"None"; ?></label></span>
	</div> -->
  </div>

  <!-- <div class="group-privacy">
    <div class="header-title"><h3>Privacy</h3></div>
    <div class="privacy"><span class="label">Privacy</span><span class="value"><?php print isset($variables['group_info']['membershippolicy'])? ucfirst($variables['group_info']['membershippolicy']):"None"; ?></span></div>
    <div class="restrictions"><span class="label">Delivery Restrictions</span>
    <span class="value">
    <?php
      if (!empty($variables['group_info']['group_allowedtosend'])) {
        foreach ($variables['group_info']['group_allowedtosend'] as $key => $value) {
          if (!empty($value['first_name']) || !empty($value['last_name'])){
            print '<div class="mgr-name"><div class="mgr-icon"><a href="/profile/'.$value['allowedtosend_sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg"></a></div><div class="mgr-link"><a href="/profile/'.$value['allowedtosend_sso'].'" target="_blank">'.$value['display_name'].'</a></div></div>';
          }
        }
        foreach ($variables['group_info']['group_allowedtosend'] as $key => $value) {
          if(!empty($value['allowedtosend_group_email']) && !empty($value['allowedtosend_display'])){
            print '<div class="mgr-name"><div class="mgr-icon"><a href="/group/DST/'.$value['allowedtosend_sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/asseticon.jpg"></a></div><div class="mgr-link"><a href="/group/DST/'.$value['allowedtosend_sso'].'" target="_blank"> '.$value['allowedtosend_display'].' ('.$value['allowedtosend_group_email'].')</a></div></div>';
          }
        }
      }
    ?>
    </span></div>
  </div> -->
  <div class="group-manager">
    <div class="header-title"><h3>Managers<span class="manager-count"> (<?php print isset($variables['group_mgr_count']) ? $variables['group_mgr_count'] : "0";?>) </span></h3>
      <!--<div id="group-add-manager" class="group-add">+</div>-->
    </div>
    <div id="addgroupmanager" class="group-add-manager alert-actions">
      <div class="transfer-to">
        <label>Add Manager</label>
      </div>
      <div class="manager-unknown">
        <input type="checkbox">
        <div class="checkbox-row"></div>
        <span>Manager Unknown</span>
      </div>
      <div class="actions">
        <button class="small_button hover-blue disabled_button submit">Add</button>
        <button class="small_button hover-grey cancel">Cancel</button>
      </div>
    </div>
    <div class="manager"><!-- <span class="label"></span> --><span class="value">
    <?php
      foreach ($variables['group_info']['group_managers'] as $key => $value) {
        if (!empty($value['firstname']) || !empty($value['lastname'])){
          if($value['primary']) {
            print isset($value['manager_sso']) ? '<div class="primary-mgr-name"><div class="primary-mgr-icon"><a style="font-weight:bold;" href="/profile/'.$value['manager_sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/outline-person-icon.svg"></a></div><div class="primary-mgr-link"><a style="font-weight:bold;" href="/profile/'.$value['manager_sso'].'" target="_blank">'.$value['preferredname_display'].'</a></div></div><!--<div class="group-delete">-</div>-->':'';
          } else {
            print isset($value['manager_sso']) ? '<div class="primary-mgr-name"><div class="primary-mgr-icon"><a href="/profile/'.$value['manager_sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg"></a></div><div class="primary-mgr-link"><a href="/profile/'.$value['manager_sso'].'" target="_blank"> '.$value['preferredname_display'].'</a></div></div><!--<div class="group-delete">-</div>-->':'';
          }
        } else if(!empty($value['email']) && !empty($value['display'])) {
            if($value['primary']) {
		            print isset($value['display'])? '<div class="primary-grp-name"><div class="primary-grp-icon"><a href="/group/DST/'.$value['manager_sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/asseticon.jpg"></a></div><div class="primary-grp-link"><a style="font-weight:bold;" href="/group/DST/'.$value['manager_sso'].'" target="_blank"> '.$value['display'].' ('.$value['email'].')</a></div></div><!--<div class="group-delete">-</div>-->':'';
            } else {
               print isset($value['display'])? '<div class="primary-grp-name"><div class="primary-grp-icon"><a href="/group/DST/'.$value['manager_sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/asseticon.jpg"></a></div><div class="primary-grp-link"><a href="/group/DST/'.$value['manager_sso'].'" target="_blank"> '.$value['display'].' ('.$value['email'].')</a></div></div><!--<div class="group-delete">-</div>-->':'';
            }
	    }
      }
    ?></span>
    </div>
  </div>
  <div class="group-members">
    <div class="header-title"><h3>Members (<span class="member-count"><?php print isset($variables['group_member_count']) ? $variables['group_member_count'] : "0";?></span>)</h3>
      <!--<div id="group-add-member" class="group-add">+</div>-->
    </div>
    <div id="addgroupmember" class="group-add-member alert actions">
      <div class="transfer-to">
        <label>Add Member</label>
      </div>
      <div class="member-unknown">
        <input type="checkbox">
        <div class="checkbox-row"></div>
        <span>Member Unknown</span>
      </div>
      <div class="actions">
        <button class="small_button hover-blue disabled_button submit">Add</button>
        <button class="small_button hover-grey cancel">Cancel</button>
      </div>
    </div>
    <div class="member"><div class="download-members" <?php if($variables['group_member_count'] > 0) {?> style="display: block;" <?php } else {?> style="display: none;" <?php } ?>><a href="<?php print $download_link; ?>"><input type="button" class="desktop-downloadmember" id="download-group" value="Download Members"></a></div><!-- <span class="label"></span> --><span class="value">
    <?php
      foreach ($variables['group_info']['group_members'] as $key => $value) {
        if (!empty($value['first_name']) || !empty($value['last_name'])){
            print isset($value['sso']) ? '<div class="member-name" id="rj-sso-'.$value['sso'].'"><div class="member-icon"><a href="/profile/'.$value['sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/solid-person-icon.svg"></a></div><div class="member-link"><a href="/profile/'.$value['sso'].'" target="_blank"> '.$value['display_name'].'</a></div></div><!--<div class="group-delete">-</div>-->':'';
        }else {
          print '';
        }
      }
	   foreach ($variables['group_info']['group_members'] as $key => $value) {
         if(!empty($value['members_group_email']) && !empty($value['members_display'])){
		   print isset($value['members_display'])? '<div class="member-name" id="rj-sso-'.$value['sso'].'"><div class="member-icon"><a href="/group/DST/'.$value['sso'].'" target="_blank"><img src="/sites/all/themes/idmtheme/images/asseticon.jpg"></a></div><div class="member-link"><a href="/group/DST/'.$value['sso'].'" target="_blank"> '.$value['members_display'].' ('.$value['members_group_email'].')</a></div></div><!--<div class="group-delete">-</div>-->':'';
	     }else {
		    print '';
	     }
	   }
    ?>
	</span>
	<div class="logged-in-sso" id="<?php print isset($variables['logged_in_sso']) ? $variables['logged_in_sso'] : "";?>"></div>
	<div class="logged-in-display" id="<?php print isset($variables['logged_in_display']) ? $variables['logged_in_display'] : "None";?>"></div>
    </div>
  </div>
</div>
