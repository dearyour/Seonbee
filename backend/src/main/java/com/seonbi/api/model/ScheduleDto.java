package com.seonbi.api.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ScheduleDto {
    /**
     * 호패 - 연등회(일정), 연등들 포함
     */
    private Long scheduleId;
    private String scheduleDate;
    private String title;
    private Integer background=1;
    private List<LanternDto> lanternList;
}
