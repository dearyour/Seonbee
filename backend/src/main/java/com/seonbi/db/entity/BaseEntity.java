package com.seonbi.db.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

/**
    모델 간 공통 사항 정의
 */
@Getter
@MappedSuperclass   // 상속을 위해
@EntityListeners(AuditingEntityListener.class)  // @CreatedDate, @LastModifiedDate 어노테이션을 이용
public class BaseEntity {
    @CreatedDate
    @Column(updatable = false)
    LocalDateTime createdDate;  // 생성 날짜

    @LastModifiedBy
    LocalDateTime modifiedDate; // 수정 날짜

    Boolean isDeleted=false;    // 지워졌는지 여부


}
