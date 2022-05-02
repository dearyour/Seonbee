package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.db.entity.Schedule;

public interface ScheduleService {


    void createSchedule(Schedule schedule);

    Schedule getSchedule(Long scheduleId);
}
