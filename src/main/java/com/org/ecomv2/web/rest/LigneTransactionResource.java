package com.org.ecomv2.web.rest;

import com.org.ecomv2.domain.LigneTransaction;
import com.org.ecomv2.repository.LigneTransactionRepository;
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
 * REST controller for managing {@link com.org.ecomv2.domain.LigneTransaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LigneTransactionResource {

    private final Logger log = LoggerFactory.getLogger(LigneTransactionResource.class);

    private static final String ENTITY_NAME = "ligneTransaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LigneTransactionRepository ligneTransactionRepository;

    public LigneTransactionResource(LigneTransactionRepository ligneTransactionRepository) {
        this.ligneTransactionRepository = ligneTransactionRepository;
    }

    /**
     * {@code POST  /ligne-transactions} : Create a new ligneTransaction.
     *
     * @param ligneTransaction the ligneTransaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ligneTransaction, or with status {@code 400 (Bad Request)} if the ligneTransaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ligne-transactions")
    public ResponseEntity<LigneTransaction> createLigneTransaction(@RequestBody LigneTransaction ligneTransaction)
        throws URISyntaxException {
        log.debug("REST request to save LigneTransaction : {}", ligneTransaction);
        if (ligneTransaction.getId() != null) {
            throw new BadRequestAlertException("A new ligneTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LigneTransaction result = ligneTransactionRepository.save(ligneTransaction);
        return ResponseEntity
            .created(new URI("/api/ligne-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ligne-transactions/:id} : Updates an existing ligneTransaction.
     *
     * @param id the id of the ligneTransaction to save.
     * @param ligneTransaction the ligneTransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneTransaction,
     * or with status {@code 400 (Bad Request)} if the ligneTransaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ligneTransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ligne-transactions/{id}")
    public ResponseEntity<LigneTransaction> updateLigneTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LigneTransaction ligneTransaction
    ) throws URISyntaxException {
        log.debug("REST request to update LigneTransaction : {}, {}", id, ligneTransaction);
        if (ligneTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ligneTransaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ligneTransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LigneTransaction result = ligneTransactionRepository.save(ligneTransaction);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneTransaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ligne-transactions/:id} : Partial updates given fields of an existing ligneTransaction, field will ignore if it is null
     *
     * @param id the id of the ligneTransaction to save.
     * @param ligneTransaction the ligneTransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ligneTransaction,
     * or with status {@code 400 (Bad Request)} if the ligneTransaction is not valid,
     * or with status {@code 404 (Not Found)} if the ligneTransaction is not found,
     * or with status {@code 500 (Internal Server Error)} if the ligneTransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ligne-transactions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LigneTransaction> partialUpdateLigneTransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LigneTransaction ligneTransaction
    ) throws URISyntaxException {
        log.debug("REST request to partial update LigneTransaction partially : {}, {}", id, ligneTransaction);
        if (ligneTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ligneTransaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ligneTransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LigneTransaction> result = ligneTransactionRepository
            .findById(ligneTransaction.getId())
            .map(existingLigneTransaction -> {
                if (ligneTransaction.getQuantite() != null) {
                    existingLigneTransaction.setQuantite(ligneTransaction.getQuantite());
                }
                if (ligneTransaction.getPrixUnitaire() != null) {
                    existingLigneTransaction.setPrixUnitaire(ligneTransaction.getPrixUnitaire());
                }

                return existingLigneTransaction;
            })
            .map(ligneTransactionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ligneTransaction.getId().toString())
        );
    }

    /**
     * {@code GET  /ligne-transactions} : get all the ligneTransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ligneTransactions in body.
     */
    @GetMapping("/ligne-transactions")
    public List<LigneTransaction> getAllLigneTransactions() {
        log.debug("REST request to get all LigneTransactions");
        return ligneTransactionRepository.findAll();
    }

    /**
     * {@code GET  /ligne-transactions/:id} : get the "id" ligneTransaction.
     *
     * @param id the id of the ligneTransaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ligneTransaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ligne-transactions/{id}")
    public ResponseEntity<LigneTransaction> getLigneTransaction(@PathVariable Long id) {
        log.debug("REST request to get LigneTransaction : {}", id);
        Optional<LigneTransaction> ligneTransaction = ligneTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ligneTransaction);
    }

    /**
     * {@code DELETE  /ligne-transactions/:id} : delete the "id" ligneTransaction.
     *
     * @param id the id of the ligneTransaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ligne-transactions/{id}")
    public ResponseEntity<Void> deleteLigneTransaction(@PathVariable Long id) {
        log.debug("REST request to delete LigneTransaction : {}", id);
        ligneTransactionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
