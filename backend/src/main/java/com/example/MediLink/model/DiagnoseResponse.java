package com.example.MediLink.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DiagnoseResponse {
    private String possibleCondition;
    private String koreanCondition;
    private String severity;
    private String confidence;
    private String summary;
    private List<String> reason;
    private String recommendedOption;
    private List<Option> options;
    private List<String> warningSigns;
    private List<String> safetyNotes;
    private String disclaimer;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Option {
        private String type;
        private int priority;
        private String title;
        private String description;
    }
}
