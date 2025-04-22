package kz.csia.agrotech.service;

import kz.csia.agrotech.dto.LotDto;
import kz.csia.agrotech.model.LotModel;
import kz.csia.agrotech.repository.LotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class LotService {
    private final LotRepository lotRepository;

    public List<LotModel> getAllLots() {
        return lotRepository.findAll();
    }

    public void createLot(LotDto lotInfo) {
        LocalDateTime createdAt = LocalDateTime.now();
        LotModel lot = new LotModel();
        lot.setCreatedAt(createdAt);
        lot.setMicrogreen(lotInfo.getMicrogreen());
        lot.setSubstrate(lotInfo.getSubstrate());
        lot.setSowingDate(lotInfo.getSowingDate());
        lot.setExpectedHarvestDays(lotInfo.getExpectedHarvestDays());
        lotRepository.save(lot);
    }

    public LotModel getLotByName(String name) {
        return lotRepository.findByMicrogreen_Name(name).orElse(null);
    }

    public void deleteLotByName(String name) {
        lotRepository.delete(getLotByName(name));
    }
}
