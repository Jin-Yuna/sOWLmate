<template>
  <div class="meter">
    <span id="percent" :style="`width:${intimacyEval}%`"
      ><span class="progress"></span
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    intimacyEval: Number,
  },
  mounted() {},
};
</script>

<style>
.meter {
  width: 90%;
  height: 7px;
  position: relative;
  background: #f3efe6;
  overflow: hidden;
}

.meter span {
  display: block;
  height: 100%;
}

.progress {
  background-color: #7c58eb;
  animation: progressBar 3s ease-in-out;
  animation-fill-mode: both;
}

@keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
