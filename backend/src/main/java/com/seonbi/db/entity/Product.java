package com.seonbi.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@Table(indexes = @Index(name="i_keyword", columnList = "keyword")) // keyword 인덱스로 사용
public class Product extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private Long naverId;
    private String name;
    @Column(length = 1000)
    private String buyUrl;
    private Long price=0l;
    private String imageUrl;
    private String category1;
    private String category2;
    private String category3;
    private String keyword;
    private String brand;
    private Long hit=0l;
    private Long wish=0l;
    private Long give=0l;
    private Long recommend=0l;
}
