<template>
  <div>
    <b-form-file id="file_input1" @change="onFileChange"></b-form-file>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'uploader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js CAD'
    }
  },
  computed: {
    count () {
      return this.$store.state.listOfNets
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createNet(files[0])
    },
    createNet (file) {
      var reader = new FileReader()
      reader.onload = (e) => {
        const res = reader.result
        let lines = ''
        if (res.indexOf('$NETS') === -1) {
          this.msg = 'good'
          const text = res.replace(/(\r\n|\r\|\n)/g, '').replace(/\s+/g, ' ').replace(/;\s+/g, ';')
          lines = text.split(';')
        } else {
          this.msg = 'goodtoo'
          const text = res.slice(res.indexOf('$NETS') + 6, res.length - 5).replace(/;/g, '').replace(/,\r?\n/g, ' ')
          lines = text.split('\n')
        }
        let listOfNets = []
        for (let line of lines) {
          if (line) {
            let words = line.replace(/\s+/g, ' ').split(' ')
            const newNet = {}
            newNet.name = words[0]
            const elemsOfNet = words.splice(1)
            let newElements = []
            for (let element of elemsOfNet) {
              const elementName = element.substring(0, element.indexOf('('))
              const elementPort = element.match(/\((.*)\)/)[1].slice(1)
              newElements.push({elementName, elementPort})
            }
            newNet.elements = newElements
            listOfNets.push(newNet)
          }
        }
        this.$store.commit('addTodo', listOfNets)
      }
      reader.readAsText(file)
    },
    ...mapMutations([
      'increment'
    ])
  }
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
