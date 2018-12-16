package cl.galea.awm.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import cl.galea.awm.domain.enumeration.WorkType;

/**
 * A Work.
 */
@Entity
@Table(name = "work")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Work implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "work_name", length = 200, nullable = false)
    private String workName;

    @Column(name = "work_abstract")
    private String workAbstract;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "work_type", nullable = false)
    private WorkType workType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkName() {
        return workName;
    }

    public Work workName(String workName) {
        this.workName = workName;
        return this;
    }

    public void setWorkName(String workName) {
        this.workName = workName;
    }

    public String getWorkAbstract() {
        return workAbstract;
    }

    public Work workAbstract(String workAbstract) {
        this.workAbstract = workAbstract;
        return this;
    }

    public void setWorkAbstract(String workAbstract) {
        this.workAbstract = workAbstract;
    }

    public WorkType getWorkType() {
        return workType;
    }

    public Work workType(WorkType workType) {
        this.workType = workType;
        return this;
    }

    public void setWorkType(WorkType workType) {
        this.workType = workType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Work work = (Work) o;
        if (work.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), work.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Work{" +
            "id=" + getId() +
            ", workName='" + getWorkName() + "'" +
            ", workAbstract='" + getWorkAbstract() + "'" +
            ", workType='" + getWorkType() + "'" +
            "}";
    }
}
