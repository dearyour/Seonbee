package com.seonbi.api.service;

import com.seonbi.api.model.ReceiverDto;
import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendReceiverDto;

import java.util.List;

public interface RecommendService {

    List<RecommendReceiverDto> getGiveAll(Long memberId);
    List<ReceiverProductDto> getGiveProductAll(Long receiverId, Boolean isMember);
}
