package kz.csia.agrotech.dto;

import kz.csia.agrotech.model.MicrogreenModel;
import kz.csia.agrotech.model.SubstrateModel;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LotDto {
    private MicrogreenModel microgreen;
    private SubstrateModel substrate;
    private LocalDate sowingDate;
    private Integer expectedHarvestDays;
}
