package kz.csia.agrotech.service;

import jakarta.persistence.EntityNotFoundException;
import kz.csia.agrotech.model.MicrogreenModel;
import kz.csia.agrotech.repository.MicrogreenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MicrogreenService {
    private final MicrogreenRepository microgreenRepository;

    public List<MicrogreenModel> getAllMicrogreens() {
        return microgreenRepository.findAll();
    }

    public MicrogreenModel getMicrogreenByName(String name) {
        return (MicrogreenModel) microgreenRepository.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Microgreen not found with name: " + name));
    }
}
