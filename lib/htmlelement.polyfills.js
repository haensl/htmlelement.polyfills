(function() {
  'use strict';

  var TYPES = {
    String: 'string',
    Function: 'function'
  };

  /**
   *  HTMLElement.remove()
   *  Removes the element from the DOM.
   */
  if (!('remove' in HTMLElement.prototype)) {
    HTMLElement.prototype.remove = function() {
      if (this && ('parentElement' in this) &&
          HTMLElement.prototype.isPrototypeOf(this.parentElement)) {
        this.parentElement.removeChild(this);
      }
    };
  }

  /**
   *  HTMLElement.trigger(event)
   *  Triggers an event on the element if the event is supported.
   *  @param {Event | string} event - the event to trigger. Supports both event
   *    name as string, or an Event object.
   */
  if (!('trigger' in HTMLElement.prototype)) {
    HTMLElement.prototype.trigger = function(event) {
      if (!(typeof event === 'string' ||
          Event.prototype.isPrototypeOf(event))) {
        return;
      }

      if (typeof event === 'string') {
        if (document.createEvent) {
          try {
            event = new Event(event, {bubbles: true, cancelable: true});
          } catch (e) {
            eventObj = document.createEvent('Event');
            eventObj.initEvent(event, true, true);
            event = eventObj;
          }

        } else {
          var eventObj = document.createEventObject();
          eventObj.eventType = event;
          event = eventObj;
        }
      }

      if (document.createEvent) {
        this.dispatchEvent(event);
      } else {
        this.fireEvent('on' + event.eventType, event);
      }
    };
  }

  /**
   *  HTMLElement.removeClass(className)
   *  Removes a class from this element.
   *  @param {string} className - the class to remove.
   */
  if (!('removeClass' in HTMLElement.prototype)) {
    HTMLElement.prototype.removeClass = function(className) {
      if (typeof className !== TYPES.String) {
        return;
      }

      var classes = this.className.split(' ');
      var idx = classes.indexOf(className);
      if (idx > -1) {
        classes.splice(idx, 1);
      }

      this.className = classes.join(' ');
    };
  }

  /**
   *  HTMLElement.hasClass(className)
   *  Checks whether this element is assigned the given class.
   *  @param {string} className - the class to check for.
   *  @return {boolean} true if the HTMLElement is assigned the given class, false
   *    otherwise.
   */
  if (!('hasClass' in HTMLElement.prototype)) {
    HTMLElement.prototype.hasClass = function(className) {
      return this.className.indexOf(className) > -1;
    };
  }

  /**
   *  HTMLElement.addClass(className)
   *  Adds the given class to the element.
   *  @param {string} className - the class to add.
   */
  if (!('addClass' in HTMLElement.prototype)) {
    HTMLElement.prototype.addClass = function(className) {
      if (typeof className === TYPES.String) {
        var classNames = className.split(' ');
        for (var i = 0, len = classNames.length; i < len; i++) {
          if (!this.hasClass(className)) {
            if (!this.className || this.className.length === 0) {
              this.className = className;
            } else {
              this.className += ' ' + className;
            }
          }
        }
      }
    };
  }

  /**
   *  HTMLElement.toggleClass(className)
   *  Either adds or removes the given class from the element, depending on its
   *  presence. If the class is not present, it is added, otherwise removed.
   *  @param {string} className - the class to toggle.
   */
  if (!('toggleClass' in HTMLElement.prototype)) {
    HTMLElement.prototype.toggleClass = function(className) {
      if (!this.hasClass(className)) {
        this.addClass(className);
      } else {
        this.removeClass(className);
      }
    };
  }

  /**
   *  HTMLElement.ancestor([selector])
   *  Returns the elements ancestor. If a selector is supplied, the element's
   *  ancestors are traversed until a matching ancestor is found. If none of
   *  the element's ancestors matches the selector, the element's immediate
   *  ancestor, i.e. parent, is returned.
   *  @param {string} [selector] - a selector to filter ancestors by.
   *  @return {HTMLElement | false}
   */
  if (!('ancestor' in HTMLElement.prototype)) {
    HTMLElement.prototype.ancestor = function(selector) {
      var matchesSelector = this.matches || this.webkitMatchesSelector ||
                            this.mozMatchesSelector || this.msMatchesSelector;
      var elem = this.parentElement || false;
      if (!(selector && typeof selector === TYPES.String)) {
        return elem;
      }

      while (elem) {
        if (matchesSelector.bind(elem)(selector)) {
          return elem;
        } else {
          elem = elem.parentElement;
        }
      }

      return false;
    };
  }

  /**
   *  HTMLElement.find(selector)
   *  Searches children matching the given selector.
   *  @param {string} selector - the css selector to search for.
   *  @param {boolean} [recursive] - if true recursively apply find() to
   *    descendants instead of searching only for direct children.
   *  @return {Array}
   */
  if (!('find' in HTMLElement.prototype)) {
    HTMLElement.prototype.find = function(selector, recursive) {
      var results = [];
      if (!(selector && typeof selector === TYPES.String)) {
        return results;
      }

      var matchesSelector = this.matches || this.webkitMatchesSelector ||
                            this.mozMatchesSelector || this.msMatchesSelector;

      var elem;
      for (var i = 0, len = this.childNodes.length; i < len; i++) {
        elem = this.childNodes[i];
        if (elem.nodeType === Node.ELEMENT_NODE) {
          if (matchesSelector.bind(elem)(selector)) {
            results.push(elem);
          }

          if (recursive && elem.childNodes.length > 0) {
            results = results.concat(elem.find(selector, true));
          }
        }
      }

      return results;
    };
  }
})();
