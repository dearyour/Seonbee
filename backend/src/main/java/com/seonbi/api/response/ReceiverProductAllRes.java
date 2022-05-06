package com.seonbi.api.response;

import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendReceiverDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReceiverProductAllRes extends BaseResponseBody{

    private List<ReceiverProductDto> productList;

    public static ReceiverProductAllRes of(Integer status, String message, List<ReceiverProductDto> productList) {
        ReceiverProductAllRes res = new ReceiverProductAllRes();
        res.setStatus(status);
        res.setMessage(message);
        res.setProductList(productList);

        return res;
    }

}
