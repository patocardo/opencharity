(function($) {
	'use strict';

	var locate = window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/^\/*/, '/').replace(/\/*$/, '');
	var elementTemplate = '<div class="descrip__member">'+
		'<img src="${node.field_logo.src}" alt="${node.field_logo.alt}" title="${node.title}"></div>';
	var dotControl = '<button class="descrip__control__dot" title="change member\'s page"></button>';

	/**
	 * @param  {Object} status with all Paginator's variables in their current value
	 * @return {void}
	 */
	function afterRender(status) {
		if(status.settings.container.children('div').length < status.quant - 2){
			status.settings.container.removeClass('row-grow');
			status.settings.container.addClass('row-shrink');
		}
		else{
			status.settings.container.addClass('row-grow');
			status.settings.container.removeClass('row-shrink');			
		}
	}

	/**
	 * Create a new Paginator instance and renders it
	 */
	$(document).ready(function(){
		var memberSlider = new Paginator({
			loadable: false,
			url: locate + '/members',
			quantities: {
				'0': 2,
				'768': 4,
				'1024': 5
			},
			arrows: false,
			dots: true,
			container: $('#members-row'),
			element: elementTemplate,
			previousControl: null,
			nextControl: null,
			dotControl: dotControl,
			dotContainer: $('#members-control'),
			pageLength: 10,
			renderCallBack: afterRender
		});
		memberSlider.render();	
	})

})(jQuery);