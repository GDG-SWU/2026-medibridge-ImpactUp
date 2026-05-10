package com.example.MediLink.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class SymptomController {

    @GetMapping("/api/symptom-questions")
    public List<Object> getSymptomQuestions() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        ClassPathResource resource = new ClassPathResource("symptom_questions.json");
        return mapper.readValue(resource.getInputStream(), List.class);
    }
}
