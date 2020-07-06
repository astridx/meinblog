---
title: "D3 on Angular: Small Multiples with Brushing"
description: "This article shows how you can achieve Small Multiples with D3 using Angular.js. According to Edward Tufte (1983) Small Multiples are a concept to..."
date: "2015-01-04T13:50:46+02:00"
categories: ["Angular", "D3"]
keywords: ["angular d3"]
hashtags: ["#100DaysOfCode", "#d3js,#angularjs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

This article shows how you can achieve Small Multiples with D3 using Angular.js. According to Edward Tufte (1983) Small Multiples are a concept to visualize multiple homogenous visualizations like maps, line graphs or scatterplots. We will use this visualization concept to draw multiple line graphs with D3 on Angular.

![angular d3](./images/chart.png)

Here you can find an example + source code:

* [Gist for Source Code](https://gist.github.com/rwieruch/b7de295152756b67c7db)
* [Example with Source Code + Visualization](http://bl.ocks.org/rwieruch/b7de295152756b67c7db)

Short explanation: Most of the line chart directive contains the D3 source code for a plain Line Chart with some interaction. Not anything new for advanced D3 people. In the short HTML snippet you can see an ng-repeat directive for generating multiple line chart directives from the data, which is randomly generated in the controller. The data array plus the ng-repeat are responsible for our Small Multiples as line charts. After that I thought it would be nice to have some brushing interaction for our line chart directive. The difficulty is that all line chart directives should act simultaneously after one line chart was brushed. Therefore the following code snippets are essential.

For the brushing event you have to compute the new domain, which should be displayed after brushing. After that you don’t update the line chart directly like you would do it in a single line chart approach, instead you emit the change as an event to the controller.

```javascript
function brushed() {
   var domain = brush.empty() ? d3.extent(scope.data, function(d) { return d.date; }) : brush.extent();
   scope.$emit('brush:changed', domain);
}
```

The controller knows about this event and responses with a broadcast event to its child directives.

```javascript
$scope.$on('brush:changed', handleBrushedChanged);

function handleBrushedChanged($event, data) {
    $scope.$broadcast('brush:set', data);
    $event.stopPropagation();
}
```

Don't forget to stop the event propagation.
Now the line chart directive knows about the broadcast event and adjusts the line chart presentation accordingly.

```javascript
scope.$on('brush:set', onBrushSetHandler);

function onBrushSetHandler($event, data) {
    display(data);
}
```

Note that this way of communication via the controller is only one possible approach. You could also use a service for that or use the `$rootScope` to let the directives communicate directly with each other.
