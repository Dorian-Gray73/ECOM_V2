<template>
  <div id="pageHistorique">
    <span class="title">Historique des transactions</span>
    <hr class="separate" />
    <b-spinner v-if="isLoading" style="width: 3rem; height: 3rem; margin: 32px auto" />
    <!-- Progression Panier -->
    <div id="contenuPanier" v-else>
      <div id="produitPanier">
        <div v-for="transaction in historique" :key="transaction.id" class="produit">
          <div class="numeroCommande">N° Commande : {{ transaction.id }}</div>
          <div class="dateCommande">Date : {{ transaction.date }}</div>
          <div class="etatCommande">État : {{ transaction.etat }}</div>
          <!--<div class="ligneTransaction" v-for="ligne in transaction.ligneTransactions"/>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./historiqueTransactions.component.ts"></script>
<style scoped>
#pageHistorique {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#contenuPanier {
  display: flex;
  flex-direction: column;
  margin: 20px 128px;
  gap: 32px;
}

#produitPanier {
  display: flex;
  width: 100%;
  height: 864px;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 32px;
  overflow: auto;
}

.produit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32px;
  gap: 64px;

  width: 100%;
  height: 192px;

  background: #ffffff;
}

#contenuPanier {
  display: flex;
  margin: 20px 128px;
  gap: 32px;
}
</style>
