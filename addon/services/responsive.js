import Ember from 'ember';
const { keys } = Object;
const { computed, observer, $, run, get, String: {capitalize} } = Ember;
const a = Ember.A;
const defaultBreakpoints = [
  { id: 'mobile', max: 768, synonyms: ['xs','tiny']},
  { id: 'tablet', min: 768, max: 992, synonyms: ['sm','small'] },
  { id: 'desktop', min: 992, max: 1200, snyonyms: ['md','medium'] },
  { id: 'large', min: 1200, max: 1900, synonyms: ['lg','large'] },
  { id: 'huge', min: 1900, synonyms: ['hg','huge'] }
];
const DEFAULT_ASPECT = 16 / 10;

let Responsive = Ember.Service.extend({
  init: function() {
    this._resize = run.bind(this, 'resize');
    $(window).on('resize', this._resize);
    this.setBreakpoints();
    this.recalc(); // initialize before any events fired
  },
  breakpoints: null,
  _breakpoints: observer('breakpoints', function() {
    this.recalc();
  }),
  resizeDidHappen: false,
  callbacks: [],
  strategy: 'traditional',
  aspectRatio: computed('strategy', function() {
    const strategy = this.get('strategy');
    return a(['traditional', 'oriented']).contains(strategy) ? DEFAULT_ASPECT : strategy.split(':')[0] / strategy.split(':')[1];
  }),
  resize() {
    this.recalc();
  },
  recalc() {
    const w = window, doc = window.document.documentElement, body = window.document.body;
    const viewportWidth = w.innerWidth || doc.clientWidth;
    const viewportHeight = w.innerHeight || doc.clientHeight;
    this.set('width', viewportWidth);
    this.set('height', viewportHeight);
    this.set('largestSide', viewportWidth > viewportHeight ? viewportWidth : viewportHeight);
    if (viewportWidth < viewportHeight && get(this, 'strategy') !== 'traditional') {
      this.set('effectiveSize', Math.floor(viewportHeight * get(this, 'aspectRatio')));
    } else {
      this.set('effectiveSize', viewportWidth);
    }
    this.set('viewport', {
      width: viewportWidth,
      height: viewportHeight
    });
    this.set('body', {
      width: body.clientWidth,
      height: body.clientHeight
    });
    this.set('screen', {
      width: w.screen.width,
      height: w.screen.height,
      availWidth: w.screen.availWidth, // http://www.quirksmode.org/dom/w3c_cssom.html#t10
      availHeight: w.screen.availHeight
    });
    this.setRegistry();
    const {strategy, effectiveSize} = this.getProperties('strategy', 'effectiveSize');
    this.configureBreakpoints(strategy === 'traditional' ? viewportWidth : effectiveSize);
  },

  /**
   * Register a function callback for when a resize happens
   */
  register(name, dom) {
    this._registry[name] = dom;
    this.setRegistry();
    this.doubleCheck(name); // ensures height has had time to "settle"
  },
  deregister(name) {
    delete this._registry[name];
    this.setRegistry();
  },
  _registry: {},
  setRegistry() {
    const newRegistry = {};
    const registry = this._registry || [];
    keys(registry).forEach(item => {
      newRegistry[item] = Ember.Object.create({
        width:  window.$(registry[item]).width(),
        height: window.$(registry[item]).height()
      });
    });
    this.set('registry', newRegistry);
  },
  doubleCheck(name) {
    run.later(() => {
      const registeredValue = this.get(`registry.${name}`).height;
      const currentValue = window.$(this._registry[name]).height();
      if (registeredValue !== currentValue) {
        this.set(`registry.${name}.height`, currentValue);
      }
    }, 50);
  },

  setBreakpoints(setter) {
    const breakpoints = setter ? setter : defaultBreakpoints; 
    this.set('breakpoints', $.extend({}, breakpoints));
  },
  configureBreakpoints: function(width) {
    const breakpoints = this.get('breakpoints');
    let deviceType = null;
    for (var i=0; i<breakpoints.length; i++) {
      const { id, min, max } = breakpoints[i];
      const logicOperand = 'is' + capitalize(id);
      const negationOperand = 'not' + capitalize(id);
      const logicCondition = (!min || width >= min) && (!max || width<max);
      this.set(logicOperand, logicCondition);
      this.set(negationOperand, !logicCondition);
      deviceType = logicCondition ? id : deviceType;
    }
    this.set('deviceType', deviceType);
  },

  destroy: function() {
    $(window).off('resize', this._resize);
    this._super();
  },
  biggerThanTablet: computed.or('isDesktop', 'isLarge', 'isHuge'),
  biggerThanDesktop: computed.or( 'isLarge', 'isHuge'),
  smallerThanDesktop: computed.or('isTablet', 'isMobile'),

  isPortrait: computed('width', 'height', function() {
    return this.get('width') < this.get('height') ;
  }),
  isLandscape: computed.not('isPortrait')
});

export default Responsive;
