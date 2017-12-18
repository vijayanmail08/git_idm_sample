<?php if(!isset($_SESSION['legacy'])) { ?>
<div class="list">
	<div class="list-tabs">
		<ul>
			<li id="employees_tab">
				<a href="#"  onclick="get_mystaff_employees();return false;">
					<div class="primary">
						<div class="secondary">Employees<span>(<?php print $variables['employee_count']?>)</span></div>
					</div>
				</a>
			</li>
			<li id="contractors_tab" class="hover-green">
				<a href="#" class="active" onclick="get_mystaff_contractors();return false;">
					<div class="primary">
						<div class="secondary">Contractors<span>(<?php print $variables['contractor_count']?>)</span></div>
					</div>
				</a>
			</li>
			<li id="functional_tab">
				<a href="#"  onclick="get_mystaff_functional_accounts();return false;">
					<div class="primary">
						<div class="secondary">Functional Accounts<span>(<?php print $variables['functional_count']?>)</span></div>
					</div>
				</a>
			</li>
		</ul>
	</div>
	<div class="main-content <?php echo "list-".$variables['filterby'];?>">
		<ul class="header">
			 <li id="header-cols" class="row">
				<div class="cell employee_sso">
					<h3 class="col">SSO</h3><div class="sort-order"><div class="asc active"></div></div>
				 </div><div class="cell employee_name">
					 <h3 class="col">Name</h3><div class="sort-order"><div class="asc"></div></div>
				 </div><div class="cell employee_job">
					 <h3 class="col">Job Title</h3>
				 </div><?php if($variables['filterby'] != "employee") { ?>
					 <div class="cell employee_exp">
					<h3 class="col">Expiration</h3><div class="sort-order"><div class="asc"></div></div>
				 </div>
				 <?php } ?>
			 </li>
		 </ul>
		<ul class="content">
			<?php foreach($variables['mystaff'] as $key=>$value) {?>
			<li class = "data_row row">
				<div  class = "employee_sso cell">
				  <div class="inner-cell">
					<p class = "employee normal" ><a href="/profile/<?php if(isset($value['sso'])) {print $value['sso'] ;}?>"><?php if(isset($value['sso'])) {print $value['sso'] ;}?></a></p>
				  </div>
				</div><div  class = "employee_name cell">
				  <div class="inner-cell">
					<p class = "employee <?php print isset($value['email']['alternate']) ? 'has-mail': ''; ?>" ><?php if(isset($value['name'])) {?> <a href="/profile/<?php print isset($value['sso']) ? $value['sso'] : '' ;?>"><?php print $value['name'];?></a><?php } ?></p>
					<?php if (isset($value['email']['alternate'])) { ?>
					<p class = "employee mail has-mail" ><a href="mailto:<?php  print $value['email']['alternate'];?>"><?php print $value['email']['alternate']; ?></a></p>
				  <?php } ?>
				  </div>
				</div><div class = "employee_job cell" >
				  <div class="inner-cell">
					<p class = "employee normal" ><?php if(isset($value['job_title'])) {print $value['job_title'] ;}?></p>
				  </div>
				</div><?php if($variables['filterby'] != "employee") { ?>
				<div class="cell employee_exp">
				  <div class="inner-cell">
				    <p class = "employee normal <?php if(isset($value['error_class'])) { print $value['error_class'] ; }?>" ><?php
				      if(isset($value['user_type']) && $value['user_type'] == 'Contractor'){
				        if(isset($value['end_date'])) {print $value['end_date'];}
				      }elseif(isset($value['user_type']) && $value['user_type'] == 'Employee'){
				        print 'None';
				      }?>
				    </p>
				  </div>
				</div>
				<?php } ?>
			</li>
			<?php } ?>
		</ul>
	</div>
</div>
<div class="clr"></div>
<?php } ?>