---
title: Tri 1 Project Reflection
author: david
categories: ['Lab Notebook']
tags: ['Project', 'Java']
type: tangibles
week: 12
description: Lesson learned throughout project.
toc: True
comments: True
date: 2023-11-07 12:00:00 +0000
pin: False
---

## Contributions

Overall I worked on the frontend logic of the Dijkstra algorithm, building and interface using JointJS for the UI, Tailwind and DaisyUI for styling, and fetch for retrieving data from the backend. I usually commit all at once rather than in sections, making sure that the current section of code I am working on is functioning correctly before deploying it on the main site.

### [Github](https://github.com/DavidVasilev1)

#### Overall

![contributions](/assets/img/post_images/contributions.png)

#### [Frontend 1](https://github.com/CSA-Tri-1/DADDiJkstra/graphs/contributors)

![contributions](/assets/img/post_images/firstRepo.png)

#### [Frontend 2](https://github.com/CSA-Tri-1/DADDiJkstra-frontend/graphs/contributors)

![contributions](/assets/img/post_images/secondRepo.png)

## Code

I coded the frontend logic for creating the UI using the JointJS library, along with Lodash, Backbone, and JQuery. The three prior libraries are used in JointJS to create an advanced HTML canvas that allows for shapes to be manipulated in numerous ways for any purpose.

We began with a Svelte based website, which gave trouble with reloading, where when the page was loaded, the JointJS canvas would stay for a millisecond and disappear. We then decided that this wouldn't work so we decided to transition to a VueJS based site, which also didn't work because it wouldn't import the dependencies for JointJS correctly. In the end we just decided to use a Jekyll frame work that I created over the summer, using Jekyll's modular design to design HTML pages and build the site. This is what the framework looks like:

![contributions](/assets/img/post_images/framework.png)

Here we still used the `_includes` and `_layouts` in Jekyll but we then use Node.js and the `page` folder to import things like Tailwind and DaisyUI to style our site with custom fonts and classes.

I will now go on to discuss some of the code segments that I worked on and am most proud of.

### OOP Listener Structure

I decided to use the JointJS listeners class to control the actions the user can achieve on the canvas.

#### Controller Subclass

This class extends the `joint.mvc.Listener` class which is predefined in the JointJS library. This allows us to create our own sub-controllers for viewing and editing the canvas.


```python
// listener controller for Joint graph
class Controller extends joint.mvc.Listener {
    get context() {
        const [ctx = null] = this.callbackArguments;
        return ctx;
    }
}
```

#### View Controller Subclass

This subclass extends the controller listener class, allowing for my to have a specific mode for just viewing without editing the canvas.

