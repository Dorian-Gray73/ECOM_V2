package com.org.ecomv2.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.org.ecomv2.IntegrationTest;
import com.org.ecomv2.domain.LigneTransaction;
import com.org.ecomv2.repository.LigneTransactionRepository;
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
 * Integration tests for the {@link LigneTransactionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LigneTransactionResourceIT {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final Float DEFAULT_PRIX_UNITAIRE = 1F;
    private static final Float UPDATED_PRIX_UNITAIRE = 2F;

    private static final String ENTITY_API_URL = "/api/ligne-transactions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LigneTransactionRepository ligneTransactionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneTransactionMockMvc;

    private LigneTransaction ligneTransaction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneTransaction createEntity(EntityManager em) {
        LigneTransaction ligneTransaction = new LigneTransaction().quantite(DEFAULT_QUANTITE).prixUnitaire(DEFAULT_PRIX_UNITAIRE);
        return ligneTransaction;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneTransaction createUpdatedEntity(EntityManager em) {
        LigneTransaction ligneTransaction = new LigneTransaction().quantite(UPDATED_QUANTITE).prixUnitaire(UPDATED_PRIX_UNITAIRE);
        return ligneTransaction;
    }

    @BeforeEach
    public void initTest() {
        ligneTransaction = createEntity(em);
    }

    @Test
    @Transactional
    void createLigneTransaction() throws Exception {
        int databaseSizeBeforeCreate = ligneTransactionRepository.findAll().size();
        // Create the LigneTransaction
        restLigneTransactionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isCreated());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeCreate + 1);
        LigneTransaction testLigneTransaction = ligneTransactionList.get(ligneTransactionList.size() - 1);
        assertThat(testLigneTransaction.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testLigneTransaction.getPrixUnitaire()).isEqualTo(DEFAULT_PRIX_UNITAIRE);
    }

    @Test
    @Transactional
    void createLigneTransactionWithExistingId() throws Exception {
        // Create the LigneTransaction with an existing ID
        ligneTransaction.setId(1L);

        int databaseSizeBeforeCreate = ligneTransactionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneTransactionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLigneTransactions() throws Exception {
        // Initialize the database
        ligneTransactionRepository.saveAndFlush(ligneTransaction);

        // Get all the ligneTransactionList
        restLigneTransactionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneTransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].prixUnitaire").value(hasItem(DEFAULT_PRIX_UNITAIRE.doubleValue())));
    }

    @Test
    @Transactional
    void getLigneTransaction() throws Exception {
        // Initialize the database
        ligneTransactionRepository.saveAndFlush(ligneTransaction);

        // Get the ligneTransaction
        restLigneTransactionMockMvc
            .perform(get(ENTITY_API_URL_ID, ligneTransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneTransaction.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.prixUnitaire").value(DEFAULT_PRIX_UNITAIRE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingLigneTransaction() throws Exception {
        // Get the ligneTransaction
        restLigneTransactionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewLigneTransaction() throws Exception {
        // Initialize the database
        ligneTransactionRepository.saveAndFlush(ligneTransaction);

        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();

        // Update the ligneTransaction
        LigneTransaction updatedLigneTransaction = ligneTransactionRepository.findById(ligneTransaction.getId()).get();
        // Disconnect from session so that the updates on updatedLigneTransaction are not directly saved in db
        em.detach(updatedLigneTransaction);
        updatedLigneTransaction.quantite(UPDATED_QUANTITE).prixUnitaire(UPDATED_PRIX_UNITAIRE);

        restLigneTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLigneTransaction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLigneTransaction))
            )
            .andExpect(status().isOk());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
        LigneTransaction testLigneTransaction = ligneTransactionList.get(ligneTransactionList.size() - 1);
        assertThat(testLigneTransaction.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneTransaction.getPrixUnitaire()).isEqualTo(UPDATED_PRIX_UNITAIRE);
    }

    @Test
    @Transactional
    void putNonExistingLigneTransaction() throws Exception {
        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();
        ligneTransaction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneTransaction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLigneTransaction() throws Exception {
        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();
        ligneTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneTransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLigneTransaction() throws Exception {
        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();
        ligneTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneTransactionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLigneTransactionWithPatch() throws Exception {
        // Initialize the database
        ligneTransactionRepository.saveAndFlush(ligneTransaction);

        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();

        // Update the ligneTransaction using partial update
        LigneTransaction partialUpdatedLigneTransaction = new LigneTransaction();
        partialUpdatedLigneTransaction.setId(ligneTransaction.getId());

        restLigneTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneTransaction))
            )
            .andExpect(status().isOk());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
        LigneTransaction testLigneTransaction = ligneTransactionList.get(ligneTransactionList.size() - 1);
        assertThat(testLigneTransaction.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testLigneTransaction.getPrixUnitaire()).isEqualTo(DEFAULT_PRIX_UNITAIRE);
    }

    @Test
    @Transactional
    void fullUpdateLigneTransactionWithPatch() throws Exception {
        // Initialize the database
        ligneTransactionRepository.saveAndFlush(ligneTransaction);

        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();

        // Update the ligneTransaction using partial update
        LigneTransaction partialUpdatedLigneTransaction = new LigneTransaction();
        partialUpdatedLigneTransaction.setId(ligneTransaction.getId());

        partialUpdatedLigneTransaction.quantite(UPDATED_QUANTITE).prixUnitaire(UPDATED_PRIX_UNITAIRE);

        restLigneTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneTransaction))
            )
            .andExpect(status().isOk());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
        LigneTransaction testLigneTransaction = ligneTransactionList.get(ligneTransactionList.size() - 1);
        assertThat(testLigneTransaction.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneTransaction.getPrixUnitaire()).isEqualTo(UPDATED_PRIX_UNITAIRE);
    }

    @Test
    @Transactional
    void patchNonExistingLigneTransaction() throws Exception {
        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();
        ligneTransaction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ligneTransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLigneTransaction() throws Exception {
        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();
        ligneTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLigneTransaction() throws Exception {
        int databaseSizeBeforeUpdate = ligneTransactionRepository.findAll().size();
        ligneTransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneTransactionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneTransaction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneTransaction in the database
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLigneTransaction() throws Exception {
        // Initialize the database
        ligneTransactionRepository.saveAndFlush(ligneTransaction);

        int databaseSizeBeforeDelete = ligneTransactionRepository.findAll().size();

        // Delete the ligneTransaction
        restLigneTransactionMockMvc
            .perform(delete(ENTITY_API_URL_ID, ligneTransaction.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneTransaction> ligneTransactionList = ligneTransactionRepository.findAll();
        assertThat(ligneTransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
