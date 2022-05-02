package com.seonbi.api.response;

import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendDdayAllRes extends BaseResponseBody{

    private MemberDto member;

    public static FriendDdayAllRes of(Integer status, String message, MemberDto member) {
        FriendDdayAllRes res = new FriendDdayAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setMember(member);

        return res;
    }

}
