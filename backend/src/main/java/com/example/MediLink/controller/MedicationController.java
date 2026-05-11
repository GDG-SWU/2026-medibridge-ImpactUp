package com.example.MediLink.controller;

import com.example.MediLink.model.Medication;
import com.example.MediLink.service.MedicationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class MedicationController {

    private final MedicationService medicationService;

    public MedicationController(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @GetMapping("/api/medications")
    public List<Medication> getMedications() throws Exception {
        return medicationService.getAll();
    }
}
