<template>
  <div class="loaderframe">
    <div class="loader"></div>
  </div>
</template>

<style scoped>

.loaderframe {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 1000;
  top: 0px;
  left: 0px;
}

.loader {
  border: 5px solid #666; /* Light grey */
  border-top: 5px solid #aaa; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>

<script>

</script>

