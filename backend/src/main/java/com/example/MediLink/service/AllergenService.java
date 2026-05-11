package com.example.MediLink.service;

import com.example.MediLink.model.Allergen;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class AllergenService {

    public List<Allergen> getAll() throws Exception {
        List<Allergen> list = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource("allergens.csv");
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), "UTF-8")
        );
        String line;
        boolean isFirst = true;
        while ((line = reader.readLine()) != null) {
            if (isFirst) { isFirst = false; continue; }
            String[] parts = line.split(",");
            list.add(new Allergen(
                    Integer.parseInt(parts[0]),
                    parts[1],
                    parts[2]
            ));
        }
        reader.close();
        return list;
    }
}