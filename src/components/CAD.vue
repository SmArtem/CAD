<template>
  <svg ref="svg" width="1600" height="900" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet"></svg>
</template>

<script>
import gr from '@/utils/gr'
import * as d3 from 'd3'

export default {
  name: 'cad',
  computed: {
    graph (state) {
      return this.$store.getters.mack
    }
  },
  watch: {
    graph: function () {
      this.updateGraph()
    }
  },
  mounted: function () {
    this.updateGraph()
  },
  methods: {
    updateGraph: function () {
      const svg = d3.select(this.$refs.svg)
      gr(d3, svg, this.graph, this.$store.state.colorScheme)
    }
  }
}
</script>
