var Utils = {

  api: function(url, data) {
    return reqwest({
      url: url,
      data: data,
    })
    .always(function(resp){
      if(!resp.ok){
        console.log(resp);
      }
    });
  },

  // Check if viewport is mobile
  // Disables some JS-events for smaller viewports and changes navigation slideout width

  setMobile: function() {
    if(app.window.get(0).matchMedia("(max-width: 720px)").matches) {
      document.querySelector('html').classList.add('mobile');
      app.mobile = true;
    } else {
      document.querySelector('html').classList.remove('mobile');
      app.mobile = false;
    }
  },

  // Takes items and returns those that are currently in the Viewport.
  inViewport: function(elements, margin, fullyInside) {
    var inViewport = [];

    if(elements.constructor !== Array){
      elements = [elements];
    }
    margin = margin || 0;

    for (var i = elements.length - 1; i >= 0; i--) {
      var element = elements[i],
        bounds = element.getBoundingClientRect(),
        aboveViewport = bounds.bottom - margin < 0,
        belowViewport = window.innerHeight-bounds.top + margin < 0;

        if(fullyInside){
          aboveViewport = bounds.top - margin < 0,
          belowViewport = window.innerHeight-bounds.bottom + margin < 0;
        }

        if( !aboveViewport && !belowViewport ){
          inViewport.push(element);
        }
    }
    return inViewport;
  },

  // Event throttler. Used manily on viewport resize and scrolling, so we don't
  // fire too much function calls at each event

  throttle: function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;

    return function () {
      var context = scope || this;

      var now = +new Date(),
          args = arguments;

      if (last && now < last + threshhold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  },

  debounce: function(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  },

 isIE: function() {
    var ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");
    app.ie = false;

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      var doc = document.documentElement;
      doc.setAttribute('data-useragent', navigator.userAgent);
      app.ie = true;
    } else {
      app.ie = false;
    }

    if(app.ie) {
      var el = document.querySelector('body'),
          className = 'ie';

      if(el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    }
  }

};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}