package kz.csia.agrotech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;
import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "growth_logs")
public class GrowthLogModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate logDate;

    private Integer heightMm;

    @Column(columnDefinition = "TEXT")
    private String visualNotes;

    @Column(columnDefinition = "TEXT")
    private String wateringNotes;

    @Column(columnDefinition = "TEXT")
    private String lightingNotes;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "lot_id")
    private LotModel lot;

    @OneToMany(mappedBy = "growthLog")
    private List<GrowthPhotoModel> photos;
}
