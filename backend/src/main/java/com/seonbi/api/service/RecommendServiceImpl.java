package com.seonbi.api.service;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import com.seonbi.api.model.ReceiverDto;
import com.seonbi.api.model.ReceiverProductDto;
import com.seonbi.api.model.RecommendReceiverDto;
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
public class RecommendServiceImpl implements RecommendService{

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
    public void ProductRecommend(ReceiverInfoReq req) {

        List<String> list1 = new ArrayList<>(); //관심사 ,용도 넣는 곳
        List<String> list2 = new ArrayList<>(); //  나머지 (mbti,성별,나이대,관계)

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

            StringTokenizer st= new StringTokenizer(req.getInterest(),",");

            while(st.hasMoreTokens())
            {
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
        // Receiver save = receiverRepository.save(receiver); // db에 저장


        //2. receiverInfoReq의 정보로 키워드 하나를 뽑아낸다 ( map에 저장 후 가장 높은 키워드를 조회한다)

        Map<String, Long> map = new HashMap<>();


        for (int i = 0; i < list1.size(); i++)
        {

            List<Word> result = wordRepository.findAllBySubject(list1.get(i)); //현재 500개

            Long total= 0l;
            for(int j=0; j<result.size(); j++) {
                 total+=result.get(j).getAmount();
            }


            //System.out.println("total="+total);

            double sum=0;
            for (int j = 0; j < result.size(); j++) {
                Word word = result.get(j);

                if (!map.containsKey(word.getKeyword())) //map에 해당키워드가 없다면 추가
                {
                    double value= (double) word.getAmount()/total ; //


                 // System.out.println((value*100));

                  sum+=(value*100);



//                    System.out.println(Math.round(value));
                   map.put(word.getKeyword(), (long) (value*10000));
                    //map.put(word.getKeyword(), 1l);
                }
            }
            //System.out.println("sum="+sum);
        }


        //관심사 용도 외 나머지
        //////////////////////////////////////////////////////////////////////////////////////

        for (int i = 0; i < list2.size(); i++)
        {

            List<Word> result = wordRepository.findAllBySubject(list2.get(i)); //현재 500개

            Long total= 0l;
            for(int j=0; j<result.size(); j++) {
                total+=result.get(j).getAmount();
            }

            for (int j = 0; j < result.size(); j++) {
                Word word = result.get(j);

                if (map.containsKey(word.getKeyword())) //map에 해당키워드가 없다면 추가
                {

                    double value= (double) word.getAmount()/total ;
                    map.replace(word.getKeyword(), map.get(word.getKeyword()) +(long) (value*10000));
                    //map.put(word.getKeyword(), 1l);
                }
            }


        }


        //값(amount)기준 내림차순으로 map정렬
        LinkedList<Map.Entry<String, Long>> entries = new LinkedList<>(map.entrySet());

        entries.sort(new Comparator<Map.Entry<String, Long>>() {
            @Override
            public int compare(Map.Entry<String, Long> o1, Map.Entry<String, Long> o2) {
                return (int) (o2.getValue() - o1.getValue());  // 내림차순
            }
        });

        for(int i=0; i<=30; i++) { //상위 10개

            String keyword = entries.get(i).getKey(); // 가장 amount가 많은 keyword
            Long amount=entries.get(i).getValue();
            System.out.println("키워드 ="+keyword  + " amount="+amount);
        }







        //3. 해당 키워드에 속하는 상품을 다 조회하고 그중에서 랜덤값으로 3개를 보내준다?







  /*
  피그마상에는 추천페이지에 상품마다 저장하기 버튼이 있는데 ??
   */


        //저장한 정보들을 이용해서 keyword를 뽑아내고  (이과정에서 어떻게 키워드를 처리할지..?)   네이버 쇼핑 api로 요청한다


        // 100 개의 상품정보를 상품 테이블에 저장 (jpa보다 빠르게 저장하는게 필요함..)
        /*
                이미 같은 키워드에 대한 상품 100개를 상품 테이블에 저장했으면?? 이 처리는 어떻게 할것인가?


                입력받은 가격대를 통해서 필터링해서 상위 3or 5개를 뽑아낸다

                회원일 경우에는? recommend     receiver 기본키와  회원 기본키로   추천상품을 저장한다


                회원이 아닌경우에는 생략



                응답값으로 추천상품을 보내준다
         */


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
        List<ReceiverDto> memberList=new ArrayList<>();
        List<ReceiverDto> noneMemberList=new ArrayList<>();
        for (Recommend recommend: recommends){
            System.out.println(recommend);
            Receiver receiver = receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            if (receiver==null){
                continue;
            }
            System.out.println(receiver);
            ReceiverDto receiverDto=modelMapper.map(receiver, ReceiverDto.class);
            receiverDto.setName(receiver.getName());
            System.out.println(receiverDto);
            if (recommend.getIsFriend()){
                Member receiverMember=memberRepository.findByMemberIdAndIsDeleted(recommend.getReceiverId(), false);
                if (receiverMember!=null && friendService.isFriend(memberId, receiverMember.getMemberId())){  // 추천받은 사람이 친구인 경우
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
                memberId, receiverId, true, isFriend,false);
        List<ReceiverProductDto> productDtoList=new ArrayList<>();
        for (Recommend recommend: recommends){
            ReceiverProductDto receiverProductDto=modelMapper.map(
                    productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false), ReceiverProductDto.class);
            productDtoList.add(receiverProductDto);
        }

        return productDtoList;
    }

    @Override
    public int addGiveProduct(Long memberId, Long friendId, Long productId) {
        if (!memberService.isMemberValid(friendId)){
            return 401;
        }
        if (!friendService.isFriend(memberId, friendId)){
            return 403;
        }

        Recommend recommend=new Recommend(productId, friendId, memberId, true, true);
        recommendRepository.save(recommend);

        return 200;
    }
}
