package com.seonbi.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleCreateReq {

    String title;
    String scheduleDate;
    int background=1;
}
