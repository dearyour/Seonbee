package com.seonbi.db.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.QProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class ProductRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QProduct qProduct=QProduct.product;

    @Transactional
    public List<Product> findAllByKeyword(String keyword, Long upPrice , Long downPrice)
    {

        List<Product> result = jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.keyword.eq(keyword).and(qProduct.price.between(downPrice, upPrice)))
                .fetch();

        return result;

    }




}
