<div class="assets-certificate-info">
	<div class="assets-certificate-wrapper">
		<div class="title">
			<h2>Task Details</h2>
		</div>
		<?php foreach($variables['contractor_details'] as $key_label=>$value) {
      if ($value != '') { ?>
		<div class="field-row-text">
				<label for="edit-certificate-type"><?php echo $key_label; ?></label>
				<div class="plain-text"><?php echo $value; ?></div>
		</div>
		<?php }} ?>
	</div>
</div>