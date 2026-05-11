package com.example.MediLink.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class FacilityController {

    @GetMapping("/api/facilities")
    public List<Object> getFacilities() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("facilities.json");
        return mapper.readValue(resource.getInputStream(), List.class);
    }
}