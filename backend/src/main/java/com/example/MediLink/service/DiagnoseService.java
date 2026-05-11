package com.example.MediLink.service;

import com.example.MediLink.model.DiagnoseRequest;
import com.example.MediLink.model.DiagnoseResponse;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class DiagnoseService {

    public DiagnoseResponse diagnose(DiagnoseRequest request) {

        // TODO: 나중에 Gemini API 호출로 교체
        // 지금은 시나리오 기반 임시 응답

        String diagnoseId = UUID.randomUUID().toString();

        // 복통 + 구토 + 설사 → 식중독 가능성
        if (request.getBodyPart().equals("abdomen") &&
                request.getSymptoms().contains("vomiting")) {

            return new DiagnoseResponse(
                    diagnoseId,
                    "食中毒の可能性",
                    "pharmacy",
                    List.of(
                            "みぞおち・上腹部の強い痛み（1〜6時間）",
                            "嘔吐・寒気の同時発生",
                            "夏の韓国で食中毒が流行中",
                            "危険信号（歩行不可・意識低下）なし"
                    ),
                    List.of("パセトシン", "スモッカ顆粒"),
                    "通常24〜48時間で回復します。水分補給を十分に行ってください。症状が悪化した場合は病院を受診してください。"
            );
        }

        // 기본 응답
        return new DiagnoseResponse(
                diagnoseId,
                "症状を確認中",
                "self_care",
                List.of("증상이 경미합니다"),
                List.of(),
                "증상을 지켜보세요."
        );
    }
}
