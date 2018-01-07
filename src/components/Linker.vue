<template>
  <div class="hello" style="width: 100%;">
    <h1>{{ msg }}</h1>
    <input v-b-tooltip.hover title="Элементов на плате" v-model="count" type="numder">
    <b-alert :show="showDismissibleAlert" variant="danger">Введите число больше единицы</b-alert>
    </br>
  </div>
</template>

<script>
import Matrix from '@/utils/Linker'
import Gr from '@/utils/gr'
import { mapState } from 'vuex'

export default {
  name: 'Linker',
  data () {
    return {
      msg: 'Результат компоновки',
      count: 4,
      showDismissibleAlert: false
    }
  },
  computed: mapState({
    testGraph (state) {
      if (this.count > 1) {
        this.showDismissibleAlert = false
        return Matrix(state, this.count)
      } else { this.showDismissibleAlert = true }
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
