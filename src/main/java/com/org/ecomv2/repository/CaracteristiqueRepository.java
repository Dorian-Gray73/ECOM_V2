package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Caracteristique;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Caracteristique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CaracteristiqueRepository extends JpaRepository<Caracteristique, Long> {}
