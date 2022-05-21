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
public class FriendDto {
    /**
     * 사랑방 - 벗 목록 확인하기
     */
    private Long friendId=0l;
    private String nickname;
    private String imageString;
    private String verse;
    private List<String> wishlist=new ArrayList<>();
    private List<FriendScheduleDto> scheduleList=new ArrayList<>();

    public FriendDto(Long friendId, String nickname, String imageString, String verse, List<String> wishlist, List<FriendScheduleDto> scheduleList) {
        this.friendId = friendId;
        this.nickname = nickname;
        this.imageString = imageString;
        this.verse = verse;
        this.wishlist = wishlist;
        this.scheduleList = scheduleList;
    }
}
