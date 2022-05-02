package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FriendFollowDto {

    /**
     * 사랑방 - 나의 벗 맺기 전보
     * 나에게 전보가 온 벗
     */
    private Long friendId=0l;
    private String nickname;
    private String imageString;
}
