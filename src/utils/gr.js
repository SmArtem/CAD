import Matrix from './Linker'

export default (d3, svg, testGraph) => {
  let config = {nodes: [], links: []}
  config.links = testGraph.links
  config.nodes = testGraph.nodes

  let width = +svg.attr('width')
  let height = +svg.attr('height')
  let color = d3.scaleOrdinal(d3.schemeCategory20)

  let simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(function(d) { return d.id; }).distance(
      function (l, i) {
        let n1 = l.source
        let n2 = l.target
        return (n1.group === n2.group ? 50 : 200)
      }))
    .force('charge', d3.forceManyBody().strength(-50))
    .force('center', d3.forceCenter(width / 2, height / 2))

  function dragstarted (d) {
    if (!d3.event.active) { simulation.alphaTarget(0.3).restart() }
    d.fx = d.x
    d.fy = d.y
  }
  d3.json(config, function (graph) {
    let g = svg.append('g')
    let zoom = d3.zoom()
      .scaleExtent([0.3, 2])
      .on('zoom', zoomed)
    svg.call(zoom)
    var link = g.append('g').attr('class', 'links')
      .selectAll('line')
      .data(config.links)
      .enter().append('line')
      .attr('stroke-width', function (d) { return d.value })

    var node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(config.nodes)
      .enter().append('circle')
      .attr('r', 8)
      .attr('fill', function (d) { return color(d.group) })
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    var text = g.append('g')
      .attr('class', 'nodes')
      .selectAll('text')
      .data(config.nodes)
      .enter().append('text')
      .attr('x', 8)
      .attr('y', '.31em')
      .text(function (d) { return d.id })

    node.append('title')
      .text(function (d) { return d.id })

    simulation
      .nodes(config.nodes)
      .on('tick', ticked)

    simulation.force('link')
      .links(config.links)

    function ticked () {
      link
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

      node
        .attr('cx', function (d) { return d.x })
        .attr('cy', function (d) { return d.y })
      text.attr('transform', transform)
    }
    function zoomed () {
      g.attr('transform', d3.event.transform) // updated for d3 v4
    }
  })
  function transform (d) {
    return 'translate(' + d.x + ',' + d.y + ')'
  }
  // +svg.attr('width')
  // function transform (d) {
  //   return 'translate(' + d.x + ',' + d.y + ')'
  // }
  function dragged (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  function dragended (d) {
    if (!d3.event.active) { simulation.alphaTarget(0) }
    d.fx = null
    d.fy = null
  }
}
