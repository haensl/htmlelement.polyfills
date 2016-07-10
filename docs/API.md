<a name="top"></a>htmlelement.polyfills API
===========================================

[◀ Back to Overview](../README.md)

Available polyfills
-------------------

- [`HTMLElement.addClass(className)`](#HTMLElement.addClass)
- [`HTMLElement.ancestor([selector])`](#HTMLElement.ancestor)
- [`HTMLElement.empty()`](#HTMLElement.empty)
- [`HTMLElement.find(selector [, recursive])`](#HTMLElement.find)
- [`HTMLElement.hasClass(className)`](#HTMLElement.hasClass)
- [`HTMLElement.remove()`](#HTMLElement.remove)
- [`HTMLElement.removeClass(className)`](#HTMLElement.removeClass)
- [`HTMLElement.toggleClass(className)`](#HTMLElement.toggleClass)
- [`HTMLElement.trigger(event)`](#HTMLElement.trigger)

### <a name="HTMLElement.addCLass"></a>`HTMLElement.addClass(className)`

Adds the given class to the element. Multiple classes must be separated by spaces.

```javascript
  var elem = document.createElement('div');
  elem.addClass('myClass myOtherClass');
  elem.hasClass('myClass'); // returns true
  elem.hasClass('myOtherClass'); // returns true
```

**className** : `string`

The class to add. Multiple classes must be separated by spaces.

### <a name="HTMLElement.ancestor"></a>`HTMLElement.ancestor([selector]) -> {HTMLElement | false}`

Returns the element's ancestor. If a selector is supplied, the element's ancestors are traversed until a matching ancestor is found. If none of the element's ancestors matches the selector, the element's immediate ancestor, i.e. parent, is returned. If the element has no parent node, e.g. is the root node, `false` is returned.

```javascript
var root = document.createElement('div');
root.addClass('rootClass');
var child = document.createElement('div');
child.addClass('firstOrderChild')
var secondChild = document.createElement('div');
child.appendChild(secondChild);
root.appendChild(child);
//  tree structure:
//  <div class="myClass">
//    <div class="firstOrderChild">
//      <div></div>
//    </div>
//  </div>
secondChild.ancestor(); // returns child: <div class="firstOrderChild"></div>
secondChild.ancestor('.rootClass'); // returns root: <div class="rootClass"></div>
```

**Returns** : `false` or `HTMLElement`

The first of the element's ancestors that matches `selector` or the element's parent if either no selector was supplied or the selector does not match any ancestors. If the element has no parent, e.g. is the root node, `false` is returned.

**selector** : `string` (optional)

An optional selector to filter by.

### <a name="HTMLElement.empty"></a>`HTMLElement.empty()`

Removes all children from an element.

```javascript
var parent = document.createElement('div');
var child1 = document.createElement('div');
var child2 = document.createElement('div');

parent.appendChild(child1);
parent.appendChild(child2);
// parent is now: <div>
//                  <div></div>
//                  <div></div>
//                </div>
// parent.children.length is now 2
parent.empty();
// parent is now: <div></div>
// parent.children.length is now 0
```

### <a name='HTMLElement.find'></a>`HTMLElement.find(selector [, recursive]) -> {Array}`

Searches for children matching the given selector.

```javascript
var root = document.createElement('div');
var child = document.createElement('div');
child.addClass('childClass');
var secondChild = document.createElement('div');
secondChild.addClass('secondChildClass');
anotherSecondChild = document.createElement('div');
anotherSecondChild.addClass('secondChildClass');
var thirdChild = document.createElement('div');
thirdChild.addClass('thirdChildClass')
secondChild.appendChild(thirdChild);
child.appendChild(secondChild);
child.appendChild(anotherSecondChild);
root.appendChild(child);
//  tree structure:
//  <div>
//    <div class="childClass">
//      <div class="secondChildClass">
//        <div class="thirdChildClass"></div>
//      </div>
//      <div class="secondChildClass"></div>
//    </div>
//  </div>
root.find('.childClass'); // returns [child]
root.find('.secondChildClass'); // returns []
root.find('.secondChildClass', true); // returns [secondChild, anotherSecondChild]
root.find('.thirdChild'); // returns []
root.find('.thirdChild', true); // returns [thirdChild]
```

**Returns** : `Array`

An `Array` containing child nodes matching the given selector.

**selector** : `string`

The selector to filter child nodes by.

**recursive** : `boolean` (optional) [Default: `false`\]

If set to `true`, `find()` is recursively applied to child nodes instead of filtering only direct children.

### <a name="HTMLElement.hasClass"></a>`HTMLElement.hasClass(className) -> {boolean}`

Checks whether the element is assigned the given class.

```javascript
var elem = document.createElement('div');
elem.className = 'myClass';
elem.hasClass('myClass'); // returns true
```

**Returns** : `boolean`

`true` if the element is assigned the given class, `false` otherwise.

**className** : `string`

The class to check for.

### <a name="HTMLElement.remove"></a>`HTMLElement.remove()`

Removes the element from the DOM.

```javascript
var parent = document.createElement('div');
var child1 = document.createElement('div').addClass('child1');
var child2 = document.createElement('div').addClass('child2');
parent.appendChild(child1);
parent.appendChild(child2)
// parent is now <div>
//                <div class="child1"></div>
//                <div class="child2"></div>
//              </div>
// parent.children.length is now 2
child1.remove();
// parent is now <div>
//                <div class="child2"></div>
//               </div>
// parent.children.length is now 1
```

### <a name="HTMLElement.removeClass"></a>`HTMLElement.removeClass(className)`

Removes the class from the element.

```javascript
var elem = document.createElement('div');
elem.addClass('myClass');
elem.hasClass('myClass'); // returns true
elem.removeClass('myClass');
elem.hasClass('myClass'); // returns false
```

**className** : `string`

The class to remove.

### <a name="HTMLElement.toggleClass"></a>`HTMLElement.toggleClass(className)`

Toggles the given class on the element. The class is either added or removed from the element, depending on it's presence, i.e. if the class is already present, it is removed, otherwise added.

```javascript
var elem = document.createElement('div');
elem.toggleClass('myClass');
elem.hasClass('myClass'); // returns true
elem.toggleClass('myClass');
elem.hasClass('myClass'); // returns false
```

**className** : `string`

The class to toggle.

### <a name="HTMLElement.trigger"></a>`HTMLElement.trigger(event)`

Triggers an event on the element if the event is supported.

```javascript
var elem = document.createElement('div');
div.addEventListener('myEvent', function() {
  console.log('myEvent triggered!');
});
elem.trigger('myEvent');
```

**event** : `string` or `Event`

The event to trigger. Supports both event name as `string` or an `Event` object.

```javascript
elem.trigger('myEvent');
// is equivalent to
elem.trigger(new Event('myEvent'));
```

[▲ Back to top](#top)
