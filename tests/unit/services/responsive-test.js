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

test('breakpoints', function(assert) {
  let component = this.subject();
  // setup
  assert.ok(component.breakpoints, 'INIT: breakpoints should be accessible');
  assert.ok(component.width > 0, 'INIT: width should be set at some value greater than zero');
  // let the magic begin
  component.configureBreakpoints(100,100);
  assert.ok(component.isMobile, 'should be identified as a mobile device');
  assert.ok(!component.isDesktop, 'should not be identified as a desktop device');
  assert.ok(true, 'INFO: switching to desktop size');
  component.configureBreakpoints(1000,1000);
  assert.ok(!component.isMobile, 'should not be identified as a mobile device');
  assert.ok(component.isDesktop, 'should be identified as a desktop device');
  assert.ok(true, 'INFO: switching to jumbo size');
  component.configureBreakpoints(2000,2000);
  assert.ok(!component.isDesktop, 'should not be identified as a desktop device');
  assert.ok(component.isJumbo, 'should be identified as a Jumbo device');
});
