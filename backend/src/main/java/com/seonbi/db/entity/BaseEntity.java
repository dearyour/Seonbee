package com.seonbi.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

/*
    모델 간 공통 사항 정의
 */
@Getter
@MappedSuperclass   // 상속을 위해
@EntityListeners(AuditingEntityListener.class)  // https://sas-study.tistory.com/361 참고
public class BaseEntity {

}
