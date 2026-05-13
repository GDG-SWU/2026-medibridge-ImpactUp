package com.example.MediLink.model;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class DiagnoseRequest {

    private UserProfile userProfile;
    private SymptomInput symptomInput;
    private LocalHealthContext localHealthContext;

    @Getter
    @Setter
    public static class UserProfile {
        private String userId;
        private int age;
        private String gender;
        private String nationality;
        private String language;
        private List<String> allergies;
        private List<String> currentMedications;
        private List<String> medicalConditions;
        private String insuranceStatus;
    }

    @Getter
    @Setter
    public static class SymptomInput {
        private String bodyPart;
        private String symptomText;
        private int painScore;
        private String duration;
        private List<String> additionalSymptoms;
        private Map<String, Boolean> redFlags;
    }

    @Getter
    @Setter
    public static class LocalHealthContext {
        private String country;
        private String city;
        private String district;
        private String season;
        private Outbreak outbreak;
    }

    @Getter
    @Setter
    public static class Outbreak {
        private String disease;
        private String status;
        private String description;
    }
}
