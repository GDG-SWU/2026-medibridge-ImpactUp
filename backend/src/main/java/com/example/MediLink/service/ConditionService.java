package com.example.MediLink.service;

import com.example.MediLink.model.Condition;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class ConditionService {

    public List<Condition> getAll() throws Exception {
        List<Condition> list = new ArrayList<>();
        ClassPathResource resource = new ClassPathResource("conditions.csv");
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(resource.getInputStream(), "UTF-8")
        );
        String line;
        boolean isFirst = true;
        while ((line = reader.readLine()) != null) {
            if (isFirst) { isFirst = false; continue; }
            String[] parts = line.split(",");
            list.add(new Condition(
                    Integer.parseInt(parts[0]),
                    parts[1],
                    parts[2]
            ));
        }
        reader.close();
        return list;
    }
}
