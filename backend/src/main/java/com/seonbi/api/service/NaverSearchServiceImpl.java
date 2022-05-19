package com.seonbi.api.service;

import com.seonbi.db.entity.Product;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class NaverSearchServiceImpl implements NaverSearchService {


//    @Autowired
//    ProductRepository productRepository;

    HashSet<Product> set=new HashSet<>();

    @Override
    public void saveResults() {

        List<String> keyword = txtRead();
        HashSet<Product> set=new HashSet<>();

        // 현재 product.csv를 가져와서  읽으면서 set을 만든다







        for (int i = 0; i < keyword.size(); i++) {

         String result = NaverShopSearch(keyword.get(i));
            //System.out.println(result);
            System.out.println("키워드="+keyword.get(i));
            List<Product> productList = StringToJson(result);


            for(int j=0; j<productList.size(); j++)
            {
                Product product=productList.get(j);
                product.setKeyword(keyword.get(i));
                set.add(product);
            }
            if(set.size()%100!=0)
            {
                System.out.println(set.size());
            }
        }

        List<Product> products = new ArrayList(set);
        writeCSV(products);
       // productRepository.saveAll(products);
    }
    @Override
    public String NaverShopSearch(String keyword) {
        RestTemplate rest = new RestTemplate(); // spring 3부터 지원, RestApi 호출 이후 응답을 받을때까지 기다리는 동기방식
        HttpHeaders headers = new HttpHeaders();
        // 발급받은 정보 추가
        headers.add("X-Naver-Client-Id", "mlfKASqUh16HyqLwcOJt");
        headers.add("X-Naver-Client-Secret", "zMezMl3SPr");
        String body = "";
        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
        // HttpEntity클래스는 http요청 또는 흥답에 해당하는 HttpHeader와 httpBody를 포함하는 클래스

        //100개의 결과가 나오게 유사도순으로 해당 키워드를 검색
        ResponseEntity<String> responseEntity = rest.exchange("https://openapi.naver.com/v1/search/shop.json?query=" + keyword + "&display=100",
                HttpMethod.GET, requestEntity, String.class);

        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();

        System.out.println("상태코드="+status);
        String response = responseEntity.getBody();
        //System.out.println("Response status: " + status);
        //System.out.println(response);

        // 갑자기   "hprice":"", 가  "hprice":"", "",  이렇게 넘어와서 임의로 변경
        response=response.replaceAll("\"\",\"\",","\"\",");
        return response;
    }


    @Override
    public List<String> txtRead() {
        List<String> keywordList = new ArrayList<>();
        File csv = new File("C:\\Users\\multicampus\\Desktop\\썸트렌드 데이터\\seonbee_keyword.txt");
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
            //JSONObject json = new JSONObject(result);
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
                product.setCreatedDate(LocalDateTime.now());
                product.setModifiedDate(LocalDateTime.now());
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

    @Override
    public void csvRead(Set<Product> set) {
//        File csv = new File("C:\\Users\\multicampus\\Desktop\\썸트렌드 데이터\\용도csv\\product.csv");
//        BufferedReader br = null;
//        String line = "";
//
//        try {
//            br = new BufferedReader(new FileReader(csv));
//            while ((line = br.readLine()) != null) {
//                List<String> aLine = new ArrayList<String>();
//                String[] lineArr = line.split("/t"); // 파일의 한 줄을 ,로 나누어 배열에 저장 후 리스트로 변환한다.
//                aLine = Arrays.asList(lineArr);
//                aLine.set(0,subject);  //맨첫번째는 주제로
//                csvList.add(aLine);
//            }
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if (br != null) {
//                    br.close(); // 사용 후 BufferedReader를 닫아준다.
//                }
//            } catch(IOException e) {
//                e.printStackTrace();
//            }
//        }
    }

    public void writeCSV(List<Product> list)
    {
        File csv= new File("C:\\\\Users\\\\multicampus\\\\Desktop\\\\썸트렌드 데이터\\\\product.csv");
        BufferedWriter bw = null; // 출력 스트림 생성
        try {
            //bw = new BufferedWriter(new FileWriter(csv));
            bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(csv), "MS949"));
            // csv파일의 기존 값에 이어쓰려면  true를 지정하고, 기존 값을 덮어쓰려면 true를 삭제한다
                String columns= "naver_id \t created_date \t modified_date  \t name \t buy_url \t price \t image_url \t category1 \t category2 \t category3 \t keyword \t brand \t hit \t wish \t give \t recommend";
                bw.write(columns);
                bw.newLine(); // 개행
            for (int i = 0; i < list.size(); i++) {
                Product p= list.get(i);
                String inputData = "";
                inputData = p.getNaverId() + "\t" + p.getCreatedDate()+"\t" + p.getModifiedDate()+  "\t" + p.getName() + "\t" + p.getBuyUrl() + "\t" + p.getPrice() + "\t" + p.getImageUrl() + "\t" + p.getCategory1() + "\t" + p.getCategory2() + "\t" + p.getCategory3() + "\t" + p.getKeyword()+ "\t" + p.getBrand()+ "\t" + p.getHit()+ "\t" + p.getWish()+ "\t" + p.getGive() + "\t" + p.getRecommend();
                // 한 줄에 넣을 각 데이터 사이에 ,를 넣는다
                bw.write(inputData);
                // 작성한 데이터를 파일에 넣는다
                bw.newLine(); // 개행
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.flush(); // 남아있는 데이터까지 보내 준다
                    bw.close(); // 사용한 BufferedWriter를 닫아 준다
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
