<script lang="ts">
  export let text: string
</script>

<div class="loading">
  <h2>{text}</h2>
  <div class="progress-bar">
    <div class="circle border" />
  </div>
</div>

<style lang="scss">
  .loading {
    display: flex;
  }
  .progress-bar {
    display: flex;
    align-items: center;
    margin: 0.5rem;
    .circle {
      border: solid 5px #0f0f0f98;
      border-top-color: #396cd8;
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
    }
  }
  .border {
    width: 100%;
    transform: rotate(135deg);
    animation: spin 1.5s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
