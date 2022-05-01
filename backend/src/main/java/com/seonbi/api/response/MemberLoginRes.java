package com.seonbi.api.response;

import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberLoginRes extends BaseResponseBody {

    private String jwt;

    public static MemberLoginRes of(Integer status, String message, String jwt) {
        MemberLoginRes res = new MemberLoginRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setJwt(jwt);

        return res;
    }

}
