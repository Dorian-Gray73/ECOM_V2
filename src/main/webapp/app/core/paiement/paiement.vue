<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div class="progressionPanier">
      <div class="step done">Panier</div>
      <div class="step done">Connexion</div>
      <div class="step active">Paiement</div>
      <div class="step">Confirmation</div>
    </div>
    <div id="contenuPanier">
      <b-button v-on:click="validerPaiement()">S'enregistrer</b-button>
    </div>
  </div>
</template>
<script lang="ts" src="./paiment.component.ts"></script>
<style scoped>
#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
  background-color: #ffffff;
  height: 128px;
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
