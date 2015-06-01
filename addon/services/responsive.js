import Ember from 'ember';
const { computed, observer, A, $, run, on, typeOf, debug } = Ember;    // jshint ignore:line
const capitalize = Ember.String.capitalize;
const defaultBreakpoints = [
  { id: 'mobile', max: 768, synonyms: ['xs','tiny']},
  { id: 'tablet', min: 769, max: 992, synonyms: ['sm','small'] },
  { id: 'desktop', min: 993, max: 1200, snyonyms: ['md','medium'] },
  { id: 'large', min: 1201, max: 1899, synonyms: ['lg','large'] },
  { id: 'jumbo', min: 1900, synonyms: ['hg','huge'] }
];

let Responsive = Ember.Service.extend({
  init: function() {
    this._resize = run.bind(this, 'resize');
    $(window).on('resize', this._resize);
    this.setBreakpoints();
    this.resize(); // initialize before any events fired
  },
  resizeMutex: null,
  breakpoints: null,

  resize: function() {
    const w = window, doc = window.document.documentElement, body = window.document.body;
    const viewportWidth = w.innerWidth || doc.clientWidth;
    const viewportHeight = w.innerHeight || doc.clientHeight;
    this.set('width', viewportWidth);
    this.set('height', viewportHeight);
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
    this.configureBreakpoints(viewportWidth, viewportHeight);
    this.signalEvent(); // signals change on mutex for CP's to listen in on
  },

  setBreakpoints: function(setter) {
    const breakpoints = setter ? setter : defaultBreakpoints; // jshint ignore:line
    this.set('breakpoints', breakpoints);
  },
  configureBreakpoints: function(width,height) {
    const breakpoints = this.get('breakpoints');
    for (var i=0; i<breakpoints.length; i++) {
      const logicOperand = 'is' + capitalize(breakpoints[i].id);
      const { min, max } = breakpoints[i];
      const logicCondition = (!min || width >= min) && (!max || width<max);
      this.set(logicOperand, logicCondition);
    }
    height = height; // grand-silliness ... will use height later, don't jshint reminding me now
  },
  signalEvent: function() {
    this.notifyPropertyChange('resizeMutex');
  },

  destroy: function() {
    $(window).off('resize', this._resize);
    this._super();
  }

});

export default Responsive;
