<template>
  <div class="cardPhoto">
    <a href="/produitDetails">
      <div id="photo"></div>
      <div id="nomMonture">Lunette</div>
      <div id="prixMonture">130 euros</div>
    </a>
  </div>
</template>
<script lang="ts" src="./cardLunette.component.ts"></script>
<style scoped>
.cardPhoto {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;

  width: 304px;
  height: 374px;

  background: #ffffff;
}
</style>
