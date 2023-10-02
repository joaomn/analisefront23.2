<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Principal from './components/Principal.vue';
</script>

<template>
  <principal></principal>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Titan+One&family=Ubuntu&display=swap');
* {
    
  margin:0;
  padding:0;
  border:0;
  font-family: 'Ubuntu', sans-serif;

}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
