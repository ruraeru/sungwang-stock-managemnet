## 📝 소개

다음과 같은 내용을 작성할 수 있습니다.

- 프로젝트 소개
- 프로젝트 화면 구성
- 사용한 기술 스택
- 기술적 이슈와 해결 과정
- 프로젝트 팀원

<br />

### 화면 구성

|                                               모바일 메인                                                |
| :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/b61f7332-b7de-43b7-b4b4-2e602ed82165" width="450"/> |
|                                             모바일 메인화면                                              |

|                                             영수증 사진 촬영                                             |
| :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/dbfaf2fb-9e1d-4c41-877d-18adbed50ced" width="450"/> |
|                                 영수증의 사진이나 카메라로 촬영하여 입력                                 |

|                                  영수증에서 물건 품목 추출(Gemini API)                                   |
| :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/003acfbd-6c9f-4125-b9ff-3f405516f116" width="450"/> |
|                              AI Gemini API를 사용하여 이미지에서 품목 추출                               |

|                                        재고 현황 조회(/products)                                         |
| :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/d47548f4-5c60-4df7-8071-db2f49684d42" width="450"/> |
|                              Server Actions + Prisma를 활용해 Mysql DB 조작                              |

|                       물건 모달 창(Nextjs Parallel Route: products/@modal/(.)[id])                       |
| :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/6ec27b83-fb96-4967-aa0d-94051f878708" width="450"/> |
|                  Parallel Route를 활용해서 물건의 정보를 간단히 보여주는 Modal 창 구현                   |

|                                     물건 디테일 화면(products/[id])                                      |
| :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/e6e9d4f8-d4b5-436f-a46b-4d346570d69f" width="450"/> |
|                                   물건의 상세 정보를 볼 수 있는 페이지                                   |

<br />

## ⚙ 기술 스택

### Front-end

<div>
|NextJS, JavaScript, Tailwind, Mysql, Prisma, Google AI Gemini|
</div>

### Tools

<div>
<img src="https://github.com/yewon-Noh/readme-template/blob/main/skills/Github.png?raw=true" width="80">
</div>

<br />

## 🤔 기술적 이슈와 해결 과정


## 🫠 V2를 만든다면?
1. 기획
  - 기획을 아예하지 않고 일단 만들어!라는 마음으로 했는데 그래서 삽질을 너무 많이했고 지체되었다.
  - 디자인, DB 설계, 기능 등 최소한이라도 잡고 코딩을 해야겠다.
2. 기능
 - 이 가게에서는 납품 영수증이 2개인데 지금은 하나만 구현되어있다. Ver.2에서는 추가해보겠다.
3. DB 설계의 중요성
   - 영수증을 보지 않고 구조를 잡으면서 DB설계를 했다.
   -  변수명과 DB의 Attribute명이 다르니까 TS 타입 체크도 힘들었다.
4. 디자인!
   - 일단 연세가 좀 있으신 분들이 사용하는거다 보니까 제일 가독성에 영향을 주지 않는 색과 UI나 텍스트의 크기를 크게 만들었다.
   -  다음에는 조금 더 가독성이 뛰어나지만 이쁜 색으로 디자인 해보겠다.


