<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="utilisateur">
        <h2 class="jh-entity-heading" data-cy="utilisateurDetailsHeading">
          <span v-text="$t('ecomV2App.utilisateur.detail.title')">Utilisateur</span> {{ utilisateur.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomV2App.utilisateur.nom')">Nom</span>
          </dt>
          <dd>
            <span>{{ utilisateur.nom }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.utilisateur.prenom')">Prenom</span>
          </dt>
          <dd>
            <span>{{ utilisateur.prenom }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.utilisateur.courriel')">Courriel</span>
          </dt>
          <dd>
            <span>{{ utilisateur.courriel }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.utilisateur.adresse')">Adresse</span>
          </dt>
          <dd>
            <span>{{ utilisateur.adresse }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.utilisateur.type')">Type</span>
          </dt>
          <dd>
            <span v-text="$t('ecomV2App.Type.' + utilisateur.type)">{{ utilisateur.type }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.utilisateur.internal_user')">Internal User</span>
          </dt>
          <dd>
            {{ utilisateur.internal_user ? utilisateur.internal_user.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="utilisateur.id"
          :to="{ name: 'UtilisateurEdit', params: { utilisateurId: utilisateur.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./utilisateur-details.component.ts"></script>
