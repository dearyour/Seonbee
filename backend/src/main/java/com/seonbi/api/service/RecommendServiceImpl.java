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

    @Autowired
    ProductRepositorySupport productRepositorySupport;

    @Autowired
    ProductService productService;

    @Override
    public List<RecommendProductDto> ProductRecommend(ReceiverInfoReq req, Long memberId) {

        System.out.println(req);
        //음식 (default)
        // 추가할 subejct 코딩,독서



        List<String> list1 = new ArrayList<>(); //  관심사 ,용도 넣는 곳 ( 교집합)
        List<String> list2 = new ArrayList<>(); //  나머지 (mbti,성별,나이대,관계)
        Set<String> set= new HashSet<>();
        String keywords[]={"코로나","밥","간식","핸드폰","술","밥상","코치","컨디션","배","닭","리그","세종","성원","좋은사람들","회","클릭","테이블","야채","냉장고"
        ,"밀","플라워","화이트","자동차","문구","드레스","바구니","조화","롯데","옷","책","술","시즌","tv","비스포크","제트봇ai","비스포크제트봇","신발","bespoke제트봇"
        ,"박스","타임","리스트","골프","봉투","돼지","밀가루","전화","청주","포레스트","뷔페","현수막","인생네컷","놀이기구","한복","이름표","피규어"
        ,"md","화환","소울","도장","신분증","저녁식사","수수","오마카세","다이소","현대","빵","돈봉투","다이아몬드","캠퍼","뷰","집밥","쇼핑백","쌀","타투","다산"
        ,"포르쉐","람보르기니","ferrari","페라리","porsche","bentley","lamborghini","로렉스","플레르","웨딩부케","아이파크","롯데캐슬","벤츠","부케","결혼답례떡"
                ,"미원","givenchy","유니콘","명함","순금","아이와","피앙세","시스템","모닝","cj","베베","큐티","힐스테이트","삼성전자","초대권","한일","레이"
                ,"회원권","click","동산","시그니쳐","복권","쪽지","명품가방","line","프레임","zoom","서포터","대우","show","입장권","반도체","집사","현대자동차"
                ,"문신","중문","랜선","국기","군것질","청풍","아리랑","엑스포","할인쿠폰","lee","qled","두산","진흥","스카이","간판","대교","학습지","종이"
                ,"creative","트럭","테이프","알라딘"
        };

        for(String k : keywords ){
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

        receiver.setInterest(req.getInterest());    //관심사

        if (req.getInterest() != null) {
            StringTokenizer st = new StringTokenizer(req.getInterest(), ",");
            while (st.hasMoreTokens()) {
                // 공백 처리 , 그리고  db에 있는 subject인지 조회하고 있는 경우에만 list에 넣어주고  list.size가 0일 경우 default로 음식
                String interest = st.nextToken().trim(); //공백처리
                List<Word> allBySubject = wordRepository.findAllBySubject(interest);
                if (allBySubject.size()!=0) // 해당 관심사가 db에 존재하는 경우만
                list1.add(interest);
            }
        }

        receiver.setRelation(req.getRelation());    // 관계
        if (req.getRelation() != null) {
            list2.add(req.getRelation());
        }

        receiver.setPurpose(req.getPurpose());      // 용도
        if (req.getPurpose() != null) {
            list1.add(req.getPurpose());
        }

        if (list1.size()==0) // 현재 요청값으로 받은 관심사가 다 db에 없는 단어들이라면 기본값으로 음식을 준다.
            list1.add("음식");

        System.out.println("list1: "+list1);

        Long price = req.getPrice();
        receiver.setUpPrice((long) (price * 1.2));  // 범위는 임의로 지정한것 어떤식으로 처리할지 이야기해보자
        receiver.setDownPrice((long) (price * 0.8));
        Receiver save = receiverRepository.save(receiver); // db에 저장

        //2. receiverInfoReq의 정보로 키워드 하나를 뽑아낸다 ( map에 저장 후 가장 높은 키워드를 조회한다)
        Map<String, Long> map = new HashMap<>(); // 키워드 , 누적 값
        HashSet<String> keyword[] = new HashSet[list1.size()]; // 관심사,용도 키워드 교집합

//        List<String> list = new ArrayList<>(); // 키워드 교집합 (관심사 , 용도)
        for (int i = 0; i < list1.size(); i++) {  // 관심사 용도
            keyword[i] = new HashSet<>(); // set생성
            List<Word> result = wordRepository.findAllBySubject(list1.get(i)); //현재 500개
            Long total = 0l;
            for (int j = 0; j < result.size(); j++) {
                total += result.get(j).getAmount();
            }

            for (int j = 0; j < result.size(); j++) {
                Word word = result.get(j);
                if (set.contains(word.getKeyword())) continue;
                keyword[i].add(word.getKeyword());
                double value = (double) word.getAmount() / total;
                if (!map.containsKey(word.getKeyword())){       // map에 해당키워드가 없다면 추가
                    map.put(word.getKeyword(), (long) (value * 10000));
                } else {        // 해당 키워드가 이미 존재한다면?
                    map.replace(word.getKeyword(), map.get(word.getKeyword()) + (long) (value * 10000));
                }
            }
        }

        for (int i = 1; i < list1.size(); i++) {
            keyword[0].retainAll(keyword[i]); //교집합
        }

        // 관심사 용도 외 나머지  이미 만들어진 교집합에 속하는 단어만 amount값을 추가해준다
        for (int i = 0; i < list2.size(); i++) {
            List<Word> result = wordRepository.findAllBySubject(list2.get(i)); //현재 500개
            Long total = 0l;
            for (int j = 0; j < result.size(); j++) {
                total += result.get(j).getAmount();
            }

            for (int j = 0; j < result.size(); j++) {
                Word word = result.get(j);
                double value = (double) word.getAmount() / total;
                if (keyword[0].contains(word.getKeyword())){    // 해당 교집합에 있다면?
                    map.replace(word.getKeyword(), map.get(word.getKeyword()) + (long) (value * 10000));
                }
            }
        }

        Map<String, Long> result = new HashMap<>();
//        System.out.println("------------교집합에 속하는 단어들------------------");
        for (String word : keyword[0]) {
            if (map.containsKey(word)) {
                result.put(word, map.get(word));
            }
        }
        System.out.println(result);
        // 값(amount)기준 내림차순으로 map정렬
        LinkedList<Map.Entry<String, Long>> entries = new LinkedList<>(result.entrySet());
        entries.sort(new Comparator<Map.Entry<String, Long>>() {
            @Override
            public int compare(Map.Entry<String, Long> o1, Map.Entry<String, Long> o2) {
                return (int) (o2.getValue() - o1.getValue());  // 내림차순
            }
        });

        List<RecommendProductDto> productDtoList=new ArrayList<>();
        List<RecommendProductDto> tmp=new ArrayList<>();

        // 5개가 넘어가면 종료
         for(int i=0; i<entries.size(); i++) {
             int count = 0;
             long upPrice= receiver.getUpPrice();
             long downPrice= receiver.getDownPrice();
             System.out.println("상위 키워드= "+entries.get(i).getKey());

             while(count<3) {    // 3개 이상 나올때 까지
                tmp=modelMapper.map(productRepositorySupport.findAllByKeyword(
                         entries.get(i).getKey(), upPrice, downPrice), new TypeToken<List<RecommendProductDto>>() {
                 }.getType());
                 count=tmp.size();
                 upPrice=(long)(upPrice*1.2);
                 downPrice=(long)(downPrice*0.8);
             }
             System.out.println("해당 상품 개수="+tmp.size());
             for(RecommendProductDto dto : tmp){
                 productDtoList.add(dto);
             }
             if(i==4) break;
         }
        System.out.println("entry:  "+entries);

        System.out.println("상품 개수="+productDtoList.size());

        // 0 1 2 순서대로가 아니라 100개 중에 랜덤한 3개가 뽑히게 할것
        List<RecommendProductDto> productDtos = new ArrayList<>();
        String num = "";
        Random random = new Random();

        for (int i = 1; i <= 3; i++) {
            int idx = random.nextInt(productDtoList.size()); // 번호 하나 생성
            System.out.println("생성되는 번호="+idx);
            RecommendProductDto p = productDtoList.get(idx);
            String val = Integer.toString(idx);
            if (!num.contains(val)) {   // 중복되지 않았다면 상품 추가
                productDtos.add(p);
                productService.addRecommendProduct(p.getProductId());   // 추천수 올리기
                num += val;
            } else {    // 다시 돌기
                i--;
            }
        }

        // 전부다 recommend 테이블에 저장
        for (int i = 0; i < productDtos.size(); i++) {
            Long receiverId=receiver.getReceiverId();
            Long productId=productDtos.get(i).getProductId();
            if (recommendRepository.existsRecommendByProductIdAndMemberIdAndReceiverIdAndIsDeleted(
                    productId, memberId, receiverId, false))    continue;
            Recommend recommend = new Recommend();
            recommend.setReceiverId(receiverId); // 받는사람 번호
            recommend.setProductId(productId); //상품 번호
            recommend.setMemberId(memberId); // 회원 번호
            Recommend newRecommend = recommendRepository.save(recommend);
            productDtos.get(i).setRecommendId(newRecommend.getRecommendId());
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

        // 100개의 결과가 나오게 유사도순으로 해당 키워드를 검색
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
        HashSet<Long> memberIdList=new HashSet<>();
        HashSet<Long> noneMemberIdList=new HashSet<>();
        List<ReceiverDto> memberList = new ArrayList<>();
        List<ReceiverDto> noneMemberList = new ArrayList<>();
        for (Recommend recommend : recommends) {
            ReceiverDto receiverDto=new ReceiverDto();
            if (recommend.getIsFriend()) {  // 친구인 경우   member table 에서 조회
                Member receiverMember = memberRepository.findByMemberIdAndIsDeleted(recommend.getReceiverId(), false);
                if (receiverMember==null)   continue;
                if (!friendService.isFriend(memberId, receiverMember.getMemberId()))    continue;
                if (!memberIdList.add(receiverMember.getMemberId()))  continue;      // member 중복 제거
                receiverDto.setReceiverId(receiverMember.getMemberId());
                receiverDto.setName(receiverMember.getNickname());
                receiverDto.setImageString(imageService.getImage(receiverMember.getImageId()));
                memberList.add(receiverDto);
            } else {      // 친구가 아닌 경우 receiver table에서 조회
                Receiver receiver = receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
                if (receiver == null)   continue;
                if (!noneMemberIdList.add(receiver.getReceiverId()))  continue;      // noneMember 중복 제거
                receiverDto.setReceiverId(receiver.getReceiverId());
                receiverDto.setName(receiver.getName());
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
            Product product=productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false);
            if (product==null)  continue;
            ReceiverProductDto receiverProductDto = modelMapper.map(product , ReceiverProductDto.class);
            productDtoList.add(receiverProductDto);
        }

        return productDtoList;
    }

    @Override
    public int addGiveProduct(Long memberId, Long friendId, Long productId) {
        if (!memberService.isMemberValid(friendId))    return 401;
        if (!friendService.isFriend(memberId, friendId))    return 403;
        if (recommendRepository.existsRecommendByProductIdAndMemberIdAndReceiverIdAndIsDeleted(     // 상품 중복
                productId, memberId, friendId, false))  return 402;
        Recommend recommend=new Recommend(productId, friendId, memberId, true, true);
        recommendRepository.save(recommend);
        return 200;
    }

    @Override
    public List<RecommendDto> getRecommendAll(Long memberId) {  // 주소싶소 말고 챗봇으로 받은 추천 내역만
        List<Recommend> recommends=recommendRepository.findAllByMemberIdAndIsDeleted(memberId, false);
        List<RecommendDto> recommendList=new ArrayList<>();
        for (Recommend recommend: recommends){
            Product product=productRepository.findByProductIdAndIsDeleted(recommend.getProductId(), false);
            if (product==null)  continue;
            RecommendDto recommendDto = modelMapper.map(product, RecommendDto.class);    // 상품 정보 넣기
            recommendDto.setRecommendId(recommend.getRecommendId());
            recommendDto.setIsSaved(recommend.getIsSaved());
            Receiver receiver=receiverRepository.findByReceiverIdAndIsDeleted(recommend.getReceiverId(), false);
            if (receiver==null)     continue;
            if (recommend.getIsFriend()){   // 친구인 경우 회원 닉네임    // 이렇게 들어오는 경우 아직 없을듯
                Member member=memberRepository.findByMemberIdAndIsDeleted(receiver.getReceiverId(), false);
                if (member==null)   continue;
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

    @Override
    public List<RecommendProductDto> FriendProductRecommend(Long memberId, Member friend, Long price) {  //가격도 필요
//        0. 코딩, 독서 subject로 데이터 넣기
//        1. 관심사, 좋아하는거 받아서 상품 키워드로 검색
//        2. 관심사, 좋아하는거 받아서 상품 이름이 들어가는지 검색
//        3. 검색된 상품에서 싫어하는거 키워드 또는 상품이름에 들어가면 제외
//        4. 관심사, 좋아하는거 아예없으면 그냥 음식으로

        if(price==null) price=50000l;

        List<String> list= new ArrayList<>(); // 관심사와 좋아하는거 저장하는 리스트
        List<RecommendProductDto> productDtos = new ArrayList<>(); //  상품 저장하는 곳
        List<String> banList=new ArrayList<>();

        friend.getInterest(); //관심사   둘 다 , 로 되어있다고 가정
        friend.getLikelist(); // 좋아하는거
        if (friend.getInterest()!=null)    stringSplit(list,friend.getInterest());
        if (friend.getLikelist()!=null)    stringSplit(list,friend.getLikelist());
        if (friend.getBanlist()!=null)    stringSplit(banList,friend.getBanlist());

        for(int i=0; i<list.size(); i++) { // 관심사 , 좋아하는거에서 나온 키워드들이 subject나 상품 이름 안에 포함되어 있는지 확인
            List<RecommendProductDto> result= modelMapper.map(
                    productRepository.findAllByKeywordContains(list.get(i)), new TypeToken<List<RecommendProductDto>>() {}.getType());
            if (result!=null) //해당 단어가 키워드에 포함된 상품들이 있다면 추가
               productDtos.addAll(result);
            result= modelMapper.map(productRepository.findAllByNameContains(list.get(i)), new TypeToken<List<RecommendProductDto>>() {}.getType());
            List<Product> productList= productRepository.findAllByNameContains(list.get(i));
            if(result!=null) {  // 해당 단어가  이름에 포함되어 있다면?
                // 조회 결과에  상품 이름과 상품 keyword에 banlist가 포함되어 있는지?
                if(banList.size()==0)
                    productDtos.addAll(result);
                else {
                    for(int j=0; j<productList.size(); j++) {
                        Product product=productList.get(j);
                        boolean flag=true;
                        for(int k=0; k<banList.size(); k++) {
                            if(product.getName().contains(banList.get(k))||product.getKeyword().contains(banList.get(k))) {
                                flag=false;
                                break;
                            }
                        }
                        if(flag) // keyword와 name에 포함되지 않으면 dto에 추가 {
                            productDtos.add(modelMapper.map(product, RecommendProductDto.class));
                        }
                }
            }
        }
        // 3개가 없다면?  keyword  음식으로 다시 조회
        if(productDtos.size()<3) {
            List<Word> food = wordRepository.findAllBySubject("음식");
            Collections.sort(food, new Comparator<Word>() {
                @Override
                public int compare(Word o1, Word o2) {
                    return (int) (o2.getAmount()-o1.getAmount()); // 오름차순?
                }
            });
            int count = 0;
            long upPrice= (long) (price*1.2);
            long downPrice= (long) (price*0.8);

            while(count<3) {    // 3개 이상 나올때 까지
                productDtos=modelMapper.map(productRepositorySupport.findAllByKeyword(
                        food.get(0).getKeyword(), upPrice, downPrice), new TypeToken<List<RecommendProductDto>>() {
                }.getType());
                count=productDtos.size();
                upPrice=(long)(upPrice*1.2);
                downPrice=(long)(downPrice*0.8);
            }
        }
        // 3개 이상이라면 ?
        else {
            int count = 0;
            long upPrice= (long) (price*1.2);
            long downPrice= (long) (price*0.8);
            List<RecommendProductDto> tmp =new ArrayList<>();
            while(tmp.size()<3){
                tmp.clear();
                for(int i=0; i<productDtos.size(); i++){
                    if (downPrice<=productDtos.get(i).getPrice()&&productDtos.get(i).getPrice()<=upPrice){
                        tmp.add(productDtos.get(i));
                    }
                }
                upPrice=(long)(upPrice*1.2);
                downPrice=(long)(downPrice*0.8);
            }
            productDtos = tmp; // 3개 이상의 결과가 나오면 넣어주기
        }

        // productDtos 에서 보내줄 상품 3개를 랜덤으로 뽑기
        List<RecommendProductDto> result = new ArrayList<>();
        String num = "";
        Random random = new Random();

        for (int i = 1; i <= 3; i++) {
            int idx = random.nextInt(productDtos.size()); // 번호 하나 생성
            System.out.println("생성되는 번호="+idx);
            RecommendProductDto p = productDtos.get(idx);
            String val = Integer.toString(idx);
            if (!num.contains(val)) {   // 중복되지 않았다면 상품 추가
                productService.addRecommendProduct(p.getProductId());   // 추천수 올리기
                result.add(p);
                num += val;
            } else {    // 다시 돌기
                i--;
            }
        }

        //recommend에 저장

        // 전부다 recommend 테이블에 저장
        for (int i = 0; i < result.size(); i++) {
            Long receiverId=friend.getMemberId(); // 친구 기본키
            Long productId=result.get(i).getProductId(); // 상품 기본키

            Recommend recommend = new Recommend();

            // 이미 recommend에 같은 row가 존재한다면? 기존의 recommend 키를 가져온다?
            if (recommendRepository.existsRecommendByProductIdAndMemberIdAndReceiverIdAndIsDeleted(
                    productId, memberId, receiverId, false))    {

                recommend = recommendRepository.findByProductIdAndMemberIdAndReceiverIdAndIsDeleted(productId, memberId, receiverId, false);

            }


            else {
                recommend.setReceiverId(receiverId); // 받는사람 번호
                recommend.setProductId(productId); //상품 번호
                recommend.setMemberId(memberId); // 회원 번호
                recommend.setIsFriend(true); // 친구인지
                recommend = recommendRepository.save(recommend);
            }
            result.get(i).setRecommendId(recommend.getRecommendId()); // 생성된 추천 기본키를 dto에 넣기
        }
        return result;
    }

    void stringSplit(List<String> list, String s) {
        StringTokenizer st = new StringTokenizer(s, ",");
        while (st.hasMoreTokens()) {
            String interest = st.nextToken().trim(); //공백처리
            list.add(interest);
        }
    }

}
