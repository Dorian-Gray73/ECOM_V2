<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="ligneTransaction">
        <h2 class="jh-entity-heading" data-cy="ligneTransactionDetailsHeading">
          <span v-text="$t('ecomV2App.ligneTransaction.detail.title')">LigneTransaction</span> {{ ligneTransaction.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('ecomV2App.ligneTransaction.quantite')">Quantite</span>
          </dt>
          <dd>
            <span>{{ ligneTransaction.quantite }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.ligneTransaction.prixUnitaire')">Prix Unitaire</span>
          </dt>
          <dd>
            <span>{{ ligneTransaction.prixUnitaire }}</span>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.ligneTransaction.transaction')">Transaction</span>
          </dt>
          <dd>
            <div v-if="ligneTransaction.transaction">
              <router-link :to="{ name: 'TransactionView', params: { transactionId: ligneTransaction.transaction.id } }">{{
                ligneTransaction.transaction.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('ecomV2App.ligneTransaction.caracteristique')">Caracteristique</span>
          </dt>
          <dd>
            <div v-if="ligneTransaction.caracteristique">
              <router-link :to="{ name: 'CaracteristiqueView', params: { caracteristiqueId: ligneTransaction.caracteristique.id } }">{{
                ligneTransaction.caracteristique.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="ligneTransaction.id"
          :to="{ name: 'LigneTransactionEdit', params: { ligneTransactionId: ligneTransaction.id } }"
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

<script lang="ts" src="./ligne-transaction-details.component.ts"></script>
