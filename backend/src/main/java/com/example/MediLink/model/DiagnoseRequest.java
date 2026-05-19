package com.example.MediLink.model;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class DiagnoseRequest {
    private String userId;
    private String bodyPart;
    private String detailLocation;
    private int painLevel;
    private String duration;
    private List<String> symptoms;
    private List<String> specialConditions;
    private List<String> conditions;
    private List<String> allergens;
    private List<String> medications;
}