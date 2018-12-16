package cl.galea.awm.web.rest;

import com.codahale.metrics.annotation.Timed;
import cl.galea.awm.domain.Work;
import cl.galea.awm.repository.WorkRepository;
import cl.galea.awm.web.rest.errors.BadRequestAlertException;
import cl.galea.awm.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Work.
 */
@RestController
@RequestMapping("/api")
public class WorkResource {

    private final Logger log = LoggerFactory.getLogger(WorkResource.class);

    private static final String ENTITY_NAME = "work";

    private final WorkRepository workRepository;

    public WorkResource(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    /**
     * POST  /works : Create a new work.
     *
     * @param work the work to create
     * @return the ResponseEntity with status 201 (Created) and with body the new work, or with status 400 (Bad Request) if the work has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/works")
    @Timed
    public ResponseEntity<Work> createWork(@Valid @RequestBody Work work) throws URISyntaxException {
        log.debug("REST request to save Work : {}", work);
        if (work.getId() != null) {
            throw new BadRequestAlertException("A new work cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Work result = workRepository.save(work);
        return ResponseEntity.created(new URI("/api/works/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /works : Updates an existing work.
     *
     * @param work the work to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated work,
     * or with status 400 (Bad Request) if the work is not valid,
     * or with status 500 (Internal Server Error) if the work couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/works")
    @Timed
    public ResponseEntity<Work> updateWork(@Valid @RequestBody Work work) throws URISyntaxException {
        log.debug("REST request to update Work : {}", work);
        if (work.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Work result = workRepository.save(work);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, work.getId().toString()))
            .body(result);
    }

    /**
     * GET  /works : get all the works.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of works in body
     */
    @GetMapping("/works")
    @Timed
    public List<Work> getAllWorks() {
        log.debug("REST request to get all Works");
        return workRepository.findAll();
    }

    /**
     * GET  /works/:id : get the "id" work.
     *
     * @param id the id of the work to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the work, or with status 404 (Not Found)
     */
    @GetMapping("/works/{id}")
    @Timed
    public ResponseEntity<Work> getWork(@PathVariable Long id) {
        log.debug("REST request to get Work : {}", id);
        Optional<Work> work = workRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(work);
    }

    /**
     * DELETE  /works/:id : delete the "id" work.
     *
     * @param id the id of the work to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/works/{id}")
    @Timed
    public ResponseEntity<Void> deleteWork(@PathVariable Long id) {
        log.debug("REST request to delete Work : {}", id);

        workRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
