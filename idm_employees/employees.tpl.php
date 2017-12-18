<?php
  global $user;
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
  }
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
		<div class="actions">
			<ul>
				<!-- <li><button class="small_button hover-blue active" id="edit">Edit</button></li> -->
				<li><button class="small_button hover-blue disabled-button" id="edit">Edit</button></li>
				<li><button class="small_button hover-blue disabled-button" id="transfer">Transfer</button></li>
				<li><button class="small_button hover-blue disabled-button" id="renew">Renew</button></li>
				<li><button class="small_button hover-blue disabled-button" id="terminate">Terminate</button></li>
				<?php
					if(in_array('Employee', $user->roles)) {
				?>
				<li><button class="small_button hover-blue disabled-button" id="revoke">Revoke</button></li>
		          <?php
				  }
		          ?>
			</ul>
		<div id="transfer-alert" class="transfer-alert alert-actions">
			<div class="transfer-to">
			  <label>Transfer to</label>
				<?php print !empty($variables['manager_lookup_field']) ? $variables['manager_lookup_field'] : ""; ?>
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
						<input type="radio" name="renew" value="1" class="styled form-radio"/><span class="duration">1 month (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
					</li>
					<li>
						<input type="radio" name="renew" value="3" class="styled form-radio"/><span class="duration">3 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
					</li>
					<li>
						<input type="radio" name="renew" value="6" class="styled form-radio"/><span class="duration">6 months (<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
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
		<div class="search_bar employess">
			<?php print !empty($variables['employee_search_field']) ? $variables['employee_search_field'] : ""; ?>
			<div class="search_button hover-blue">
				<div class="search-icon"></div>
			</div>
		</div>
		<div class="add-contractor hover-green">
		  <a href="/create/contractor">
			<div class="sprites-icon-plus"></div>
			<span class="desktop_text"></span>
		  </a>
		</div>
	</div>
	<div class="list-tabs">
		<ul>
			<li id="all_employees_tab" class= <?php print $usertype_class ?> >
				<a href="#" <?php if($usertype_class != '') {?> class = "active" <?php } ?> onclick="get_all_employees(<?php print $variables['total_count']?>);return false;">
					<div class="primary">
						<div class="secondary">ALL WORKERS<span>(<?php print $variables['total_count']?>)</span></div>
					</div>
				</a>
			</li>
			<li id="employees_tab" class = <?php print $employee_class ?>>
				<a href="#" <?php if($employee_class != '') {?> class = "active" <?php } ?> onclick="get_employees(<?php print $variables['employee_count']?>);return false;">
					<div class="primary">
						<div class="secondary">EMPLOYEES<span>(<?php print $variables['employee_count']?>)</span></div>
					</div>
				</a>
			</li>
			<li id="contractors_tab" class = <?php print $contractor_class ?>>
				<a href="#" <?php if($contractor_class != '') {?> class = "active" <?php } ?> onclick="get_contractors(<?php print $variables['contractor_count']?>);return false;">
					<div class="primary">
						<div class="secondary">CONTRACTORS<span>(<?php print $variables['contractor_count']?>)</span></div>
					</div>
				</a>
			</li>
			<li id="functional_accounts_tab" class = <?php print $functional_class ?>>
				<a href="#" <?php if($functional_class != '') {?> class = "active" <?php } ?> onclick="get_functional_accounts(<?php print $variables['functional_count']?>);return false;">
					<div class="primary">
						<div class="secondary">FUNCTIONAL ACCOUNTS<span>(<?php print $variables['functional_count']?>)</span></div>
					</div>
				</a>
			</li>
		</ul>
		<select class="mobile-myworkers-select">
			<option class="all" value="all" >All Employees</option>
			<option class="emp" value="emp" >Employees</option>
			<option class="cont" value="cont">Contractors</option>
			<option class="func" value="func">Functional</option>
		</select>
		<div class="mobile-operations">
			<div class="mobile-contractor hover-green">
				<a href="/create/contractor"><div class="icon-plus_icon"></div></a>
			</div>
		</div>
	</div>
	<div class="main-content header-row">
	  <div class="emp-content header-row-content <?php echo "list-".$variables['filterby'];?>">
		<ul class="header">
			 <li id="header-cols" class="row">
				<div class="cell employee_check"></div><div class="cell employee_sso">
					<h3 class="col">SSO</h3><div class="sort-order"><div class="asc active"></div></div>
				 </div><div class="cell employee_name">
					 <h3 class="col">Name</h3><h3 class="mobile">Name</h3><div class="sort-order"><div class="asc"></div></div>
				 </div><?php if($variables['filterby'] != "functional") { ?><div class="cell employee_job">
					 <h3 class="col">Job Title</h3><h3 class="mobile">Title</h3>
				 </div><div class="cell employee_company">
					 <h3 class="col">Organization</h3>
				 </div><?php if($variables['filterby'] != "contractor") { ?><div class="cell employee_hr_mgr">
					 <h3 class="col">Sub Business</h3>
				 </div><?php } ?><?php if($variables['filterby'] == "contractor") { ?><div class="cell employee_hr_mgr">
					 <h3 class="col">Company</h3>
				 </div><?php } ?><?php } if($variables['filterby'] != "employee" && $variables['filterby'] != "all") { ?><div class="cell employee_exp">
					<h3 class="col">End Date</h3><h3 class="mobile">Expires</h3><div class="sort-order"><div class="asc"></div></div>
				 </div><?php } ?>
			 </li>
		 </ul>
	  </div>
	</div>
	</div>
	<div class="main-content  data-row">
	  <div class="emp-content   data-row-content <?php echo "list-".$variables['filterby'];?>">
		<ul class="content">
		<?php
		foreach($variables['employee'] as $key=>$value) { ?>
			<li class = "data_row row">
				<div  class = "cell employee_check">
				  <div class="inner-cell">
				<div class="checkbox-row"></div>
				  <input type="checkbox" class="check-row" name="sso[]" value="<?php print $value['sso'];?>" <?php if (isset($value['checked_class'])) { print 'checked="checked"';} ?>/>
				</div>
				</div><div  class = "employee_sso cell">
				  <div class="inner-cell">
				  <p class = "employee normal" ><a href="/profile/<?php if(isset($value['sso'])) {print $value['sso'] ;}?>"><?php if(isset($value['sso'])) {print $value['sso'] ;}?></a></p>
				</div>
				</div><div  class = "employee_name cell">
				  <div class="inner-cell">
				  <p class = "employee <?php print isset($value['email']['alternate']) ? '': 'no-mail'; ?>" ><a href="/profile/<?php if(isset($value['sso'])) {print $value['sso'] ;}?>"><?php if(isset($value['name'])) {print $value['name'];}?></a></p>
				  <?php if (isset($value['email']['alternate'])) { ?>
				  <p class = "employee mail" ><a href="mailto:<?php  print $value['email']['alternate'];?>"><?php print $value['email']['alternate']; ?></a></p>
				  <?php } ?>
				</div>
				</div><?php if($variables['filterby'] != "functional") { ?><div class = "employee_job cell" >
				  <div class="inner-cell">
				  <p class = "employee normal" ><?php if(isset($value['job_title'])) {print $value['job_title'] ;} ?></p>
				</div>
				</div><div class = "employee_company cell" >
				  <div class="inner-cell">
				  <p class = "employee normal" ><?php if(isset($value['company'])) { print $value['company']; } ?></p></div>
				</div><?php if($variables['filterby'] != "contractor") { ?><div class = "employee_hr_mgr cell" >
				  <div class="inner-cell">
				  <p class = "employee normal" ><?php if(isset($value['sub_business'])) {print $value['sub_business'];}?></p>
				</div>
				</div><?php } ?>
					<?php if($variables['filterby'] == "contractor") { ?><div class = "employee_hr_mgr cell" >
				  <div class="inner-cell">
				  <p class = "employee normal" ><?php if(isset($value['custom_company'])) {print $value['custom_company'];}?></p>
				</div>
				</div><?php } ?>
				<input type="hidden" id="exp_date" value="<?php if(isset($value['end_date'])) {print $value['end_date']; }?>">
				<input type="hidden" id="usertype" value="<?php if(isset($value['user_type'])) {print $value['user_type']; }?>">
				<?php } if($variables['filterby'] != "employee" && $variables['filterby'] != "all") { ?><div class="cell employee_exp">
				  <div class="inner-cell">
				    <p class = "employee normal <?php if(isset($value['error_class'])) { print $value['error_class'] ; }?>" ><?php
				    if($value['user_type'] == 'Employee'){
				        print 'None';
				      }else {
						if(isset($value['end_date'])) {print $value['end_date'];}
					  }
					  ?>
				    </p>
				  <div class="icon-next_arrow"></div>
				  </div>
				</div>
				<?php } ?>
			</li>
	      <?php }?>
		</ul>
	  </div>
	</div>
</div>
<div class="clr"></div>