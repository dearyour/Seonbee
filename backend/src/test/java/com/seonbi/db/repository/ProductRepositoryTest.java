package com.seonbi.db.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.seonbi.db.entity.Product;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

@Transactional
@SpringBootTest
@Commit
class ProductRepositoryTest {

    @Autowired
    ProductRepository productRepository;

    @Test
    public void test() {
        Product product=new Product();
        product.setName("장가네제과 케익재료세트 생일케이크만들기 1호 _구성품 생크림은 140g 1개");
        product.setBuyUrl("https://search.shopping.naver.com/catalog/30532652168?NaPm=ct%3Dl2q7rm5k%7Cci%3D7943c77683ce04874fde556b6f013d610bb24253%7Ctr%3Dslsl%7Csn%3D95694%7Chk%3D57e5acef06544176cf72d956f865295e95cdd957");
        product.setImageUrl("https://shopping-phinf.pstatic.net/main_3053265/30532652168.20220304022348.jpg");
        product.setPrice(Long.parseLong("7840"));
        product.setNaverId(Long.parseLong("30532652168"));
        product.setCategory1("식품");
        product.setCategory2("과자/베이커리");
        product.setCategory3("케이크");
        productRepository.save(product);
    }

}