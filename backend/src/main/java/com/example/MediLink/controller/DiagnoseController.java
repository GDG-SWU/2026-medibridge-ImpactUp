package com.example.MediLink.controller;

import com.example.MediLink.model.DiagnoseRequest;
import com.example.MediLink.model.DiagnoseResponse;
import com.example.MediLink.service.DiagnoseService;
import org.springframework.web.bind.annotation.*;

@RestController
public class DiagnoseController {

    private final DiagnoseService diagnoseService;

    public DiagnoseController(DiagnoseService diagnoseService) {
        this.diagnoseService = diagnoseService;
    }

    @PostMapping("/api/diagnose")
    public DiagnoseResponse diagnose(@RequestBody DiagnoseRequest request) throws Exception {
        return diagnoseService.diagnose(request);
    }
}