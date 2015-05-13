import Ember from 'ember';
const { computed, observer, $, A, run, on, typeOf, debug } = Ember;    // jshint ignore:line

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:responsive', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

// test('listening on the mutex', function(assert) {
//   const TestObject = Ember.Object.extend({
//     responsive: Ember.inject.service(),
//     signalEvent: Ember.inject.service('responsive:signalEvent'),
//     changeHappened: false,
//     listener: Ember.computed('responsive.mutex', function() {
//       this.set('changeHappened', true);
//     })
//   });
//   let object = TestObject.create();
//   assert.ok(!object.get('changeHappened'), 'no change should have happened yet');
//   object.signalEvent();
//   assert.ok(object.get('changeHappened'), 'a change should have been detected');
//
// });