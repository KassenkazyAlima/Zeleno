package kz.csia.agrotech.controller;

import kz.csia.agrotech.dto.LotDto;
import kz.csia.agrotech.model.LotModel;
import kz.csia.agrotech.service.LotService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("lots")
public class LotController {
    private final LotService lotService;

    @PostMapping("create")
    public ResponseEntity<?> createLot(@RequestBody LotDto lotDto) {
        lotService.createLot(lotDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("all")
    public ResponseEntity<List<LotModel>> getAllLots() {
        return ResponseEntity.ok(lotService.getAllLots());
    }

    @GetMapping("{lot_name}")
    public ResponseEntity<LotModel> getLotByName(@PathVariable String lot_name) {
        return ResponseEntity.ok(lotService.getLotByName(lot_name));
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteLot(@RequestBody LotDto lotDto) {
        lotService.deleteLotByName(lotDto.getMicrogreen().getName());
        return ResponseEntity.ok("Deleted lot");
    }
}
