package com.seonbi.api.response;

import com.seonbi.api.model.LanternDto;
import com.seonbi.api.model.MemberDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LanternGetRes extends BaseResponseBody{

    private LanternDto lanternDto;

    public static LanternGetRes of(Integer status, String message, LanternDto lanternDto) {
        LanternGetRes res = new LanternGetRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setLanternDto(lanternDto);

        return res;
    }

}
