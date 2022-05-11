package com.seonbi.api.service;

import com.seonbi.db.entity.Product;
import com.seonbi.db.repository.ProductRepository;
import org.hibernate.id.IntegralDataTypeHolder;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
public class NaverSearchServiceImpl implements NaverSearchService {


//    @Autowired
//    ProductRepository productRepository;

    @Override
    public void saveResults() {

        List<String> keyword = txtRead();
        HashSet<Long> set=new HashSet<>();

        for (int i = 0; i < keyword.size(); i++) {
            String result = NaverShopSearch(keyword.get(i));
            List<Product> productList = StringToJson(result);
            // 해당 제품이 이미 product  테이블에 저장되어 있는지 확인하고 없으면 저장

            System.out.println("키워드="+keyword.get(i));
            for(int j=0; j<productList.size(); j++) {
                Product product=productList.get(j);
                product.setKeyword(keyword.get(i));
                System.out.println(product.getNaverId());

//                Product byNaverId = productRepository.findByNaverId(product.getNaverId());

//                if(byNaverId==null) {
//                    productRepository.save(product);
//                }
            }
        }
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
        //System.out.println("Response status: " + status);
        //System.out.println(response);
        return response;
    }


    @Override
    public List<String> txtRead() {
        List<String> keywordList = new ArrayList<>();
        File csv = new File("C:\\ssafy\\project3\\database\\sometrend\\썸트렌드 데이터\\seonbee_keyword.txt");
        String line = "";

        try {
            BufferedReader br = new BufferedReader(new FileReader(csv));
            while ((line = br.readLine()) != null) { // readLine()은 파일에서 개행된 한 줄의 데이터를 읽어온다.
                keywordList.add(line);
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return keywordList;
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

                Product product = new Product();
//                System.out.println(object);
                product.setNaverId(Long.parseLong(String.valueOf(object.get("productId"))));
                //System.out.println("가격="+object.get("lprice"));
                product.setPrice(Long.parseLong(String.valueOf(object.get("lprice"))));

               // System.out.println("브랜드="+object.get("brand"));

                String link = (String) object.get("link");
                //System.out.println("링크="+link);
                //Thread.sleep(600);
                //product.setBuyUrl(linkCrawling(link));

                product.setBuyUrl(link);
                //if(product.getBuyUrl()==null) continue;

                String name = (String) object.get("title");
                String new1 = name.replace("<b>", "");
                String new2=new1.replace("</b>", "");

               // System.out.println("상품이름="+new2);
                product.setName(new2);
                product.setImageUrl((String) object.get("image"));
                product.setCategory1((String) object.get("category1"));
                product.setCategory2((String) object.get("category2"));
                product.setCategory3((String) object.get("category3"));
                product.setBrand((String) object.get("brand"));

                //System.out.println(product.toString());

                productList.add(product);
            }


        } catch (ParseException e) {
            e.printStackTrace();
        }

        return productList;
    }
    /*
    Spring 환경에서 특정 사이트 데이터를 크롤링하려면 Jsoup 라이브러리가 필요

     */
    @Override
    public String linkCrawling(String link) throws IOException {
        String url = null;
        Document doc = Jsoup.connect(link).get();  // 사이트 연결 및 데이터 저장  : link url로부터 문서 가져오기
        //   Elements select = doc.getElementsByAttribute("href");
        Elements select = doc.select(".product_bridge_product__HdCK7 .product_btn_link__3afs2");

        // System.out.println(select);

        List<String> list = select.eachAttr("href");
        System.out.println(list.size());

        if((list.size()==1)) return null;
        url = list.get(1);
        System.out.println("상품 url" + url);

        return url;
    }

}