Within the code, I define specific events the user can do, like clicking or hovering over items on the canvas. Originally, this was a separate file ([commit example](https://github.com/CSA-Tri-1/DADDiJkstra/commits/app-logic)) but due to import errors with frameworks in general, I had to condense all of the code in one file. Regardless I have three separate functions specifically executed when the user completes an action. These functions all have general functions which are defined later on in the code.

- `selectSource` - This function allows the user to select the start node on the graph, leading to the user being able to do the Dijkstra algorithm on any node in the canvas
  - Here I only define the start node by changing the styling and adding it to arrays that store that node as the start node for the backend to process
- `selectEnd` - This function allows for the user to hover over any other node in the canvas and have it set as the end node
  - This shows the path by pulling the path from the `showPath()` function
  - We also check for edge cases in this, for example if the start and end are the same and if the connection is valid
- `hidePathOnMouseLeave` - This function just hides the path the moment the mouse leaves the end node
  - We hide the path and reset the end node
  - We also remove all of the special styling for the elements that were on the path


```python
// view controller, controlling display of shortest path with listeners
class ViewController extends Controller {
  startListening() {
      const { paper } = this.context;

      // activate functions with certain listeners
      this.listenTo(paper, {
          'element:pointerdown': selectSource,
          'element:mouseenter': selectEnd,
          'element:mouseleave': hidePathOnMouseLeave,
      });
  }
}

// selecting the start node
function selectSource({ setStartView }, elementView) {
  setStartView(elementView);
}

// hovering over the end node (displays entire path)
function selectEnd({ showPath, setEndView, getStartView, getEndView }, elementView) {
  const pathStartView = getStartView();
  const pathEndView = getEndView();

  // checks for if start and end are the same
  if (elementView === pathStartView) return;

  // checks for invalid path connection
  if (pathStartView && pathEndView) {
      joint.highlighters.addClass.remove(pathStartView, invalidPathHighlightId);
      joint.highlighters.addClass.remove(pathEndView, invalidPathHighlightId);
  }
  setEndView(elementView);

  // shows path
  showPath();
}

// hide path and highlight on mouse leave
function hidePathOnMouseLeave({ hidePath, getStartView, getEndView, setEndView }) {
  const pathStartView = getStartView();
  const pathEndView = getEndView();
  
  // hides path
  hidePath();

  // check for invalid path
  if (pathStartView) joint.highlighters.addClass.remove(pathStartView, invalidPathHighlightId);
  if (pathEndView) joint.highlighters.addClass.remove(pathEndView, invalidPathHighlightId);

  // reset end node
  setEndView(null);
}
```

#### Edit Controller Subclass

This subclass extends the `Controller` class, allowing us to have a mode in which the canvas can be edited. This allows the user to place nodes and links between these nodes.

- `showElementTools` - This allows for tools of elements to be shown, like the link tool, when the mouse hovers over any element
- `hideElementTools` - This hides the tools of elements, like the link tool, when the mouse leaves any element
- `replaceLink` - This allows for the link to be added between two nodes
  - We gather the source and target nodes information and create a link using the `createLink()` function defined later on
  - I had to add the `link.remove()` function because JointJS has a bug where the link wasn't created correctly if I didn't call it when placing the link
- `addElement` - This creates the nodes on the graph
  - We use the `createNode()` function which is later defined to build the node based on certain attributes
  - The node is logged for later use to create the adjacency list that we send to the backend
- `graph.on` - We use this function to detect the change in position for the nodes to recalculate the edge weights when they are created
  - We simply update the coordinates every time the element's position is changed


```python
// edit controller with listening
class EditController extends Controller {
  startListening() {
      const { graph, paper } = this.context;

      // adding links
      this.listenTo(graph, {
          'change:source': replaceLink,
          'change:target': replaceLink,
      });

      // adding nodes
      this.listenTo(paper, {
          'element:mouseenter': showElementTools,
          'element:mouseleave': hideElementTools,
          'blank:pointerdblclick': addElement
      });
  }
}

// elements tools, allow for editing
function showElementTools(_context, elementView, _evt) {
  elementView.showTools();
}
function hideElementTools(_context, elementView) {
  elementView.hideTools();
}

// adding link function
function replaceLink({ createLink }, link, _collection, opt) {
  const sourceId = link.get('source').id;
  const targetId = link.get('target').id;
  // this is done to prevent JointJS from breaking
  if (opt.ui && sourceId && targetId) {
      createLink(sourceId, targetId);
      link.remove();
  }
  
}

// adding node and logging it for backend in array
function addElement({ createNode, size }, _evt, x, y) {
  // node function creating node
  const node = createNode(getNodeId(), x - size / 2, y - size / 2);
  node.position(x - size / 2, y - size / 2);
  nodes_array.push(node);
}

// listens for change in node position to update for calculating weight
graph.on('change:position', function(cell) {
  if (cell.isElement()) {
      const nodeId = cell.id;
      const center = cell.getBBox().center();
      node_coords[nodeId] = center;
  }
});
```

### Sending Date to Backend Algorithm

When sending the data to the backend, I ran into an issue where the path would try to build and render before we actually got a response from the server. This wasn't an issue before when I was creating the path with a click of a button, but as I implemented the more interactive version of the program, I ran into this issue because it was more instant and overall took less time than before ([commit example](https://github.com/CSA-Tri-1/DADDiJkstra-frontend/commit/bf42fa62cbf58012fe8432f797bae40e1a83c340)).

To solve this I had to use Promises, which is the `Promise` instance that is built into ES6 JS. I demonstrate this in the `getElementPath()` function.

Here I am sending the payload to the backend local server, testing the connection. I send and adjacency list, the start id, and the end id. I send a POST request however when I the server automatically sends the data back to me, I need to return the data as a `Promise`, storing the data in a `resolve` function, which in other words is the solution to the `Promise`. I store this data in the `response` variable, which I later send to another function.


```python
// get path from backend
function getElementPath() {
  // debug
  console.log('Current start and end values:', start, end);
  console.log('Current adj_List:', adj_List);

  // create adjacency list by filling all with infinity
  adj_List = Array(current_index).fill().map(() => Array(current_index).fill(10000));
  // using weight data from second adj list for main adj list
  for (let i = 0; i < adj_array.length; i++) {
    adj_List[adj_array[i][0]][adj_array[i][1]] = adj_array[i][2];
    adj_List[adj_array[i][1]][adj_array[i][0]] = adj_array[i][2];
  }
  // setting empty values with 0 for nodes connected to themselves
  for (let i = 0; i < current_index; i ++){
    adj_List[i][i] = 0;
  }

  // defines data set to backend
  const payload = {
      adjacencyList: adj_List,
      source: parseInt(start),
      target: parseInt(end)
  };

  // Backend URL
  const backendURL = 'http://localhost:8084/api/dijkstra/';

  // Creating a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  xhr.open('POST', backendURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Handling the response from the server
  // uses promises to wait for response before displaying
  return new Promise((resolve) => {
      xhr.onload = function() {
      
          if(xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              console.log('Response from server:', response);
              
              resolve(response)
          } else {
              console.error('Request failed with status:', xhr.status);
          }
          };
      
          // Handling errors during the request
          xhr.onerror = function() {
          console.error('Request failed');
          };
      
          // Sending the request with the JSON payload
          xhr.send(JSON.stringify(payload));
  });
}
```

Here I call the `getElementPath()` function with an asynchronous function. This means that I can place an `await` tag on the calling of the `getElementPath()` function to wait to build the path until I receive the actual path from the backend. I then process and develop the path by changing the style of the elements on the canvas.


```python
// showing path
async function showPath() {

  // sets element path from data from backend, awaiting for response
  const elementPath = await getElementPath();
  // checks if path is found
  const isPathFound = elementPath.length > 0;
  // highlights for non-existent path
  if (!isPathFound && startView && endView && startView.id !== endView.id && !editMode) {
      joint.highlighters.addClass.add(startView, 'body', invalidPathHighlightId, {
          className: invalidPathClassName
      });
      joint.highlighters.addClass.add(endView, 'body', invalidPathHighlightId, {
          className: invalidPathClassName
      });
      // doesn't show path
      hidePath();
      return;
  }

  // removes if start and end don't exist
  if (startView) joint.highlighters.addClass.remove(startView, invalidPathHighlightId);
  if (endView) joint.highlighters.addClass.remove(endView, invalidPathHighlightId);
  hidePath();

  // gets link path between node path
  const linkPath = getLinkPath(elementPath);
  // display all elements
  for (const elementId of [...elementPath, ...linkPath]) {
      const element = graph.getCell(elementId);
      const view = element.findView(paper);
      const isLink = view.model.isLink();
      // styles nodes
      joint.highlighters.addClass.add(view, isLink ? 'line' : 'body', pathMemberHighlightId, {
          className: pathMemberClassName
      });
      // sets link styles
      if (isLink) {
          element.set('z', 2);
      }

      // creates path members array
      pathMembersViews.push(view);
  }
}
```

## Blog Usage

[Time Table](https://davidvasilev1.github.io/CSAsite/calendar/)

### Tests

[Primary Canvas Test](https://davidvasilev1.github.io/CSAsite//posts/test-canvas/)

This page mainly illustrates my initial ideas of the canvas, showing some testing with the vanilla HTML canvas and some circles that have numbers print as I place them.

[JointJS Test](https://davidvasilev1.github.io/CSAsite//posts/JointJS-test/)

This shows some primary testing with the node and link system in JointJS.

[Class Structuring](https://davidvasilev1.github.io/CSAsite//posts/classes/)

This is where I planned out my class structuring with how I would have the view and editing functionality on the program.

[JS Promises](https://davidvasilev1.github.io/CSAsite//posts/promises/)

This shows some testing I did with JS promises to see how I could solve the error I was getting due to the rapid calling of specific functions before data was received from the backend.

## Overall Reflection

| Glows | Grows |
|-|-|
| I think I did very well with the styling of the pages. Using Tailwind and DaisyUI really cut down on the time to style the pages and it also helped create a clean and comprehensible site. | I think that I could focus more on Java and how the backend works. Next trimester I plan on working more on the backend and familiarizing myself with that aspect of full stack programming. |
| I think I organized my JS code really well, especially with the use of classes to control the different views within the program. | I want to focus more on creating a cleaner design, making it more similar to the Apple website design. This is with the goal of eventually incorporating this in a personal website. |
| I think the choice of using libraries was really useful in terms of spending less time on the functionality of small details and actually making the program work well. | I think that I could use less libraries later on, as I become better at coding my own logic and integrating that into the program we aim to create |
| Working with the backend team to figure out how we would send data between the two parts of the project I think went really well. Collaborating on creating an adjacency list was definitely a good thing. | I think that some team members were disconnected at times, especially with some of the group members not really working as quickly as the others. This could be solved with better collaboration and learning techniques. |
| Overall I think the project looks really nice. | I think that there are still some small things that could be improved in terms of functionality with removing nodes and links. |

### Memories and Learnings

Learning to work with libraries and a more OOP structure was definitely something that I learned to do this trimester. This is something that aided in making the program look and feel smoother, as well as making the entire program more completed at the end. Our collaboration as a team was definitely very good and I think that it could be even better with people learning how to manage the Scrum Board and also how to read it (with all of it's tags and other features). In the future I want to work on making cleaner and more sophisticated designs, with more integrated pages and features.
