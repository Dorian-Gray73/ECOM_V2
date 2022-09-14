<template>
  <div id="footer">
    <a @click="scrollMeTo('navbar')"><span id="title">Retourner en haut</span></a>
    <hr id="separate" />
    <div id="containerFooter">
      <!-- 1 -->
      <div class="colFooter">
        <div class="firstRow">Lu Net</div>
        <br />
        <div>8 Boulevard Sérurier</div>
        <div>75019 Paris</div>
        <div>8 Boulevard Sérurier</div>
        <br />
        <div>01 02 03 04 05</div>
        <div>hello@lunet.com</div>
      </div>
      <!-- 2 -->
      <div class="colFooter">
        <div class="firstRow">Shopping</div>
        <br />
        <div>Solaires</div>
        <div>Vues</div>
        <div>Toutes les lunettes</div>
        <div>Accessoires</div>
      </div>
      <!-- 3 -->
      <div>
        <div class="firstRow">Corporate</div>
        <br />
        <div>À propos</div>
        <div>Carrières</div>
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

<script lang="ts" src="./jhi-footer.component.ts"></script>

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
  padding: 64px 128px;
  gap: 128px;
}
</style>
