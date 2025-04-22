package kz.csia.agrotech.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GrowthPhotoDto {
    private Long id;
    private String photoUrl;
    private String caption;
    private LocalDateTime createdAt;
    private Long growthLogId;
}
