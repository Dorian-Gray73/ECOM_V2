package com.org.ecomv2.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.org.ecomv2.IntegrationTest;
import com.org.ecomv2.domain.User;
import com.org.ecomv2.domain.Utilisateur;
import com.org.ecomv2.domain.enumeration.Type;
import com.org.ecomv2.repository.UserRepository;
import com.org.ecomv2.repository.UtilisateurRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UtilisateurResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class UtilisateurResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_COURRIEL = "AAAAAAAAAA";
    private static final String UPDATED_COURRIEL = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final Type DEFAULT_TYPE = Type.Admin;
    private static final Type UPDATED_TYPE = Type.Acheteur;

    private static final String ENTITY_API_URL = "/api/utilisateurs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static final Random random = new Random();
    private static final AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private UtilisateurRepository utilisateurRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUtilisateurMockMvc;

    private Utilisateur utilisateur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateur createEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .courriel(DEFAULT_COURRIEL)
            .adresse(DEFAULT_ADRESSE)
            .type(DEFAULT_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        utilisateur.setInternal_user(user);
        return utilisateur;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Utilisateur createUpdatedEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .courriel(UPDATED_COURRIEL)
            .adresse(UPDATED_ADRESSE)
            .type(UPDATED_TYPE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        utilisateur.setInternal_user(user);
        return utilisateur;
    }

    @BeforeEach
    public void initTest() {
        utilisateur = createEntity(em);
    }

    @Test
    @Transactional
    void createUtilisateur() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();
        // Create the Utilisateur
        restUtilisateurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isCreated());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate + 1);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testUtilisateur.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testUtilisateur.getCourriel()).isEqualTo(DEFAULT_COURRIEL);
        assertThat(testUtilisateur.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testUtilisateur.getType()).isEqualTo(DEFAULT_TYPE);

        // Validate the id for MapsId, the ids must be same
        assertThat(testUtilisateur.getId()).isEqualTo(testUtilisateur.getInternal_user().getId());
    }

    @Test
    @Transactional
    void createUtilisateurWithExistingId() throws Exception {
        // Create the Utilisateur with an existing ID
        utilisateur.setId(1L);

        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUtilisateurMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate);
    }

    /*
    @Test
    @Transactional
    void updateUtilisateurMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // Load the utilisateur
        Utilisateur updatedUtilisateur = utilisateurRepository.findById(utilisateur.getId()).get();
        assertThat(updatedUtilisateur).isNotNull();
        // Disconnect from session so that the updates on updatedUtilisateur are not directly saved in db
        em.detach(updatedUtilisateur);

        // Update the User with new association value
        updatedUtilisateur.setInternal_user(user);

        // Update the entity
        restUtilisateurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUtilisateur.getId())
                .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUtilisateur))
                    )
                    .andExpect(status().isOk());
                    
                    // Validate the Utilisateur in the database
                    List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
                    assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate);
                    Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
                    // Validate the id for MapsId, the ids must be same
                    // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
                    // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
                    // assertThat(testUtilisateur.getId()).isEqualTo(testUtilisateur.getUser().getId());
                }
                 */

    @Test
    @Transactional
    void getAllUtilisateurs() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get all the utilisateurList
        restUtilisateurMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].courriel").value(hasItem(DEFAULT_COURRIEL)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUtilisateursWithEagerRelationshipsIsEnabled() throws Exception {
        when(utilisateurRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUtilisateurMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(utilisateurRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllUtilisateursWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(utilisateurRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restUtilisateurMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(utilisateurRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get the utilisateur
        restUtilisateurMockMvc
            .perform(get(ENTITY_API_URL_ID, utilisateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(utilisateur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.courriel").value(DEFAULT_COURRIEL))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingUtilisateur() throws Exception {
        // Get the utilisateur
        restUtilisateurMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Update the utilisateur
        Utilisateur updatedUtilisateur = utilisateurRepository.findById(utilisateur.getId()).get();
        // Disconnect from session so that the updates on updatedUtilisateur are not directly saved in db
        em.detach(updatedUtilisateur);
        updatedUtilisateur.nom(UPDATED_NOM).prenom(UPDATED_PRENOM).courriel(UPDATED_COURRIEL).adresse(UPDATED_ADRESSE).type(UPDATED_TYPE);

        restUtilisateurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUtilisateur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUtilisateur))
            )
            .andExpect(status().isOk());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testUtilisateur.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testUtilisateur.getCourriel()).isEqualTo(UPDATED_COURRIEL);
        assertThat(testUtilisateur.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testUtilisateur.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();
        utilisateur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, utilisateur.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(utilisateur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();
        utilisateur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(utilisateur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();
        utilisateur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUtilisateurWithPatch() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Update the utilisateur using partial update
        Utilisateur partialUpdatedUtilisateur = new Utilisateur();
        partialUpdatedUtilisateur.setId(utilisateur.getId());

        partialUpdatedUtilisateur.nom(UPDATED_NOM).adresse(UPDATED_ADRESSE);

        restUtilisateurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUtilisateur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUtilisateur))
            )
            .andExpect(status().isOk());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testUtilisateur.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testUtilisateur.getCourriel()).isEqualTo(DEFAULT_COURRIEL);
        assertThat(testUtilisateur.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testUtilisateur.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateUtilisateurWithPatch() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Update the utilisateur using partial update
        Utilisateur partialUpdatedUtilisateur = new Utilisateur();
        partialUpdatedUtilisateur.setId(utilisateur.getId());

        partialUpdatedUtilisateur
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .courriel(UPDATED_COURRIEL)
            .adresse(UPDATED_ADRESSE)
            .type(UPDATED_TYPE);

        restUtilisateurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUtilisateur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUtilisateur))
            )
            .andExpect(status().isOk());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testUtilisateur.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testUtilisateur.getCourriel()).isEqualTo(UPDATED_COURRIEL);
        assertThat(testUtilisateur.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testUtilisateur.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();
        utilisateur.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, utilisateur.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(utilisateur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();
        utilisateur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(utilisateur))
            )
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();
        utilisateur.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(utilisateur))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeDelete = utilisateurRepository.findAll().size();

        // Delete the utilisateur
        restUtilisateurMockMvc
            .perform(delete(ENTITY_API_URL_ID, utilisateur.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
