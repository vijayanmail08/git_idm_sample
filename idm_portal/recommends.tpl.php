<div class="recommends-content">
  <div class="recommends-div">
    <div  id="div_wrapper" >
         <ul class="main-header">
			 <li class="recommends-header">
				  <div id="div_header" class="cell">
					<h2>Recommended For You</h2>
				  </div>
			 </li>
		 </ul>
		<ul class="content">
      <?php if (($variables['user_role'] == 'contractor') && ($variables['managerid'] == '') && ($variables['custom_sponsorshipstatus'] == 'R')) {
        $req_for_sponser_url = variable_get('req_for_sponser','http://iam.inbcu.com/idm/NBC/worker/user/RequestSponsor.jsp'); ?>
        <li>
        <div class="recommends">
          <div class="sprites">
            <div class="icon-show">
              <!--div class="icon_approve"></div-->
            </div>
            <a href="<?php print $req_for_sponser_url; ?>"><div class="icon sprite-icons-role_change"></div></a>
          </div>
          <div class="info">
            <h3>Request for Sponsor</h3>
            <p>Request for Sponsor from this page.</p>
            <a href="<?php print $req_for_sponser_url; ?>"><input onclick="window.location=this.parentNode.href;" class="small_button hover-blue" type="submit" value="Request"></a>
          </div>
          </div>
        </li>
      <?php } if (!isset($_SESSION['legacy'])) { ?>
			  <li>
				<div class="recommends">
					<div class="sprites">
						<div class="icon-show">
							<!--div class="icon_approve"></div-->
						</div>
						<a href="/create/contractor"><div class="icon sprite-icons-role_change"></div></a>
					</div>
					<div class="info">
					  <h3>Contractors</h3>
					  <p>Create a new identity for a contractor for your team.</p>
					  <a href="/create/contractor"><input onclick="window.location=this.parentNode.href;" class="small_button hover-blue" type="submit" value="Request"></a>
					</div>
				  </div>
			  </li>
			  <?php } ?>
			 <li>
				<div class="recommends">
					<div class="sprites">
						<!-- <a href="http://iam.inbcu.com/idm/user/processLaunch.jsp?newView=true&id=NBC_WF_Common_CallProvision&op_reqAppName=RSA%20AUTHENTICATION%20MANAGER"><div class="icon sprite-icons-file_share"></div></a> -->
            <a href="/request/assets/remoteaccess"><div class="icon sprite-icons-file_share"></div></a>
					</div>
					<div class="info">
					  <h3>Secure Remote Access</h3>
					  <p>Secure Remote Access is used to access NBCUniversal network when you are away from office. It uses a two factor authentication.</p>
					 <!-- <input class="small_button hover-blue external_asset_link" ext_url="http://iam.inbcu.com/idm/user/processLaunch.jsp?newView=true&id=NBC_WF_Common_CallProvision&op_reqAppName=RSA%20AUTHENTICATION%20MANAGER" type="submit" value="Request"> -->
           <a href="/request/assets/remoteaccess"><input onclick="window.location=this.parentNode.href;" class="small_button hover-blue" type="submit" value="Request"></a>
					</div>
				  </div>
			  </li>
			<?php if($variables['user_role'] != 'contractor') { ?>
			  <!--li>
				<div class="recommends">
					<div class="sprites">
						<a href="/request/assets/remoteaccess" ><div class="icon sprite-icons-security_device"></div></a>
					</div>
					<div class="info">
					  <h3>Authentication Certificates</h3>
					  <p>Certificate identifies an individual and enables the use of encryption and authentication.</p>
					  <a href="/request/assets/remoteaccess"><input onclick="window.location=this.parentNode.href;" class="small_button hover-blue" type="submit" value="Request"></a>
					</div>
				  </div>
			  </li-->
			  <?php } if (!isset($_SESSION['legacy'])) { ?>
			  <li>
				<div class="recommends">
					<div class="sprites">
						<div class="icon-show">
							<!--div class="icon_approve"></div>-->
						</div>
						<a href="/create/functional"><div class="icon sprite-icons-role_change"></div></a>
					</div>
					<div class="info">
					  <h3>Functional Accounts</h3>
					  <p>Create a system or process account for your application.</p>
					  <a href="/create/functional"><input onclick="window.location=this.parentNode.href;" class="small_button hover-blue" type="submit" value="Request"></a>
					</div>
				  </div>
			  </li>
			  <?php } ?>
		  </ul>
     </div>
  </div>
</div>
