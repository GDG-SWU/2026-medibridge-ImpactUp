package com.example.MediLink.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class CommCardController {

    @GetMapping("/api/comm-card/{diagnoseId}")
    public Object getCommCard(@PathVariable String diagnoseId) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("comm_cards.json");
        List<Object> cards = mapper.readValue(resource.getInputStream(), List.class);
        return cards.get(0);
    }
}
