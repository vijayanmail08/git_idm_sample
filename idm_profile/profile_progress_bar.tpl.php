<?php
	$text = '';
	$field_val = $field;
	if ($field == '') {
		$text = 'Congratulations! <br>Your profile has been completed!';
	}
	else {
		if ($field_val == 'work location') {
			$field_val = 'location';
		}
		$text = 'Tell us your '.$field.' <br><span class="normal">Let your colleagues contact you</span>';

	}

if($pers_to_be_completed > 0) {
?>

<div class="completion_module">
	<!--<div class="completion_module error">-->
	<div class="completion_text">
		<span class="progress_text">
		<?php if ($field != 'picture') { ?>
			<?php echo $text; ?>
		<?php } else { ?>
			<span class="normal">Upload your profile photo for use in all NBCU systems</span>
		<?php } ?>
		</span>
	</div>
	<div class="completion_circle">
		<input class="knob" value="<?php echo $pers_to_be_completed; ?>" />
		<input class="knob-field" value="<?php echo $pers_to_be_completed-$field_per; ?>" />
	</div>
	<?php if ($field != ''): ?>
		<div class="submit_field actions">
			<?php if ($field != 'picture') { ?>
				<?php if ($field_val == 'location') { ?>
					<input type="text" class="field_1" placeholder="Enter Building" value="Enter Building" />
					<input type="text" class="field_2" placeholder="Enter Floor" value="Enter Floor" />
					<input type="text" class="field_3" placeholder="Enter Workstation" value="Enter Workstation" />
				<?php } else { ?>
					<input type="text" class="field" placeholder="Enter <?php echo $field; ?>" value="Enter <?php echo $field; ?>" />
				<?php } ?>
				<!--<input type="text" class="error" placeholder="Enter email" />-->
				<div class="submit_button">
					<button class="button  hover-brown" field="<?php echo $field_val; ?>">Submit</button>
					<div class="ajax_throbber" style="display: none;margin-top: 2em;"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
				</div>
			<?php } else { ?>
				<div class="submit_button">
					<a href="#"><div class="button  hover-brown upload-picture">Upload</div></a>
					<div class="ajax_throbber" style="display: none;margin-top: 2em;"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
				</div>
			<?php } ?>
		</div>
	<?php endif; ?>
	<div class="error_wrapper error" style="display: none;">
		<span style="color: #ed1f24;">*</span> <span class="error_message"></span>
	</div>
	<!--<div class="more_updates hover-brown">
            <a href="edit/user"><button class="small_button">More Updates</button></a>
        </div>-->
	<div class="more_updates">
		<a href="/edit-user">
			<button class="hover-brown">More Updates</button>
		</a>
	</div>
</div>
<?php } ?>
