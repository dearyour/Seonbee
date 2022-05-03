package com.seonbi.api.response;

import com.seonbi.api.model.FriendDto;
import com.seonbi.api.model.FriendFollowDto;
import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FriendFollowGetAllRes extends BaseResponseBody{

    private List<FriendFollowDto> friends;

    public static FriendFollowGetAllRes of(Integer status, String message, List<FriendFollowDto> friends) {
        FriendFollowGetAllRes res = new FriendFollowGetAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setFriends(friends);
        return res;
    }

}
