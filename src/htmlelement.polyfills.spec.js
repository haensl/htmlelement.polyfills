import HTMLElementPolyfills from './htmlelement.polyfills';
HTMLElementPolyfills();

describe('HTMLElement polyfills', () => {
  let elem;
  beforeEach(() => {
    elem = document.createElement('div');
  });

  describe('remove()', () => {
    describe('When removing the only child from an element', () => {
      test('the length of the parent\'s children is 0', () => {
        const child = document.createElement('div');
        elem.appendChild(child);
        child.remove();
        expect(elem.children.length).toBe(0);
      });
    });

    describe('When removing an element without parent', () => {
      test('does not throw an error', () => {
        expect(elem.remove.bind(elem)).not.toThrow();
      });
    });
  });

  describe('empty()', () => {
    describe('When calling empty() on an element with one child', () => {
      test('the element has no more children', () => {
        const child = document.createElement('div');
        elem.appendChild(child);
        elem.empty();
        expect(elem.children.length).toBe(0);
      });
    });

    describe('When calling empty() on an element with no children', () => {
      test('does not throw an error', () => {
        expect(elem.empty).not.toThrow();
      });
    });
  });

  describe('hasClass()', () => {
    describe('When executing on an element with the class', () => {
      test('returns true', () => {
        elem.className = 'test';
        expect(elem.hasClass('test')).toBe(true);
      });
    });

    describe('When executing on an element without the class', () => {
      test('returns false', () => {
        expect(elem.hasClass('test')).toBe(false);
      });
    });
  });

  describe('addClass()', () => {
    describe('When adding a class to an element', () => {
      beforeEach(() => {
        elem.addClass('test');
      });

      test('is reflected in the elements className property', () => {
        expect(elem.className).toBe('test');
      });

      test('hasClass() returns true', () => {
        expect(elem.hasClass('test')).toBe(true);
      });

      describe('that already has another class', () => {
        beforeEach(() => {
          elem.addClass('anotherClass');
        });

        test('is reflected in the elements className property', () => {
          expect(elem.className).toBe('test anotherClass');
        });

        test('hasClass() returns true', () => {
          expect(elem.hasClass('anotherClass')).toBe(true);
        });
      });

      describe('that already has that class', () => {
        beforeEach(() => {
          elem.addClass('test');
        });

        test('is reflected in the elements className property', () => {
          expect(elem.className).toBe('test');
        });

        test('hasClass() returns true', () => {
          expect(elem.hasClass('test')).toBe(true);
        });
      });
    });

    describe('When adding multiple classes to the element', () => {
      beforeEach(() => {
        elem.addClass('test anotherTest');
      });

      test('is reflected in the elements className property', () => {
        expect(elem.className).toBe('test anotherTest');
      });

      test('hasClass() returns true', () => {
        expect(elem.hasClass('test')).toBe(true);
        expect(elem.hasClass('anotherTest')).toBe(true);
      });
    });
  });

  describe('removeClass()', () => {
    describe('When removing a class from an element', () => {
      beforeEach(() => {
        elem.addClass('test');
        elem.removeClass('test');
      });

      test('is reflected in the elements className property', () => {
        expect(elem.className).toBe('');
      });

      test('hasClass() returns false', () => {
        expect(elem.hasClass('test')).toBe(false);
      });

      describe('that does not have that class', () => {
        test('does not throw an error', () => {
          elem.removeClass('test');
          expect(elem.removeClass).not.toThrow();
        });
      });
    });
  });

  describe('toggleClass()', () => {
    describe('When toggling a class', () => {
      beforeEach(() => {
        elem.toggleClass('test');
      });

      describe('on an element that does not have that class', () => {
        describe('adds the class to that element', () => {
          test('is reflected in the elements className property', () => {
            expect(elem.className).toBe('test');
          });

          test('hasClass() returns true', () => {
            expect(elem.hasClass('test')).toBe(true);
          });
        });
      });

      describe('on an element that already has that class', () => {
        beforeEach(() => {
          elem.toggleClass('test');
        });

        describe('removes the class from that element', () => {
          test('is reflected in the elements className property', () => {
            expect(elem.className).toBe('');
          });

          test('hasClass() returns false', () => {
            expect(elem.hasClass('test')).toBe(false);
          });
        });
      });
    });
  });

  describe('trigger()', () => {
    describe('When triggering an event on an element', () => {
      describe('that supports that event', () => {
        let listener;
        let testClickCalled;
        beforeEach(() => {
          testClickCalled = false;
          listener = () => {
            testClickCalled = true;
          };

          elem.addEventListener('testEvent', listener);
        });

        describe('using the event name as parameter', () => {
          test('calls the event listener', () => {
            elem.trigger('testEvent');
            expect(testClickCalled).toBe(true);
          });
        });

        describe('using an event object as parameter', () => {
          test('calls the event listener', () => {
            let event;
            try {
              event = new Event('testEvent');
            } catch (e) {
              event = document.createEvent('Event');
              event.initEvent('testEvent', true, true);
            }

            elem.trigger(event);
            expect(testClickCalled).toBe(true);
          });
        });
      });

      describe('that does not support the event', () => {
        test('does not throw an error', () => {
          expect(elem.trigger.bind(elem, 'testEvent')).not.toThrow();
        });
      });
    });
  });

  describe('ancestor()', () => {
    describe('When called on an element with a parent', () => {
      let child;
      let parent;

      beforeEach(() => {
        child = document.createElement('div');
        elem.appendChild(child);
      });

      describe('and called without selector', () => {
        test('returns the element\'s parent', () => {
          parent = child.ancestor();
          expect(parent).toEqual(elem);
        });
      });

      describe('and called with a selector', () => {
        describe('that selects the parent', () => {
          test('returns the element\'s parent', () => {
            elem.addClass('test');
            parent = child.ancestor('.test');
            expect(parent).toEqual(elem);
          });
        });

        describe('that selects the parent\s parent', () => {
          test('returns the parent\'s parent', () => {
            const secondChild = document.createElement('div');
            child.appendChild(secondChild);
            elem.addClass('test');
            parent = secondChild.ancestor('.test');
            expect(parent).toEqual(elem);
          });
        });

        describe('that does not select the parent', () => {
          test('returns false', () => {
            parent = child.ancestor('.test');
            expect(parent).toEqual(false);
          });
        });
      });
    });

    describe('When called on an element without a parent', () => {
      test('returns false', () => {
        const parent = elem.ancestor();
        expect(parent).toBe(false);
      });
    });
  });

  describe('find()', () => {
    describe('When called on an element without children', () => {
      test('returns an empty array', () => {
        const result = elem.find('.test');
        expect(result).toEqual([]);
      });
    });

    describe('When called on an element with one child', () => {
      let child;
      let result;
      beforeEach(() => {
        child = document.createElement('div');
        elem.appendChild(child);
      });

      describe('that matches the selector', () => {
        test('returns an array containing the child', () => {
          child.addClass('test');
          result = elem.find('.test');
          expect(result.length).toBe(1);
          expect(result[0]).toEqual(child);
        });
      });

      describe('that does not match the selector', () => {
        it('returns an empty array', () => {
          result = elem.find('.test');
          expect(result).toEqual([]);
        });
      });
    });

    describe('When called on an element tree of depth two', () => {
      let child;
      let secondChild;
      let result;

      beforeEach(() => {
        child = document.createElement('div');
        elem.appendChild(child);
        secondChild = document.createElement('div');
        child.appendChild(secondChild);
      });

      describe('and a selector that matches the child', () => {
        test('returns an array containing the child', () => {
          child.addClass('child');
          result = elem.find('.child');
          expect(result.length).toBe(1);
          expect(result[0]).toEqual(child);
        });
      });

      describe('and a selector that matches the child\'s child', () => {
        beforeEach(() => {
          secondChild.addClass('secondChild');
        });

        describe('and set to use recursive search', () => {
          it('returns an array containing the child\'s child', () => {
            result = elem.find('.secondChild', true);
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(secondChild);
          });
        });

        describe('and set to not use recursive search', () => {
          it('returns an empty array', () => {
            result = elem.find('.secondChild');
            expect(result).toEqual([]);
          });
        });
      });

      describe('that does not match the any of the descendants', () => {
        test('returns an empty array', () => {
          result = elem.find('.test');
          expect(result).toEqual([]);
        });
      });
    });
  });
});
