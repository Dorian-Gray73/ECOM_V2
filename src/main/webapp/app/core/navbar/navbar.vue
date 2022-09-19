<template>
  <b-navbar id="navbar" ref="navbar">
    <b-navbar-brand href="#">
      <img id="logo" src="/content/images/Lu_Net_Logo.png" />
    </b-navbar-brand>
    <div class="navbar-nav ml-auto">
      <!-- Recommandations -->
      <b-nav-item to="/" class="navbar-nav">
        <font-awesome-icon :icon="['fa', 'fa-lightbulb']" class="icon alt" />
        Recommandations
      </b-nav-item>
      <!-- Tout le catalogue -->
      <b-nav-item to="/catalogue" class="navbar-nav">
        <font-awesome-icon icon="fa-solid fa-list" />
        Tout le catalogue
      </b-nav-item>
      <!-- Recherche -->

      <b-nav-item to="/recherche" class="navbar-nav">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        Recherche
      </b-nav-item>

      <!-- Connexion -->
      <b-nav-item to="/home" class="navbar-nav">
        <font-awesome-icon icon="fa-solid fa-user" />
        Connexion
      </b-nav-item>
      <!-- Panier -->
      <b-nav-item to="/panier" class="navbar-nav">
        <font-awesome-icon :icon="['fa', 'fa-basket-shopping']" class="icon alt" />
        Panier <b-badge variant="light">{{ $store.getters.nbProduit }}</b-badge>
      </b-nav-item>
    </div>
  </b-navbar>
</template>
<script lang="ts" src="./navbar.component.ts"></script>
<style scoped>
#navbar {
  background-color: #ffffff;
  margin: 32px 128px;
  box-shadow: 0px 4px 16px rgba(94, 102, 161, 0.05);
  height: 96px;
  padding: 16px 64px;
}

.navbar-light .navbar-nav .nav-link {
  color: #000000;
  font-family: Inter;
}

li {
  list-style-type: none;
}

a {
}

#logo {
  width: 147.57px;
  height: 64px;
}
</style>
