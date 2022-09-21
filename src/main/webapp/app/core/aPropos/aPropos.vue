<template>
  <div id="recommandations">
    <span class="title">À propos de nous</span>
    <hr class="separate" />
    <div id="aproposDiv">
      <div id="textApropos">
        Lu Net, petite, mais dynamique start-up spécialisée dans les lunettes.<br />
        La passion du bon plan et de l’efficacité du service client, nous a motivé à proposer notre service. C’est pourquoi nous nous
        engageons à vous apporter les deux. Nous sommes une équipe de jeunes développeurs portant tous des lunettes, c’est pourquoi, nous
        avons décidé de fonder Lu Net lorsque nous avons cherché à changer nos lunettes et que les opticiens traditionnels ne proposaient
        pas assez de choix nous correspondant. Nous suivons de près les dernières tendances en termes de lunettes et donnons la priorité aux
        envies de nos clients. Présents partout dans le monde, ils sont ainsi heureux de pouvoir s’offrir la mode à prix raisonnables. Nous
        espérons que vous aimerez nos produits autant que nous aimons les trouver pour vous.
      </div>
      <div id="imgApropos">
        <img src="content/images/imageApropos.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./aPropos.component.ts"></script>

<style scoped>
#aproposDiv {
  display: flex;
  flex-direction: row;
}
</style>
