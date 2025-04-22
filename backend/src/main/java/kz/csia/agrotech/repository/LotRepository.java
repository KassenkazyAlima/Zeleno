package kz.csia.agrotech.repository;

import kz.csia.agrotech.model.LotModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LotRepository extends JpaRepository<LotModel, Long> {
    Optional<LotModel> findByMicrogreen_Name(String name);
}
