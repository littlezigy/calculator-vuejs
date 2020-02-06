<template>
  <div id="app">
    <nav role = 'navigation'>
        <router-link to = '/' id = 'main-menu-item'>Basic Calculator</router-link>
        <router-link to = '/help'>Help</router-link>
        <router-link to = '/about'>About</router-link>
    </nav>
    <div id = 'container'>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return{

    }
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
nav {
  height: 10vh;
  background-color: pink;
  display: flex;
  justify-content: space-evenly;
}
nav a{
  padding: 1em;
  color: rgb(42, 5, 51);
  text-decoration: none;
  font-size: 1.5em;
}

@media only screen and (max-width: 580px) {
	nav a {
		display: none;
	}
	nav a#main-menu-item {
		display: block;
	}
}
#container{
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
