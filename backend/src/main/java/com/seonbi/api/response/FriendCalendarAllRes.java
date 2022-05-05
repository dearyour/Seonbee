package com.seonbi.api.response;

import com.seonbi.api.model.FriendCalendarDto;
import com.seonbi.api.model.FriendDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FriendCalendarAllRes extends BaseResponseBody{

    private List<FriendCalendarDto> friends;

    public static FriendCalendarAllRes of(Integer status, String message, List<FriendCalendarDto> friends) {
        FriendCalendarAllRes res = new FriendCalendarAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setFriends(friends);

        return res;
    }

}
