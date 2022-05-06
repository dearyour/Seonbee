package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReceiverDto {
    /**
     * 호패 - 추천인
     */
    private Long receiverId;
    private String name;
    private String imageString;

}
