<?php if($variables['submitted_count'] > 0 ) { ?>
<div class="submitted-content">
  <div class="submitted-table">
    <table  id="table_wrapper" >
         <tr class="submitted-header">
              <td colspan = "4" id="table_header" >
                <div id = "header_arrow" class="expand"></div>
                <h2>My Submitted Tasks (<?php print $variables['submitted_count'];?>)</h2>
              </td>
         </tr>

         <tr id="header-cols">
              <td class = "submitted_task">
                <h3 class="col">Task</h3>
              </td>
             <!--<td class = "submitted_by">
                 <h3 class="col">Submitted By</h3>
             </td>-->
             <td class = "submitted_date">
                 <h3 class="col">Submitted Date</h3>
             </td>
             <td class = "updated_date">
                 <h3 class="col">Last Updated Date</h3>
             </td>
             <td class = "submitted_status">
                 <h3 class="col">Status</h3>
             </td>
         </tr>

        <?php
        $count = 0;
        foreach($variables['submitted'] as $key=>$value) {
        if ($count < 5) { ?>
          <tr class = "data_row" >
            <td  class = "submitted_task">
              <p class = "submitted" ><a href="/submitted_task/<?php print $value['id'];?>"><?php print $value['task']; ?></a></p>
            </td>
            <!--<td class = "submitted_by" >
              <p class = "submitted normal" ><?php print $value['submitted_by']; ?></p>
            </td>-->
            <td class = "submitted_date" >
              <p class = "submitted normal" ><?php print $value['date']; ?></p>
            </td>
            <td class = "updated_date" >
              <p class = "submitted normal" ><?php print $value['updated_date']; ?></p>
            </td>
            <td class = "submitted_status" >
              <p class = "submitted normal" ><?php print $value['status']; ?></p>
            </td>
          </tr>
        <?php
        }
        $count++;
      }
      ?>
     </table>
  </div>
  <?php if ($variables['submitted_count'] > 5) { ?>
    <div class="viewall_div">
        <div class="viewall_button white_button">
            <button class="button">View All</button>
        </div>
    </div>
  <?php } ?>
    <div class="request-link">To find the submitted tasks in the legacy IdM, please <a href ="<?php print $notifications_request_url;?>" target="_blank">click here.</a></div>
</div>
<?php } ?>
