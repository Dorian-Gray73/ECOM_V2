<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="transaction">
        <h2 class="jh-entity-heading" data-cy="transactionDetailsHeading">
          <span v-text="$t('ecomApp.transaction.detail.title')">Transaction</span> {{ transaction.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomApp.transaction.etat')">Etat</span>
          </dt>
          <dd>
            <span v-text="$t('ecomApp.EtatProduit.' + transaction.etat)">{{ transaction.etat }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.transaction.date')">Date</span>
          </dt>
          <dd>
            <span>{{ transaction.date }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomApp.transaction.utilisateur')">Utilisateur</span>
          </dt>
          <dd>
            <div v-if="transaction.utilisateur">
              <router-link :to="{ name: 'UtilisateurView', params: { utilisateurId: transaction.utilisateur.id } }">{{
                transaction.utilisateur.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="transaction.id"
          :to="{ name: 'TransactionEdit', params: { transactionId: transaction.id } }"
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

<script lang="ts" src="./transaction-details.component.ts"></script>
