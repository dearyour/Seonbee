package com.seonbi.api.service;

import com.seonbi.api.model.*;
import com.seonbi.api.request.ReceiverInfoReq;
import com.seonbi.db.entity.Product;
import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Word;
import com.seonbi.db.repository.ReceiverRepository;
import com.seonbi.db.repository.WordRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

import com.seonbi.db.entity.Member;
import com.seonbi.db.entity.Receiver;
import com.seonbi.db.entity.Recommend;
import com.seonbi.db.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendServiceImpl implements RecommendService {

    @Autowired
    ReceiverRepository receiverRepository;

    @Autowired
    WordRepository wordRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    WishlistRepository wishlistRepository;

    @Autowired
    RecommendRepository recommendRepository;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    FriendService friendService;

    @Override
    public List<RecommendProductDto> ProductRecommend(ReceiverInfoReq req, Long memberId) {

        List<String> list1 = new ArrayList<>(); //관심사 ,용도 넣는 곳 ( 교집합)
        List<String> list2 = new ArrayList<>(); //  나머지 (mbti,성별,나이대,관계)
        Set<String> set= new HashSet<>();
        String keywords[]={"코로나","밥","간식","핸드폰","술","밥상"};

        for(String k : keywords )
        {
            set.add(k);
        }



        //  1. receiverInfoReq의 정보를 receiver에 저장하고 기본키를 가지고 있는다
        Receiver receiver = new Receiver();
        receiver.setAge(req.getAge()); //나이

        if (req.getAge() != null)
            list2.add(req.getAge() + "대");

        receiver.setGender(req.getGender()); //성별
        if (req.getGender().equals("M")) {
            list2.add("남자");
        } else if (req.getGender().equals("F")) {
            list2.add("여자");
        }

        receiver.setName(req.getName()); //이름
        receiver.setMbti(req.getMbti());

        if (req.getMbti() != null) {
            list2.add(req.getMbti());
        }

        receiver.setInterest(req.getInterest());//관심사

        if (req.getInterest() != null) {

            StringTokenizer st = new StringTokenizer(req.getInterest(), ",");

            while (st.hasMoreTokens()) {
                list1.add(st.nextToken());
            }

        }


        receiver.setRelation(req.getRelation());//관계

        if (req.getRelation() != null) {
            list2.add(req.getRelation());
        }


        receiver.setPurpose(req.getPurpose()); //용도

        if (req.getPurpose() != null) {
            list1.add(req.getPurpose());
        }

        Long price = req.getPrice();
        receiver.setUpPrice((long) (price * 1.2));  // 범위는 임의로 지정한것 어떤식으로 처리할지 이야기해보자
        receiver.setDownPrice((long) (price * 0.8));
        Receiver save = receiverRepository.save(receiver); // db에 저장


        //2. receiverInfoReq의 정보로 키워드 하나를 뽑아낸다 ( map에 저장 후 가장 높은 키워드를 조회한다)

        Map<String, Long> map = new HashMap<>(); // 키워드 , 누적 값

        HashSet<String> keyword[] = new HashSet[list1.size()]; // 관심사,용도 키워드 교집합


        List<String> list = new ArrayList<>(); // 키워드 교집합 (관심사 , 용도)
        for (int i = 0; i < list1.size(); i++) {  //관심사 용도

            keyword[i] = new HashSet<>(); // set생성

            List<Word> result = wordRepository.findAllBySubject(list1.get(i)); //현재 500개

            Long total = 0l;
            for (int j = 0; j < result.size(); j++) {
                total += result.get(j).getAmount();
            }


            for (int j = 0; j < result.size(); j++) {
                Word word = result.get(j);

                if(set.contains(word.getKeyword())) continue;

                keyword[i].add(word.getKeyword());

                double value = (double) word.getAmount() / total;
                if (!map.containsKey(word.getKeyword())) //map에 해당키워드가 없다면 추가
                {

                    map.put(word.getKeyword(), (long) (value * 10000));
                } else { //해당 키워드가 이미 존재한다면?

                    map.replace(word.getKeyword(), map.get(word.getKeyword()) + (long) (value * 10000));

                }

            }
        }


        for (int i = 1; i < list1.size(); i++) {
            keyword[0].retainAll(keyword[i]); //교집합
        }


        //관심사 용도 외 나머지  이미 만들어진 교집합에 속하는 단어만 amount값을 추가해준다
        for (int i = 0; i < list2.size(); i++) {

            List<Word> result = wordRepository.findAllBySubject(list2.get(i)); //현재 500개

            Long total = 0l;
            for (int j = 0; j < result.size(); j++) {
                total += result.get(j).getAmount();
            }


            for (int j = 0; j < result.size(); j++) {
                Word word = result.get(j);
                double value = (double) word.getAmount() / total;
                if (keyword[0].contains(word.getKeyword())) //해당 교집합에 있다면?
                {
                    map.replace(word.getKeyword(), map.get(word.getKeyword()) + (long) (value * 10000));
                }
            }
        }

        Map<String, Long> result = new HashMap<>();
        System.out.println("------------교집합에 속하는 단어들------------------");
        for (String word : keyword[0]) {

            System.out.println(word);

            if (map.containsKey(word)) {
                result.put(word, map.get(word));
            }
        }


        //값(amount)기준 내림차순으로 map정렬
        LinkedList<Map.Entry<String, Long>> entries = new LinkedList<>(result.entrySet());

        entries.sort(new Comparator<Map.Entry<String, Long>>() {
            @Override
            public int compare(Map.Entry<String, Long> o1, Map.Entry<String, Long> o2) {
                return (int) (o2.getValue() - o1.getValue());  // 내림차순
            }
        });

        for (int i = 0; i <= 30; i++) { //상위 10개

            String keyword1 = entries.get(i).getKey(); // 가장 amount가 많은 keyword
            Long amount = entries.get(i).getValue();
            System.out.println("키워드 =" + keyword1 + " amount=" + amount);
        }


        //3. 해당 키워드에 속하는 상품을 다 조회하고 그중에서 랜덤값으로 3개를 보내준다? (가격 범위 확인)


        System.out.println("db접근 전");
        List<RecommendProductDto> productDtoList = modelMapper.map(productRepository.findAllByNameContains(entries.get(0).getKey()), new TypeToken<List<RecommendProductDto>>() {
        }.getType());
        System.out.println("db접근 후");

        int count = 0;


        List<RecommendProductDto> productDtos = new ArrayList<>();
        for (int i = 0; i < productDtoList.size(); i++) {
            RecommendProductDto p = productDtoList.get(i);


            if (receiver.getDownPrice() <= p.getPrice() && p.getPrice() <= receiver.getUpPrice()) {
                count++;

                productDtos.add(p);

                if (count == 3) {
                    break;
                }


            }


        }

        //로그인 된 상태라면? recommend 테이블에 저장
        if (memberId != 0l) {


            for (int i = 0; i < productDtos.size(); i++) {
                Recommend recommend = new Recommend();

                recommend.setReceiverId(receiver.getReceiverId()); // 받는사람 번호
                recommend.setProductId(productDtos.get(i).getProductId()); //상품 번호
                recommend.setMemberId(memberId); // 회원 번호


                //삭제여부 기본 0
                //저장여부 기본 0
                //친구인지 기본 0


                Recommend recommend1 = recommendRepository.save(recommend);
                productDtos.get(i).setRecommendId(recommend1.getRecommendId());
            }


        }


        return productDtos;

    }

    @Override
    public String NaverShopSearch(String keyword) {
        RestTemplate rest = new RestTemplate(); // spring 3부터 지원, RestApi 호출 이후 응답을 받을때까지 기다리는 동기방식


        HttpHeaders headers = new HttpHeaders();

        // 발급받은 정보 추가
        headers.add("X-Naver-Client-Id", "AQSmJUCx9ak1OtupSss1");
        headers.add("X-Naver-Client-Secret", "P92dVX7Rkh");

        String body = "";
        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
        // HttpEntity클래스는 http요청 또는 흥답에 해당하는 HttpHeader와 httpBody를 포함하는 클래스

        //100개의 결과가 나오게 유사도순으로 해당 키워드를 검색
        ResponseEntity<String> responseEntity = rest.exchange("https://openapi.naver.com/v1/search/shop.json?query=" + keyword + "&display=100",
                HttpMethod.GET, requestEntity, String.class);


        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();

        String response = responseEntity.getBody();
        System.out.println("Response status: " + status);
        System.out.println(response);


        return response;


    }

    @Override
    public List<Product> StringToJson(String result) {


        List<Product> productList = new ArrayList<>();

        JSONParser parser = new JSONParser();

        try {
            JSONObject json = (JSONObject) parser.parse(result);
            JSONArray item = (JSONArray) json.get("items");

            for (int i = 0; i < item.size(); i++) {
                JSONObject object = (JSONObject) item.get(i);

                System.out.println(object);
            }


        } catch (ParseException e) {
            e.printStackTrace();
        }

        return null;
    }


    @Override
    public RecommendReceiverDto getGiveAll(Long memberId) {
        List<Recommend> recommends = recommendRepository.findAllByMemberIdAndIsSavedAndIsDeleted(memberId, true, false);
        System.out.println(recommends.size());
        List<ReceiverDto> memberList = new ArrayList<>();
        List<ReceiverDto> noneMemberList = new ArrayList<>();
        for (Recommend recommend : recommends) {
            System.out.println(recommend);
            Receiver receiver = receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            if (receiver == null) {
                continue;
            }
            System.out.println(receiver);
            ReceiverDto receiverDto = modelMapper.map(receiver, ReceiverDto.class);
            receiverDto.setName(receiver.getName());
            System.out.println(receiverDto);
            if (recommend.getIsFriend()) {
                Member receiverMember = memberRepository.findByMemberIdAndIsDeleted(recommend.getReceiverId(), false);
                if (receiverMember != null && friendService.isFriend(memberId, receiverMember.getMemberId())) {  // 추천받은 사람이 친구인 경우
                    receiverDto.setImageString(imageService.getImage(receiverMember.getImageId()));
                    memberList.add(receiverDto);
                }
            } else {      // 친구가 아닌 경우
                receiverDto.setImageString(imageService.getImage(0l));
                noneMemberList.add(receiverDto);
            }
        }
        return new RecommendReceiverDto(noneMemberList, memberList);
    }

    @Override
    public List<ReceiverProductDto> getGiveProductAll(Long memberId, Long receiverId, Boolean isFriend) {
        List<Recommend> recommends = recommendRepository.findAllByMemberIdAndReceiverIdAndIsSavedAndIsFriendAndIsDeleted(
                memberId, receiverId, true, isFriend, false);
        List<ReceiverProductDto> productDtoList = new ArrayList<>();
        for (Recommend recommend : recommends) {
            ReceiverProductDto receiverProductDto = modelMapper.map(
                    productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false), ReceiverProductDto.class);
            productDtoList.add(receiverProductDto);
        }

        return productDtoList;
    }

    @Override
    public int addGiveProduct(Long memberId, Long friendId, Long productId) {
        if (!memberService.isMemberValid(friendId)) {
            return 401;
        }
        if (!friendService.isFriend(memberId, friendId)) {
            return 403;
        }

        Recommend recommend = new Recommend(productId, friendId, memberId, true, true);
        recommendRepository.save(recommend);

        return 200;
    }

    @Override
    public List<RecommendDto> getRecommendAll(Long memberId) {
        List<Recommend> recommends = recommendRepository.findAllByMemberIdAndIsDeleted(memberId, false);
        List<RecommendDto> recommendList = new ArrayList<>();
        for (Recommend recommend : recommends) {
            Product product = productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false);
            if (product == null) continue;
            RecommendDto recommendDto = modelMapper.map(product, RecommendDto.class);    // 상품 정보 넣기
            recommendDto.setRecommendId(recommend.getRecommendId());
            recommendDto.setIsSaved(recommend.getIsSaved());
            Receiver receiver = receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            System.out.println(receiver);
            if (receiver == null) continue;
            if (recommend.getIsFriend()) {   // 친구인 경우 회원 닉네임
                Member member = memberRepository.findByMemberIdAndIsDeleted(receiver.getReceiverId(), false);
                System.out.println(member);
                if (member == null) continue;
                recommendDto.setReceiverName(member.getNickname());
            } else {    // 친구가 아닌 경우 receiver name
                recommendDto.setReceiverName(receiver.getName());
            }

            recommendList.add(recommendDto);
        }
        return recommendList;
    }

    @Override
    public int saveRecommendGive(Long memberId, Long recommendId) {
        Recommend recommend = recommendRepository.findByRecommendIdAndIsDeleted(recommendId, false);
        if (recommend == null) return 401;
        if (!recommend.getMemberId().equals(memberId)) return 403;
        recommend.setIsSaved(true);
        recommendRepository.save(recommend);
        return 200;
    }

}
