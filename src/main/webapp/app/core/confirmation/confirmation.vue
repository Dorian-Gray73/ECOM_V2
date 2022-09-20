<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div class="progressionPanier">
      <div class="step done">Panier</div>
      <div class="step done">Connexion</div>
      <div class="step done">Paiement</div>
      <div class="step active">Confirmation</div>
    </div>
    <div id="contenuPanier"></div>
  </div>
</template>
<script lang="ts" src="./confirmation.component.ts"></script>
<style scoped>
#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
  background-color: #ffffff;
}

.progressionPanier {
  display: flex;
  margin: 0 128px;
  border-bottom: solid 1px #5b85aa;
}

.step {
  font-weight: 200;
  text-align: center;
  padding: 8px 64px;
}

.step.done {
  font-weight: 200;
  text-align: center;
  border-bottom: solid 1px #5b85aa;
  padding-bottom: 7px;
}

.step.active {
  font-weight: bold;
  border-bottom: solid 1px #5b85aa;
  padding-bottom: 7px;
}
</style>
