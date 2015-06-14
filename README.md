# ui-responsive-toolkit ![ ](https://travis-ci.org/lifegadget/ui-responsive-toolbelt.svg) [![npm version](https://badge.fury.io/js/ui-responsive-toolbelt.svg)](http://badge.fury.io/js/ui-responsive-toolbelt) [![Code Climate](https://codeclimate.com/github/lifegadget/ui-responsive-toolbelt/badges/gpa.svg)](https://codeclimate.com/github/lifegadget/ui-responsive-toolbelt) #


> Responsive tools for your Ember app

## Install ##

- Ember-CLI versions 0.2.3+
    ````bash
    ember install ui-responsive-toolbelt
    ````

- Earlier CLI versions
    ````bash
    npm install ui-responsive-toolbelt --save-dev
    ````

## Usage ##

### Responsive Service ###

You can insert the responsive service into your component, controller, [ fill in the blank ] by:

````js
Component.extend({
    responsive: inject.service();
})
````

Now you can reference the services various information services including:

- *viewport* - get height, width, and a "name":
- *screen* - the total and available screen real estate on the users system (not the browsers)
- *body* - height, width of the body element

Also there is a simple `width` and `height` properties which are aliases to the viewport properties.

There is also now a handy breakpoint naming convention supported too. The default configuration is:

````javascript
[
  { id: 'mobile', max: 768},
  { id: 'tablet', min: 768, max: 992 },
  { id: 'desktop', min: 992, max: 1200 },
  { id: 'large', min: 1200, max: 1899 },
  { id: 'huge', min: 1900 }
];
````

You can set this to whatever you like by:

````javascript
this.responsive.setBreakpoints(myBrilliantBreakpoints);
````

Now you'll see that the has a set of boolean flags like `isMobile`, `isTablet`, etc. which indicate the state you are in. As a convenience you can also get a string name back for the breakpoint size with the `deviceType` property. 

## Demo

For an interactive demo (you'll have to change your screen size to make it be *interactive*): [ui-responsive-toolbelt](development.ui-responsive-toolbelt.divshot.io).

## Version Compatibility

This may very well work with older version of Ember and Ember-CLI but it was intended for:

- Ember 1.11.0+
- Ember-CLI 0.2.3+

## Repo Contribution

We're open to your creative suggestions but please move past the "idea" stage 
and send us a PR so we can incorporate your ideas without killing ourselves. :)

## Licensing

This component is free to use under the MIT license:

Copyright (c) 2015 LifeGadget Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
