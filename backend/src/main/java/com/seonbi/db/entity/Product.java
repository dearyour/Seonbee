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
public class Product extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private Long naverId;
    private String name;
    private String buyUrl;
    private Long price=0l;
    private String imageUrl;
    private String category1;
    private String category2;
    private String category3;
    private String brand;
    private Long hit=0l;
    private Long wish=0l;
    private Long give=0l;
    private Long recommend=0l;
}
