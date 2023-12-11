## 🚩2023 캡스톤 프로젝트 - 기업밀착과제<br>
<p align="center">
   <img width="200" height="200" src="https://github.com/heeseon1/app_api/assets/116551167/640626ce-98cf-4e27-a6d3-2d8c8e458d59" />
</p>

## 👩🏻‍👧🏻‍👧🏻팀 소개
- 한양여자대학교 스마트IT과
- 취뽀하조 : 취업 뽀개기(취업에 성공하자라는 목표를 가진 팀)
  ### 👩🏻‍💻구성원 소개
  |👑 PM|FE|BE|
  |:----:|:----:|:----:|
  |<p align="center"><img width="80%" height="80%" src="https://github.com/heeseon1/app_api/assets/116551167/8a8ea126-0575-4e7f-aff4-7f8308d57382"></p>|<p align="center" /><img width="60%" height="60%" src="https://github.com/heeseon1/app_api/assets/116551167/4e80512b-7411-45f9-a0c8-c4cef2db8ead" /></p>|<p align="center"><img width="80%" height="80%" src="https://github.com/heeseon1/app_api/assets/116551167/5847e24f-f100-4aeb-84a4-50985f1738ba" /></p>|
  |**2104637 박희선**|**2104649 양지연**|**2104714 황다은**|
  |AI 서버 개발|디자인 및 앱 개발|Django 서버 개발|
  |<a href="https://github.com/heeseon1/greendanAI.git">AI 서버 바로가기</a>|<a href="https://github.com/jiyeon0113/Greendan_main.git">프론트 서버 바로가기</a>|<a href="https://github.com/toppingh/Capstone.git">백엔드 서버 바로가기</a>|

  <br>

## 🖥️프로젝트 소개
AI기반 토마토 잎 병충해 판별 앱<br>

#### ⏱️개발 기간
2023.03.02 ~ 2023.12.12<br>

#### 🛠️ 개발 환경
- <b>IDE</b> : <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/PyCharm-000000?style=flat-square&logo=PyCharm&logoColor=white"/>
- <b>Framework</b> : <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=Django&logoColor=white"/> <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=Flask&logoColor=white"/> <img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=white"/>
- <b>Database</b> : <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<br><br>
<!--2️⃣3️⃣4️⃣5️⃣-->
## 💡 기능
<h3>1️⃣ 회원가입 및 로그인</h3>

- `DRF의 JWT`를 이용한 유저 검증<br>
- `SMTP`를 사용한 PW 재설정

  <br>

<h3>2️⃣ 카메라 촬영 및 갤러리 사진 선택</h3>

- `react-native-image-picker`를 이용해 카메라, 갤러리 접근 권한 허용
- Django 서버로 `POST요청` 전송

<br>

<h3>3️⃣ 정상 및 병충해 감염 판별</h3>

- 촬영하거나 갤러리에서 사진을 선택해 AI 진단을 시작하면 `학습 모델에서 병충해와 비교`
- 감염 여부를 판단해 결과를 보여주고 결과를 Django 서버를 통해 DB에 저장

  <br>
  
<h3>4️⃣ 북마크(히스토리) 저장</h3>

- 판단한 결과를 DB에 저장해 유저가 결과 내역 확인 가능
- 원하는 결과를 `북마크`할 수 있음
- `오름차순/내림차순` 정렬 가능

  <br>
  
<h3>5️⃣ 검색</h3>

- `키워드`를 이용한 검색 가능
- `캘린더에서 날짜를 선택`해 해당 날짜에 받은 결과 검색 가능
