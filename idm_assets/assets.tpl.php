<?php //$legacy_value = variable_get('legacy','1'); ?>
<div class="assets-content">
  <div id="assets_wrapper">
	<div class="assets-select">
		<select class ="mobile-assets-select">
		<?php foreach($variables['asset'] as $key_header=>$value_header) { ?>
		    <?php
                if(isset($_SESSION['legacy'])) {
				//if ($legacy_value == '1') {
                    if($key_header == 'Security') {
                 ?>
                <option value="<?php print strtolower(str_replace(" ","_",$key_header)); ?>"><?php print $key_header; ?></option>
                <?php
                    }
                } else {
                ?>
                <option value="<?php print strtolower(str_replace(" ","_",$key_header)); ?>"><?php print $key_header; ?></option>
                <?php
                }
		    ?>
		<?php } ?>
		</select>
	</div>
	 <?php foreach($variables['asset'] as $key_header=>$value_header) { ?>
	 <?php
             if(isset($_SESSION['legacy'])) {
			 //if ($legacy_value == '1') {
                if($key_header == 'Security') {
	 ?>
    <div class="assets-type recommends <?php print strtolower(str_replace(" ","_",$key_header)); ?>">
         <ul class="main-header">
			 <li class="header recommends-header">
				  <div id="div_header" class="cell">
					<h2><?php print $key_header; ?></h2>
					<div id="header_arrow" class="desc"></div>
				  </div>
			 </li>
		 </ul>
		<ul class="content">
			<li class="row">
				<ul>
				 <?php foreach($value_header as $key_asset=>$value_asset) { ?>
				 <?php if($value_asset['asset_title'] != 'Domain Tilde Account') {?>
					<li>
					<div class="data">
						<div class="sprites">
							<div class="icon-show">
								<div class="<?php print $value_asset['asset_status_class']; ?>"></div>
							</div>
							<div class="<?php print $value_asset['asset_class']; ?>"></div>
						</div>
						<div class="info">
						  <h3><?php print $value_asset['asset_title']; ?></h3>
						  <p><?php print $value_asset['asset_detail']; ?></p>
						  <button class="small_button hover-blue <?php if($value_asset['asset_title'] != 'Certificate' && $value_asset['asset_title'] != 'Domain Tilde Account' && $value_asset['asset_title'] != 'Secure Remote Access' &&$value_asset['asset_title'] != 'RSA Awaiting Approval List' && $value_asset['asset_title'] != 'Personally Owned Mobile Device Access' && $value_asset['asset_title'] != 'Domain Tilde Account') { ?>external_asset_link<?php } ?> <?php print $value_asset['asset_link_class'];?>" ext_url ="<?php print $value_asset['asset_url']; ?>"><?php print $value_asset['asset_request']; ?></button>
						</div>
					  </div>
				  </li>
				    <?php } ?>
					<?php } ?>
				</ul>
			</li>
		</ul>
     </div>
         <?php } ?>
		 <?php
		 $temp_value = array();
		 foreach($value_header as $keys_asset=>$values_asset) {
				$temp_value[] = $values_asset;
			}
			$key_asset_title = array_map('current', $temp_value);
			if (in_array("Administer Wireless Attributes",$key_asset_title) || in_array("Purchase Manager Profile Management",$key_asset_title) || in_array("Bulk Loader - Wireless Attribute",$key_asset_title)) {
		 ?>
		 <?php if($key_header == 'Other') { ?>
		<div class="assets-type recommends <?php print strtolower(str_replace(" ","_",$key_header)); ?>">
         <ul class="main-header">
			 <li class="header recommends-header">
				  <div id="div_header" class="cell">
					<h2><?php print $key_header; ?></h2>
					<div id="header_arrow" class="desc"></div>
				  </div>
			 </li>
		 </ul>
		<ul class="content">
			<li class="row">
				<ul>
				 <?php
				 foreach($value_header as $key_asset=>$value_asset) { ?>
				 <?php if($value_asset['asset_title'] == 'Purchase Manager Profile Management' || $value_asset['asset_title'] == 'Administer Wireless Attributes' || $value_asset['asset_title'] == 'Bulk Loader - Wireless Attribute') {?>
					<li>
					<div class="data">
						<div class="sprites">
							<div class="icon-show">
								<div class="<?php print $value_asset['asset_status_class']; ?>"></div>
							</div>
							<div class="<?php print $value_asset['asset_class']; ?>"></div>
						</div>
						<div class="info">
						  <h3><?php print $value_asset['asset_title']; ?></h3>
						  <p><?php print $value_asset['asset_detail']; ?></p>
						  <button class="small_button hover-blue <?php if($value_asset['asset_title'] != 'Certificate' && $value_asset['asset_title'] != 'Domain Tilde Account' && $value_asset['asset_title'] != 'Secure Remote Access' && $value_asset['asset_title'] != 'RSA Awaiting Approval List' && $value_asset['asset_title'] != 'Personally Owned Mobile Device Access' && $value_asset['asset_title'] != 'Domain Tilde Account') { ?>external_asset_link<?php } ?> <?php print $value_asset['asset_link_class'];?>" ext_url ="<?php print $value_asset['asset_url']; ?>"><?php print $value_asset['asset_request']; ?></button>
						</div>
					  </div>
				  </li>
				    <?php } ?>
					<?php } ?>
				</ul>
			</li>
		</ul>
     </div>
         <?php } } ?>
         <?php } else {?>
    <div class="assets-type recommends <?php print strtolower(str_replace(" ","_",$key_header)); ?>">
         <ul class="main-header">
			 <li class="header recommends-header">
				  <div id="div_header" class="cell">
					<h2><?php print $key_header; ?></h2>
					<div id="header_arrow" class="desc"></div>
				  </div>
			 </li>
		 </ul>
		<ul class="content">
			<li class="row">
				<ul>
				 <?php foreach($value_header as $key_asset=>$value_asset) { ?>
					<li>
					<div class="data">
						<div class="sprites">
							<div class="icon-show">
								<div class="<?php print $value_asset['asset_status_class']; ?>"></div>
							</div>
							<div class="<?php print $value_asset['asset_class']; ?>"></div>
						</div>
						<div class="info">
						  <h3><?php print $value_asset['asset_title']; ?></h3>
						  <p><?php print $value_asset['asset_detail']; ?></p>
						  <button class="small_button hover-blue <?php if($value_asset['asset_title'] != 'Certificate' && $value_asset['asset_title'] != 'Domain Tilde Account' && $value_asset['asset_title'] != 'Secure Remote Access' && $value_asset['asset_title'] != 'RSA Awaiting Approval List' && $value_asset['asset_title'] != 'Personally Owned Mobile Device Access' && $value_asset['asset_title'] != 'Domain Tilde Account') { ?>external_asset_link<?php } ?> <?php print $value_asset['asset_link_class'];?>" ext_url ="<?php print $value_asset['asset_url']; ?>"><?php print $value_asset['asset_request']; ?></button>
						</div>
					  </div>
				  </li>
					<?php } ?>
				</ul>
			</li>
		</ul>
     </div>
         <?php } ?>
		 <?php } ?>
  </div>
</div>
