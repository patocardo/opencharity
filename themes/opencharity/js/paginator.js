var Paginator = Paginator || {};

(function($){
 'use strict';
 	/** 
 	 * Paginator is a facilitator for sliding content, with an optional lazy loading capacity
 	 * @param {Object} settings, with the following form:
	 *												 	  {
	 *															loadable: false,
	 *															url: '',
	 *															quantities: {
	 *																'0': 1,
	 *																'768': 4,
	 *																'1024': 5
	 *															},
	 *															arrows: true,
	 *															dots: true,
	 *															container: null,
	 *															element: null,
	 *															previousControl: null,
	 *															nextControl: null,
	 *															dotControl: null,
	 *															dotContainer: null,
	 *															pageLength: 10,
	 *															renderCallBack: function(){ return true}
	 *														}
	 * @return {Object} Public functions that allows external handling
 	 */
	Paginator = function(settings){
		var dataHolder = [];
		var quant = null;
		var first = 0;
		var numDots = 1;
		var currentDot = 0;
		var settingsValidated = false;
		var screenWidth = 320;
		var lastRemotePage = 0;
		var endOfData = false;
		var previousEnabled = false;
		var nextEnabled = true;

		// settings overwrite

		settings = $.extend({
			loadable: false,
			url: '',
			quantities: {
				'0': 1,
				'768': 4,
				'1024': 5
			},
			arrows: true,
			dots: true,
			container: null,
			element: null,
			previousControl: null,
			nextControl: null,
			dotControl: null,
			dotContainer: null,
			pageLength: 10,
			renderCallBack: function(){ return true}
		}, settings);

		// navigation
		/**
		 * if available, go to next page
		 * @return {void}
		 */
		function next() {
			if(nextEnabled) {
				first += quant;
				if(settings.loadable && !endOfData && first + quant < dataHolder.length) {
					loadData(function(){
						renderElements();
						currentDot++;
						renderDots();	
					}, function() {
						console.error('Errback')
					});
				}
				else {
					renderElements();
					currentDot++;
					renderDots();						
				}
			}
		}

		/**
		 * go to previous page
		 * @return {void}
		 */
		function previous() {
			if(previousEnabled) {
				first -= quant;
				first = (first >= 0)? first : 0;
				renderElements();
				currentDot--;
				renderDots();	
			}
		}

		/**
		 * Go to specific page
		 * @param  {Integer} page
		 * @return {void}
		 */
		function goTo(page){
			first = quant * page;
			currentDot = page;
			renderElements();
			renderDots();	
		}

		// process
		/**
		 * display formated data and pagination buttons
		 * @return {void}
		 */
		function render() {
			if(!settingsValidated) {
				validateSettings();
			}
			qToDisplay();
			loadData(function(){
				renderElements();
				renderDots();	
				if(settings.arrows) {
					assignArrowsBehaviors();
				}
			}, function() {
				console.error('Errback')
			});
		}

		/**
		 * get the current all private variables and final settings
		 * @return {Object}
		 */
		function getStatus() {
			return {
				dataHolder: dataHolder,
				quant: quant,
				first: first,
				numDots: numDots,
				currentDot: currentDot,
				settingsValidated: settingsValidated,
				screenWidth: screenWidth,
				lastRemotePage:lastRemotePage,
				endOfData: endOfData,
				previousEnabled: previousEnabled,
				nextEnabled: nextEnabled,
				settings: settings
			}
		}

		/**
		 * @param  {String}	a
		 * @param  {String}	b
		 * @return {Integer}
		 */
		function orderNum(a, b) {
			return parseInt(a) - parseInt(b);
		}

		/**
		 * Sets the quantity of items to display
		 * @return {void}
		 */
		function qToDisplay() {
			var screenWidth = $(window).width();
			Object.getOwnPropertyNames(settings.quantities).sort(orderNum).forEach(
			  function (val) {
			  	if(screenWidth > parseInt(val)){	// mobile first approach
			  		quant = settings.quantities[val];
			  	}
			  }
			);
		}

		/**
		 * Sets the quantity of pagination buttons to display
		 * @return {void}
		 */
		function dotToDisplay(){
			numDots = Math.ceil(dataHolder.length / quant, 0);
		}

		/**
		 * format and display Items, sets navigation values
		 * @return {void}
		 */
		function renderElements(){
			var newHTML;
			settings.container.empty();
			for(var i = first; i < quant + first; i++) {
				newHTML = settings.element.replace(/\$\{\s*([\w\-_]+(\.[\w\-_]+)*)\s*\}/g, function(matched, block) {
					var parts = block.split('.');
					var rtrn = '';
					var parentData = dataHolder[i];
					for(var j=0; j < parts.length; j++){
						if(parentData.hasOwnProperty(parts[j])){
							parentData = rtrn = parentData[parts[j]];
						}
						else {
							break;
						}
					}
				  if($.type(parentData) === 'string'){
				    rtrn = parentData;
				  }
					return rtrn;
				});
				settings.container.append(newHTML);
				if (i === dataHolder.length - 1){
					break;
				}
			}
			previousEnabled = (first > 0);

			nextEnabled = ((!settings.loadable || endOfData) && first >= quant * currentDot)?	false : true;

			settings.renderCallBack(getStatus());
		}

		/**
		 * Calculate, format and display pagination buttons
		 * @return {void}
		 */
		function renderDots() {
			if(settings.dots) {
				if (settings.dotContainer.children().length > 0) {
					settings.dotContainer.children().each( function(index) {
						if(parseInt(currentDot) === parseInt(index)) {
							$(this).addClass('active');
						}
						else {
							$(this).removeClass('active');
						}
					});
				}
				else {
					dotToDisplay();
					if(numDots > 1) {
						var $newDot;
						for(var i_dot = 0; i_dot < numDots; i_dot++) {
							$newDot = $(settings.dotControl).attr('data-page', i_dot);
							settings.dotContainer.append($newDot);
							$newDot.click(function(){
								goTo( $(this).attr('data-page'));
							});
							if (i_dot === currentDot) {
								$newDot.addClass('active');
							}
							else {
								$newDot.removeClass('active');
							}
						}
					}
				}
			}
		}

		/**
		 * Set the corresponding behavior to previous and next buttons
		 * @return {void}
		 */
		function assignArrowsBehaviors() {
			if(settings.previousControl && settings.nextControl) {
				settings.previousControl.click(previous);
				settings.nextControl.click(next);
			}
		}

		/**
		 * Loads the data from settings.url
		 * @param  {Function} callback, run after loading
		 * @param  {Function}  errback, run on error
		 * @return {void}
		 */
		function loadData(callback, errback) {
			if(dataHolder.length === 0 || settings.loadable) {
				$.ajax({
					url: settings.url + '?page=' + lastRemotePage,
					success: function (response) {
					if(response.nodes && response.nodes.length) {
							dataHolder = dataHolder.concat(response.nodes);
							if(response.nodes.length < settings.pageLength) {
								endOfData = true;
							}
							else {
								lastRemotePage++;
							}
						}
						else {
							endOfData = true;
						}
						callback()
					},
					fail: function (error) {
						console.error(error);
						lastRemotePage--;
						errback();
					}
				});
			}
		}

		/**
		 * Rearrange things on resize
		 */
		$(window).resize(function() {
			qToDisplay();
			if(settings.dots) {
				settings.dotContainer.empty();
				dotToDisplay()
				renderDots();
			}
			renderElements();
		});

		/**
		 * Validate the configuration
		 * @return {Boolean}
		 */
		function validateSettings() {
			// fatal errors
			if (!settings || $.type(settings) !== 'object') {
				console.error('Paginator instance must have settings object');
				return false;
			}
			if (!settings.quantities || $.type(settings.quantities) !== 'object') {
				console.error('Settings.quantities must be an object');
				return false;
			}
			if (!settings.container || !(settings.container instanceof $)) {
				console.error('Settings.container must be an jQuery object');
				return false;
			}
			if (!settings.element || $.type(settings.element) !== 'string'){
				console.error('Settings.element must be an string with a valid HTML fragment');
				return false;
			}
			if (!settings.url || $.type(settings.url) !== 'string'){
				console.error('Settings.url must be an string with a valid url');
				return false;
			}

			// warnings
			if (settings.dots && (!settings.dotContainer || !(settings.dotContainer instanceof $)
			|| !settings.dotControl || $.type(settings.dotControl) != 'string' )){
				console.warn('if settings.dot is true, Settings.dotControl and settings.dotContainer must be jQuery objects');
				settings.dots = false;
			}
			if (settings.arrows && (!settings.previousControl || !(settings.previousControl instanceof $)
			|| !settings.nextControl || !(settings.nextControl instanceof $) )){
				console.warn('if settings.arrows is true, Settings.previousControl and settings.nextControl must be jQuery objects');
				settings.arrows = false;
			}
		}
		// asignar comportamiento de redimensión
		return {
			next: function() {
				next();
			},
			previous: function() {
				previous();
			},
			goTo: function(page){
				goTo(page);	
			},
			render: function() {
				render();
			}
		}
	};

})(jQuery)