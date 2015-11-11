// @koala-prepend "vendor/_sprint.js"
// @koala-prepend "vendor/fastclick"
// @koala-prepend "utils/utils.js"
// @koala-prepend "modules/universal_analytics.js"
// @koala-prepend "modules/zenconomy_analytics.js"
// @koala-prepend "modules/alts.js"

// Init global app scope
var app = {},
    modules;


app.window = $(window);

// Check if IE.
Utils.isIE();

// Define all JS-modules, what selectors that triggers them and load em'

modules = [
 {'name': 'Human',             'selector': 'html',                 'class': Human},
 {'name': 'Alts',               'selector': '.alts',                'class': Alts}
//  {'name': 'State',             'selector': '.dynamic__state',       'class': State},
//  {'name': 'Introduction',      'selector': '.introduction',        'class': Introduction},
//  {'name': 'Demo',              'selector': '.demo',                'class': Demo},
//  {'name': 'OverviewService',   'selector': '.overview__services',  'class': Overview},
//  {'name': 'AboutQuote',        'selector': '.about',               'class': AboutQuote},
//  {'name': 'NavigationButton',  'selector': '.navigation__button',  'class': NavigationButton},
//  {'name': 'Pricing',           'selector': '.pricing__services',   'class': Pricing},
//  {'name': 'QuoteCarousel',     'selector': '.carousel',            'class': QuoteCarousel},
//  {'name': 'Tracking',          'selector': '.main',                 'class': Tracking}
];

$(modules).each(function() {
  var _this = this,
      $this = $(this.selector);

  $($this.dom).each(function(index) {
    app[_this.name] = new _this.class(this);
  });
});

// Check if mobile, and if demo section is in viewport before first scroll event
Utils.setMobile();

// Use global throttled resize event to trigger mobile viewport.
// Disables some JS-events for smaller viewports and changes navigation slideout width

app.window.on('resize',
  Utils.throttle(function() {
    Utils.setMobile();
  })
);

window.onload = function() {
  app.Human.check();
};


// lock alts if applicable
app.window.on('scroll',
  Utils.throttle(function() {
    if(app.Tracking) { app.Tracking.section(); }
    if(app.Alts) { app.Alts.onScroll(); }
  }, 10)
);

//Load fastclick.js. Triggers links faster on touch devices
// https://github.com/ftlabs/fastclick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

