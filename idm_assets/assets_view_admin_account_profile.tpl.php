<div class="list-info">
	<div class="assets-certificate-wrapper">
		<div class="title">
			<h2>Admin Account Profile Information</h2>
		</div>
		<div class="field-row-text">
			<label for="edit-certificate-type">Supervisor Name</label>
			<div class="plain-text"><?php print !empty($info['custom_supervisorName'])? $info['custom_supervisorName']:"None"; ?></div>
		</div>
		<div class="field-row-text">
			<label for="edit-certificate-type">Supervisor Id</label>
			<div class="plain-text"><?php print isset($info['custom_supervisorId'])? $info['custom_supervisorId']:"None"; ?></div>
		</div>
		<div class="field-row-text">
			<label for="edit-certificate-type">Name</label>
			<div class="plain-text"><?php print isset($info['name'])? $info['name']:"None"; ?></div>
		</div>
		<div class="field-row-text">
			<label for="edit-certificate-type">Employee Id</label>
			<div class="plain-text"><?php print isset($info['employee_id'])? $info['employee_id']:"None"; ?></div>
		</div>
		<!--div class="field-row-text">
			<label for="edit-certificate-type">Account Expires</label>
			<div class="plain-text"><?php //print isset($info['account_expires'])? $info['account_expires']:"None"; ?></div>
		</div-->
		<div id="normal-cancel">
			<a href="/request/assets/tilde"><input type="button" onclick="window.location=this.parentNode.href;" class="cancel-button" value="Cancel"></a>
		</div>
	</div>
</div>
