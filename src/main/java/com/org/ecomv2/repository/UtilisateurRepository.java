package com.org.ecomv2.repository;

import com.org.ecomv2.domain.Utilisateur;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Spring Data JPA repository for the Utilisateur entity.
 */
@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    default Optional<Utilisateur> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Utilisateur> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Utilisateur> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct utilisateur from Utilisateur utilisateur left join fetch utilisateur.internal_user",
        countQuery = "select count(distinct utilisateur) from Utilisateur utilisateur"
    )
    Page<Utilisateur> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct utilisateur from Utilisateur utilisateur left join fetch utilisateur.internal_user")
    List<Utilisateur> findAllWithToOneRelationships();

    @Query("select utilisateur from Utilisateur utilisateur left join fetch utilisateur.internal_user where utilisateur.id =:id")
    Optional<Utilisateur> findOneWithToOneRelationships(@Param("id") Long id);

    @Query("select utilisateur from Utilisateur utilisateur JOIN User u ON utilisateur.internal_user.id = u.id WHERE u.id = :id")
    Optional<Utilisateur> getUtilisateurByIdUser(@Param("id") Long id);
}
