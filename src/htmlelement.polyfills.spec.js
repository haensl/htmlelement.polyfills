(function() {
  'use strict';
  describe('HTMLElement polyfill tests', function() {
    var elem;
    beforeEach(function() {
      elem = document.createElement('div');
    });

    describe('HTMLElement.remove()', function() {
      describe('When removing the only child from an element', function() {
        it('the length of the parent\'s children should be 0', function() {
          var child = document.createElement('div');
          elem.appendChild(child);
          child.remove();
          expect(elem.children.length).toBe(0);
        });
      });

      // disabled due to a bug in phantomjs
      xdescribe('When removing an element without parent', function() {
        it('should not throw an error', function() {
          expect(elem.remove).not.toThrow();
        });
      });
    });

    describe('HTMLElement.empty()', function() {
      describe('When calling .empty() on an element with one child', function() {
        it('the element should have no more children', function() {
          var child = document.createElement('div');
          elem.appendChild(child);
          elem.empty();
          expect(elem.children.length).toBe(0);
        });
      });

      describe('When calling .empty() on an element with no children', function() {
        it('should not throw an error', function() {
          expect(elem.empty).not.toThrow();
        });
      });
    });

    describe('HTMLElement.hasClass()', function() {
      describe('When executing on an element with the class', function() {
        it('should return true', function() {
          elem.className = 'test';
          var hasClass = elem.hasClass('test');
          expect(hasClass).toBe(true);
        });
      });

      describe('When executing on an element without the class', function() {
        it('should return false', function() {
          var hasClass = elem.hasClass('test');
          expect(hasClass).toBe(false);
        });
      });
    });

    describe('HTMLElement.addClass()', function() {
      describe('When adding a class to an element', function() {
        beforeEach(function() {
          elem.addClass('test');
        });

        it('should be reflected in the elements className property', function() {
          expect(elem.className).toBe('test');
        });

        it('hasClass() should return true', function() {
          var hasClass = elem.hasClass('test');
          expect(hasClass).toBe(true);
        });

        describe('that already has another class', function() {
          beforeEach(function() {
            elem.addClass('anotherClass');
          });

          it('should be reflected in the elements className property', function() {
            expect(elem.className).toBe('test anotherClass');
          });

          it('hasClass() should return true', function() {
            var hasClass = elem.hasClass('anotherClass');
            expect(hasClass).toBe(true);
          });
        });

        describe('that already has that class', function() {
          beforeEach(function() {
            elem.addClass('test');
          });

          it('should be reflected in the elements className property', function() {
            expect(elem.className).toBe('test');
          });

          it('hasClass() should return true', function() {
            var hasClass = elem.hasClass('test');
            expect(hasClass).toBe(true);
          });
        });
      });

      describe('When adding multiple classes to the element', function() {
        beforeEach(function() {
          elem.addClass('test anotherTest');
        });

        it('should be reflected in the elements className property', function() {
          expect(elem.className).toBe('test anotherTest');
        });

        it('hasClass() should return true', function() {
          var hasClass = elem.hasClass('test');
          hasClass = hasClass && elem.hasClass('anotherTest');
          expect(hasClass).toBe(true);
        });
      });
    });

    describe('HTMLElement.removeClass()', function() {
      describe('When removing a class from an element', function() {
        beforeEach(function() {
          elem.addClass('test');
          elem.removeClass('test');
        });

        it('should be reflected in the elements className property', function() {
          expect(elem.className).toBe('');
        });

        it('hasClass() should return false', function() {
          var hasClass = elem.hasClass('test');
          expect(hasClass).toBe(false);
        });

        describe('that does not have that class', function() {
          it('should not throw an error', function() {
            elem.removeClass('test');
            spyOn(elem, 'removeClass').and.callThrough();
            expect(elem.removeClass).not.toThrow();
          });
        });
      });
    });

    describe('HTMLElement.toggleClass()', function() {
      describe('When toggling a class', function() {
        beforeEach(function() {
          elem.toggleClass('test');
        });

        describe('on an element that does not have that class', function() {
          it('should add the class to that element', function() {
            it('should be reflected in the elements className property', function() {
              expect(elem.className).toBe('test');
            });

            it('hasClass() should return true', function() {
              var hasClass = elem.hasClass('test');
              expect(hasClass).toBe(true);
            });
          });
        });

        describe('on an element that already has that class', function() {
          beforeEach(function() {
            elem.toggleClass('test');
          });

          describe('should remove the class from that element', function() {
            it('should be reflected in the elements className property', function() {
              expect(elem.className).toBe('');
            });

            it('hasClass() should return false', function() {
              var hasClass = elem.hasClass('test');
              expect(hasClass).toBe(false);
            });
          });
        });
      });
    });

    describe('HTMLElement.trigger()', function() {
      describe('When triggering an event on an element', function() {
        describe('that supports that event', function() {
          var listener;
          var testClickCalled;
          beforeEach(function() {
            testClickCalled = false;
            listener = function() {
              testClickCalled = true;
            };

            elem.addEventListener('testEvent', listener);
          });

          describe('using the event name as parameter', function() {
            it('should call the event listener', function() {
              elem.trigger('testEvent');
              expect(testClickCalled).toBe(true);
            });
          });

          describe('using an event object as parameter', function() {
            it('should call the event listener', function() {
              var event;
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

        describe('that does not support the event', function() {
          it('should not throw an error', function() {
            spyOn(elem, 'trigger').and.callThrough();
            elem.trigger('testEvent');
            expect(elem.trigger).not.toThrow();
          });
        });
      });
    });

    describe('HTMLElement.ancestor()', function() {
      describe('When called on an element with a parent', function() {
        var child;
        beforeEach(function() {
          child = document.createElement('div');
          elem.appendChild(child);
        });

        describe('and called without selector', function() {
          it('should return the element\'s parent', function() {
            var parent = child.ancestor();
            expect(parent).toEqual(elem);
          });
        });

        // deactivated since phantomjs currently does not support bind()
        xdescribe('and called with a selector', function() {
          describe('that selects the parent', function() {
            it('should return the element\'s parent', function() {
              elem.addClass('test');
              var parent = child.ancestor('.test');
              expect(parent).toEqual(elem);
            });
          });

          describe('that selects the parent\s parent', function() {
            it('should return the parent\'s parent', function() {
              var secondChild = document.createElement('div');
              child.appendChild(secondChild);
              elem.addClass('test');
              var parent = secondChild.ancestor('.test');
              expect(parent).toEqual(elem);
            });
          });

          describe('that does not select the parent', function() {
            it('should return false', function() {
              var parent = child.ancestor('.test');
              expect(parent).toEqual(false);
            });
          });
        });
      });

      describe('When called on an element without a parent', function() {
        it('should return false', function() {
          var parent = elem.ancestor();
          expect(parent).toBe(false);
        });
      });
    });

    describe('HTMLElement.find()', function() {
      describe('When called on an element without children', function() {
        it('should return an empty array', function() {
          var result = elem.find('.test');
          expect(result).toEqual([]);
        });
      });

      describe('When called on an element with one child', function() {
        var child;
        beforeEach(function() {
          child = document.createElement('div');
          elem.appendChild(child);
        });

        // deactivated since phantomjs currently does not support bind()
        xdescribe('that matches the selector', function() {
          it('should return an array containing the child', function() {
            child.addClass('test');
            var result = elem.find('.test');
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(child);
          });
        });

        // deactivated since phantomjs currently does not support bind()
        xdescribe('that does not match the selector', function() {
          it('should return an empty array', function() {
            var result = elem.find('.test');
            expect(result).toEqual([]);
          });
        });
      });

      describe('When called on an element tree of depth two', function() {
        var child;
        var secondChild;
        beforeEach(function() {
          child = document.createElement('div');
          elem.appendChild(child);
          secondChild = document.createElement('div');
          elem.appendChild(secondChild);
        });

        // deactivated since phantomjs currently does not support bind()
        xdescribe('and a selector that matches the child', function() {
          it('should return an array containing the child', function() {
            child.addClass('test');
            var result = elem.find('.test');
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(child);
          });
        });

        // deactivated since phantomjs currently does not support bind()
        xdescribe('and a selector that matches the child\'s child', function() {
          beforeEach(function() {
            secondChild.addClass('test');
          });

          describe('and set to use recursive search', function() {
            it('should return an array containing the child\'s child', function() {
              var result = elem.find('.test', true);
              expect(result.length).toBe(1);
              expect(result[0]).toEqual(secondChild);
            });
          });

          describe('and set to not use recursive search', function() {
            it('should return an empty array', function() {
              var result = elem.find('.test');
              expect(result).toEqual([]);
            });
          });
        });

        // deactivated since phantomjs currently does not support bind()
        xdescribe('that does not match the any of the descendants', function() {
          it('should return an empty array', function() {
            var result = elem.find('.test');
            expect(result).toEqual([]);
          });
        });
      });
    });
  });
})();
