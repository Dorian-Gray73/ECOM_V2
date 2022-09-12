/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import UtilisateurComponent from '@/entities/utilisateur/utilisateur.vue';
import UtilisateurClass from '@/entities/utilisateur/utilisateur.component';
import UtilisateurService from '@/entities/utilisateur/utilisateur.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Utilisateur Management Component', () => {
    let wrapper: Wrapper<UtilisateurClass>;
    let comp: UtilisateurClass;
    let utilisateurServiceStub: SinonStubbedInstance<UtilisateurService>;

    beforeEach(() => {
      utilisateurServiceStub = sinon.createStubInstance<UtilisateurService>(UtilisateurService);
      utilisateurServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<UtilisateurClass>(UtilisateurComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          utilisateurService: () => utilisateurServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      utilisateurServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllUtilisateurs();
      await comp.$nextTick();

      // THEN
      expect(utilisateurServiceStub.retrieve.called).toBeTruthy();
      expect(comp.utilisateurs[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      utilisateurServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(utilisateurServiceStub.retrieve.callCount).toEqual(1);

      comp.removeUtilisateur();
      await comp.$nextTick();

      // THEN
      expect(utilisateurServiceStub.delete.called).toBeTruthy();
      expect(utilisateurServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
