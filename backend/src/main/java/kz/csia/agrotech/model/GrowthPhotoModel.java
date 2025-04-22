package kz.csia.agrotech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "growth_photos")
public class GrowthPhotoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String photoUrl;

    private String caption;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "log_id")
    private GrowthLogModel growthLog;
}
