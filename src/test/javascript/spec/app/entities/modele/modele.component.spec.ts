/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ModeleComponent from '@/entities/modele/modele.vue';
import ModeleClass from '@/entities/modele/modele.component';
import ModeleService from '@/entities/modele/modele.service';
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
  describe('Modele Management Component', () => {
    let wrapper: Wrapper<ModeleClass>;
    let comp: ModeleClass;
    let modeleServiceStub: SinonStubbedInstance<ModeleService>;

    beforeEach(() => {
      modeleServiceStub = sinon.createStubInstance<ModeleService>(ModeleService);
      modeleServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ModeleClass>(ModeleComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          modeleService: () => modeleServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      modeleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllModeles();
      await comp.$nextTick();

      // THEN
      expect(modeleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.modeles[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      modeleServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(modeleServiceStub.retrieve.callCount).toEqual(1);

      comp.removeModele();
      await comp.$nextTick();

      // THEN
      expect(modeleServiceStub.delete.called).toBeTruthy();
      expect(modeleServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
