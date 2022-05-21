package com.seonbi.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

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
    private String brand=null;
    private Long hit=0l;    // buyUrl 눌러서 들어감
    private Long wish=0l;   // 갖고싶소에 넣음
    private Long give=0l;   // 주소싶소에 넣음
    private Long recommend=0l;  // 추천된거


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(productId, product.productId) && Objects.equals(naverId, product.naverId) && Objects.equals(name, product.name) && Objects.equals(buyUrl, product.buyUrl) && Objects.equals(price, product.price) && Objects.equals(imageUrl, product.imageUrl) && Objects.equals(category1, product.category1) && Objects.equals(category2, product.category2) && Objects.equals(category3, product.category3)  && Objects.equals(brand, product.brand) && Objects.equals(hit, product.hit) && Objects.equals(wish, product.wish) && Objects.equals(give, product.give) && Objects.equals(recommend, product.recommend);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, naverId, name, buyUrl, price, imageUrl, category1, category2, category3, brand, hit, wish, give, recommend);
    }
}
