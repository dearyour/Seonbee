package com.seonbi.api.response;

import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberGetRes extends BaseResponseBody{

    private MemberDto member;

    public static MemberGetRes of(Integer status, String message, MemberDto member) {
        MemberGetRes res = new MemberGetRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setMember(member);

        return res;
    }

}
