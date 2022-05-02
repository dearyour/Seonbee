package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FriendDdayDto {
    /**
     * 사랑방 - 벗 목록 디데이순
     */
    private Long friendId=0l;
    private String nickname;
    private String imageString;
    private String dday;
    private String content;
}
