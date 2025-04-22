package kz.csia.agrotech.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.time.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lots")
public class LotModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "microgreen_id")
    private MicrogreenModel microgreen;

    @ManyToOne
    @JoinColumn(name = "substrate_id")
    private SubstrateModel substrate;

    private LocalDate sowingDate;

    @Column(name = "expected_harvest_day")
    private Integer expectedHarvestDays;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "lot")
    private List<GrowthLogModel> growthLogs;
}
