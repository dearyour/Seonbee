package com.seonbi.api.service;

import com.seonbi.api.model.LanternDto;
import com.seonbi.db.entity.Lantern;
import com.seonbi.db.entity.Schedule;

public interface LanternService {
    LanternDto getLantern(Long lanternId);
    void createLantern(Lantern lantern);
    int deleteLantern(Long memberId, Long lanternId);

    int deleteSchedule(Long memberId, Long scheduleId);
}
