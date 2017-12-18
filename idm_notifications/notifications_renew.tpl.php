<?php //$legacy_value = variable_get('legacy','1'); ?>
<?php if($variables['renews_count'] > 0 ) { ?>
<?php if(!isset($_SESSION['legacy'])) {
      //if ($legacy_value == 'admin') { ?>
<script type="text/javascript">
    Cufon.replace('.viewall_button .white_button input');
</script>
<!-- <div class="profile-alert-actions-msg">
  <div class="inner-msg">
  </div>
</div> -->
<div class="renews-content">
  <div class="renews-table">
    <table  id="table_wrapper" >
         <tr class="renew-header">
              <td colspan = "4" id="table_header" >
                <div id = "header_arrow" class="expand"></div>
                <h2>Renew Contractors (<span class="ren_count"><?php print isset($variables['renews_count']) ? $variables['renews_count'] : '' ;?></span>)</h2>
              </td>
         </tr>

         <tr id="header-cols">
              <td class = "employee_name_td">
                <h3 class="col">Name</h3>
                <!-- <div class="sort-order desc"></div> -->
              </td>
              <td class = "employee_title_td">
                <h3 class="col">Title</h3>
                <!-- <div class="sort-order asc"></div> -->
              </td>
             <td class="employee_expire_td">
                 <h3 class="col">Expires</h3>
                 <!-- <div class="sort-order desc"></div> -->
             </td>
             <td id="renew-alert" class = "employee_button_td">
                <button class="small_button hover-blue renew-all-button renew-all-contractor-button">Renew All</button>
				<h3 class="col mobile-renew-all-button">Renew All</h3>
                  <div class="renew-alert-all renew-alert-contractor-all alert-actions-all renew-alert" style="display: none;">
                    <ul class="main-actions-all" userid="<?php print isset($variables['renews_sso_all'])? $variables['renews_sso_all']:""; ?>" exp_date_all="<?php print isset($variables['exp_date_all'])? $variables['exp_date_all']:""; ?>">
                    <li>
                <input type="radio" name="renew" value="1" class="styled form-radio"/><span class="duration">1 month(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renew" value="3" class="styled form-radio" /><span class="duration">3 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renew" value="6" class="styled form-radio" /><span class="duration">6 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
                </li>
                    </ul>
                    <div class="actions">
                    <button class="small_button hover-blue disabled_button submit">Submit</button>
                    </div>
                    <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
                  </div>
             </td>
         </tr>

        <?php
        $count = 0;
        foreach($variables['renews'] as $key=>$value) {
          if ($count < 10) {?>
          <tr class = "data_row">
            <td  class = "employee_name_td">
              <p class = "employee" ><a href="/profile/<?php print $value['emp_sso_id'];?>"><?php print wordwrap($value['emp_name'],20,"<br>\n"); ?></a></p>
            </td>
            <td  class = "employee_title_td">
              <p class = "employee normal" ><?php print $value['emp_title']; ?></p>
            </td>
            <td class = "employee_expire_td" >
              <p id ="expire-<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>" class = "employee normal <?php print $value['error_class']; ?>" ><?php print $value['emp_date']; ?></p>
            </td>
            <td class = "employee_button_td">
              <button id="<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>" class="small_button hover-green renew-button"><?php print $value['emp_button']; ?></button>
			  <div class="mobile-renew-button"><a href="/mobile-renew/<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>"><button class="small_button hover-green mobile-renew-button"><?php print $value['emp_button']; ?></button></a></div>
              <div class="renew-alert alert-actions renew-alert-each" style="display: none;" userid="<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>" id="rb-<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>">
                <?php $date = empty($value['emp_date']) ? time() : strtotime($value['emp_date']); ?>
                <ul  class="main-actions" userid="<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>" username="<?php print $value['emp_name']; ?>" >
                <li>
                <input type="radio" name="renew" value="1" class="styled form-radio"/><span class="duration">1 month(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renew" value="3" class="styled form-radio" /><span class="duration">3 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renew" value="6" class="styled form-radio" /><span class="duration">6 months(<span class="date" renew_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
                </li>
                </ul>
              <div class="actions">
              <button custom_id="<?php print isset($value['emp_sso_id'])? $value['emp_sso_id']:""; ?>" class="small_button hover-green disabled_button submit">Submit</button>
              </div>
              <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
              </div>
            </td>
          </tr>
        <?php }
          $count++;
        }?>
     </table>
  </div>
  <?php if ($variables['renews_count'] > 10) { ?>
  <div class="viewall_div">
        <div class="viewall_button white_button">
            <button class="button">View All</button>
        </div>
    </div>
  <?php } ?>
</div>
<?php } ?>
<?php } ?>