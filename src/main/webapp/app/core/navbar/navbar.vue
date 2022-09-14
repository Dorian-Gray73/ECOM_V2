<template>
  <b-navbar id="navbar" ref="navbar">
    <b-navbar-brand href="#">
      <img id="logo" src="/content/images/Lu_Net_Logo.png" />
    </b-navbar-brand>
    <div class="navbar-nav ml-auto">
      <b-nav-item href="/" class="navbar-nav">
        <font-awesome-icon icon="fa-solid fa-solid fa-house" />
        Accueil
      </b-nav-item>
      <b-nav-item class="navbar-nav" href="/home">
        <font-awesome-icon icon="fa-solid fa-user" />
        Connexion
      </b-nav-item>
      <b-nav-item href="/recherche" class="navbar-nav">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        Recherche
      </b-nav-item>
      <b-nav-item href="/panier" class="navbar-nav">
        <font-awesome-icon :icon="['fa', 'fa-basket-shopping']" class="icon alt" />
        Panier
      </b-nav-item>
    </div>
  </b-navbar>
</template>
<script lang="ts" src="./navbar.component.ts"></script>
<style scoped>
#navbar {
  background-color: #ffffff;
  margin-top: 32px;
  margin-bottom: 26px;
  margin-left: 4%;
  margin-right: 4%;
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
