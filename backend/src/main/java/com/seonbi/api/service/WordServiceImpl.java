package com.seonbi.api.service;

import com.seonbi.db.entity.Word;
import com.seonbi.db.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class WordServiceImpl implements WordService {

    //인스타로만 하면 여자형제는 아무것도 안뜸 "여자형제",

//    static String list[] ={"감사","개업","결혼","결혼축하","기념일","돌선물","백일","생일","서프라이즈"
//    ,"위로","응원","임신","집들이","창업","출산","enfj","enfp","entj","entp","esfj","esfp","estj","estp",
//            "infj","infp","intj","intp","isfj","isfp","istj","istp","가족","남자친구","남자형제","남편",
//            "멘토","배우자","부모님","사촌","스승","아내","아버지","어머니","여자친구","연인","지인",
//            "친구","친인척","친한친구","회사동기","회사동료","회사선배","회사후배","sns","가족","건강","게임","공예",
//            "교육","동물","뷰티","쇼핑","엔터테인먼트","여행","연예인","요리","운동","음식","음악","음주","인테리어",
//            "전자제품","캠핑","패션","10대","20대","30대","40대","50대","60대","남자","여자"
//    };


    static String list[]={"독서","코딩"};

    @Autowired
    WordRepository wordRepository;

    @Override
    public void csvRead() {
        for(int k=0; k< list.length; k++){
            String sub = list[k];
            System.out.println("현재 sub="+sub);
            List<List<String>> result= WordServiceImpl.readCSV(sub);
            for(int i=0; i<result.size(); i++){
                List<String> line=result.get(i);
                Word word = new Word();
                word.setSubject(line.get(0));
                word.setKeyword(line.get(1));
                word.setAmount((long) Integer.parseInt(line.get(2)));
                word.setCategory1(line.get(3));
                word.setCategory2(line.get(4));
                wordRepository.save(word);
//                System.out.println(word.toString());
            }
        }
    }

    @Override
    public void updateData() {
        Optional<Word> byId = wordRepository.findById(1L);
        Word word = byId.get();
        word.setIsDeleted(true);
        wordRepository.save(word);
    }
/*
    썸트렌드 데이터 저장

 */
    public static List<List<String>> readCSV(String subject) {
        List<List<String>> csvList = new ArrayList<List<String>>();
        File csv = new File("C:\\Users\\multicampus\\Desktop\\썸트렌드 데이터\\용도csv\\(썸트렌드) "+subject+"_연관어_210503-220502.csv");
        BufferedReader br = null;
        String line = "";
        try {
            br = new BufferedReader(new FileReader(csv));
            while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                List<String> aLine = new ArrayList<String>();
                String[] lineArr = line.split(" "); // 파일의 한 줄을 ,로 나누어 배열에 저장 후 리스트로 변환한다.
                aLine = Arrays.asList(lineArr);
                aLine.set(0,subject);  //맨첫번째는 주제로
                csvList.add(aLine);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close(); // 사용 후 BufferedReader를 닫아준다.
                }
            } catch(IOException e) {
                e.printStackTrace();
            }
        }
        return csvList;
    }
}
