package cl.galea.awm.web.rest;

import com.codahale.metrics.annotation.Timed;
import cl.galea.awm.domain.AuthorWork;
import cl.galea.awm.repository.AuthorWorkRepository;
import cl.galea.awm.web.rest.errors.BadRequestAlertException;
import cl.galea.awm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AuthorWork.
 */
@RestController
@RequestMapping("/api")
public class AuthorWorkResource {

    private final Logger log = LoggerFactory.getLogger(AuthorWorkResource.class);

    private static final String ENTITY_NAME = "authorWork";

    private final AuthorWorkRepository authorWorkRepository;

    public AuthorWorkResource(AuthorWorkRepository authorWorkRepository) {
        this.authorWorkRepository = authorWorkRepository;
    }

    /**
     * POST  /author-works : Create a new authorWork.
     *
     * @param authorWork the authorWork to create
     * @return the ResponseEntity with status 201 (Created) and with body the new authorWork, or with status 400 (Bad Request) if the authorWork has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/author-works")
    @Timed
    public ResponseEntity<AuthorWork> createAuthorWork(@RequestBody AuthorWork authorWork) throws URISyntaxException {
        log.debug("REST request to save AuthorWork : {}", authorWork);
        if (authorWork.getId() != null) {
            throw new BadRequestAlertException("A new authorWork cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AuthorWork result = authorWorkRepository.save(authorWork);
        return ResponseEntity.created(new URI("/api/author-works/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /author-works : Updates an existing authorWork.
     *
     * @param authorWork the authorWork to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated authorWork,
     * or with status 400 (Bad Request) if the authorWork is not valid,
     * or with status 500 (Internal Server Error) if the authorWork couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/author-works")
    @Timed
    public ResponseEntity<AuthorWork> updateAuthorWork(@RequestBody AuthorWork authorWork) throws URISyntaxException {
        log.debug("REST request to update AuthorWork : {}", authorWork);
        if (authorWork.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AuthorWork result = authorWorkRepository.save(authorWork);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, authorWork.getId().toString()))
            .body(result);
    }

    /**
     * GET  /author-works : get all the authorWorks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of authorWorks in body
     */
    @GetMapping("/author-works")
    @Timed
    public List<AuthorWork> getAllAuthorWorks() {
        log.debug("REST request to get all AuthorWorks");
        return authorWorkRepository.findAll();
    }

    /**
     * GET  /author-works/:id : get the "id" authorWork.
     *
     * @param id the id of the authorWork to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the authorWork, or with status 404 (Not Found)
     */
    @GetMapping("/author-works/{id}")
    @Timed
    public ResponseEntity<AuthorWork> getAuthorWork(@PathVariable Long id) {
        log.debug("REST request to get AuthorWork : {}", id);
        Optional<AuthorWork> authorWork = authorWorkRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(authorWork);
    }

    /**
     * DELETE  /author-works/:id : delete the "id" authorWork.
     *
     * @param id the id of the authorWork to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/author-works/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuthorWork(@PathVariable Long id) {
        log.debug("REST request to delete AuthorWork : {}", id);

        authorWorkRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
