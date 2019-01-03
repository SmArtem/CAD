<template>
  <div id="app">
    <div class="aside" width="360px" style="background-color: rgb(238, 241, 246)">
      <ul class="nav flex-column nav-pills">
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" :to="{name: 'CAD'}">Граф элементных комплексов</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" :to="{name: 'Linker'}">Граф результата компоновки</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" :to="{name: 'matrixR'}">Матрица R</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" :to="{name: 'matrixQ'}">Матрица Q</router-link>
        </li>
      </ul>
      <uploader style="margin-top: 16px;"/>
      <div style="margin-top: 8px;" class="form-group" v-if="$route.name === 'Linker'">
        <label for="count">Элементов на плате</label>
        <input v-model="boardCount" class="form-control" type="number" name="count" id="count" min="2">
      </div>
      <boxes style="flex-grow: 1;"/>
    </div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'
import Boxes from '@/components/Boxes'

export default {
  name: 'app',
  components: {
    Uploader,
    Boxes
  },
  computed: {
    title () {
      return this.$route.name
    },
    colorScheme () {
      return this.$store.state.colorScheme
    },
    boardCount: {
      get () {
        return this.$store.state.boardCount
      },
      set (value) {
        this.$store.commit('setProp', {name: 'boardCount', value})
      }
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.aside {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 320px;
  background-color: rgb(238, 241, 246);
  padding: 16px 8px;
}
.body-container {
  min-height: 100%;
}
.main-container {
  overflow: auto;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 320px;
  right: 0px;
}
.title {
  font-size: 24px;
  line-height: 24px;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 320px;
  border-bottom-right-radius: 6px;
  color: white;
  padding: 8px;
  background: #2c3e50;
}
.table {
  margin-bottom: 0;
}
.nav {
  flex-shrink: 0;
}
</style>
