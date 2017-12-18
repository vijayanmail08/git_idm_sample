<div class="approve-content">
  <div class="approve-table">
    <table  id="table_wrapper" >
         <tr class="approve-header">
              <td colspan = "5" id="table_header" >
                <div id = "header_arrow" class="expand"></div>
                <h2>Approve Requests (<span class="approve_count"><?php print $variables['approve_count'];?></span>)</h2>
              </td>
         </tr>
        <?php if($variables['approve_count'] > 0 ) { ?>
         <tr id="header-cols">
              <td class = "employee_name_td">
                <h3 class="col">Name</h3>
              </td>
             <td class = "employee_request_td">
                 <h3 class="col">Request</h3>
             </td>
             <td class = "employee_requestor_td">
                 <h3 class="col">Requestor</h3>
             </td>
             <td class = "employee_date_td">
                 <h3 class="col">Date</h3>
             </td>
             <td class = "employee_button_td">
                    <button type="button" class="small_button approve-all hover-blue" custom_id="<?php print isset($variables['approve_custom_all'])? $variables['approve_custom_all']:""; ?>">Approve All</button>
					<h3 class="col mobile-approve-all">Approve All</h3>
                    <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
             </td>
         </tr>

        <?php
        $count = 0;
        foreach($variables['approve'] as $key=>$value) {
        $req_date = date('M-d-Y', strtotime($value['date']));
        if ($count < 10) {
          $request_link = "";
          $strpos_cg = strpos($value['request'],"Create group");
          $strpos_jg = strpos($value['request'],"Join Group");
          $strpos_cu = strpos($value['request'],"Create user");
          $strpos_cu_c = strpos($value['request'],"Create Contractor");
          $strpos_cu_f = strpos($value['request'],"Create Functional");
          $strpos_nc = strpos($value['request'],"New Certificate");
          $strpos_st = strpos($value['request'],"New RSA Soft Token");
          $strpos_pm = strpos($value['request'],"New Personally-owned Mobile Device Access");
          $strpos_ta = strpos($value['request'],"New Admin Tilde Account");
          if ($strpos_cg !== false) {
            $cus_id = 'cg';
            $request_link = 'approval-create-group/'.$value['custom_id'];
          } else if ($strpos_jg !== false) {
            $cus_id = 'jg';
            $request_link = 'approval-join-group/'.$value['custom_id'];
          } else if (($strpos_cu !== false) || ($strpos_cu_c !== false) || ($strpos_cu_f !== false)) {
            $cus_id = 'cu';
            $request_link = 'approval-create-user/'.$value['custom_id'];
          } else if ($strpos_nc !== false) {
            $cus_id = 'nc';
            $request_link = 'approval-new-certificate/'.$value['custom_id'];
          } else if ($strpos_st !== false) {
            $cus_id = 'st';
            $request_link = 'approval-new-rsa/'.$value['custom_id'].'/'.$value['requestor_sso'].'/'.$req_date;
          } else if ($strpos_pm !== false) {
            $cus_id = 'pm';
            $request_link = 'approval-new-pomd/'.$value['custom_id'].'/'.$value['requestor_sso'].'/'.$req_date;
          } else if ($strpos_ta !== false) {
            $cus_id = 'ta';
            $request_link = 'approval-new-tilde/'.$value['custom_id'].'/'.$value['requestor_sso'].'/'.$req_date;
          } else {
            $cus_id = 'rest';
          }
        ?>
          <tr class = "data_row" cus_id = "<?php print $cus_id; ?>" custom_id = "<?php print $value['custom_id']; ?>">
            <td  class = "employee_name_td">
              <p class = "employee" ><a href="<?php print $request_link; ?>"><?php print $value['emp_name']; ?></a></p>
            </td>
            <td class = "employee_request_td" >
              <p custom_id = "<?php print $value['custom_id']; ?>" class = "employee normal approve-reject-request" ><a href="<?php print $request_link; ?>"><?php print $value['request']; ?></a></p>
            </td>
            <td class = "employee_requestor_td" >
              <p class = "employee normal" ><?php print $value['requestor']; ?></p>
            </td>
            <td class = "employee_date_td" >
              <p class = "employee normal" ><?php print $value['date']; ?></p>
            </td>
            <td class = "employee_button_td">
              <div class="actions">
                <button class = "sprite-icons-copy"></button>
                <button class = "sprite-icons-cross"></button>
                <div class="ajax_throbber"><img src="/sites/all/themes/idmtheme/images/ajax-loader.gif"></div>
              </div>
            </td>
          </tr>
        <?php
        }
        $count++;
      }
    } ?>
    </table>
  </div>
  <?php if ($variables['approve_count'] > 10) { ?>
    <div class="viewall_div">
        <div class="viewall_button white_button">
            <button class="button">View All</button>
        </div>
    </div>
  <?php } ?>
  <div class="approve-link">To find the approvals in the legacy IdM, please <a href="<?php print $notifications_approve_url;?>" target="_blank">click here.</a></div>
</div>
