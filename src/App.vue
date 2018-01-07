<template>
  <div id="app">
    <header class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand">Мой компоновщик на Vue.js</a>
        <div class="navbar-collapse collapse show">
          <div class="mr-auto"></div>
          <uploader >
          </uploader>
        </div>
      </div>
    </header>
    <div>
      <b-nav tabs style="margin-top: 2rem;">
        <div class="container">
          <b-nav-item to="/" exact>Граф элементных комплексов</b-nav-item>
          <b-nav-item to="/Linker">Граф результата компоновки</b-nav-item>
          <b-nav-item to="/MatrixR">Матрица R</b-nav-item>
          <b-nav-item to="/MatrixQ">Матрица Q</b-nav-item>
        </div>
      </b-nav>
    </div>
    <main class="container-fluid">
      <router-view></router-view>
    </main>
    <div style="height: 60px;"></div>
    <footer class="bg-dark footer">
      <div class="container">
        <span class="text-muted">Заболотский А.В.</span>
      </div>
    </footer>    
  </div>
</template>

<script>
import Uploader from '@/components/uploader'

export default {
  name: 'app',
  components: {
    Uploader
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
