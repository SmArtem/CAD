<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg width="960" height="500" viewBox="0 0 960 500"
  preserveAspectRatio="xMidYMid meet"></svg>
  </div>
</template>

<script>
import Matrix from '@/utils/Mack'
import Gr from '@/utils/gr'
import { mapState } from 'vuex'

// import { mapMutations } from 'vuex'

export default {
  name: 'CAD',
  data () {
    return {
      msg: 'Граф элементных комплексов'
    }
  },
  computed: mapState({
    testGraph (state) {
      return Matrix(state)
    }
  }),
  watch: {
    // эта функция запускается при любом изменении вопроса
    testGraph: function () {
      this.$d3.select('svg').remove()
      this.getGraph()
    }
  },
  mounted: function () {
    this.$d3.select('svg').remove()
    this.getGraph()
  },
  methods: {
    getGraph: function () {
      let d3 = this.$d3
      let width = 960
      let height = 600
      let svg = d3.select('.hello').append('svg')
        .attr('width', width)
        .attr('height', height)
        // .attr('viewBox', '0 0 1920 1200')
        // .attr('preserveAspectRatio', 'xMidYMid meet')
      Gr(d3, svg, this.testGraph)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
