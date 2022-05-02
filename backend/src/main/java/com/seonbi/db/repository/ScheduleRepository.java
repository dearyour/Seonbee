package com.seonbi.db.repository;


import com.seonbi.db.entity.Friend;
import com.seonbi.db.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {

}
