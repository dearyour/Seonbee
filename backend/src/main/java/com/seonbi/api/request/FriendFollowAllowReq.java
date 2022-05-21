package com.seonbi.api.request;

import com.seonbi.api.model.FriendScheduleDto;
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
public class FriendFollowAllowReq {
    /**
     * 사랑방 - 나의 벗 맺기 수락/거절
     */
    private Long friendId=0l;
    private String allow="OK";

}
