<script setup>
const sayHi = () => {
  console.log('hi')
}
</script>

<template>

<div>
  
  <!-- <div class="absolute top-0 left-0 w-screen h-screen" id="clickThroughElement">Click Through</div> -->
  <div class="bg-white h-20 w-32 p-4 mouse absolute" id="windowElement" @click="sayHi">Window Title</div>
</div>

</template>