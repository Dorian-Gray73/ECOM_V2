package com.org.ecomv2.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.org.ecomv2.IntegrationTest;
import com.org.ecomv2.domain.Modele;
import com.org.ecomv2.repository.ModeleRepository;
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
 * Integration tests for the {@link ModeleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ModeleResourceIT {

    private static final String DEFAULT_MODELE = "AAAAAAAAAA";
    private static final String UPDATED_MODELE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/modeles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static final Random random = new Random();
    private static final AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ModeleRepository modeleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restModeleMockMvc;

    private Modele modele;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Modele createEntity(EntityManager em) {
        Modele modele = new Modele().modele(DEFAULT_MODELE);
        return modele;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Modele createUpdatedEntity(EntityManager em) {
        Modele modele = new Modele().modele(UPDATED_MODELE);
        return modele;
    }

    @BeforeEach
    public void initTest() {
        modele = createEntity(em);
    }

    @Test
    @Transactional
    void createModele() throws Exception {
        int databaseSizeBeforeCreate = modeleRepository.findAll().size();
        // Create the Modele
        restModeleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isCreated());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeCreate + 1);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getModele()).isEqualTo(DEFAULT_MODELE);
    }

    @Test
    @Transactional
    void createModeleWithExistingId() throws Exception {
        // Create the Modele with an existing ID
        modele.setId(1L);

        int databaseSizeBeforeCreate = modeleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restModeleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllModeles() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        // Get all the modeleList
        restModeleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modele.getId().intValue())))
            .andExpect(jsonPath("$.[*].modele").value(hasItem(DEFAULT_MODELE)));
    }

    @Test
    @Transactional
    void getModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        // Get the modele
        restModeleMockMvc
            .perform(get(ENTITY_API_URL_ID, modele.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(modele.getId().intValue()))
            .andExpect(jsonPath("$.modele").value(DEFAULT_MODELE));
    }

    @Test
    @Transactional
    void getNonExistingModele() throws Exception {
        // Get the modele
        restModeleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Update the modele
        Modele updatedModele = modeleRepository.findById(modele.getId()).get();
        // Disconnect from session so that the updates on updatedModele are not directly saved in db
        em.detach(updatedModele);
        updatedModele.modele(UPDATED_MODELE);

        restModeleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedModele.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedModele))
            )
            .andExpect(status().isOk());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getModele()).isEqualTo(UPDATED_MODELE);
    }

    @Test
    @Transactional
    void putNonExistingModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();
        modele.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModeleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, modele.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(modele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();
        modele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restModeleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(modele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();
        modele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restModeleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateModeleWithPatch() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Update the modele using partial update
        Modele partialUpdatedModele = new Modele();
        partialUpdatedModele.setId(modele.getId());

        restModeleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedModele.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedModele))
            )
            .andExpect(status().isOk());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getModele()).isEqualTo(DEFAULT_MODELE);
    }

    @Test
    @Transactional
    void fullUpdateModeleWithPatch() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();

        // Update the modele using partial update
        Modele partialUpdatedModele = new Modele();
        partialUpdatedModele.setId(modele.getId());

        partialUpdatedModele.modele(UPDATED_MODELE);

        restModeleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedModele.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedModele))
            )
            .andExpect(status().isOk());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
        Modele testModele = modeleList.get(modeleList.size() - 1);
        assertThat(testModele.getModele()).isEqualTo(UPDATED_MODELE);
    }

    @Test
    @Transactional
    void patchNonExistingModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();
        modele.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restModeleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, modele.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(modele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();
        modele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restModeleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(modele))
            )
            .andExpect(status().isBadRequest());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamModele() throws Exception {
        int databaseSizeBeforeUpdate = modeleRepository.findAll().size();
        modele.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restModeleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(modele)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Modele in the database
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteModele() throws Exception {
        // Initialize the database
        modeleRepository.saveAndFlush(modele);

        int databaseSizeBeforeDelete = modeleRepository.findAll().size();

        // Delete the modele
        restModeleMockMvc
            .perform(delete(ENTITY_API_URL_ID, modele.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Modele> modeleList = modeleRepository.findAll();
        assertThat(modeleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
