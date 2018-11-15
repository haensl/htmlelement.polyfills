htmlelement.polyfills
=====================

[![NPM](https://nodei.co/npm/htmlelement.polyfills.png?downloads=true)](https://nodei.co/npm/htmlelement.polyfills/)

[![npm version](https://badge.fury.io/js/htmlelement.polyfills.svg)](http://badge.fury.io/js/htmlelement.polyfills)
[![Build Status](https://travis-ci.org/haensl/htmlelement.polyfills.svg?branch=master)](https://travis-ci.org/haensl/htmlelement.polyfills)


#### Lightweight vanilla JavaScript polyfills for the HTMLElement interface

The htmlelement.polyfills library offers lightweight, vanilla JavaScript polyfills for some of the most frequently used DOM interactions on [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement)\.

### Usage:

1. Install the htmlelement.polyfills package

via **NPM**:

```javascript
npm install htmlelement.polyfills --save
```

via **Yarn**:

```javascript
yarn add htmlelement.polyfills
```

2. Import and invoke the library in your application:

ESM:

```javascript
import HTMLElementPolyfills from 'htmlelement.polyfills';
HTMLElementPolyfills();
```

CommonJS:
```javascript
require('htmlelement.polyfills')();
```


### [Available Polyfills:](docs/API.md)

- [`HTMLElement.addClass(className)`](docs/API.md/#HTMLElement.addClass)
- [`HTMLElement.ancestor([selector])`](docs/API.md/#HTMLElement.ancestor)
- [`HTMLElement.empty()`](docs/API.md/#HTMLElement.empty)
- [`HTMLElement.find(selector [, recursive])`](docs/API.md/#HTMLElement.find)
- [`HTMLElement.hasClass(className)`](docs/API.md/#HTMLElement.hasClass)
- [`HTMLElement.remove()`](docs/API.md/#HTMLElement.remove)
- [`HTMLElement.removeClass(className)`](docs/API.md/#HTMLElement.removeClass)
- [`HTMLElement.toggleClass(className)`](docs/API.md/#HTMLElement.toggleClass)
- [`HTMLElement.trigger(event)`](docs/API.md/#HTMLElement.trigger)

### [Changelog](CHANGELOG.md)

### [License](LICENSE)

The MIT License (MIT)

Copyright (c) Hans-Peter Dietz [@h_p_d](https://twitter.com/h_p_d) | [h.p.dietz@gmail.com](mailto:h.p.dietz@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
