package kz.csia.agrotech.service;

import jakarta.persistence.EntityNotFoundException;
import kz.csia.agrotech.dto.GrowthLogDto;
import kz.csia.agrotech.model.GrowthLogModel;
import kz.csia.agrotech.model.GrowthPhotoModel;
import kz.csia.agrotech.model.LotModel;
import kz.csia.agrotech.repository.GrowthLogRepository;
import kz.csia.agrotech.repository.GrowthPhotoRepository;
import kz.csia.agrotech.repository.LotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GrowthService {

    private final GrowthLogRepository growthLogRepository;
    private final GrowthPhotoRepository growthPhotoRepository;
    private final LotRepository lotRepository;
    private final LotService lotService;

    public GrowthLogModel createGrowthLog(String lotName, GrowthLogDto dto) {
        LotModel lot = lotRepository.findByMicrogreen_Name(lotName)
                .orElseThrow(() -> new EntityNotFoundException("Lot not found"));

        GrowthLogModel log = new GrowthLogModel();
        log.setLot(lot);
        log.setLogDate(dto.getLogDate());
        log.setHeightMm(dto.getHeightMm());
        log.setVisualNotes(dto.getVisualNotes());
        log.setWateringNotes(dto.getWateringNotes());
        log.setLightingNotes(dto.getLightingNotes());

        return growthLogRepository.save(log);
    }

    public GrowthPhotoModel uploadPhoto(String lot_name, MultipartFile file, String caption) {
        GrowthLogModel log = (GrowthLogModel) growthLogRepository.findByLot_Microgreen_Name(lot_name);

        String photoUrl = saveFileToStorage(file);

        GrowthPhotoModel photo = new GrowthPhotoModel();
        photo.setGrowthLog(log);
        photo.setPhotoUrl(photoUrl);
        photo.setCaption(caption);
        return growthPhotoRepository.save(photo);
    }

    public List<GrowthLogModel> getLogsByLot(String lot_name) {
        return growthLogRepository.findByLot_Microgreen_Name(lot_name);
    }

    public List<GrowthPhotoModel> getPhotosByLog(String lot_name) {
        List<Long> logIds = growthLogRepository.findByLot_Microgreen_Name(lot_name)
                .stream()
                .map(GrowthLogModel::getId)
                .toList();

        return growthPhotoRepository.findByGrowthLogIdIn(logIds);
    }

    private String saveFileToStorage(MultipartFile file) {
        return "/uploads/photos/" + file.getOriginalFilename();
    }
}
