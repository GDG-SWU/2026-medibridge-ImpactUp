package com.example.MediLink.service;

import com.example.MediLink.model.DiagnoseRequest;
import com.example.MediLink.model.DiagnoseResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DiagnoseService {

    public DiagnoseResponse diagnose(DiagnoseRequest request) {

        // TODO: Gemini API 키 받으면 실제 호출로 교체
        // 지금은 시나리오 기반 임시 응답

        int painScore = request.getSymptomInput().getPainScore();
        List<String> symptoms = request.getSymptomInput().getAdditionalSymptoms();

        // moderate 케이스 (painScore 4~7, 구토/메스꺼움)
        if (painScore >= 4 && painScore <= 7 &&
                (symptoms.contains("nausea") || symptoms.contains("chills"))) {

            return new DiagnoseResponse(
                    "Acute gastroenteritis or norovirus-related gastrointestinal infection",
                    "급성 위장염 또는 노로바이러스 관련 장염 가능성",
                    "moderate",
                    "medium",
                    "The symptoms may be related to acute gastroenteritis. Visiting a pharmacy is recommended first if there are no red-flag symptoms.",
                    List.of(
                            "The user reports abdominal cramping and nausea.",
                            "The pain score is " + painScore + " out of 10.",
                            "Chills are present.",
                            "Norovirus is currently common in Korea during winter.",
                            "No red-flag symptoms were reported."
                    ),
                    "pharmacy",
                    List.of(
                            new DiagnoseResponse.Option("self-care", 2, "Self-care", "Drink water slowly, rest, and avoid spicy or greasy foods."),
                            new DiagnoseResponse.Option("pharmacy", 1, "Visit a pharmacy", "Consult a pharmacist and show your allergy and medication information."),
                            new DiagnoseResponse.Option("hospital", 3, "Visit a hospital", "Visit a hospital immediately if high fever, blood in stool, or worsening pain occurs.")
                    ),
                    List.of("blood in stool", "high fever", "severe dehydration", "persistent vomiting"),
                    List.of(
                            "Do not take ibuprofen because the user has an ibuprofen allergy.",
                            "Consult a pharmacist before taking medicine because the user is currently taking GERD medication."
                    ),
                    "This is not a medical diagnosis. Please consult a pharmacist or doctor if symptoms worsen."
            );
        }

        // mild 케이스 (painScore 1~3)
        return new DiagnoseResponse(
                "Mild gastrointestinal discomfort",
                "경미한 소화불량",
                "mild",
                "medium",
                "Symptoms appear mild. Rest and hydration are recommended.",
                List.of("Pain score is low.", "No red-flag symptoms reported."),
                "self-care",
                List.of(
                        new DiagnoseResponse.Option("self-care", 1, "Self-care", "Rest and drink plenty of water."),
                        new DiagnoseResponse.Option("pharmacy", 2, "Visit a pharmacy", "Visit a pharmacy if symptoms worsen."),
                        new DiagnoseResponse.Option("hospital", 3, "Visit a hospital", "Visit a hospital if severe symptoms develop.")
                ),
                List.of("blood in stool", "high fever", "severe dehydration"),
                List.of("Consult a pharmacist before taking any medicine."),
                "This is not a medical diagnosis. Please consult a pharmacist or doctor if symptoms worsen."
        );
    }
}
