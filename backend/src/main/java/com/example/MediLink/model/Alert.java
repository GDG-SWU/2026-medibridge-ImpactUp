package com.example.MediLink.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Alert {
    private int id;
    private String season;
    private String titleKo;
    private String titleJa;
    private String descriptionKo;
    private String descriptionJa;
    private String level;
}
