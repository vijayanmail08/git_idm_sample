<div class="notices-content">
  <?php foreach($variables['notices'] as $key=>$value) { ?>
    <div class="notices-row <?php print $value['main_class']?> ">
      <div class="icons">
        <div class="notice-icons <?php print $value['icon_class']?>"></div>
      </div>
      <div class="content">
        <div class="notice-content"><?php print $value['message']?>
          <?php if (isset($value['error'])) { ?>
            <span class="error"><?php print $value['error']; ?></span>
          <?php }?>
        </div>
      </div>
      <div class="actions <?php print $value['button_class']?>">
        <?php if ($value['button_class'] == "has-action") { ?>
          <button class="small_button hover-blue"><?php print $value['button_value']?></button>
        <?php }?>
      </div>
    </div>
    <div class="clearfix"></div>
  <?php }?>
</div>
<?php if (empty($homepage)) {?>
  <div class="viewall_div">
    <div class="viewall_button white_button">
		<button class="button">View All</button>
    </div>
  </div>
<?php } ?>
