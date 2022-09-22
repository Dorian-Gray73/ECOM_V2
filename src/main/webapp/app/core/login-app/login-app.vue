<template>
  <div id="loginApp">
    <span class="title">Connexion</span>
    <hr class="separate" />
    <div id="divBtnConnexion">
      <!-- <b-button v-on:click="seConnecter()" class="btnConnexion">S'enregistrer</b-button>
      <b-button v-on:click="openLogin()" class="btnConnexion">Se connecter</b-button>-->
      <div class="modal-body">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <b-alert show data-cy="loginError" variant="danger" v-if="authenticationError">
              <strong>Erreur lors de la connexion</strong> Merci de vérifier vos informations et de réessayer.
            </b-alert>
          </div>
          <div class="col-md-8">
            <b-form role="form" v-on:submit.prevent="doLogin()">
              <b-form-group label="Identifiant" label-for="username">
                <b-form-input
                  id="username"
                  type="text"
                  name="username"
                  autofocus
                  placeholder="Votre identifiant"
                  v-model="login"
                  data-cy="username"
                >
                </b-form-input>
              </b-form-group>
              <b-form-group label="Mot de passe" label-for="password">
                <b-form-input
                  id="password"
                  type="password"
                  name="password"
                  v-model.trim="name"
                  placeholder="Votre mot de passe"
                  v-model="password"
                  data-cy="password"
                >
                </b-form-input>
              </b-form-group>
              <b-form-checkbox id="rememberMe" name="rememberMe" v-model="rememberMe" checked>
                <span>Se souvenir de moi</span>
              </b-form-checkbox>
              <div>
                <b-button data-cy="submit" type="submit" variant="primary">Se connecter</b-button>
              </div>
            </b-form>
            <p></p>
            <div>
              <b-alert show variant="warning">
                <span>Vous n'avez pas encore de compte ?</span>
                <b-link :to="'/register'" class="alert-link">Enregistrer un compte</b-link>
              </b-alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./login-app.component.ts"></script>
<style scoped>
#divBtnConnexion {
  margin: auto;
}
</style>
