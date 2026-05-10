package com.example.MediLink.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class AlertController {

    @GetMapping("/api/alerts")
    public List<Object> getAlerts() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("alerts.json");
        return mapper.readValue(resource.getInputStream(), List.class);
    }
}
