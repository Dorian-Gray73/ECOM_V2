<template>
  <div id="pageRecherche">
    <span class="title">Résultats de la recherche</span>
    <hr class="separate" />
    <div id="resultat">
      <!-- SearchBar -->
      <b-input-group id="searchBar">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" id="iconSearchBar" />
        <b-form-input placeholder="Nom d'une monture" id="inputSearchBar" v-model="search" />
      </b-input-group>

      <div id="containerSearch">
        <!-- Filtre -->
        <div id="filtres">
          <div>Couleur</div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              v-model="selectedCouleurs"
              :options="couleurs"
              :aria-describedby="ariaDescribedby"
              name="flavour-2a"
              stacked
            />
          </b-form-group>
          <div>Prix minimum : {{ sliderMin }}</div>
          <b-form-input id="range-1" v-model="sliderMin" type="range" :min="prixMin" :max="sliderMax"></b-form-input>
          <div>Prix maximum : {{ sliderMax }}</div>
          <b-form-input id="range-2" v-model="sliderMax" type="range" :min="sliderMin" :max="prixMax"></b-form-input>
        </div>
        <div id="divPagination">
          <!-- Affichage Search -->
          <div id="affichageSearch">
            <div v-if="produitList.length == 0" id="catalogueVide">
              <div id="videTexte">Pas de lunettes disponibles</div>
            </div>
            <div v-else v-for="produit in produitList" :key="produit.id" class="cardPhoto">
              <router-link :to="`/produitDetails/${produit.id}`">
                <img :src="`/content/images/${produit.images[0].lienImage}`" class="photo" alt="" />
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
    </div>
  </div>
</template>
<script lang="ts" src="./recherche.component.ts"></script>
<style scoped>
#pageRecherche {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#resultat {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px 128px;
  max-width: 2019px;
  width: 100%;
}

#searchBar {
  background-color: #ffffff;
  display: flex;
  gap: 16px;
  padding: 8px 16px;
}

#iconSearchBar {
  width: 16px;
  margin: auto;
}

#inputSearchBar {
  margin: auto;
  border: none;
  flex: 1;
}

#containerSearch {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  height: 1186px;
  margin: 32px 0;
  width: 100%;
}

#filtres {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  gap: 16px;
  background: #ffffff;
}

#divPagination {
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#affichageSearch {
  flex: 6;
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  gap: 32px;
  height: 1186px;
}

#affichageSearch::after {
  content: '';
  flex: auto;
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

#pagination {
  margin: auto;
}

a:hover {
  text-decoration: none;
}

.caracteristique {
  padding: 0px;
  gap: 8px;
  margin-top: 10px;
}
</style>
