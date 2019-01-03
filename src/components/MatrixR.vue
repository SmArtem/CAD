<template>
  <table v-if="matrixR.length > 0" class="table table-bordered">
    <tr>
      <td></td>
      <td v-for="(run, index) in getListOfElements" :key="index">
        {{ getListOfElements[index] }}
      </td>
    </tr>
    <tr v-for="(run, i) in matrixR" :key="i">
      <td>{{ getListOfElements[i] }}</td>
      <td v-for="(runn, j) in run" style="padding: 0;" :key="j">
        {{ matrixR[i][j] }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'matrixR',
  computed: mapGetters([
    'getListOfElements',
    'getListOfChainName',
    'matrixR'
  ])
}
</script>
