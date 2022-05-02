package com.seonbi.api.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class LanternCreateReq {
    /**
     * 호패 - 연등 1개
     */

    private Long scheduleId;
    private Long hostId;
    private String content;
    private int position=1;
    private int lanternType=1;
}
