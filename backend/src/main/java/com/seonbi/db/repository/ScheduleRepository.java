package com.seonbi.db.repository;


import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    Schedule findScheduleByScheduleIdAndIsDeleted(Long scheduleId, boolean isDeleted);
    List<Schedule> findAllByMemberIdAndIsDeletedOrderByScheduleDate(Long memberId, boolean isDeleted);
}
