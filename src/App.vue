<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Основные данные</router-link>
      <router-link :to="{name: 'delivery'}"">Адрес доставки</router-link>
    </div>
    <form>
      <router-view/>
    </form>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: $layout;
  margin: 0 auto;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    padding: 20px;
    color: $color-b3;
    &.router-link-exact-active {
      color: $color-w1;
    }
  }
}
</style>
