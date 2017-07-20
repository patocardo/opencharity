(function($) {
	'use strict';
	
	var locate = window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/^\/*/, '/').replace(/\/*$/, '');
	var elementTemplate = '<div class="col--quarter blog__content__element">'+
		'		<div class="text blog__content__element__label">${node.title}</div>'+
		'		<hr class="blog__content__element__hr">'+
		'		<div class="text text--small blog__content__element__body">${node.body}</div>'+
		'		<hr class="blog__content__element__hr">'+
		'		<div class="text text--small blog__content__element__date">${node.changed}</div>'+
		'	</div>';

	/**
	 * @param  {Object} status with all Paginator's variables in their current value
	 * @return {void}
	 */
	function afterRender(status) {
		if(status.settings.container.children('div').length < status.quant - 1){
			status.settings.container.removeClass('row-grow');
			status.settings.container.addClass('row-shrink');
		}
		else{
			status.settings.container.addClass('row-grow');
			status.settings.container.removeClass('row-shrink');			
		}

		if(status.previousEnabled) {
			status.settings.previousControl.attr('disabled', false);
			status.settings.previousControl.removeClass('blog__slide--disabled');			
		}
		else {
			status.settings.previousControl.attr('disabled', true);
			status.settings.previousControl.addClass('blog__slide--disabled');
		}
		if(status.nextEnabled) {
			status.settings.nextControl.attr('disabled', false);
			status.settings.nextControl.removeClass('blog__slide--disabled');			
		}
		else {
			status.settings.nextControl.attr('disabled', true);
			status.settings.nextControl.addClass('blog__slide--disabled');
		}
	}

	/**
	 * Create a new Paginator instance and renders it
	 */
	$(document).ready(function(){
		var blogSlider = new Paginator({
			loadable: true,
			url: locate + '/blogs',
			quantities: {
				'0': 1,
				'768': 3,
				'1024': 4
			},
			arrows: true,
			dots: false,
			container: $('#blog-row'),
			element: elementTemplate,
			previousControl: $('#blog-previous'),
			nextControl: $('#blog-next'),
			dotControl: '',
			dotContainer: null,
			pageLength: 10,
			renderCallBack: afterRender
		});
		blogSlider.render();	
	})

})(jQuery);