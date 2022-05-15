package com.seonbi.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
    추천서 + 주고싶소
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Recommend extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendId;
    private Long productId;
    private Long receiverId;
    private Long memberId;
    private Boolean isSaved=false;    // false: 추천서, true: 주고싶소
    private Boolean isFriend=false;         // 받는 사람이 회원인지

    public Recommend(Long productId, Long receiverId, Long memberId, Boolean isSaved, Boolean isFriend) {
        this.productId = productId;
        this.receiverId = receiverId;
        this.memberId = memberId;
        this.isSaved = isSaved;
        this.isFriend = isFriend;
    }
}
