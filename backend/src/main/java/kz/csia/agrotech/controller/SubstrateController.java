package kz.csia.agrotech.controller;

import kz.csia.agrotech.model.SubstrateModel;
import kz.csia.agrotech.service.SubstrateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("substrate")
@RequiredArgsConstructor
public class SubstrateController {
    private final SubstrateService substrateService;

    @GetMapping("all")
    public List<SubstrateModel> getAllSubstrates() {
        return substrateService.getAllSubstrates();
    }
}
