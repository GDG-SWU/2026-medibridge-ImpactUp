package com.example.MediLink.service;


import com.example.MediLink.model.DiagnoseRequest;
import com.example.MediLink.model.DiagnoseResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;


@Service
public class DiagnoseService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public DiagnoseResponse diagnose(DiagnoseRequest request) {
        // API 키가 제대로 읽히는지 확인
        System.out.println("API KEY CHECK = " + apiKey);

        try {
            String model = "gemini-2.5-flash";

            String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                    + model
                    + ":generateContent?key="
                    + apiKey;

            String finalPrompt = buildPrompt(request);

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", finalPrompt)
                                    )
                            )
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            System.out.println("===== Gemini Response =====");
            System.out.println(response.getBody());

            // 아직 Gemini 응답 JSON 파싱 전이므로 임시 응답 반환
            return createMockModerateResponse(request);

        } catch (Exception e) {
            e.printStackTrace();

            return new DiagnoseResponse(
                    "System Error",
                    "시스템 오류",
                    "moderate",
                    "low",
                    "Failed to connect to Gemini API.",
                    List.of("Gemini API connection failed."),
                    "pharmacy",
                    List.of(),
                    List.of(),
                    List.of(),
                    "Please try again later."
            );
        }
    }

    private String buildPrompt(DiagnoseRequest request) {

        int painScore = request.getPainLevel();
        List<String> symptoms = request.getSymptoms();

        return """
                You are a medical guidance assistant for foreign travelers in Korea.

                Your role is not to provide a final medical diagnosis.
                Your role is to classify symptom severity and suggest safe next steps.

                Important safety rules:
                1. Do not provide a definitive diagnosis.
                2. Do not say the user definitely has a disease.
                3. Use expressions such as "possible", "may be related to", or "suspected".
                4. Do not recommend medicine that conflicts with allergies.
                5. If red-flag symptoms exist, recommend hospital visit.
                6. Return only valid JSON.

                Severity criteria:
                - mild: painScore 1-3, no red flags
                - moderate: painScore 4-7, nausea, chills, vomiting, diarrhea, or abdominal cramping
                - severe: painScore 8-10 or red-flag symptoms
                - emergency: loss of consciousness, breathing difficulty, severe allergic reaction, or severe chest pain

                User scenario:
                - The user is a foreign traveler in Korea.
                - The user has an ibuprofen allergy.
                - The user is taking GERD medication.
                - Korea is currently in winter.
                - Norovirus warning context is present.

                User input:
                Pain Score: %d
                Symptoms: %s

                Return only this JSON format:

                {
                  "possibleCondition": "",
                  "koreanCondition": "",
                  "severity": "mild | moderate | severe | emergency",
                  "confidence": "low | medium | high",
                  "summary": "",
                  "reason": [],
                  "recommendedOption": "self-care | pharmacy | hospital | emergency-room",
                  "options": [],
                  "warningSigns": [],
                  "safetyNotes": [],
                  "disclaimer": ""
                }
                """.formatted(painScore, symptoms);
    }

    private DiagnoseResponse createMockModerateResponse(DiagnoseRequest request) {

        int painScore = request.getPainLevel();

        return new DiagnoseResponse(
                "Acute gastroenteritis or norovirus-related gastrointestinal infection",
                "급성 위장염 또는 노로바이러스 관련 장염 가능성",
                "moderate",
                "medium",
                "The symptoms may be related to acute gastroenteritis. Visiting a pharmacy is recommended first if there are no red-flag symptoms.",
                List.of(
                        "The user reports abdominal cramping and nausea.",
                        "The pain score is " + painScore + " out of 10.",
                        "Norovirus is currently common in Korea during winter.",
                        "No red-flag symptoms were reported."
                ),
                "pharmacy",
                List.of(
                        new DiagnoseResponse.Option(
                                "self-care",
                                2,
                                "Self-care",
                                "Drink water slowly, rest, and avoid spicy or greasy foods."
                        ),
                        new DiagnoseResponse.Option(
                                "pharmacy",
                                1,
                                "Visit a pharmacy",
                                "Consult a pharmacist and show your allergy and medication information."
                        ),
                        new DiagnoseResponse.Option(
                                "hospital",
                                3,
                                "Visit a hospital",
                                "Visit a hospital immediately if high fever, blood in stool, severe dehydration, persistent vomiting, or worsening pain occurs."
                        )
                ),
                List.of(
                        "blood in stool",
                        "black stool",
                        "high fever",
                        "severe dehydration",
                        "persistent vomiting",
                        "loss of consciousness",
                        "breathing difficulty",
                        "worsening abdominal pain"
                ),
                List.of(
                        "Do not take ibuprofen because the user has an ibuprofen allergy.",
                        "Consult a pharmacist before taking medicine because the user is currently taking GERD medication."
                ),
                "This is not a medical diagnosis. Please consult a pharmacist or doctor if symptoms worsen."
        );
    }
}