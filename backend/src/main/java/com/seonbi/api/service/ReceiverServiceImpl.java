package com.seonbi.api.service;

import com.seonbi.api.model.ReceiverDto;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Receiver;
import com.seonbi.db.repository.ProductRepository;
import com.seonbi.db.repository.ReceiverRepository;
import com.seonbi.db.repository.WishlistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiverServiceImpl implements ReceiverService{

    @Autowired
    ReceiverRepository receiverRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WishlistRepository wishlistRepository;


    @Override
    public Receiver getReceiver(Long receiverId) {
        return null;
    }

    @Override
    public List<ReceiverDto> getGiveReceiverAll(Long memberId) {
        receiverRepository.
        return null;
    }
}
