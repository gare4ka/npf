goog.provide('npf.ui.stickyHead.HeadRenderer');

goog.require('goog.dom.classes');
goog.require('goog.style');
goog.require('npf.ui.renderComponent.Renderer');


/**
 * @constructor
 * @extends {npf.ui.renderComponent.Renderer}
 */
npf.ui.stickyHead.HeadRenderer = function() {
	goog.base(this);
};
goog.inherits(npf.ui.stickyHead.HeadRenderer, npf.ui.renderComponent.Renderer);
goog.addSingletonGetter(npf.ui.stickyHead.HeadRenderer);


/**
 * @type {string}
 */
npf.ui.stickyHead.HeadRenderer.CSS_CLASS = goog.getCssName('stickyHead-head');

/**
 * @enum {string}
 */
npf.ui.stickyHead.HeadRenderer.CssClass = {
	STICKY: goog.getCssName('stickyHead-stickyHead')
};


/** @inheritDoc */
npf.ui.stickyHead.HeadRenderer.prototype.createDom = function(block) {
	/** @type {!Element} */
	var element = goog.base(this, 'createDom', block);

	if (block.isSticky()) {
		goog.dom.classes.add(element, this.getStickyCssClass());
	}

	return element;
};

/** @inheritDoc */
npf.ui.stickyHead.HeadRenderer.prototype.getCssClass = function() {
	return npf.ui.stickyHead.HeadRenderer.CSS_CLASS;
};

/**
 * @return {string}
 */
npf.ui.stickyHead.HeadRenderer.prototype.getStickyCssClass = function() {
	return npf.ui.stickyHead.HeadRenderer.CssClass.STICKY;
};

/**
 * @param {!npf.ui.stickyHead.Head} block
 * @param {boolean} visible
 */
npf.ui.stickyHead.HeadRenderer.prototype.setVisible = function(block, visible) {
	/** @type {Element} */
	var element = block.getElement();

	if (element) {
		goog.style.setStyle(element, 'display', visible ? '' : 'none');
	}
};