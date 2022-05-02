package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.api.model.ScheduleDto;
import com.seonbi.db.entity.Schedule;

import java.util.List;

public interface ScheduleService {
    void createSchedule(Schedule schedule);
    Schedule getSchedule(Long scheduleId);
    List<ScheduleDto> getScheduleAll(Long hostId);
}
