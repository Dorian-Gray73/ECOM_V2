package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Modele;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Modele entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModeleRepository extends JpaRepository<Modele, Long> {}
