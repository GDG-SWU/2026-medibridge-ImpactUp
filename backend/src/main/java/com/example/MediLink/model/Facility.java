package com.example.MediLink.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Facility {
    private int id;
    private String nameKo;
    private String nameJa;
    private String addressKo;
    private String addressJa;
    private String phone;
    private String hours;
    private boolean isOpen;
    private boolean is24Hours;
    private double lat;
    private double lng;
}
