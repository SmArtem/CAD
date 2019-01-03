<template>
  <label :for="generateId" class="uploader">
    <input class="uploader__input" :id="generateId" type="file" @change="onFileChange" accept=".net"/>
    {{label}}
  </label>
</template>

<script>
export default {
  name: 'uploader',
  data () {
    return {
      label: 'Загрузите файл'
    }
  },
  computed: {
    count () {
      return this.$store.state.listOfNets
    },
    generateId () {
      return Math.floor(Math.random() * 10000)
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createNet(files[0])
      this.label = files[0].name
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
        console.log(listOfNets)
        const name = 'listOfNets'
        this.$store.commit('setList', {name, list: listOfNets})
      }
      reader.readAsText(file)
    }
  }
}
</script>

<style lang="scss">
  .uploader {
    width: 100%;
    border-radius: .25rem;
    padding: .5rem 1rem;
    border: 2px dashed #007bff;
    color: #007bff;
    cursor: pointer;
    transition: background-color .1s linear;

    &:hover {
      background-color: rgba(#007bff, .15);
      color: #0056b3;
    }

    &__input {
      display: none;
    }
  }
</style>
