package com.seonbi.api.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    Long saveImage(MultipartFile image) throws IOException;
    String getImage(Long imageId);
}
