<template>
  <div>
    <h2 id="page-heading" data-cy="UtilisateurHeading">
      <span v-text="$t('ecomV2App.utilisateur.home.title')" id="utilisateur-heading">Utilisateurs</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('ecomV2App.utilisateur.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'UtilisateurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-utilisateur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('ecomV2App.utilisateur.home.createLabel')"> Create a new Utilisateur </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && utilisateurs && utilisateurs.length === 0">
      <span v-text="$t('ecomV2App.utilisateur.home.notFound')">No utilisateurs found</span>
    </div>
    <div class="table-responsive" v-if="utilisateurs && utilisateurs.length > 0">
      <table class="table table-striped" aria-describedby="utilisateurs">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.utilisateur.nom')">Nom</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.utilisateur.prenom')">Prenom</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.utilisateur.courriel')">Courriel</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.utilisateur.adresse')">Adresse</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.utilisateur.type')">Type</span></th>
            <th scope="row"><span v-text="$t('ecomV2App.utilisateur.internal_user')">Internal User</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="utilisateur in utilisateurs" :key="utilisateur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'UtilisateurView', params: { utilisateurId: utilisateur.id } }">{{ utilisateur.id }}</router-link>
            </td>
            <td>{{ utilisateur.nom }}</td>
            <td>{{ utilisateur.prenom }}</td>
            <td>{{ utilisateur.courriel }}</td>
            <td>{{ utilisateur.adresse }}</td>
            <td v-text="$t('ecomV2App.Type.' + utilisateur.type)">{{ utilisateur.type }}</td>
            <td>
              {{ utilisateur.internal_user ? utilisateur.internal_user.login : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'UtilisateurView', params: { utilisateurId: utilisateur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'UtilisateurEdit', params: { utilisateurId: utilisateur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(utilisateur)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="ecomV2App.utilisateur.delete.question" data-cy="utilisateurDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-utilisateur-heading" v-text="$t('ecomV2App.utilisateur.delete.question', { id: removeId })">
          Are you sure you want to delete this Utilisateur?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-utilisateur"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeUtilisateur()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./utilisateur.component.ts"></script>
