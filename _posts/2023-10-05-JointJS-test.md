---
title: Joint Test
author: david
categories: ['Lab Notebook']
tags: ['Project', 'HTML', 'Javascript']
type: tangibles
week: 7
description: Testing Joint Canvas.
toc: True
comments: True
date: 2023-10-05 12:00:00 +0000
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.1/backbone.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jointjs/3.7.5/joint.js"></script>
<p>testing canvas</p>

<div id="interactive-graph"></div>
<script>
  var namespace = joint.shapes;
  var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
  var paper = new joint.dia.Paper({
      el: document.getElementById('interactive-graph'),
      model: graph,
      width: 600,
      height: 100,
      gridSize: 1,
      cellViewNamespace: namespace
  });
  var node = new joint.shapes.standard.Circle();
  node.position(100, 30);
  node.resize(100, 40);
  node.attr({
      body: {
          fill: 'black'
      },
      label: {
          fill: 'white'
      }
  });
  node.attr('label/text', '1');
  node.addTo(graph)
  var node2 = node.clone();
  node2.translate(300, 0);
  node2.attr('label/text', '2');
  node2.addTo(graph)
  var link = new joint.shapes.standard.Link();
  link.source(node);
  link.target(node2);
  link.addTo(graph);
</script>


```python
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.1/backbone.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jointjs/3.7.5/joint.js"></script>
<p>testing canvas</p>

<div id="interactive-graph"></div>
<script>
  var namespace = joint.shapes;
  var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
  var paper = new joint.dia.Paper({
      el: document.getElementById('interactive-graph'),
      model: graph,
      width: 600,
      height: 100,
      gridSize: 1,
      cellViewNamespace: namespace
  });
  var node = new joint.shapes.standard.Circle();
  node.position(100, 30);
  node.resize(100, 40);
  node.attr({
      body: {
          fill: 'black'
      },
      label: {
          fill: 'white'
      }
  });
  node.attr('label/text', '1');
  node.addTo(graph)
  var node2 = node.clone();
  node2.translate(300, 0);
  node2.attr('label/text', '2');
  node2.addTo(graph)
  var link = new joint.shapes.standard.Link();
  link.source(node);
  link.target(node2);
  link.addTo(graph);
</script>
```

Have to use Joint structure

Always declare deps before code
