package com.seonbi.db.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

/**
    모델 간 공통 사항 정의

 JPA Auditing이란?

 JPA가 제공하는 기능으로  데이터가 입력, 수정 될때마다 감시해 자동으로 시간을 입력해주는 기능을 한다

 생성시간 수정시간 자동 등록을 위한 클래스
 */
@Getter
@Setter
@MappedSuperclass    // JPA Entity클래스들이 BaseTimeEntity를 상속할 때 입력한 필드변수가 칼럼으로 인식되도록 함
@EntityListeners(AuditingEntityListener.class)  // @CreatedDate, @LastModifiedDate 어노테이션을 이용
public class BaseEntity {

    @CreatedDate // Entity가 생성되어 저장될때 시간이 자동 저장됨
    @Column(updatable = false)
    LocalDateTime createdDate;  // 생성 날짜

    @LastModifiedDate
    LocalDateTime modifiedDate; // 수정 날짜

    Boolean isDeleted=false;    // 지워졌는지 여부


}
