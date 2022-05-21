package com.seonbi.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image extends BaseEntity{
    // Wrapper 타입인 Long이나 Integer를 쓰면 id가 없는 경우엔 확실히 null이고, 그 자체로 id가 없다는걸 보장함.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
    private Long imageId;
    private String originImage; // 원본 이미지 이름
    private String saveFolder;  // 저장폴더 220421
    private String saveImage;   // 저장 이미지 이름: 랜덤값

}
