package kz.csia.agrotech.repository;

import kz.csia.agrotech.model.SubstrateModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubstrateRepository extends JpaRepository<SubstrateModel, Long> {
}
