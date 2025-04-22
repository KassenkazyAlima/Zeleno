package kz.csia.agrotech.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GrowthLogDto {
    private LocalDate logDate;
    private Integer heightMm;
    private String visualNotes;
    private String wateringNotes;
    private String lightingNotes;
}
