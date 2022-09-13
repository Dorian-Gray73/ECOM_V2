<template>
  <div id="pageRecherche">
    <span id="title">Résultats de la recherche</span>
    <hr id="separate" />
    <div id="resultat">
      <b-input-group id="searchBar">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" id="iconSearchBar" />
        <b-form-input placeholder="Nom d'une monture" id="inputSearchBar"></b-form-input>
      </b-input-group>

      <div id="containerSearch">
        <div id="filtres">
          <div>Couleur</div>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="flavour-2a"
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
          <div>Prix</div>
        </div>
        <div id="affichageSearch">
          <div class="cardPhoto">
            <a href="/produitDetails">
              <div id="photo"></div>
              <div id="nomMonture">Lunette</div>
              <div id="prixMonture">130 euros</div>
            </a>
          </div>

          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>
          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>
          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>

          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>

          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>
          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>

          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>
          <div class="cardPhoto">
            <div id="photo"></div>
            <div id="nomMonture">Lunette</div>
            <div id="prixMonture">130 euros</div>
          </div>
          <b-pagination v-model="currentPage" :total-rows="rows" id="pagination"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./recherche.component.ts"></script>
<style scoped>
.col {
  padding-right: 0;
}

#searchBar {
  background-color: #ffffff;
  display: flex;
  gap: 16px;
  padding: 8px 16px;
}

#inputSearchBar {
  margin: auto;
  border: none;
  flex: 1;
}

#iconSearchBar {
  width: 16px;
  margin: auto;
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
}

#affichageSearch {
  flex: 6;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px;
  gap: 32px;
  height: 1186px;
}

#filtres {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px;
  gap: 64px;
  background: #ffffff;
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

#photo {
  width: 256px;
  height: 256px;
  background-color: #f7f7f7;
}

#nomMonture {
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;

  color: #5b85aa;
}

#prixMonture {
  font-family: 'IBM Plex Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;

  color: #5b85aa;
}

#resultat {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px 128px;
}

#pagination {
  margin: auto;
}
</style>
