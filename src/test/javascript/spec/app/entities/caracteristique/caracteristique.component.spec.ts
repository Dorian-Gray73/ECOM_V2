/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CaracteristiqueComponent from '@/entities/caracteristique/caracteristique.vue';
import CaracteristiqueClass from '@/entities/caracteristique/caracteristique.component';
import CaracteristiqueService from '@/entities/caracteristique/caracteristique.service';
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
  describe('Caracteristique Management Component', () => {
    let wrapper: Wrapper<CaracteristiqueClass>;
    let comp: CaracteristiqueClass;
    let caracteristiqueServiceStub: SinonStubbedInstance<CaracteristiqueService>;

    beforeEach(() => {
      caracteristiqueServiceStub = sinon.createStubInstance<CaracteristiqueService>(CaracteristiqueService);
      caracteristiqueServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CaracteristiqueClass>(CaracteristiqueComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          caracteristiqueService: () => caracteristiqueServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      caracteristiqueServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCaracteristiques();
      await comp.$nextTick();

      // THEN
      expect(caracteristiqueServiceStub.retrieve.called).toBeTruthy();
      expect(comp.caracteristiques[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      caracteristiqueServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(caracteristiqueServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCaracteristique();
      await comp.$nextTick();

      // THEN
      expect(caracteristiqueServiceStub.delete.called).toBeTruthy();
      expect(caracteristiqueServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
