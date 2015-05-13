import Ember from 'ember';
const { computed, observer, A, $, run, on, typeOf, debug } = Ember;    // jshint ignore:line
const defaultBreakpoints = [
  { id: 'mobile', max: 768, synonyms: ['xs','tiny']},
  { id: 'tablet', min: 769, max: 992, synonyms: ['sm','small'] },
  { id: 'desktop', min: 993, max: 1200, snyonyms: ['md','medium'] },
  { id: 'jumbo', min: 1201, synonyms: ['md','medium'] }
]; 

let Responsive = Ember.Service.extend({
  init: function() {
    this._resize = run.bind(this, 'resize');
    $(window).on('resize', this._resize);
    this.resize(); // initialize before any events fired
  },
  resizeMutex: null,
  breakpoints: defaultBreakpoints,
  
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
    this.signalEvent(); // signals change on mutex for CP's to listen in on
  },
  
  namedViewports: function(setter=null) {
    const breakpoints = setter ? setter : defaultBreakpoints; // jshint ignore:line
    if(setter) {
      this.set('breakpoints', breakpoints);
    }
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
export var signalEvent = Responsive.signalEvent; 