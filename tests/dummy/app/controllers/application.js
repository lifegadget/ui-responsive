import Ember from 'ember';
const { computed, observer, $, A, run, on, typeOf, debug, keys, get, set, inject } = Ember;    // jshint ignore:line

export default Ember.Controller.extend({

  responsive: inject.service(),
  isRepressed: false,
  toggledEnablement: false,
  isIndexPage: Ember.computed.equal('currentPath', 'index'),
  notIndexPage: Ember.computed.not('isIndexPage'),

  screenJson: computed('responsive.width', function() {
    return JSON.stringify(this.get('responsive.screen'));
  }),
  bodyJson: computed('responsive.width', function() {
    return JSON.stringify(this.get('responsive.body'));
  }),

  actions: {
    toggleRepression: function() {
      console.log('toggling');
      this.toggleProperty('isRepressed');
    },
    toggleEnablement: function() {
      console.log('toggling');
      this.toggleProperty('toggledEnablement');
    }
  }

});
