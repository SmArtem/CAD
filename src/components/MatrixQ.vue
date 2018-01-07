<template>
  <div class="hello">
    <p> Матрица Q</p>
    <div style="overflow-x: auto; ">
      <table v-if="this.runs.length !== 0" id="app" class="table table-bordered">
        <tr> <td></td> <td v-for="(run, index) in getListOfElements"> {{ getListOfElements[index] }}</td></tr>
        <tr v-for="(run, index) in runs">
          <td>{{ getListOfChainName[index] }}</td>
            <td v-for="(runn, indexx) in run" style="padding: 0;">
                {{runs[index][indexx]}}
            </td>
        </tr>
      </table>
      <h3 v-else>Загрузите файл</h3>
      <!-- <button @click="getMatrix">dfsd</button> -->
    </div>
  </div>
</template>

<script>
import Matrix from '@/utils/MatrixQ'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'matrixQ',
  data () {
    return {
      // runs: Matrix(this.$store.state),
      // msg: this.$store.getters.getListOfElements,
      // legend: this.$store.getters.getListOfChainName
    }
  },
  methods: {
    getMatrix () {
      this.runs = Matrix(this.$store.state)
    }
  },
  computed: mapState({
    runs: state => Matrix(state),
    ...mapGetters([
      'getListOfElements',
      'getListOfChainName'
    ])
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
