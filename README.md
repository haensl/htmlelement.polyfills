htmlelement.polyfills
=====================

#### Lightweight vanilla JavaScript Polyfills for the HTMLElement interface

The htmlelement.polyfills library offers a lightweight, vanilla JavaScript implementation of some of the most frequently used DOM interactions.

### Usage:

Install the package via **NPM**:

```javascript
npm install htmlelement.poyfills --save
```

or **Bower**:

```javascript
bower install htmlelement.poyfills --save
```

Include the library to your application:

```html
<script src="/node_modules/htmlelement.poyfills/dist/htmlelement.poyfills.min.js"></script>
```

### [Available Polyfills:](docs/API.md)

-	[`HTMLElement.addClass(className)`](docs/API.md/#HTMLElement.addClass)
-	[`HTMLElement.ancestor([selector])`](docs/API.md/#HTMLElement.ancestor)
-	[`HTMLElement.find(selector [, recursive])`](docs/API.md/#HTMLElement.find)
-	[`HTMLElement.hasClass(className)`](docs/API.md/#HTMLElement.hasClass)
-	[`HTMLElement.remove()`](docs/API.md/#HTMLElement.remove)
-	[`HTMLElement.removeClass(className)`](docs/API.md/#HTMLElement.removeClass)
-	[`HTMLElement.toggleClass(className)`](docs/API.md/#HTMLElement.toggleClass)
-	[`HTMLElement.trigger(event)`](docs/API.md/#HTMLElement.trigger)

### [Release Notes](RELEASE_NOTES.md)

License
-------

The MIT License (MIT)

Copyright (c) Hans-Peter Dietz [@h_p_d](https://twitter.com/h_p_d) [h.p.dietz@gmail.com](mailto:h.p.dietz@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
