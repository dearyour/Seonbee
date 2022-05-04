package com.seonbi.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Schedule extends BaseEntity{
    // Wrapper 타입인 Long이나 Integer를 쓰면 id가 없는 경우엔 확실히 null이고, 그 자체로 id가 없다는걸 보장함.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private Long scheduleId;
    private Long memberId;
    private String scheduleDate;    // 2022.04.21
    private String title;
    private int background=1;
    private boolean isBirthday=false;   // 회원가입/수정시 생일이면 바로 추가

}
