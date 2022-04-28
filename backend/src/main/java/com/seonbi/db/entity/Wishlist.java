package com.seonbi.db.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
/**
    특정 상품 받고싶소
 */
@Entity
public class Wishlist extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishlistId;
    private Long productId;
    private Long memberId;
    private Long giverId=0l;   // 선물 줄 사람, 0이면 아직 없음

}
