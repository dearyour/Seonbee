package com.seonbi.api.service;

import com.seonbi.api.model.ReceiverDto;
import com.seonbi.api.model.WishlistDto;
import com.seonbi.db.entity.Receiver;

import java.util.List;

public interface ReceiverService {
    List<Re> getGive(Long receiverId, Boolean isMember);

    List<ReceiverDto> getGiveReceiverAll(Long memberId);
}
