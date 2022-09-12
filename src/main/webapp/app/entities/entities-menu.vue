<template>
  <div>
    <b-dropdown-item to="/utilisateur">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.utilisateur')">Utilisateur</span>
    </b-dropdown-item>
    <b-dropdown-item to="/produit">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.produit')">Produit</span>
    </b-dropdown-item>
    <b-dropdown-item to="/modele">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.modele')">Modele</span>
    </b-dropdown-item>
    <b-dropdown-item to="/caracteristique">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.caracteristique')">Caracteristique</span>
    </b-dropdown-item>
    <b-dropdown-item to="/transaction">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.transaction')">Transaction</span>
    </b-dropdown-item>
    <b-dropdown-item to="/ligne-transaction">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.ligneTransaction')">Ligne Transaction</span>
    </b-dropdown-item>
    <b-dropdown-item to="/image">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.image')">Image</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
