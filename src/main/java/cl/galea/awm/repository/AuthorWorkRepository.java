package cl.galea.awm.repository;

import cl.galea.awm.domain.AuthorWork;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AuthorWork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuthorWorkRepository extends JpaRepository<AuthorWork, Long> {

}
