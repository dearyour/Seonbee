package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FriendCalendarDto {
    /**
     * 사랑방 - 벗 연등회
     * 달력에 표시
     */

    private Long friendId;
    private String nickname;
    private String scheduleDate;
    private String title;

    public FriendCalendarDto(Long friendId, String nickname, String scheduleDate, String title) {
        this.friendId = friendId;
        this.nickname = nickname;
        this.scheduleDate = scheduleDate;
        this.title = title;
    }
}
