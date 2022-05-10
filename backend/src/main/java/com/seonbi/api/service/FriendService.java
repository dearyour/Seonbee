package com.seonbi.api.service;

import com.seonbi.api.model.FriendCalendarDto;
import com.seonbi.api.model.FriendDdayDto;
import com.seonbi.api.model.FriendDto;
import com.seonbi.api.model.FriendFollowDto;
import com.seonbi.api.request.FriendFollowAllowReq;

import java.util.List;

public interface FriendService {

//    int friendFollowSend(Long friendId);
    int followFriend(Long memberId, Long friendId);
    int followFriendAllow(Long followeeId, Long followerId, String allow);
    List<FriendFollowDto> getFollowFriendAll(Long followeeId);
    boolean isFriend(Long memberId1, Long memberId2);
    List<FriendDdayDto> getFriendDdayAll(Long memberId);
    List<Long> getFriendIdAll(Long memberId);
    List<FriendDto> getFriendAll(Long memberId);
    List<FriendCalendarDto> getFriendCalendarAll(Long memberId);
    List<FriendFollowDto> shopGetFriendAll(Long memberId);
    String getFriendStatus(Long memberId1, Long memberId2);
}
