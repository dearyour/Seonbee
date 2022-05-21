package com.seonbi.db.repository;


import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    Schedule findByScheduleIdAndIsDeleted(Long scheduleId, boolean isDeleted);
    Schedule findByMemberIdAndIsBirthdayAndIsDeleted(Long scheduleId, boolean isBirthday, boolean isDeleted);
    List<Schedule> findAllByMemberIdAndIsDeletedOrderByScheduleDate(Long memberId, boolean isDeleted);
}
