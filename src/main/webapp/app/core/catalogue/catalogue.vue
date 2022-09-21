<template>
  <div id="pageCatalogue">
    <span class="title">Tout le catalogue</span>
    <hr class="separate" />
    <div id="divPagination">
      <div id="affichageSearch">
        <!--Affiche catalogue -->
        <div v-if="produits.length == 0" id="catalogueVide">
          <div id="videTexte">Le catalogue est vide</div>
        </div>
        <div v-else v-for="produit in produitList" :key="produit.id" class="cardPhoto">
          <router-link :to="`/produitDetails/${produit.id}`">
            <div v-if="produit.images == null || produit.images.length == 0" class="photoVide" />
            <img v-else :src="`/content/images/${produit.images[0].lienImage}`" class="photo" alt="" />
            <div class="caracteristique">
              <div class="nomMonture">{{ produit.nom }}</div>
              <div class="prixMonture">{{ produit.prix }}€</div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- Pagination -->
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="produittList"
        align="center"
        id="pagination"
      />
    </div>
  </div>
</template>
<script lang="ts" src="./catalogue.component.ts"></script>
<style scoped>
#pageCatalogue {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#divPagination {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin: 20px 128px;
  max-width: 2019px;
  width: 100%;
}

#catalogueVide {
  display: flex;
  align-items: center;
  background: #ffffff;
  height: 128px;
  text-align: center;
  width: 100%;
  align-items: center;
  margin: auto;
}

#videTexte {
  margin: auto;
}

#affichageSearch {
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  gap: 32px;
  width: 100%;
}

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

.photo {
  width: 256px;
  height: 256px;
  background-color: #f7f7f7;
  object-fit: cover;
}

.photoVide {
  width: 256px;
  height: 256px;
  background-color: #f7f7f7;
}

.caracteristique {
  padding: 0px;
  gap: 8px;
  margin-top: 10px;
}

#pagination {
  margin: auto;
}

a:hover {
  text-decoration: none;
}
</style>
