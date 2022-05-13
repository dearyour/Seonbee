package com.seonbi.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
public class Receiver extends BaseEntity{
    // Wrapper 타입인 Long이나 Integer를 쓰면 id가 없는 경우엔 확실히 null이고, 그 자체로 id가 없다는걸 보장함.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private Long receiverId;
    private String name;
    private Integer age=20;     // 나이대
    private String gender;
    private String mbti;
    private String interest;
    private String relation;    // 관계
    private String purpose;      // 용도
    private Long upPrice=50000l;
    private Long downPrice=0l;

}
