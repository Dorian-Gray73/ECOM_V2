package com.org.ecomv2.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.org.ecomv2.IntegrationTest;
import com.org.ecomv2.domain.Caracteristique;
import com.org.ecomv2.repository.CaracteristiqueRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CaracteristiqueResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CaracteristiqueResourceIT {

    private static final String DEFAULT_COULEUR = "AAAAAAAAAA";
    private static final String UPDATED_COULEUR = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    private static final String ENTITY_API_URL = "/api/caracteristiques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CaracteristiqueRepository caracteristiqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCaracteristiqueMockMvc;

    private Caracteristique caracteristique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Caracteristique createEntity(EntityManager em) {
        Caracteristique caracteristique = new Caracteristique()
            .couleur(DEFAULT_COULEUR)
            .quantite(DEFAULT_QUANTITE)
            .version(DEFAULT_VERSION);
        return caracteristique;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Caracteristique createUpdatedEntity(EntityManager em) {
        Caracteristique caracteristique = new Caracteristique()
            .couleur(UPDATED_COULEUR)
            .quantite(UPDATED_QUANTITE)
            .version(UPDATED_VERSION);
        return caracteristique;
    }

    @BeforeEach
    public void initTest() {
        caracteristique = createEntity(em);
    }

    @Test
    @Transactional
    void createCaracteristique() throws Exception {
        int databaseSizeBeforeCreate = caracteristiqueRepository.findAll().size();
        // Create the Caracteristique
        restCaracteristiqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isCreated());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeCreate + 1);
        Caracteristique testCaracteristique = caracteristiqueList.get(caracteristiqueList.size() - 1);
        assertThat(testCaracteristique.getCouleur()).isEqualTo(DEFAULT_COULEUR);
        assertThat(testCaracteristique.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testCaracteristique.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    void createCaracteristiqueWithExistingId() throws Exception {
        // Create the Caracteristique with an existing ID
        caracteristique.setId(1L);

        int databaseSizeBeforeCreate = caracteristiqueRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCaracteristiqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCaracteristiques() throws Exception {
        // Initialize the database
        caracteristiqueRepository.saveAndFlush(caracteristique);

        // Get all the caracteristiqueList
        restCaracteristiqueMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caracteristique.getId().intValue())))
            .andExpect(jsonPath("$.[*].couleur").value(hasItem(DEFAULT_COULEUR)))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)));
    }

    @Test
    @Transactional
    void getCaracteristique() throws Exception {
        // Initialize the database
        caracteristiqueRepository.saveAndFlush(caracteristique);

        // Get the caracteristique
        restCaracteristiqueMockMvc
            .perform(get(ENTITY_API_URL_ID, caracteristique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(caracteristique.getId().intValue()))
            .andExpect(jsonPath("$.couleur").value(DEFAULT_COULEUR))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION));
    }

    @Test
    @Transactional
    void getNonExistingCaracteristique() throws Exception {
        // Get the caracteristique
        restCaracteristiqueMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCaracteristique() throws Exception {
        // Initialize the database
        caracteristiqueRepository.saveAndFlush(caracteristique);

        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();

        // Update the caracteristique
        Caracteristique updatedCaracteristique = caracteristiqueRepository.findById(caracteristique.getId()).get();
        // Disconnect from session so that the updates on updatedCaracteristique are not directly saved in db
        em.detach(updatedCaracteristique);
        updatedCaracteristique.couleur(UPDATED_COULEUR).quantite(UPDATED_QUANTITE).version(UPDATED_VERSION);

        restCaracteristiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCaracteristique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCaracteristique))
            )
            .andExpect(status().isOk());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
        Caracteristique testCaracteristique = caracteristiqueList.get(caracteristiqueList.size() - 1);
        assertThat(testCaracteristique.getCouleur()).isEqualTo(UPDATED_COULEUR);
        assertThat(testCaracteristique.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testCaracteristique.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    void putNonExistingCaracteristique() throws Exception {
        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();
        caracteristique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaracteristiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, caracteristique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCaracteristique() throws Exception {
        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();
        caracteristique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaracteristiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCaracteristique() throws Exception {
        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();
        caracteristique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaracteristiqueMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCaracteristiqueWithPatch() throws Exception {
        // Initialize the database
        caracteristiqueRepository.saveAndFlush(caracteristique);

        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();

        // Update the caracteristique using partial update
        Caracteristique partialUpdatedCaracteristique = new Caracteristique();
        partialUpdatedCaracteristique.setId(caracteristique.getId());

        restCaracteristiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCaracteristique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCaracteristique))
            )
            .andExpect(status().isOk());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
        Caracteristique testCaracteristique = caracteristiqueList.get(caracteristiqueList.size() - 1);
        assertThat(testCaracteristique.getCouleur()).isEqualTo(DEFAULT_COULEUR);
        assertThat(testCaracteristique.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testCaracteristique.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    void fullUpdateCaracteristiqueWithPatch() throws Exception {
        // Initialize the database
        caracteristiqueRepository.saveAndFlush(caracteristique);

        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();

        // Update the caracteristique using partial update
        Caracteristique partialUpdatedCaracteristique = new Caracteristique();
        partialUpdatedCaracteristique.setId(caracteristique.getId());

        partialUpdatedCaracteristique.couleur(UPDATED_COULEUR).quantite(UPDATED_QUANTITE).version(UPDATED_VERSION);

        restCaracteristiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCaracteristique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCaracteristique))
            )
            .andExpect(status().isOk());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
        Caracteristique testCaracteristique = caracteristiqueList.get(caracteristiqueList.size() - 1);
        assertThat(testCaracteristique.getCouleur()).isEqualTo(UPDATED_COULEUR);
        assertThat(testCaracteristique.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testCaracteristique.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    void patchNonExistingCaracteristique() throws Exception {
        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();
        caracteristique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaracteristiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, caracteristique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCaracteristique() throws Exception {
        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();
        caracteristique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaracteristiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isBadRequest());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCaracteristique() throws Exception {
        int databaseSizeBeforeUpdate = caracteristiqueRepository.findAll().size();
        caracteristique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCaracteristiqueMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(caracteristique))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Caracteristique in the database
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCaracteristique() throws Exception {
        // Initialize the database
        caracteristiqueRepository.saveAndFlush(caracteristique);

        int databaseSizeBeforeDelete = caracteristiqueRepository.findAll().size();

        // Delete the caracteristique
        restCaracteristiqueMockMvc
            .perform(delete(ENTITY_API_URL_ID, caracteristique.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Caracteristique> caracteristiqueList = caracteristiqueRepository.findAll();
        assertThat(caracteristiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
