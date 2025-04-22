package kz.csia.agrotech.controller;

import kz.csia.agrotech.model.MicrogreenModel;
import kz.csia.agrotech.service.MicrogreenService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("microgreen")
@RequiredArgsConstructor
public class MicrogreenController {
    private final MicrogreenService microgreenService;

    @GetMapping("all")
    public List<MicrogreenModel> getAllMicrogreens() {
        return microgreenService.getAllMicrogreens();
    }

    @GetMapping("{microgreen_name}")
    public List<MicrogreenModel> getMicrogreens(@PathVariable String microgreen_name) {
        return Collections.singletonList(microgreenService.getMicrogreenByName(microgreen_name));
    }
}
