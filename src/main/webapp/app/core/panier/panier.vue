<template>
  <div id="pagePanier">
    <!-- Progression Panier -->
    <div class="progressionPanier">
      <div class="step active">Panier</div>
      <div class="step">Connexion</div>
      <div class="step">Paiement</div>
      <div class="step">Confirmation</div>
    </div>
    <div id="contenuPanier">
      <!-- Produits du panier -->
      <div id="produitPanier" :key="componentKey">
        <div v-for="produit in panier" :key="produit.id">
          <div class="produit">
            <div class="photoProduit"></div>
            <div class="nomPrix">{{ produit.nom }} <br />{{ produit.couleur }}<br />{{ produit.prix }}€</div>
            <div class="quantite">Quantité : {{ quantite[produit.id] }}</div>
            <div class="prixTotal">Prix total : {{ quantite[produit.id] * produit.prix }}€</div>
            <div v-on:click="deleteProduit(produit)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </div>
          </div>
        </div>
      </div>
      <!-- Récap du panier -->
      <div id="validerPanier">
        <div>Articles : {{ getPrixTotal() }}€</div>
        <div>Livraison : {{ livraison }}€</div>
        <div>Total : {{ getPrixTotalLivraison() }}€</div>
        <b-button>Commander</b-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./panier.component.ts"></script>
<style scoped>
#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
}

#produitPanier {
  display: flex;
  width: 1032px;
  height: 864px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  overflow: auto;
}

#validerPanier {
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 64px;
  width: 320px;
  height: 399px;
  background: #ffffff;
}

.produit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32px;
  gap: 64px;

  width: 1032px;
  height: 192px;

  background: #ffffff;
}

.photoProduit {
  width: 128px;
  height: 128px;
  background-color: #f7f7f7;
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

.step.active {
  font-weight: bold;
  border-bottom: solid 1px #5b85aa;
  padding-bottom: 7px;
}
</style>
