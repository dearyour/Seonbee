package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FriendScheduleDto {
    /**
     * 사랑방 - 벗 목록 안부 확인하기
     * 일정 정보
     */
    private String dday;
    private String title;

    public FriendScheduleDto(String dday, String title) {
        this.dday = dday;
        this.title = title;
    }
}
