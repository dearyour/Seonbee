package com.seonbi.api.response;

import com.seonbi.api.model.FriendDdayDto;
import com.seonbi.api.model.FriendDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FriendAllRes extends BaseResponseBody{

    private List<FriendDto> friends;

    public static FriendAllRes of(Integer status, String message, List<FriendDto> friends) {
        FriendAllRes res = new FriendAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setFriends(friends);

        return res;
    }

}
