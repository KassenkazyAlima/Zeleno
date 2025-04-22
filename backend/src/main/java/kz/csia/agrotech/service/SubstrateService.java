package kz.csia.agrotech.service;

import jakarta.persistence.EntityNotFoundException;
import kz.csia.agrotech.model.SubstrateModel;
import kz.csia.agrotech.repository.SubstrateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SubstrateService {
    private final SubstrateRepository substrateRepository;

    public List<SubstrateModel> getAllSubstrates() {
        return substrateRepository.findAll();
    }
}
