<div class="assets-certificate-info">
	<div class="assets-certificate-wrapper">
		<div class="title">
			<h1>Verify Request Details</h1>
		</div>
		<?php foreach($variables['certificate_info'] as $key_label=>$value) { ?>	
		<div class="field-row-text">
				<label for="edit-certificate-type"><?php echo $key_label; ?></label>
				<div class="plain-text"><?php echo $value; ?></div>
		</div>
		<?php } ?>	

	</div>
</div>
