package kz.csia.agrotech.controller;

import kz.csia.agrotech.dto.GrowthLogDto;
import kz.csia.agrotech.model.GrowthLogModel;
import kz.csia.agrotech.model.GrowthPhotoModel;
import kz.csia.agrotech.service.GrowthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("growth")
public class GrowthController {
    private final GrowthService growthService;

    @PostMapping("log/{lot_name}/create")
    public ResponseEntity<?> createLog(@PathVariable String lot_name, @RequestBody GrowthLogDto growthLogDto) {
        growthService.createGrowthLog(lot_name, growthLogDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/log/{lot_name}/photo")
    public ResponseEntity<GrowthPhotoModel> uploadPhoto(
            @PathVariable String lot_name,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "caption", required = false) String caption) {
        GrowthPhotoModel photoDto = growthService.uploadPhoto(lot_name, file, caption);
        return ResponseEntity.status(HttpStatus.CREATED).body(photoDto);
    }

    @GetMapping("/lot/{lot_name}/logs")
    public ResponseEntity<List<GrowthLogModel>> getLogsByLot(@PathVariable String lot_name) {
        return ResponseEntity.ok(growthService.getLogsByLot(lot_name));
    }

    @GetMapping("/log/{lot_name}/photos")
    public ResponseEntity<List<GrowthPhotoModel>> getPhotosByLog(@PathVariable String lot_name) {
        return ResponseEntity.ok(growthService.getPhotosByLog(lot_name));
    }
}
