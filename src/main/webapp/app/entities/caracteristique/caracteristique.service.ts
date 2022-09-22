import axios from 'axios';

import { ICaracteristique } from '@/shared/model/caracteristique.model';

const baseApiUrl = 'api/caracteristiques';

export default class CaracteristiqueService {
  public find(id: number): Promise<ICaracteristique> {
    return new Promise<ICaracteristique>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieveCaracteristiquesParProduit(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/produit/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieveCouleurs(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/couleurs`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: ICaracteristique): Promise<ICaracteristique> {
    return new Promise<ICaracteristique>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: ICaracteristique): Promise<ICaracteristique> {
    return new Promise<ICaracteristique>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: ICaracteristique): Promise<ICaracteristique> {
    return new Promise<ICaracteristique>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public updateCaracteristiqueQuantite(id: number, quantite: number): Promise<ICaracteristique> {
    return new Promise<ICaracteristique>((resolve, reject) => {
      let entity = {
        id: 0,
        couleur: 'string',
        quantite: 0,
        version: 0,
      };
      axios
        .patch(`${baseApiUrl}/quantite/${id}/${quantite}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
