<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div class="progressionPanier">
      <div class="step done">Panier</div>
      <div class="step active">Connexion</div>
      <div class="step">Paiement</div>
      <div class="step">Confirmation</div>
    </div>
    <div id="contenuPanier">
      <div id="divBtnConnexion">
        <b-button v-on:click="seConnecter()" class="btnConnexion">S'enregistrer</b-button>
        <b-button v-on:click="openLogin()" class="btnConnexion">Se connecter</b-button>
      </div>
    </div>
    <b-modal id="login-page" hide-footer lazy>
      <span data-cy="loginTitle" slot="modal-title" id="login-title" v-text="$t('login.title')">Sign in</span>
      <login-form></login-form>
    </b-modal>
  </div>
</template>
<script lang="ts" src="./connexion.component.ts"></script>
<style scoped>
#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
  background-color: #ffffff;
  height: 128px;
  align-items: center;
}

#divBtnConnexion {
  margin: auto;
}

.btnConnexion {
  background-color: #5b85aa;
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
