package com.seonbi.api.service;

import com.seonbi.db.entity.Image;
import com.seonbi.db.repository.ImageRepository;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService{

    @Autowired
    ImageRepository imageRepository;

    String realPath = new File("").getAbsolutePath() + File.separator + "images";     // 로컬에서
//    String realPath = File.separator + "images";    // 배포할때

    @Override
    public Long saveImage(MultipartFile image) throws IOException {
        if (image == null) {
            return 0l;
        }
//        String realPath = new File("").getAbsolutePath() + File.separator + "images";
        File fileFolder = new File(realPath);
        if (!fileFolder.exists()) {
            fileFolder.mkdirs();
        }
//        System.out.println(realPath);
        String today = new SimpleDateFormat("yyMMdd").format(new Date());
        String saveFolder = realPath + File.separator + today;
        // 파일을 저장할 세부 경로 지정
        File folder = new File(saveFolder);
//        System.out.println("폴더: " + folder);
        // 디렉터리가 존재하지 않을 경우
        if (!folder.exists()) {
            folder.mkdirs();
        }

        Image newImage = new Image();
        String originalFileName = image.getOriginalFilename();

        if (!originalFileName.isEmpty()) {
            System.out.println(originalFileName);
            String saveFileName = UUID.randomUUID().toString()
                    + originalFileName.substring(originalFileName.lastIndexOf('.'));
            newImage.setSaveFolder(today);
            newImage.setOriginImage(originalFileName);
            newImage.setSaveImage(saveFileName);

//            System.out.println(("원본 파일 이름 : {" + image.getOriginalFilename() + "}, 실제 저장 파일 이름 : {" + saveFileName + "}"));
            image.transferTo(new File(folder, saveFileName));
        }
        Image savedImage=imageRepository.save(newImage);
        return savedImage.getImageId();
    }

    @Override
    public String getImage(Long imageId) {
        String imagePath="";
        Image image=imageRepository.findByImageIdAndIsDeleted(imageId, false);
        System.out.println(realPath);
        if (image==null){
            imagePath=realPath+File.separator+"default_image.png";
        } else {
            imagePath=realPath+File.separator+image.getSaveFolder()+File.separator+image.getSaveImage();
        }

        System.out.println(imagePath);
        try {
            InputStream imageStream=new FileInputStream(imagePath);
            byte[] imageByteArray=IOUtils.toByteArray(imageStream);
            return new String(Base64.encodeBase64(imageByteArray));
        } catch (FileNotFoundException e) {
            System.out.println("image not found");
            return null;
        } catch (IOException e) {
            System.out.println("imageStream empty");
            return null;
        }
    }
}
