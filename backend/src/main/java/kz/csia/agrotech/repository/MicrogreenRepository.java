package kz.csia.agrotech.repository;

import kz.csia.agrotech.model.MicrogreenModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MicrogreenRepository extends JpaRepository<MicrogreenModel, Long> {
    Optional<Object> findByName(String name);
}
