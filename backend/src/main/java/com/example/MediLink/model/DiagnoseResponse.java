package com.example.MediLink.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class DiagnoseResponse {
    private String diagnoseId;
    private String suspectedCondition;
    private String triageLevel;
    private List<String> reason;
    private List<String> recommendedMedications;
    private String notice;
}
