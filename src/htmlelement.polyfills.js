export default () => {
  const TYPES = {
    String: 'string',
    Function: 'function'
  };

  /**
   *  HTMLElement.remove()
   *  Removes the element from the DOM.
   */
  if (!('remove' in HTMLElement.prototype)) {
    HTMLElement.prototype.remove = function() {
      if (this && this.parentElement &&
          HTMLElement.prototype.isPrototypeOf(this.parentElement)) {
        this.parentElement.removeChild(this);
      }
    };
  }

  /**
   * HTMLElement.empty()
   * Removes all children from this element.
   */
  if (!('empty' in HTMLElement.prototype)) {
    HTMLElement.prototype.empty = function() {
      while (this && this.firstChild) {
        this.firstChild.remove();
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
      if (!(typeof event === TYPES.String ||
          Event.prototype.isPrototypeOf(event))) {
        return;
      }

      if (typeof event === TYPES.String) {
        let eventObj;
        if (document.createEvent) {
          try {
            eventObj = new Event(event, { bubbles: true, cancelable: true });
          } catch (e) {
            eventObj = document.createEvent('Event');
            eventObj.initEvent(event, true, true);
          }

        } else {
          eventObj = document.createEventObject();
          eventObj.eventType = event;
        }

        event = eventObj;
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

      const classes = this.className.split(' ');
      const idx = classes.indexOf(className);
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
        const classNames = className.split(' ');
        for (let i = 0; i < classNames.length; i++) {
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
   *  ancestor, i.e. parent, is returned. If the element has no ancestors,
   *  e.g. the root node, false is returned.
   *  @param {string} [selector] - a selector to filter ancestors by.
   *  @return {HTMLElement | false}
   */
  if (!('ancestor' in HTMLElement.prototype)) {
    HTMLElement.prototype.ancestor = function(selector) {
      const matchesSelector = this.matches
        || this.webkitMatchesSelector
        || this.mozMatchesSelector
        || this.msMatchesSelector;
      let elem = this.parentElement || false;
      if (!(selector && typeof selector === TYPES.String)) {
        return elem;
      }

      while (elem) {
        if (matchesSelector.bind(elem)(selector)) {
          return elem;
        } else {
          elem = elem.parentElement || false;
        }
      }

      return elem;
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
    HTMLElement.prototype.find = function(selector, recursive = false) {
      let results = [];
      if (!(selector && typeof selector === TYPES.String)) {
        return results;
      }

      const matchesSelector = this.matches
        || this.webkitMatchesSelector
        || this.mozMatchesSelector
        || this.msMatchesSelector;

      for (let i = 0, elem; i < this.childNodes.length; i++) {
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
};
