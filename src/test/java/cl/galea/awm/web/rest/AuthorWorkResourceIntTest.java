package cl.galea.awm.web.rest;

import cl.galea.awm.AuthorWorksManagerApp;

import cl.galea.awm.domain.AuthorWork;
import cl.galea.awm.repository.AuthorWorkRepository;
import cl.galea.awm.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static cl.galea.awm.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AuthorWorkResource REST controller.
 *
 * @see AuthorWorkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuthorWorksManagerApp.class)
public class AuthorWorkResourceIntTest {

    @Autowired
    private AuthorWorkRepository authorWorkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAuthorWorkMockMvc;

    private AuthorWork authorWork;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuthorWorkResource authorWorkResource = new AuthorWorkResource(authorWorkRepository);
        this.restAuthorWorkMockMvc = MockMvcBuilders.standaloneSetup(authorWorkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuthorWork createEntity(EntityManager em) {
        AuthorWork authorWork = new AuthorWork();
        return authorWork;
    }

    @Before
    public void initTest() {
        authorWork = createEntity(em);
    }

    @Test
    @Transactional
    public void createAuthorWork() throws Exception {
        int databaseSizeBeforeCreate = authorWorkRepository.findAll().size();

        // Create the AuthorWork
        restAuthorWorkMockMvc.perform(post("/api/author-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authorWork)))
            .andExpect(status().isCreated());

        // Validate the AuthorWork in the database
        List<AuthorWork> authorWorkList = authorWorkRepository.findAll();
        assertThat(authorWorkList).hasSize(databaseSizeBeforeCreate + 1);
        AuthorWork testAuthorWork = authorWorkList.get(authorWorkList.size() - 1);
    }

    @Test
    @Transactional
    public void createAuthorWorkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = authorWorkRepository.findAll().size();

        // Create the AuthorWork with an existing ID
        authorWork.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuthorWorkMockMvc.perform(post("/api/author-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authorWork)))
            .andExpect(status().isBadRequest());

        // Validate the AuthorWork in the database
        List<AuthorWork> authorWorkList = authorWorkRepository.findAll();
        assertThat(authorWorkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAuthorWorks() throws Exception {
        // Initialize the database
        authorWorkRepository.saveAndFlush(authorWork);

        // Get all the authorWorkList
        restAuthorWorkMockMvc.perform(get("/api/author-works?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(authorWork.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAuthorWork() throws Exception {
        // Initialize the database
        authorWorkRepository.saveAndFlush(authorWork);

        // Get the authorWork
        restAuthorWorkMockMvc.perform(get("/api/author-works/{id}", authorWork.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(authorWork.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAuthorWork() throws Exception {
        // Get the authorWork
        restAuthorWorkMockMvc.perform(get("/api/author-works/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAuthorWork() throws Exception {
        // Initialize the database
        authorWorkRepository.saveAndFlush(authorWork);

        int databaseSizeBeforeUpdate = authorWorkRepository.findAll().size();

        // Update the authorWork
        AuthorWork updatedAuthorWork = authorWorkRepository.findById(authorWork.getId()).get();
        // Disconnect from session so that the updates on updatedAuthorWork are not directly saved in db
        em.detach(updatedAuthorWork);

        restAuthorWorkMockMvc.perform(put("/api/author-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuthorWork)))
            .andExpect(status().isOk());

        // Validate the AuthorWork in the database
        List<AuthorWork> authorWorkList = authorWorkRepository.findAll();
        assertThat(authorWorkList).hasSize(databaseSizeBeforeUpdate);
        AuthorWork testAuthorWork = authorWorkList.get(authorWorkList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAuthorWork() throws Exception {
        int databaseSizeBeforeUpdate = authorWorkRepository.findAll().size();

        // Create the AuthorWork

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuthorWorkMockMvc.perform(put("/api/author-works")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(authorWork)))
            .andExpect(status().isBadRequest());

        // Validate the AuthorWork in the database
        List<AuthorWork> authorWorkList = authorWorkRepository.findAll();
        assertThat(authorWorkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAuthorWork() throws Exception {
        // Initialize the database
        authorWorkRepository.saveAndFlush(authorWork);

        int databaseSizeBeforeDelete = authorWorkRepository.findAll().size();

        // Get the authorWork
        restAuthorWorkMockMvc.perform(delete("/api/author-works/{id}", authorWork.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AuthorWork> authorWorkList = authorWorkRepository.findAll();
        assertThat(authorWorkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuthorWork.class);
        AuthorWork authorWork1 = new AuthorWork();
        authorWork1.setId(1L);
        AuthorWork authorWork2 = new AuthorWork();
        authorWork2.setId(authorWork1.getId());
        assertThat(authorWork1).isEqualTo(authorWork2);
        authorWork2.setId(2L);
        assertThat(authorWork1).isNotEqualTo(authorWork2);
        authorWork1.setId(null);
        assertThat(authorWork1).isNotEqualTo(authorWork2);
    }
}
