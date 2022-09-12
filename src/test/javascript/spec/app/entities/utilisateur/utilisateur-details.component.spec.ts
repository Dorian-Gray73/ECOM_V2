/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import UtilisateurDetailComponent from '@/entities/utilisateur/utilisateur-details.vue';
import UtilisateurClass from '@/entities/utilisateur/utilisateur-details.component';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Utilisateur Management Detail Component', () => {
    let wrapper: Wrapper<UtilisateurClass>;
    let comp: UtilisateurClass;
    let utilisateurServiceStub: SinonStubbedInstance<UtilisateurService>;

    beforeEach(() => {
      utilisateurServiceStub = sinon.createStubInstance<UtilisateurService>(UtilisateurService);

      wrapper = shallowMount<UtilisateurClass>(UtilisateurDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { utilisateurService: () => utilisateurServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundUtilisateur = { id: 123 };
        utilisateurServiceStub.find.resolves(foundUtilisateur);

        // WHEN
        comp.retrieveUtilisateur(123);
        await comp.$nextTick();

        // THEN
        expect(comp.utilisateur).toBe(foundUtilisateur);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundUtilisateur = { id: 123 };
        utilisateurServiceStub.find.resolves(foundUtilisateur);

        // WHEN
        comp.beforeRouteEnter({ params: { utilisateurId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.utilisateur).toBe(foundUtilisateur);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
