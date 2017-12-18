<?php
	global $user;
	$profile_id = empty($user->name) ? '' : $user->name;
?>
		<fieldset id="edit-mobile" class="mobile-access form-wrapper">
			<div class="fieldset-wrapper">
			<?php print drupal_render($form['mobile']['title']);?>
<?php
print drupal_render($form['mobile']['type_of_device']);
print drupal_render($form['mobile']['email_address']);
print drupal_render($form['mobile']['phone_number']);
?>				
				<div class="field-row mobile-device-policy-agreement">
					<span class="form-required" title="This field is required.">*</span>
					<div class="policy-title">Device Policy Agreement</div>
					<div class="description">
                      <div class="agreement-title">NBCUniversal <br> 
                      End User Agreement for Personally Owned Mobile Devices
                      </div>
                      <div class="agreement-red-desc">
					  This service is currently available to exempt employees and is not available to part-time, hourly, contract, temporary, contingent or other employee classes governed by collective bargaining agreements.
					  </div> 
                      <div class="agreement-desc">
					  By connecting my personally owned mobile device to the NBCUniversal network, I understand that a security policy will be applied to my device. The security policy is intended to protect NBCUniversal resources from threats commonly spread through mobile devices. The security policy will manage phone configuration settings such as requiring a password to gain access to a locked device and requiring the device to lock after a predetermined time of inactivity. To see all the security rules, see the Mobile Device Security Standard or contact TechnologySAFE.<br><br> 
                      Terms of this agreement are as follows:<br><br>
                      <ol>
                        <li>NBCUniversal has the right to remotely wipe the personally owned device in the event that the device is lost, stolen or infected with malware. NBCUniversal will make every effort to erase only corporate data from my personally owned device; however, "Wiping" the device could mean that all information/data (personal and corporate) will be erased from the device and the device will be reset to factory defaults;</li>                          
                        <li>If the personal device will replace an existing company mobile device, I agree to request cancellation of the existing company device to avoid duplicate wireless cost to the Company. Cancellation requests can be made to the local Wireless Team or NBCUniversal Help Desk;</li>
                        <li>NBCUniversal is not responsible for backing up or restoring personal information on my device;</li>
                        <li>If the personally owned device is lost or stolen, I will promptly notify the IT Help Desk;</li> 
                        <li>NBCUniversal is not required to provide technical support for my device;</li>
                        <li>I agree that the personally owned device will only be used by me and will not be shared with others such as family members or friends;</li>
                        <li>NBCUniversal has the right to physically or electronically inspect the personally owned device at any point in time;</li> 
                        <li>NBCUniversal has the right to disable access to personally owned device to prevent access to NBCUniversal resources at any time without prior notice or consent;</li>
                        <li>Any applications for the device must be properly licensed prior to being used for NBCUniversal business purposes;</li>
                        <li>Communicating with the NBCUniversal network over Free or Open Wireless hotspots, without the use of a VPN and/or other methods of encryption, must be avoided;</li>
                        <li>Supported devices shall include device made by Blackberry; Apple and Samsung Android, for a full list of supported devices, please see <a href="http://sc.inbcu.com/*wirelessdevices">http://sc.inbcu.com/*wirelessdevices</a>;</li>
                        <li>NBCUniversal employees are required to comply with all company Policies, including but not limited, to the Acceptable Use Policy and Privacy Policy;</li>
                        <li>Upon termination of employment with NBCUniversal, NBCUniversal data will be wiped from the device; and</li>
                        <li>NBCUniversal has the right to change or modify any of the above clauses.</li>
                      </ol>
                      <br>
                      I understand that approval is required from my Manager prior to account activation.
                      <br><br>
                      I have read NBCUniversal End User Agreement for personal owned mobile devices and agree to the aforementioned terms and conditions. By selecting the "I Agree" radio button and clicking "Continue" I agree to be bound by the terms of this agreement.
					</div>					    
				</div>
<?php
print drupal_render($form['mobile']['device_policy_agreement']);
print drupal_render($form['mobile']['submit']);
print drupal_render($form['mobile']['cancel']);
print drupal_render($form['form_build_id']);
print drupal_render($form['form_token']);
print drupal_render($form['form_id']);
?>						
			</div>
		</fieldset>
