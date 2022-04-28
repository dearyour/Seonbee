package com.seonbi.api.response;

import com.seonbi.api.model.MemberAuthDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberAuthRes extends BaseResponseBody {

    private MemberAuthDto memberAuthDto;

    public static MemberAuthRes of(Integer statusCode, String message, MemberAuthDto memberAuthDto) {
        MemberAuthRes res = new MemberAuthRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setMemberAuthDto(memberAuthDto);

        return res;
    }

}
