package com.seonbi.db.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
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
}
