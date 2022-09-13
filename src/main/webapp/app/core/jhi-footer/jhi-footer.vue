<template>
  <div id="footer">
    <a @click="scrollMeTo('navbar')"><span id="title">Retourner en haut</span></a>
    <hr id="separate" />
    <div id="containerFooter">
      <!-- 1 -->
      <div class="colFooter">
        <div>Lu Net</div>
        <div>8 Boulevard Sérurier</div>
        <div>75019 Paris</div>
        <div>8 Boulevard Sérurier</div>
        <div>01 02 03 04 05</div>
        <div>hello@lunet.com</div>
        <!-- 2 -->
        <div class="colFooter">
          <div>Shopping</div>
          <div>Solaires</div>
          <div>Vues</div>
          <div>Toutes les lunettes</div>
          <div>Accessoires</div>
        </div>
        <!-- 3 -->
        <div>
          <div>Corporate</div>
          <div>À propos</div>
          <div>Carrières</div>
        </div>
        <!-- 4 -->
        <div class="lastColFooter">
          <font-awesome-icon icon="fa-solid fa-instagram" />
          <font-awesome-icon icon="fa-solid fa-facebook-f" />
          <font-awesome-icon icon="fa-solid fa-twitter" />
          <font-awesome-icon icon="fa-solid fa-linkedin-in" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./jhi-footer.component.ts"></script>

<style scoped>
#footer {
  height: 344px;
}

#firstRow {
  margin-top: 64px;
  font-weight: bold;
}

#containerFooter {
  display: flex;
  flex-direction: row;
}

.colFooter {
  display: flex;
}
</style>
