package kz.csia.agrotech.repository;

import kz.csia.agrotech.model.GrowthLogModel;
import kz.csia.agrotech.model.GrowthPhotoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrowthPhotoRepository extends JpaRepository<GrowthPhotoModel, Long> {
    List<GrowthPhotoModel> findByGrowthLogIdIn(List<Long> logId);
}
