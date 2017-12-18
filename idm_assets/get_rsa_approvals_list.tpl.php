<?php
  /*global $user;
  $contractor_class = '';
  $employee_class = '';
  $functional_class = '';
  $usertype_class = '';
  if(isset($_GET['userType']) && $_GET['userType'] == 'contractor' ) {
    $contractor_class = 'hover-green';
  }
  if(isset($_GET['userType']) && $_GET['userType'] == 'employee' ) {
    $employee_class = 'hover-green';
  }
  if(isset($_GET['userType']) && $_GET['userType'] == 'functional' ) {
    $functional_class = 'hover-green';
  }
  if(!isset($_GET['userType'])) {
    $usertype_class = 'hover-green';
  }*/
?>

<div class="list">
	<div id="sticky-header" class="sticky-header">
	<!--<div class="operations">
		<div class="check-all hover-purple">
			<input type="checkbox" />
			<div class="checkbox"></div>
			<div class="desc check-all-arrow"></div>
			<div class="check-all-options small_button hover-purple">
				<div class="check-options-all">All</div>
				<div class="check-options-none">None</div>
			</div>
		</div>
		<div class="actions">
		
		<div id="transfer-alert" class="transfer-alert alert-actions">
			<div class="transfer-to">
			  <label>Transfer to</label>
				<?php //print !empty($variables['manager_lookup_field']) ? $variables['manager_lookup_field'] : ""; ?>
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

	  <div id="renew-alert-all" class="renew-alert-all alert-actions">
				<ul>
					<li>
						<input type="radio" name="renew" value="1" class="styled form-radio"/><span class="duration">1 month (<span class="date" renew_date = "<?php //print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php //print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
					</li>
					<li>
						<input type="radio" name="renew" value="3" class="styled form-radio"/><span class="duration">3 months (<span class="date" renew_date = "<?php //print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php //print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
					</li>
					<li>
						<input type="radio" name="renew" value="6" class="styled form-radio"/><span class="duration">6 months (<span class="date" renew_date = "<?php //print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php //print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
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
					<div class="message">Are you sure you want to terminate these account(s)?</div>
				</div>
				<div class="actions" id="confirm">
					<button class="small_button hover-blue submit">Terminate</button>
					<button class="small_button hover-grey cancel">Cancel</button>
				</div>
		  <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
			</div>
		<div id="revoke-alert" class="revoke-alert alert-actions">
				<div class="alert-icon-message">
					<div class="icon-revoke_alert_icon"></div>
					<div class="message">Are you sure you want to revoke these account(s)?</div>
				</div>
				<div class="actions" id="confirm">
					<button class="small_button hover-blue submit">Revoke</button>
					<button class="small_button hover-grey cancel">Cancel</button>
				</div>
		  <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
			</div>

		</div>
		<div class="download">
			<a href="/download/all"><div class="download_button hover-blue small_button">
				<div class="download-icon"></div>
			</div></a>
		</div>

		<div class="add-contractor hover-green">
		  <a href="/create/contractor">
			<div class="sprites-icon-plus"></div>
			<span class="desktop_text"></span>
		  </a>
		</div>
	</div>-->

	<div class="main-content header-row">
	  <div class="emp-content header-row-content <?php echo "list-".$variables['filterby'];?>">
		<ul class="header">
			 <li id="header-cols" class="row">
				<!--<div class="cell employee_check"></div>--><div class="cell employee_sso">
					<h3 class="col">SSO</h3><h3 class="mobile">SSO</h3>
				 </div><div class="cell employee_name">
					 <h3 class="col">Request</h3><h3 class="mobile">Request</h3>
				 </div><div class="cell employee_job">
					 <h3 class="col">Requester</h3><h3 class="mobile">Requester</h3>
				 </div><div class="cell employee_company">
					 <h3 class="col">Date of Request</h3>
				 </div><div class="cell employee_exp">
					<h3 class="col">Description</h3><h3 class="mobile">Description</h3>
				 </div>
			 </li>
		 </ul>
	  </div>
	</div>
	</div>
	<div class="main-content  data-row">
	  <div class="emp-content   data-row-content <?php echo "list-".$variables['filterby'];?>">
		<ul class="content">
		<?php
		/*echo "<pre>";
		print_r($variables['rsa_approval']);
		exit;*/
		foreach($variables['rsa_approval'] as $key=>$value) {
			
			if(isset($value->identityName)!='') {
			
		if($value->workItemType=='skipLevelReview') {
			$navigation_url = "/rsa_vpnsupplier_approval/".$value->name;
			$navigation_title = $value->identityRequesterId." - VPN Supplier Request";
		}
		if($value->workItemType=='firstLevelApproval') {
			$navigation_url = "/rsa_manager_approval/".$value->name;
			$navigation_title = $value->identityRequesterId." - New Remote Access Creation Request";
		}
		//if($value->owner!='' && $value->requesterFromRSA!='') {
		?>
			<li class = "data_row row">
				<!--<div  class = "cell employee_check">
				  <div class="inner-cell">
				<div class="checkbox-row"></div>
				  <input type="checkbox" class="check-row" name="sso[]" value="" />
				</div>
				</div>--><div  class = "employee_sso cell">
				  <div class="inner-cell">
				  <p class = "employee normal" ><a href="/profile/<?php print $value->identityName; ?>"><?php print (isset($value->owner)) ? $value->identityName : 'None'; ?></a></p>
				</div>
				</div>
				<div  class = "employee_name cell">
				  <div class="inner-cell">
				  <p class = "employee" style="height:3em"><a href="<?php print $navigation_url; ?>"><?php print $navigation_title; ?></a></p>
				</div>
				</div>
				<div class = "employee_job cell" >
				  <div class="inner-cell">
				  <p class = "employee normal" ><a href="/profile/<?php print $value->requesterFromRSA; ?>" target="_blank"><?php print $value->requesterFromRSA; ?></a></p>
				</div>
				</div><div class = "employee_company cell" style="padding-left:0" >
				  <div class="inner-cell">
				  <p class = "employee normal" ><?php print (isset($value->date)) ? date("M j, Y, g:i A", strtotime($value->date)) : 'None'; ?></p></div>
				</div><div class = "employee_hr_mgr cell" >
				  <div class="inner-cell" style="width:22em">
				  <p class = "employee normal" ><?php print (isset($value->comments)) ? $value->comments : 'None'; ?></p>
				</div>
				</div>
			</li>
	      <?php } } ?>
		</ul>
	  </div>
	</div>
</div>
<div class="clr"></div>