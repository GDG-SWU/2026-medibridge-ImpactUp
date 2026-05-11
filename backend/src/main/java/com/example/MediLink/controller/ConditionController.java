package com.example.MediLink.controller;

import com.example.MediLink.model.Condition;
import com.example.MediLink.service.ConditionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ConditionController {

    private final ConditionService conditionService;

    public ConditionController(ConditionService conditionService) {
        this.conditionService = conditionService;
    }

    @GetMapping("/api/conditions")
    public List<Condition> getConditions() throws Exception {
        return conditionService.getAll();
    }
}
