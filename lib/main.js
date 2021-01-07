const bPlusTree = new tree(4);

// make the svg element
const mainSvg = d3.select('.main-svg')
  .append('svg')
    .attr('height', '100%')
    .attr('width', '100%');

const insertBtn = document.getElementById('insert-btn');
insertBtn.addEventListener('click', () => {
    const insertField = document.getElementById('insert-field');
    bPlusTree.insert(insertField.value);
    console.groupCollapsed("BPlusTree insert");
    console.debug("bPlusTree", JSON.parse(JSON.stringify(bPlusTree)));
    console.groupEnd();
});


// update graph visualization with svg drawings
const update = () => {
  //select data objects
  //nodes = mySvg.selectAll('.node').data(nodes);

  //update data objects
  //const updateVertices = vertices.remove();
  //// redraw nodes so that they appear above edges.
  //if(updateVertices.empty() != true) {
  //  for (const element of updateVertices) {
  //    mySvg.insert(() => {
  //      return(element);
  //    });
  //  }

  ////exit
  ////nodes.exit().remove();

  ////enter
  //const nodesEnter = nodes
  //  .enter()
  //  .append('g').attr('class', 'node');

  //verticesEnter.append('circle')
  //  .attr('class', 'node_circle');

  //verticesEnter.append('text')
  //  .attr('class', 'node_label');


  //// add all vertices to gobal selection
  //// This is important for the updating of positions
  //nodes = nodes.merge(nodesEnter);

  // style and position entry
  //nodes.select('.node_circle')
  //  .attr('cx', function(d) { return d.x; })
  //  .attr('cy', function(d) { return d.y; })
  //  .attr('id', (d) => {return(d.id)})
  //  .attr('r', nodeValues.radius)
  //  .style('fill', d => d.color)
  //  // interface listeners
  //  .on('click.startAddEdge', startAddEdge)
  //  .on('auxclick', deleteNode) 
  //  .on('contextmenu', turnOffDefault)
  //  // turn of listener for add node so that new node is not created
  //  .on('mouseover.addNode', turnOffAddNode)
  //  .on('mouseout.addNode', turnOnAddNode)
  //  .on('mouseover.addEdgeState', turnOffAddEdgeStateListener)
  //  .on('mouseout.addEdgeState', turnOnAddEdgeStateListener);

  //vertices.select('.node_label')
  //  .attr('x', function(d) { return d.x; })
  //  .attr('y', function(d) { return d.y; })
  //  .attr('text-anchor', 'middle')
  //  .html((d) => { return('v' + d.id) } );
}

