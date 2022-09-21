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
      <div id="formulaire">
        <b-form-input
          id="input-1"
          class="formu"
          v-model="cardNumber"
          placeholder="Numéro de carte"
          :formatter="formatCardNumber"
          required
        />
        <b-form-input id="input-2" class="formu" v-model="cardName" placeholder="Nom de la carte" required />
        <div class="card-form__group formu">
          <label for="cardMonth" class="card-input__label">Date d'expiration</label>
          <select class="card-input__input -select" id="cardMonth" v-model="cardMonth" data-ref="cardDate">
            <option value="" disabled selected>Mois</option>
            <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:disabled="n < minCardMonth" v-bind:key="n">
              {{ n < 10 ? '0' + n : n }}
            </option>
          </select>
          <select class="card-input__input -select" id="cardYear" v-model="cardYear" data-ref="cardDate">
            <option value="" disabled selected>Année</option>
            <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">
              {{ $index + minCardYear }}
            </option>
          </select>
        </div>
        <b-form-input id="input-3" class="formu" v-model="cardCvv" maxlength="4" placeholder="CVV" required />
        <b-button v-on:click="validerPaiement()" class="formu" variant="primary">Valider</b-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./paiement.component.ts"></script>
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

#formulaire {
  display: flex;
  flex-direction: column;
  margin: 32px auto;
  gap: 32px;
}
</style>
