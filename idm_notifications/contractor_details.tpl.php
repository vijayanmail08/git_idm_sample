<div class="assets-certificate-info">
<?php if(!empty($variables['contractor_details'])) { ?>
<div class="assets-certificate-wrapper">
		<div class="title">
			<h1>Request Details</h1>
		</div>
		<?php foreach($variables['contractor_details'] as $key_label=>$value) { ?>
		<div class="field-row-text">
				<label for="edit-certificate-type"><?php echo $key_label; ?></label>
				<div class="plain-text"><?php echo $value; ?></div>
		</div>
		<?php } ?>
	</div>
<?php }  else { ?>

	<div class="assets-certificate-wrapper">
  <?php foreach($variables['req_title_details'] as $key_label=>$value) { ?>
  <div class="title" style="border-bottom:none;text-align:center;">
			<h1 style="font-size:1.2em;"><?php echo $value; ?></h1>
	</div><br/>
  <?php } ?>
		<div class="title">
			<h1>Request Profile</h1>
		</div>
		<?php foreach($variables['req_by_details'] as $key_label=>$value) { ?>
		<div class="field-row-text">
				<label for="edit-certificate-type"><?php echo $key_label; ?></label>
				<div class="plain-text"><?php echo $value; ?></div>
		</div>
		<?php } ?>
	</div>

  <div class="assets-certificate-wrapper">
		<div class="title">
			<h1>User profile</h1>
		</div>
		<?php foreach($variables['req_for_details'] as $key_label=>$value) { ?>
		<div class="field-row-text">
				<label for="edit-certificate-type"><?php echo $key_label; ?></label>
				<div class="plain-text"><?php echo $value; ?></div>
		</div>
		<?php } ?>
	</div>

  <div class="assets-certificate-wrapper">
		<div class="title">
			<h1>Please verify the request details and take an action</h1>
		</div>
		<?php foreach($variables['requestdetails'] as $key_label=>$value) { ?>
		<div class="field-row-text">
				<label for="edit-certificate-type"><?php echo $key_label; ?></label>
				<div class="plain-text"><?php echo $value; ?></div>
		</div>
		<?php } ?>
	</div>
  <?php } ?>
</div>
