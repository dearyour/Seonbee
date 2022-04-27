package com.seonbi.api.response;

import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
public class MemberSelectAllRes extends BaseResponseBody{

    private List<MemberDto> members;

    public static MemberSelectAllRes of(Integer statusCode, String message, List<MemberDto> members) {
        MemberSelectAllRes res = new MemberSelectAllRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMembers(members);

        return res;
    }

}
