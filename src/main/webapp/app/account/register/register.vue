<!-- Les fichiers register sont ceux qui sont chargé par l'application, et donc sujet à modification pour les tests. -->
<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h1 id="register-title" data-cy="registerTitle">Création de compte</h1>

        <div class="alert alert-success" role="alert" v-if="success"><strong>Compte créé </strong> Veuillez vous connecter.</div>

        <div class="alert alert-danger" role="alert" v-if="error"><strong>Echec de la création du compte.</strong> Réssayez plus tard.</div>

        <div class="alert alert-danger" role="alert" v-if="errorUserExists">
          <strong>Nom de compte déjà utilisé.</strong>Choisissez en un autre.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists">
          <strong>Courriel déjà utilisé.</strong> Veuillez en entrer un autre.
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form id="register-form" name="registerForm" role="form" v-on:submit.prevent="register()" v-if="!success" no-validate>
          <div class="form-group">
            <label class="form-control-label" for="username">Nom de compte</label>
            <input
              type="text"
              class="form-control"
              v-model="$v.registerAccount.login.$model"
              id="username"
              name="login"
              :class="{ valid: !$v.registerAccount.login.$invalid, invalid: $v.registerAccount.login.$invalid }"
              required
              minlength="1"
              maxlength="50"
              pattern="^[a-zA-Z0-9!#$&'*+=?^_`{|}~.-]+@?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              v-bind:placeholder="$t('global.form[\'username.placeholder\']')"
              data-cy="username"
            />
            <div v-if="$v.registerAccount.login.$anyDirty && $v.registerAccount.login.$invalid">
              <small class="form-text text-danger" v-if="!$v.registerAccount.login.required"> Nom de compte requis. </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.login.minLength">
                Le nom de compte doit faire au moins un caractère.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.login.maxLength">
                Le nom de compte doit faire moins de 50 caractères.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.login.pattern">
                Le nom de compte ne doit contenir que des lettres et des chiffres.
              </small>
            </div>
          </div>

          <div class="form-group">
            <label class="form-control-label" for="nom">Nom</label>
            <input
              type="texte"
              class="form-control"
              id="nom"
              name="nom"
              v-model="$v.registerUtilisateur.nom.$model"
              :class="{ valid: !$v.registerUtilisateur.nom.$invalid, invalid: $v.registerUtilisateur.nom.$invalid }"
              required
              minlength="1"
              maxlength="30"
              v-bind:placeholder="$t('global.form[\'nom.placeholder\']')"
              data-cy="nom"
            />
            <div v-if="$v.registerUtilisateur.nom.$anyDirty && $v.registerUtilisateur.nom.$invalid">
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.nom.required"> Le nom de famille est requis. </small>
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.nom.minLength">
                Le nom de famille doit faire au moins un caractère.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.nom.maxLength">
                Le nom de famille doit faire moins de 30 caractères.
              </small>
            </div>
          </div>

          <div class="form-group">
            <label class="form-control-label" for="prenom">Prenom</label>
            <input
              type="texte"
              class="form-control"
              id="prenom"
              name="prenom"
              v-model="$v.registerUtilisateur.prenom.$model"
              :class="{ valid: !$v.registerUtilisateur.prenom.$invalid, invalid: $v.registerUtilisateur.prenom.$invalid }"
              required
              minlength="1"
              maxlength="30"
              v-bind:placeholder="$t('global.form[\'prenom.placeholder\']')"
              data-cy="prenom"
            />
            <div v-if="$v.registerUtilisateur.prenom.$anyDirty && $v.registerUtilisateur.prenom.$invalid">
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.prenom.required"> Votre prénom est requis. </small>
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.prenom.minLength">
                Votre prénom doit faire au moins un caractère.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.prenom.maxLength">
                Votre prénom doit faire moins de 30 caractères.
              </small>
            </div>
          </div>

          <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              :class="{ valid: !$v.registerAccount.email.$invalid, invalid: $v.registerAccount.email.$invalid }"
              v-model="$v.registerAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              v-bind:placeholder="$t('global.form[\'email.placeholder\']')"
              data-cy="email"
            />
            <div v-if="$v.registerAccount.email.$anyDirty && $v.registerAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!$v.registerAccount.email.required"> Email requis. </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.email.email"> Email invalide. </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.email.minLength">
                Votre email doit faire au moins 5 caractères.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.email.maxLength">
                Votre email doit faire moins de 100 caractères.
              </small>
            </div>
          </div>

          <div class="form-group">
            <label class="form-control-label" for="adresse">Adresse</label>
            <input
              type="texte"
              class="form-control"
              id="adresse"
              name="adresse"
              v-model="$v.registerUtilisateur.adresse.$model"
              :class="{ valid: !$v.registerUtilisateur.adresse.$invalid, invalid: $v.registerUtilisateur.adresse.$invalid }"
              required
              minlength="10"
              maxlength="100"
              v-bind:placeholder="$t('global.form[\'adresse.placeholder\']')"
              data-cy="adresse"
            />
            <div v-if="$v.registerUtilisateur.adresse.$anyDirty && $v.registerUtilisateur.adresse.$invalid">
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.adresse.required"> Votre adresse est requis. </small>
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.adresse.minLength">
                Votre adresse doit faire au moins 10 caractères.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerUtilisateur.adresse.maxLength">
                Votre adresse doit faire moins de 100 caractères.
              </small>
            </div>
          </div>

          <div class="form-group">
            <label class="form-control-label" for="firstPassword">Nouveau mot de passe</label>
            <input
              type="password"
              class="form-control"
              id="firstPassword"
              name="password"
              :class="{ valid: !$v.registerAccount.password.$invalid, invalid: $v.registerAccount.password.$invalid }"
              v-model="$v.registerAccount.password.$model"
              minlength="4"
              maxlength="50"
              required
              v-bind:placeholder="$t('global.form[\'newpassword.placeholder\']')"
              data-cy="firstPassword"
            />
            <div v-if="$v.registerAccount.password.$anyDirty && $v.registerAccount.password.$invalid">
              <small class="form-text text-danger" v-if="!$v.registerAccount.password.required">
                Le nouveau mot de passe est requis.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.password.minLength">
                Le mot de passe doit faire au moins 4 caractères.
              </small>
              <small class="form-text text-danger" v-if="!$v.registerAccount.password.maxLength">
                Le mot de passe ne doit pas faire plus de 50 caractères.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secondPassword">Confirmation du mot de passe</label>
            <input
              type="password"
              class="form-control"
              id="secondPassword"
              name="confirmPasswordInput"
              :class="{ valid: !$v.confirmPassword.$invalid, invalid: $v.confirmPassword.$invalid }"
              v-model="$v.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              v-bind:placeholder="$t('global.form[\'confirmpassword.placeholder\']')"
              data-cy="secondPassword"
            />
            <div v-if="$v.confirmPassword.$dirty && $v.confirmPassword.$invalid">
              <small class="form-text text-danger" v-if="!$v.confirmPassword.required">
                La confirmation du mot de passe est requise.
              </small>
              <small class="form-text text-danger" v-if="!$v.confirmPassword.minLength">
                La confirmation du mot de passe doit faire au moins 4 caractères.
              </small>
              <small class="form-text text-danger" v-if="!$v.confirmPassword.maxLength">
                La confirmation du mot de passe doit faire au plus 50 caractères.
              </small>
              <small class="form-text text-danger" v-if="!$v.confirmPassword.sameAsPassword"> Les mots de passe sont différents ! </small>
            </div>
          </div>

          <button type="submit" :disabled="$v.$invalid" class="btn btn-primary" data-cy="submit">Création de compte.</button>
        </form>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./register.component.ts"></script>
