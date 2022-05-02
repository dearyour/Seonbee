package com.seonbi.api.response;

import com.seonbi.api.model.MemberDto;
import com.seonbi.api.model.ScheduleDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ScheduleGetAllRes extends BaseResponseBody{

    private List<ScheduleDto> scheduleDtos;

    public static ScheduleGetAllRes of(Integer status, String message, List<ScheduleDto> scheduleDtos) {
        ScheduleGetAllRes res = new ScheduleGetAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setScheduleDtos(scheduleDtos);
        return res;
    }

}
