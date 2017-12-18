<?php //$legacy_value = variable_get('legacy','1'); ?>
<?php //echo 'count'.$variables['expiringgroups_count']; exit;
if($variables['expiringgroups_count'] > 0 ) { ?>
<?php //if(!isset($_SESSION['legacy'])) {
  //if ($legacy_value == 'admin') { ?>
<script type="text/javascript">
    Cufon.replace('.viewall_button .white_button input');
</script>
<div class="expiringgroups-content">
  <div class="expiringgroups-table">
    <table  id="table_wrapper" >
         <tr class="expiringgroups-header">
              <td colspan = "4" id="table_header" >
                <div id = "header_arrow" class="expand"></div>
                <h2>Renew Groups (<span class="ren_count_expiring_groups ren_count"><?php print isset($variables['expiringgroups_count']) ? $variables['expiringgroups_count'] : '' ;?></span>)</h2>
              </td>
         </tr>

         <tr id="header-cols">
              <td class = "expiringgroups_name_td">
                <h3 class="col">Name</h3>
                <!-- <div class="sort-order desc"></div> -->
              </td>
              <td class = "expiringgroups_title_td">
                <h3 class="col">Members</h3>
                <!-- <div class="sort-order asc"></div> -->
              </td>
             <td class="expiringgroups_expire_td">
                 <h3 class="col">Expires</h3>
                 <!-- <div class="sort-order desc"></div> -->
             </td>
             <td id="renew-alert" class = "expiringgroups_all_button_td">
                <button class="small_button hover-blue renew-all-button renew-all-group-button">Renew All</button>
                  <div class="renew-alert-all renew-alert-group-all alert-actions-all renew-alert" style="display: none;">
                    <ul class="main-actions-all" gtype="DST" gid_all="<?php print isset($variables['expiringgroups_gid_all'])? $variables['expiringgroups_gid_all']:""; ?>" exp_date_all="<?php print isset($variables['exp_date_all'])? $variables['exp_date_all']:""; ?>">
                    <li>
                <input type="radio" name="renewgroup" value="1" class="styled form-radio"/><span class="duration">1 month(<span class="date" expiringgroups_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renewgroup" value="3" class="styled form-radio" /><span class="duration">3 months(<span class="date" expiringgroups_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renewgroup" value="6" class="styled form-radio" /><span class="duration">6 months(<span class="date" expiringgroups_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
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
        foreach($variables['expiringgroups'] as $key=>$value) {
          if ($count < 10) {?>
          <tr class = "data_row">
            <td  class = "expiringgroups_name_td">
              <p class = "expiringgroups" ><a href="/group/DST/<?php print $value['id'];?>"><?php print isset($value['name'])? $value['name']:""; ?></a></p>
            </td>
            <td  class = "expiringgroups_title_td">
              <p class = "expiringgroups normal" ><?php print isset($value['memberscount'])? $value['memberscount']:""; ?> Members</p>
            </td>
            <td class = "expiringgroups_expire_td" >
              <p id ="expire-<?php print isset($value['expirationdate'])? $value['expirationdate']:""; ?>" class = "expiringgroups normal <?php print isset($value['expirationdate'])? $value['expirationdate']:""; ?>" ><?php print isset($value['expirationdate'])? $value['expirationdate']:""; ?></p>
            </td>
            <td class = "expiringgroups_button_td">
              <button id="<?php print isset($value['id'])? $value['id']:""; ?>" class="small_button hover-green renew-button"><?php print $value['buttontext']; ?></button>
              <div class="renew-alert group-alert-actions alert-actions renew-alert-each" style="display: none;"  gtype="DST" gid="<?php print isset($value['id'])? $value['id']:""; ?>" id="rb-<?php print isset($value['id'])? $value['id']:""; ?>">
                <?php $date = empty($value['expiringgroups_date']) ? time() : strtotime($value['expiringgroups_date']); ?>
                <ul  class="main-actions" gid="<?php print isset($value['id'])? $value['id']:""; ?>" username="<?php print isset($value['name'])? $value['name']:""; ?>" >
                <li>
                <input type="radio" name="renew" value="1" class="styled form-radio"/><span class="duration">1 month(<span class="date" expiringgroups_date = "<?php print date("m/d/Y", idm_portal_strtotime("+1 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+1 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renew" value="3" class="styled form-radio" /><span class="duration">3 months(<span class="date" expiringgroups_date = "<?php print date("m/d/Y", idm_portal_strtotime("+3 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+3 month")); ?></span>)</span>
                </li>
                <li>
                <input type="radio" name="renew" value="6" class="styled form-radio" /><span class="duration">6 months(<span class="date" expiringgroups_date = "<?php print date("m/d/Y", idm_portal_strtotime("+6 month")); ?>"><?php print date("m/d/y", idm_portal_strtotime("+6 month")); ?></span>)</span>
                </li>
                </ul>
              <div class="actions">
              <button custom_id="<?php print isset($value['id'])? $value['id']:""; ?>"class="small_button hover-green disabled_button submit">Submit</button>
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
  <?php if ($variables['expiringgroups_count'] > 10) { ?>
  <div class="viewall_div">
        <div class="viewall_button white_button">
            <button class="button">View All</button>
        </div>
    </div>
  <?php } ?>
</div>
<?php //} ?>
<?php } ?>