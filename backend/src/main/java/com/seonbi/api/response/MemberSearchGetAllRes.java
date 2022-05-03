package com.seonbi.api.response;

import com.seonbi.api.model.MemberDto;
import com.seonbi.api.model.MemberSearchDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberSearchGetAllRes extends BaseResponseBody{

    private List<MemberSearchDto> members;

    public static MemberSearchGetAllRes of(Integer status, String message, List<MemberSearchDto> members) {
        MemberSearchGetAllRes res = new MemberSearchGetAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setMembers(members);

        return res;
    }

}
