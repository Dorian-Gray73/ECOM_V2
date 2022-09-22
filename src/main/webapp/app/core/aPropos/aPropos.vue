<template>
  <div id="recommandations">
    <span class="title">À propos de nous</span>
    <hr class="separate" />
    <div id="aproposDiv">
      <!-- Texte à propos -->
      <div id="textApropos">
        Lu Net, petite, mais dynamique start-up spécialisée dans les lunettes.<br /><br />
        La passion du bon plan et de l’efficacité du service client, nous a motivé à proposer notre service. C’est pourquoi nous nous
        engageons à vous apporter les deux. <br /><br />Nous sommes une équipe de jeunes développeurs portant tous des lunettes, c’est
        pourquoi, nous avons décidé de fonder Lu Net lorsque nous avons cherché à changer nos lunettes et que les opticiens traditionnels ne
        proposaient pas assez de choix nous correspondant. <br /><br />Nous suivons de près les dernières tendances en termes de lunettes et
        donnons la priorité aux envies de nos clients. Présents partout dans le monde, ils sont ainsi heureux de pouvoir s’offrir la mode à
        prix raisonnables. Nous espérons que vous aimerez nos produits autant que nous aimons les trouver pour vous.
      </div>
      <!-- Image à propos -->
      <div id="imgApropos">
        <img src="content/images/imageApropos.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./aPropos.component.ts"></script>

<style scoped>
#aproposDiv {
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin: 20px 128px;
}

#textApropos {
  background-color: #ffffff;
  padding: 32px;
}

#imgApropos {
  background-color: #ffffff;
  padding: 32px;
  object-fit: cover;
}
</style>
