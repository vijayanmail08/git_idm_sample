<?php
  $mygroups_class = 'hover-green';
  $mymemberships_class = '';
?>

<div class="list">
	<div id="sticky-header" class="sticky-header">
  <div class="operations">
		<div class="check-all hover-purple">
			<input type="checkbox" />
			<div class="checkbox"></div>
			<div class="desc check-all-arrow"></div>
			<div class="check-all-options small_button hover-purple">
				<div class="check-options-all">All</div>
				<div class="check-options-none">None</div>
			</div>
		</div>
		<div class="actions four_operations">
			<ul>
        <li><button class="small_button hover-blue disabled-button" id="edit">Edit</button></li>
				<li><button class="small_button hover-blue disabled-button" id="transfer">Transfer</button></li>
				<li><button class="small_button hover-blue disabled-button" id="renew">Renew</button></li>
				<li><button class="small_button hover-blue disabled-button" id="terminate">Terminate</button></li>
			</ul>
		<div id="transfer-alert" class="transfer-alert alert-actions">
			<div class="transfer-to">
			  <label>Transfer to</label>
				<?php print !empty($variables['group_manager_lookup_field']) ? $variables['group_manager_lookup_field'] : ""; ?>
			</div>
			<div class="manager-unknown">
			  <!--input type="checkbox">
			  <div class="checkbox-row"></div>
			  <span>Manager Unknown</span-->
			</div>
			<div class="actions">
			  <button class="small_button hover-blue disabled_button submit">Transfer</button>
			  <button class="small_button hover-grey cancel">Cancel</button>
			</div>
			  <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
		</div>

	  <div id="renew-alert-all" class="renew-alert-all alert-actions">
				<ul>
					<li>
						<input type="radio" name="renew" value="6" class="styled form-radio"/><span class="duration">6 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
					</li>
					<li>
						<input type="radio" name="renew" value="12" class="styled form-radio"/><span class="duration">12 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+12 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+12 month")); ?></span>)</span>
					</li>
					<li>
						<input type="radio" name="renew" value="18" class="styled form-radio"/><span class="duration">18 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+18 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+18 month")); ?></span>)</span>
					</li>
				</ul>
				<div class="actions">
					<button class="small_button hover-blue disabled_button submit">Submit</button>
					<button class="small_button hover-grey cancel">Cancel</button>
				</div>
				<div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
			</div>

		<div id="terminate-alert" class="terminate-alert alert-actions">
				<div class="alert-icon-message">
					<div class="icon-terminate_alert_icon"></div>
					<div class="message">Are you sure you want to terminate these group(s)?</div>
				</div>
				<div class="actions" id="confirm">
					<button class="small_button hover-blue submit">Terminate</button>
					<button class="small_button hover-grey cancel">Cancel</button>
				</div>
		  <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
			</div>

		</div>
		<div class="download">
			<a href="/download_group/mygroups"><div class="download_button hover-blue small_button">
				<div class="download-icon"></div>
			</div></a>
		</div>
		<div class="search_bar groups">
			<?php print !empty($variables['group_search_field']) ? $variables['group_search_field'] : ""; ?>
			<div class="search_button hover-blue">
				<div class="search-icon"></div>
			</div>
		</div>
		<div class="icon-search_icon"></div>
		<div class="add-group hover-green desktop_icon">
		  <a href="/create/group">
			<div class="sprites-icon-plus"></div>
			<span class="desktop_text">Add group</span>
		  </a>
		</div>
	</div>

    <div class="list-tabs">
      <ul>
        <li id="my_groups_tab" class= <?php print $mygroups_class ?> >
          <a href="#" class="active" onclick="get_my_groups();return false;">
            <div class="primary">
              <div class="secondary">My Groups<span>(<?php echo $mygroups_count; ?>)</span></div>
            </div>
          </a>
        </li>
        <li id="my_memberships_tab" class= <?php print $mymemberships_class ?> >
          <a href="#" onclick="get_my_memberships();return false;">
            <div class="primary">
              <div class="secondary">My Memberships<span>(<?php echo $mymemberships_count; ?>)</span></div>
            </div>
          </a>
        </li>
      </ul>

      <div class="mobile-contractor hover-green">
	      <a href="/create/group">
          <div class="icon-plus_icon"></div>
	      </a>
      </div>
     </div> <!-- Sticky headers -->
   </div>
	 <div class="styled-select">
	      <select id="mobile-groups-page-options" class="mobile-groups-page-options">
	        <!-- <option value="all">All Groups</option> -->
	        <option value="my_groups" selected="selected">My Groups</option>
	        <option value="my_memberships">My Memberships</option>
	      </select>
   </div>

	<div class="main-content header-row">
	  <div class="group-content header-row-content <?php echo "list-".$variables['filterby'];?>">
      <ul class="header">
         <li id="header-cols" class="row">
           <div class="cell group_check"></div>
           <div class="cell group_name">
             <h3 class="col">Name & Description</h3><div class="sort-order"><div class="desc active"></div></div>
           </div><div class="cell group_members">
             <h3 class="col">Members</h3><div class="sort-order"><div class="asc"></div></div>
           </div><div class="cell group_mgr">
             <h3 class="col">Manager</h3><div class="sort-order"><div class="asc"></div></div>
           </div><div class="cell group_exp">
            <h3 class="col">Expiration</h3><div class="sort-order"><div class=""></div></div>
           </div>
         </li>
       </ul>
     </div>
    </div>

	<div class="main-content data-row">
	  <div class="group-content data-row-content <?php echo "list-".$variables['filterby'];?>">
      <ul class="content">
        <?php foreach($variables['group'] as $key=>$value) { /*echo '<pre>'; print_r($value); exit;*/
              if (is_numeric($key)) {
        ?>
        <li class = "data_row row">
          <div  class = "cell group_check">
            <div class="inner-cell">
            <?php if($value['checkboxflag'] == '1') { ?>
            <div class=""></div>
            <?php } else { ?>
            <div class="checkbox-row"></div>
            <?php } ?>
            <input type="checkbox" class="check-row"/>
            <div class="icon-<?php echo $value['status'];?>_icon icon"></div>
          </div>
          </div><div  class = "group_name cell">
            <div class="inner-cell">
            <label><a href="/group/<?php print $value['type']; ?>/<?php if(isset($value['id'])) { print $value['id'];} ?>"><?php if(isset($value['name'])) { print str_replace('@','',wordwrap($value['name'],25,"<br>\n"));} ?></a></label>
            <p class="group"><?php if(isset($value['description'])) { print $value['description'];} ?></p>
          </div>
        </div><div class = "group_members cell" style="border-right: medium none;">
            <div class="inner-cell">
            <div class="icon-<?php echo $value['status'];?>_icon icon"></div>
            <p class = "group normal" ><?php if(isset($value['memberscount'])) { print $value['memberscount'];} ?> Members</p>
          </div>
          </div><div class = "group_mgr cell" >
            <div class="inner-cell">
            <?php if ($value['manager'] == 'none') { ?>
              <p class = "group normal" style="color:#818181;" >
              <?php if(isset($value['manager'])) { print $value['manager'];} ?>
              </p>
            <?php } else {
              $pos_g = strpos($value['manager_sso'], 'g');
              if ($pos_g !== false) { //group case ?>
                <p class = "group normal" >
                <a target="_blank" href="group/DLG/<?php if(isset($value['manager_sso'])) { print $value['manager_sso'];} ?>"><?php if(isset($value['manager'])) { print $value['manager'];} ?></a>
                </p>
              <?php } else { //user case ?>
                <p class = "group normal" >
                <a target="_blank" href="profile/<?php if(isset($value['manager_sso'])) { print $value['manager_sso'];} ?>"><?php if(isset($value['manager'])) { print $value['manager'];} ?></a>
                </p>
              <?php } }?>
          </div>
          </div><div class="cell group_exp">
            <div class="inner-cell">
            <?php if($filterby != 'mymemberships'): ?>  
              <p class="group mobile-exp normal">Exp: </p>
              <p class="group mobile-exp-date normal <?php if(isset($value['expirationdate']) && $value['expirationdate'] == 'Never') { print 'never';} else { ?>error <?php } ?>"><?php if(isset($value['expirationdate'])) { print $value['expirationdate'];} ?></p>
            <?php endif; ?>
            <p class = "group desktop-exp-date normal <?php if(isset($value['expirationdate']) && $value['expirationdate'] == 'Never') { print 'never';} else { ?>error <?php } ?>" ><?php if(isset($value['expirationdate'])) { print $value['expirationdate'];} ?></p>
            <div class="small_button" text_id="<?php if(isset($value['buttontext'])) { print $value['buttontext'] ;}?>"><?php if(isset($value['buttontext'])) { print $value['buttontext'] ;}?></div>
            <div id="groupleave" class="leave-group alert-actions" style="display:none;">
            <div class="alert-icon-message">
            <div class="icon-terminate_alert_icon"></div>
            <div class="message">Are you sure you want to leave this group?</div>
            </div>
            <div class="actions">
            <button class="small_button hover-blue submit">Leave</button>
            <button class="small_button hover-grey cancel">Cancel</button>
            </div>
            </div>
            <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
            <div class="group_sso" style="display:none;" gname="<?php if(isset($value['name'])) { print $value['name'] ;} ?>" gid="<?php if(isset($value['id'])) { print $value['id'] ;} ?>"  gtype="<?php if(isset($value['type'])) { print $value['type'] ;} else { print 'DST';} ?>"></div>
            </div>
          </div>
        </li>
        <?php }} ?>
      </ul>
    </div>
  </div>

</div>
<div class="clr"></div>
