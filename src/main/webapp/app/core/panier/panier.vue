<template>
  <div id="pageRecherche">
    <span id="title">Panier</span>
    <hr id="separate" />
    <div id="contenuPanier">
      <div id="produitPanier">
        <div class="produit">
          <div class="photoProduit"></div>
          <div class="nomPrix">Nom <br />Prix</div>
          <div class="quantite">Select quantity</div>
          <div class="prixTotal">Prix total :</div>
          <div>
            <font-awesome-icon icon="fa-solid fa-trash" />
          </div>
        </div>
      </div>
      <div id="validerPanier">
        <div>Articles :</div>
        <div>Livraison :</div>
        <div>Total :</div>
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
}

#produitPanier {
  display: flex;
  width: 1032px;
  height: 864px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
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
</style>
