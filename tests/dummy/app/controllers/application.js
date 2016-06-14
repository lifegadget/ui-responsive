import Ember from 'ember';
const { computed, observer, $, A, run, on, typeOf, debug, keys, get, set, inject } = Ember;    // jshint ignore:line

export default Ember.Controller.extend({

  responsive: inject.service(),
  isRepressed: false,
  toggledEnablement: false,
  isIndexPage: Ember.computed.equal('currentPath', 'index'),
  notIndexPage: Ember.computed.not('isIndexPage'),
  strategy: 'traditional',
  foobar: computed.alias('responsive.registry.foobar'),
  init() {
    this._super(...arguments);
    run.schedule('afterRender', ()=> {
      this.get('responsive').register('foobar', '#image-container');
    });
  },

  screenJson: computed('responsive.width', function() {
    return JSON.stringify(this.get('responsive.screen'));
  }),
  bodyJson: computed('responsive.width', function() {
    return JSON.stringify(this.get('responsive.body'));
  }),
  tellMeAboutResize: computed('resizeDidHappen', function() {
    this.set('computedPropertyMessage', `A resize happened ... a computed property told me`);
    run.later(() => {
      this.set('computedPropertyMessage','');
    },750);
    return null;
  }),

  actions: {
    strategyChanged(o) {
      this.set('responsive.strategy', o.value);
      this.get('responsive').resize();
    },
    toggleRepression: function() {
      this.toggleProperty('isRepressed');
    },
    toggleEnablement: function() {
      this.toggleProperty('toggledEnablement');
    }
  }

});
