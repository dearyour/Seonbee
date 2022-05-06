package com.seonbi.api.controller;


import com.seonbi.api.response.BaseResponseBody;
import com.seonbi.api.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/csv")
public class WordController {

    @Autowired
    WordService wordService;

    @PostMapping("/read")
    public ResponseEntity<String> csvRead()
    {
        wordService.csvRead();
return ResponseEntity.status(200).body("ok");
    }

    @PostMapping("/test")
    public ResponseEntity<String> dataUpdate()
    {
        wordService.updateData();
        return ResponseEntity.status(200).body("ok");
    }

}
