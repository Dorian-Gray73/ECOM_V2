package com.org.ecomv2.web.rest;

import com.org.ecomv2.domain.Modele;
import com.org.ecomv2.repository.ModeleRepository;
import com.org.ecomv2.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.org.ecomv2.domain.Modele}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ModeleResource {

    private final Logger log = LoggerFactory.getLogger(ModeleResource.class);

    private static final String ENTITY_NAME = "modele";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModeleRepository modeleRepository;

    public ModeleResource(ModeleRepository modeleRepository) {
        this.modeleRepository = modeleRepository;
    }

    /**
     * {@code POST  /modeles} : Create a new modele.
     *
     * @param modele the modele to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modele, or with status {@code 400 (Bad Request)} if the modele has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modeles")
    public ResponseEntity<Modele> createModele(@RequestBody Modele modele) throws URISyntaxException {
        log.debug("REST request to save Modele : {}", modele);
        if (modele.getId() != null) {
            throw new BadRequestAlertException("A new modele cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Modele result = modeleRepository.save(modele);
        return ResponseEntity
            .created(new URI("/api/modeles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modeles/:id} : Updates an existing modele.
     *
     * @param id the id of the modele to save.
     * @param modele the modele to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modele,
     * or with status {@code 400 (Bad Request)} if the modele is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modele couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modeles/{id}")
    public ResponseEntity<Modele> updateModele(@PathVariable(value = "id", required = false) final Long id, @RequestBody Modele modele)
        throws URISyntaxException {
        log.debug("REST request to update Modele : {}, {}", id, modele);
        if (modele.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, modele.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!modeleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Modele result = modeleRepository.save(modele);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modele.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /modeles/:id} : Partial updates given fields of an existing modele, field will ignore if it is null
     *
     * @param id the id of the modele to save.
     * @param modele the modele to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modele,
     * or with status {@code 400 (Bad Request)} if the modele is not valid,
     * or with status {@code 404 (Not Found)} if the modele is not found,
     * or with status {@code 500 (Internal Server Error)} if the modele couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/modeles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Modele> partialUpdateModele(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Modele modele
    ) throws URISyntaxException {
        log.debug("REST request to partial update Modele partially : {}, {}", id, modele);
        if (modele.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, modele.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!modeleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Modele> result = modeleRepository
            .findById(modele.getId())
            .map(existingModele -> {
                if (modele.getModele() != null) {
                    existingModele.setModele(modele.getModele());
                }

                return existingModele;
            })
            .map(modeleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, modele.getId().toString())
        );
    }

    /**
     * {@code GET  /modeles} : get all the modeles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modeles in body.
     */
    @GetMapping("/modeles")
    public List<Modele> getAllModeles() {
        log.debug("REST request to get all Modeles");
        return modeleRepository.findAll();
    }

    /**
     * {@code GET  /modeles/:id} : get the "id" modele.
     *
     * @param id the id of the modele to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modele, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modeles/{id}")
    public ResponseEntity<Modele> getModele(@PathVariable Long id) {
        log.debug("REST request to get Modele : {}", id);
        Optional<Modele> modele = modeleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(modele);
    }

    /**
     * {@code DELETE  /modeles/:id} : delete the "id" modele.
     *
     * @param id the id of the modele to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modeles/{id}")
    public ResponseEntity<Void> deleteModele(@PathVariable Long id) {
        log.debug("REST request to delete Modele : {}", id);
        modeleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
