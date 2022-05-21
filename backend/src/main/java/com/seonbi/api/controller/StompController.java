package com.seonbi.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompController {
    @MessageMapping(value = "/test")
    public String enter(String message){
        return message;
    }

    @MessageMapping(value = "/chat")
    public void message(){
        ;
    }
}
