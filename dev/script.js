

var Heatmap = require('../lib/heatmap');
var SegmentGroups = require('../lib/segment-groups');
var SpanGroups = require('../lib/span-groups');
var Window = require('../lib/window');
var ClickScroll = require('../lib/click-scroll');
var $ = require('jquery');


$(function() {

  var position = function() {
    $('#target').height($(window).height());
  };

  $(window).resize(position);
  position();

  var heatmap = new Heatmap('#source', '#target');

  var segments = new SegmentGroups(heatmap);
  segments.addGroup('pages', 'span[page]');

  var spans = new SpanGroups(heatmap);
  spans.addGroup('slugs', '[data-neatline-slug]');

  new ClickScroll(heatmap);
  new Window(heatmap);

  $(window).resize(function() {
    heatmap.updateSize();
  });

});
