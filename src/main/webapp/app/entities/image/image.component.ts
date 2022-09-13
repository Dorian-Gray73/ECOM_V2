import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IImage } from '@/shared/model/image.model';

import ImageService from './image.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Image extends Vue {
  @Inject('imageService') private imageService: () => ImageService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public images: IImage[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllImages();
  }

  public clear(): void {
    this.retrieveAllImages();
  }

  public retrieveAllImages(): void {
    this.isFetching = true;
    this.imageService()
      .retrieve()
      .then(
        res => {
          this.images = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: IImage): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeImage(): void {
    this.imageService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('ecomApp.image.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllImages();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
