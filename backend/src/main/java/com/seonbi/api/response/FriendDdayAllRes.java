package com.seonbi.api.response;

import com.seonbi.api.model.FriendDdayDto;
import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FriendDdayAllRes extends BaseResponseBody{

    private List<FriendDdayDto> friends;

    public static FriendDdayAllRes of(Integer status, String message, List<FriendDdayDto> friends) {
        FriendDdayAllRes res = new FriendDdayAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setFriends(friends);

        return res;
    }

}
