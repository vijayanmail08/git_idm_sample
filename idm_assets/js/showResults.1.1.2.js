/**
 * showResults()
 *
 * Add a result set and a paginator to container
 * 
 * @version 1.1.2
 * @update February 13th 2009
 * @author Steve Rhoades <sedonami@gmail.com>
 * @params array result result set to display
 * @params object options object of additional settings
 * @options[limit] - limit number of results to display
 * @options[pages] - number of pages to display
 * @options[resultTarget] - container name that references container ie]. #mycontainer, .mycontainer
 * @options[alternateBackground] - an Array of alternating colors, these values will be inserted into %bgcolor% on the template.
 * @todo - add browser history to use url hash to show different results
 * @todo - add ability to pass a function as the first paramater, this could be an ajax call or a function that produces a JSON objec
 */

(function($) {
	$.fn.showResults = function(oResult, options) {
		if(!$.isArray(oResult)) {
			throw "showResults expects an array";
		}
		var settings = {
			limit: 10,
			pages: 10,
			start: 0,
			result: oResult,
			resultTarget: '',
			pagesTarget: '',
			alternateBackground: [],
			total: oResult.length,
			emptyMsg: 'No Results',
			totalPages: 0,
			callback: null
		};
		
		var paginator = {
			pages: 0,
			page: 0,
			next: 0,
			prev: 0,
			prevPage: 0,
			nextPage: 0,
			startPage: 0,
			endPage: 0,
			listStart: 0,
			listEnd: 0			
		};
		
		if(options) {
			$.extend(settings, options);
		}		

		settings.totalPages = Math.ceil(oResult.length/settings.limit);

        return this.each(function() {
            /* save this to self because this changes when scope changes */
            var self = this;
	
			if(settings.total == 0) {
				$(this).append(settings.emptyMsg);
				return;
			}

			if(settings.resultTarget == '') {
				if(!$(self).find(".results").length) {
					$(self).append('<div class="results"></div>');
				}
				var $results = $(self).find('.results');
			} else {
				var $results = $(self).find(settings.resultTarget);
			}

			if(settings.pagesTarget == '') {
				if(!$(self).find(".pagination").length) {
					$(self).prepend('<div class="pagination"></div>');
				}
				var $pagination = $(self).find('.pagination');
			} else {
				var $pagination = $(self).find(settings.pagesTarget);
			}
			
			var tpl = $(this).find(".template").html();		

			self.displayResults = function() {
				var bgFlag = false;
				var offset = settings.start+settings.limit;
				
				if(offset > settings.total) {
					offset = settings.total;
				}
				
				if($.isArray(settings.alternateBackground) && settings.alternateBackground.length == 2) {
						bgFlag = true;
				}
				
				$results.empty();

				for(var i = settings.start; i < offset; i++) {
					var template = tpl;
					if(bgFlag) {
						var bgcolor = (i%2) ? settings.alternateBackground[0] : settings.alternateBackground[1];
						var regex = new RegExp('%bgcolor%', "g");
						template = template.replace(regex, bgcolor);
					}
					for(var k in settings.result[i]) {
						var regex = new RegExp("%"+ k +"%", "g");
						template = template.replace(regex, settings.result[i][k]);
					}
					$results.append(template);
				}
				
				if(typeof settings.callback == "function") {
					settings.callback();
				}
			}

			self.paginate = function() {
				var pages = new Array();
				pages = self.getPageList();
				paginator.page = "";
				paginator.next = self.getNextPage();
				paginator.prev = self.getPrevPage();
				paginator.prevPage = "";
				paginator.nextPage = "";

				if(settings.total > settings.limit) {
					for(var i = 0, len = pages.length; i < len;i++) {
						if(pages[i] != undefined) {
							if( i == (settings.start/settings.limit)+1 ) {
								paginator.page += "&nbsp;<span class='active'>"+ i +"</span>&nbsp;";
							} else {
								paginator.page += "&nbsp;<a name='#"+ $(self).attr('id') +"-page-"+ (i) +"' alt='"+ pages[i] +"'>"+ i +"</a>&nbsp;";
							}
						}
					}
					
					if(settings.start != 0) {
						paginator.prevPage = "&nbsp;<a name='#"+ $(self).attr('id') +"-page-prev' alt='"+ paginator.prev +"'>Prev</a>&nbsp;";
					} else {
						paginator.prevPage = "&nbsp;<span class='active'>Prev</span>&nbsp;";												
					}

					if(paginator.next < settings.total && paginator.next != 0) {
						paginator.nextPage = "&nbsp;<a name='#"+ $(self).attr('id') +"-page-next' alt='"+ paginator.next +"'>Next</a>&nbsp;";
					} else {
						paginator.nextPage = "&nbsp;<span class='active'>Next</span>&nbsp;";						
					}
					
					$pagination.empty();
					$pagination.append(paginator.prevPage + paginator.page + paginator.nextPage);
					
					$pagination.find("a").click(function(e) {				
						settings.start = parseInt($(this).attr('alt'));
						//repaginate
						self.paginate();
						//show new result set
						self.displayResults();
						return false;
					});
				} else {
					$pagination.empty();					
				}
			}

			self.getPageList = function() {
				paginator.startPage  = (Math.ceil((settings.start / settings.limit)) + 1);
				paginator.endPage    = settings.totalPages;
				paginator.listStart  = Math.ceil(paginator.startPage - (settings.pages / 2));
				paginator.listEnd    = Math.floor(paginator.startPage + (settings.pages / 2));
		
				if (paginator.listEnd > settings.totalPages) {
					paginator.listStart = (settings.totalPages - (settings.pages - 1));
					paginator.listEnd = settings.totalPages;
				}
		
				if ((paginator.listEnd - Math.abs(paginator.listStart)) < (settings.pages - 1)) {
					paginator.listEnd = settings.pages;
				}
		
				if(paginator.listStart < 1) {
					paginator.listStart = 1;
				}
		
				var arr = new Array();
				for (var i = paginator.listStart; i <= paginator.listEnd ; ++i) {
					if (i > settings.totalPages) {
						break;
					}
					arr[i] = ((i - 1) * settings.limit);
				}
				return arr;
			
			}

			self.getNextPage = function() {
				paginator.nextPage = 0;
				if ((settings.start + settings.limit) > settings.total) {
					paginator.nextPage = 0;
				} else {
					paginator.nextPage = (settings.start + settings.limit);
				}
		
				return paginator.nextPage;
			}
		
			self.getPrevPage = function() {
				paginator.prevPage = 0;
				if (settings.start == 0)  {
					paginator.prevPage = 0;
				} else {
					paginator.prevPage = (settings.start - settings.limit);
				}
		
				return paginator.prevPage;
			}

			self.paginate();
			self.displayResults();
		});
	}
})(jQuery);