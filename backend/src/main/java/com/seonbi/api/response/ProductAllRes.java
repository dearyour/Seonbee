package com.seonbi.api.response;

import com.seonbi.api.model.FriendDto;
import com.seonbi.api.model.ProductDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductAllRes extends BaseResponseBody{

    private List<ProductDto> productList;

    public static ProductAllRes of(Integer status, String message, List<ProductDto> productList) {
        ProductAllRes res = new ProductAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setProductList(productList);

        return res;
    }

}
