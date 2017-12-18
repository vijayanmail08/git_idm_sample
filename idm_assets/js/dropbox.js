jQuery(function($) {
	$(document).ready(function() {
		 $('#idm-dropbox-deprovision-form #edit-selectall').live('click', function() {
				var check = this.checked ? true : false;
				//alert(check);
				//console.log(check ? 'checked' : 'not checked');
				var boxes = $('.form-checkbox');
				for (i in $('.form-checkbox')) {
					var box = $('.form-checkbox')[i];
					//alert(box.value);
					//console.log(box.value);
					box.checked = check;
				}
			});
	});
});