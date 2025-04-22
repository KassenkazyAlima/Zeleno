package kz.csia.agrotech.repository;

import kz.csia.agrotech.model.GrowthLogModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrowthLogRepository extends JpaRepository<GrowthLogModel, Long> {
    List<GrowthLogModel> findByLot_Microgreen_Name(String name);
}
