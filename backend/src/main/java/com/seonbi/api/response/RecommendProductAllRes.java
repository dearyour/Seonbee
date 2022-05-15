package com.seonbi.api.response;

import com.seonbi.api.model.ProductDto;
import com.seonbi.api.model.RecommendProductDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecommendProductAllRes extends BaseResponseBody{

    private List<RecommendProductDto> productList;

    public static RecommendProductAllRes of(Integer status, String message, List<RecommendProductDto> productList) {
        RecommendProductAllRes res = new RecommendProductAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setProductList(productList);

        return res;
    }

}
