package com.example.MediLink.controller;

import com.example.MediLink.model.Allergen;
import com.example.MediLink.service.AllergenService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class AllergenController {

    private final AllergenService allergenService;

    public AllergenController(AllergenService allergenService) {
        this.allergenService = allergenService;
    }

    @GetMapping("/api/allergens")
    public List<Allergen> getAllergens() throws Exception {
        return allergenService.getAll();
    }
}
