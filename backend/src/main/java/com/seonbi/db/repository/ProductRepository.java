package com.seonbi.db.repository;


import com.seonbi.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    Product findByProductIdAndIsDeleted(Long productId, boolean isDeleted);
    Product findByNaverId(Long naverId);
    List<Product> findAllByIsDeleted(boolean isDeleted);
    List<Product> findAllByNameContains(String keyword);
    List<Product> findAllByKeyword(String keyword);
    List<Product> findTop1000ByOrderByRecommendDesc();
    List<Product> findAllByKeywordContains(String keyword);
    List<Product> findAllByKeywordContainsAndPriceBetween(String keyword, Long lowPrice, Long highPrice);
}
