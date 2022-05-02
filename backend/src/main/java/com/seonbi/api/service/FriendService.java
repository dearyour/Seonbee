package com.seonbi.api.service;

import com.seonbi.api.model.FriendDto;
import com.seonbi.api.model.FriendFollowDto;
import com.seonbi.api.request.FriendFollowAllowReq;

import java.util.List;

public interface FriendService {

//    int friendFollowSend(Long friendId);
    int followFriend(Long memberId, Long friendId);
    int followFriendAllow(Long followeeId, Long followerId, String allow);
    List<FriendFollowDto> getFollowFriendAll(Long followeeId);
}
