package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class RecommendDto {
    /**
     * 호패 - 추천 내역 목록
     */

    private Long recommendId;
    private String receiverName;
    private Long price;
    private String name;
    private String buyUrl;
    private String imageUrl;
    private Boolean isSaved=false;


}
