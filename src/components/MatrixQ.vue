<template>
  <table v-if="matrixQ.length > 0" class="table table-bordered">
    <tr>
      <td></td>
      <td v-for="(run, index) in getListOfElements" :key="index">
        {{ getListOfElements[index] }}
      </td>
    </tr>
    <tr v-for="(run, i) in matrixQ" :key="i">
      <td>{{ getListOfChainName[i] }}</td>
      <td v-for="(runn, j) in run" :key="j" style="padding: 0;">
        {{ matrixQ[i][j] }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'matrixQ',
  computed: mapGetters([
    'getListOfElements',
    'getListOfChainName',
    'matrixQ'
  ])
}
</script>
