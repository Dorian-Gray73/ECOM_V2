<template>
  <div id="footer">
    <a @click="scrollMeTo('navbar')"><span class="title">Retourner en haut</span></a>
    <hr class="separate" />
    <div id="containerFooter">
      <!-- 1 -->
      <div class="colFooter">
        <div class="firstRow">Lu Net</div>
        <br />
        <div>60 Rue de la Chimie</div>
        <div>38400 Saint-Martin-d'Hères</div>
        <div>France</div>
        <br />
        <div>01 02 03 04 05</div>
        <div>hello@lunet.com</div>
      </div>
      <!-- 2 -->
      <div class="colFooter">
        <div class="firstRow">Shopping</div>
        <br />
        <a to="/">Catalogue</a><br />
        <a to="/recherche">Recherche</a>
      </div>
      <!-- 3 -->
      <div>
        <div class="firstRow">Corporate</div>
        <br />
        <a to="/apropos">À propos</a>
      </div>
      <!-- 4
      <div class="lastColFooter">
        <font-awesome-icon :icon="['fa', 'fa-instagram']" class="icon alt"/>
        <font-awesome-icon :icon="['fa', 'fa-facebook-f']" class="icon alt"/>
        <font-awesome-icon :icon="['fa', 'fa-twitter']" class="icon alt"/>
        <font-awesome-icon :icon="['fa', 'fa-linkedin-in']" class="icon alt"/>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts" src="./footer.component.ts"></script>

<style scoped>
#footer {
  height: 344px;
}

.firstRow {
  font-weight: bold;
}

#containerFooter {
  display: flex;
  flex-direction: row;
  padding: 64px 0;
  gap: 128px;
}
</style>
