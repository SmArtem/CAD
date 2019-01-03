<template>
  <div class="boxes">
    <div class="box" v-for="box in boxes" :key="box.group" :style="{'border-color': color(box.group)}">
      <span v-for="el in box.nodes" :key="el.id">
        {{ el.id }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'boxes',
  computed: {
    nodes () {
      return this.$store.getters.linker.nodes
    },
    color () {
      return this.$store.state.colorScheme
    },
    boxes () {
      const listElement = this.nodes || []
      let gm = {}
      let nodes = []
      for (let n of listElement) {
        let i = n.group
        let l = gm[i] || (gm[i] = {group: i, size: 0, nodes: []})
        if (l.size === 0) { nodes.push(l) }
        l.nodes.push(n)
        l.size += 1
      }
      return nodes
    }
  }
}
</script>

<style>
.boxes {
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: .5rem;
  border: 2px solid #007bff;
}
.box {
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  border: 3px solid;
}
</style>
