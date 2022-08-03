import React, { useState, useEffect } from 'react';
import PostCode from 'react-daum-postcode';
import '../postcode.scss'; //node-sass

const MemberComponent = ({modalOpenFn, 이용약관}) => {

  const onCompletePost=(data)=>{ //카카오 다음 주소검색 API
    console.log(data);
    setField({...field, 주소1: data.roadAddress}); //도로명주소
  }

  // 주소 팝업 창 스타일
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '400px',
    height: '500px',
    marginLeft: '-200px',
    marginTop: '-250px',
    zIndex: '3',
    background: '#fff',
    border: '1px solid #aaa'
  }

  //state 관리
  const [field, setField] = useState(
        {
          아이디:'',
          아이디중복확인: true, //로컬스토레이지 저장후 false 초기값 수정
          isshowId:false,
          isClassId:'',
          
          비밀번호:'',
          isshowPw:false,
          isClassPw1:'',
          isClassPw2:'',
          isClassPw3:'',
          
          비밀번호확인:'',
          isshowPwRe :false,
          isClassPwRe :'',

          이름: '',

          이메일: '',
          이메일중복확인: true, //로컬스토레이지 저장후 false 초기값 수정

          휴대폰: '',
          휴대폰확인: '',
          isDisabledHp: true,  //버튼사용불가
          isShowHp: false,
          minutes: 2,
          seconds: 59,
          인증번호: '',  //자동 랜덤 생성 번호
          setId: 0,
          인증확인번호: '', //폰으로 전송된 인증번호 입력
          isDisabledHpInput: false,
          isDisabledHpBtn: false,
          isClassHp1: false,
          isClassHp2: false,
          isShowHpSpan: true,

          주소1: '',
          주소2: '',
          isShowAddress: false, //주소검색 API

          //라디오 버튼
          성별: '선택안함', //남자, 여자, 선택안함

          생년: '',
          생월: '',
          생일: '',
          isShowBirthText: '',     //오류난 항목 내용이 입력되어 표시
          isShowBirthError: false, //오류가 발생시 true 변경되어 표시

          추가입력사항선택: '',    //1. 추가입력사항선택 : 라디오버튼 선택 항목
          isShowAddInput:false,   //2. 추가입력사항 박스 show, hide
          추가입력사항:'',        //3. 추가입력사항 : 추천인 또는 참여 이벤트명

          이용약관동의: []        //이용약관 체크박스 선택시 누적 보관 배열        
        }
  );

  
  //아이디
  //1. onFocusId
  const onFocusId=()=>{
    setField({...field, isshowId: true});       
  }

  //2. onChangeId
  const onChangeId=(e)=>{
    //영 필수 숫자 선택 공백안됨 영숫자만 입력 6자이상
    const regExp = /^(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}$/g;
    let temp = '';

    // 입력제한조건 
     if(regExp.test(e.target.value)){
      temp = true;
     }
     else {
      temp = false;
     }
     //공백이 아닌경우 저장
     setField({...field, 아이디: e.target.value, isClassId: temp });
        
  }
  
  // 아이디 중복 확인 버튼클릭이벤트: 모달 오픈
  // 모달창 띄우기 함수 호출 실행
  const onClickIdModal=(e)=>{
    e.preventDefault();
    if(field.아이디===''){
      modalOpenFn('아이디 중복확인!');
      return;
    }
    else{
      if(field.isClassId===false){ //정규표현식이 오류가 있다면
        modalOpenFn('아이디는 6자 이상의 영문 혹은 영문과 숫자를 조합하여 입력하세요.');
      }
      else { //중복검사 시작, 로컬스토레이지 아이디를 비교 중복검색
        //임시
        //modalOpenFn('아이디 확인 완료했습니다');

        //1. 로컬스토레이지 데이터 가져오기 localStorage.getItem() : 임시배열에 저장하기(밀어넣기)
        let temp = [];
        for(let i=0; i<localStorage.length; i++){
          temp.push( JSON.parse(localStorage.getItem(localStorage.key(i))) )
        }
        //전송 버튼(submit) 수행 후 중복검색
        //result = [false, false, false, true, false, ...]
        let result = temp.map((item)=>item.아이디===field.아이디);
        if( result.includes(true) ){
          modalOpenFn('중복된 아이디 입니다.');
        }
        else {
          modalOpenFn('사용가능한 아이디 입니다.');
        }
      }
    }
  }


  //비밀번호
  //1. onFocusPw
  const onFocusPw=()=>{
    setField({...field, isshowPw:true});
  }

  //2. onChangePw  
  const onChangePw=(e)=>{
    const regExp1 = /.{10,}/; 
    const regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
    const regExp3 = /(.)\1\1/; 

    let temp1 = '';
    let temp2 = '';
    let temp3 = '';

    //조건1: 10자이상
    if(regExp1.test(e.target.value)){      
      temp1 = true;
    }
    else {      
      temp1 = false;
    }

    //조건2: 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
    if(regExp2.test(e.target.value)){      
      temp2 = true;
    }
    else {      
      temp2 = false;
    }

    //조건3: 동일한 숫자 3개 이상 연속 사용 불가
    if(regExp3.test(e.target.value)){      
      temp3 = false;
    }
    else {      
      temp3 = true;
    }

    //상태관리 멤버변수 저장
    setField({...field, 비밀번호:e.target.value, isClassPw1: temp1, isClassPw2: temp2, isClassPw3: temp3,});    

  }


  //비밀번호 확인
  //1. onFocusPwRe
  const onFocusPwRe=()=>{
    setField({...field, isshowPwRe: true});
  }

  //2. onChangePwRe
  const onChangePwRe=(e)=>{
    let temp = '';
  
    //입력된 비밀번호와 현재 입력된 비밀번호확인 값과 비교 같으면 true, 틀리면 false
    if(field.비밀번호 === e.target.value){
      temp = true;
    }
    else{
      temp = false;
    }
    setField({...field, 비밀번호확인: e.target.value, isClassPwRe: temp});
  }

  //이름  
  //1. 이름 입력 정규표현식 검증
  const onChangeName=(e)=>{
    const regExp = /[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;
    let temp = '';
        temp = e.target.value.toString().replace(regExp,'');
        setField({...field, 이름: temp});
  }

  //이메일
  //1. 이메일 입력 정규표현식 검증
  const onChangeEmail=(e)=>{
    const regExp=/^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    let temp = '';
    if(regExp.test(e.target.value)){
      temp = true;
    }
    else {
      temp = false;
    }
    setField({...field, 이메일: e.target.value, 이메일확인: temp});
  }  
  //2. 이메일 중복 확인 : 모달 오픈
  const onClickEmailModal=(e)=>{
    e.preventDefault();    
    if(field.이메일===''){
      modalOpenFn('이메일을 입력하세요!');
    }
    else{
      if(field.이메일확인===false){
        modalOpenFn('잘못된 이메일 형식입니다.');
      }
      else {

          //1. 로컬스토레이지 데이터 가져오기 localStorage.getItem() : 임시배열에 저장하기(밀어넣기)
          let temp = [];
          for(let i=0; i<localStorage.length; i++){
            temp.push( JSON.parse(localStorage.getItem(localStorage.key(i))) );                        
          }

          // 전송 버튼(submit) 섭밋 수행 후 중복검색한다. 
          //  result = [false,false,false,true,false,.......]
          let result = temp.map((item)=>item.이메일===field.이메일);

          if( result.includes(true) ) { //중복된 아디디
            modalOpenFn('중복된 이메일 입니다.');
          }
          else{
            modalOpenFn('사용가능한 이메일 입니다.');
          }


      }
      
    }
  }



  //휴대폰
  //1. 휴대폰 번호 입력 정규표현식 검증
  const onChangeHp=(e)=>{
    const regExp = /^01[0|6|7|8|9]+\d{3,4}\d{4}$/g;  //10~11 휴대폰
    let temp = '';

    if(regExp.test(e.target.value)){
      temp = true;
    }
    else {
      temp = false;
    }
    setField({...field, 휴대폰: e.target.value, 휴대폰확인: temp, isDisabledHp: !temp});
  }

  //휴대폰인증
  //1. 휴대폰 인증 버튼 클릭 : 인증번호 전송 이벤트
  
  //마우스다운 이벤트
  //타이머 일시정지, isShowHp: false -> true일 때 타이머 재작동 가능
  const onMouseDownHp=()=>{
    clearInterval(field.setId);
    setField({...field, isShowHp: false});
  }
  //클릭 이벤트
  const onClickHp=(e)=>{
    e.preventDefault();
    // 랜덤함수 Math.random(); : 랜덤숫자 0 ~ 1 사이숫자 6자
    // 내림: Math.floor() / 올림: Math.ceil() / 반올림: Math.round()

    // 6자리 랜덤 숫자 만들기
    let num = Math.floor(Math.random()*900000+100000);
    setField({...field, isShowHp: true, 인증번호: num.toString()});        

    //모달창 띄우기 함수 호출 실행
    if(field.휴대폰===''){
      modalOpenFn(`휴대폰 번호를 입력하세요!`);
    }
    else{
      modalOpenFn(`휴대폰으로 인증번호(${num})가 전송되었습니다.`);
    }
  }

  //2. 타이머카운트 함수
  const timerCount=()=>{
    let m = 2;
    let s = 59;
    let setId = 0;

    setId = setInterval(()=>{
      s--;
      if(s <= 0){
        s = 59;
        m--;
        if(m <= 0){
          clearInterval(setId);
          s = 0;
          m = 0;
        }      
      }
      setField({...field, seconds: s, minutes: m, setId: setId});
    }, 1000);
  }

  //3. useEffect 
  //isShowHp : true값 변경하고 렌더링 뒤 카운트 실행되면 함수 실행하게 만듬
  useEffect(()=>{
    field.isShowHp && timerCount();
  },[field.isShowHp]);

  //4. 인증번호 확인 입력상자
  const onChangeHpNum=(e)=>{
    //입력시 곧바로 타이머 일시정지
    clearInterval(field.setId);
    setField({...field, 인증확인번호: e.target.value});
  }

  //5. 인증번호 확인 버튼 클릭 이벤트
  const onClickHpConfirm=(e)=>{
    e.preventDefault();
    //비교 : 인증번호 === 인증확인번호
    if(field.인증번호===field.인증확인번호){
      //alert('인증번호 확인 완료됐습니다.');
      modalOpenFn('인증번호 확인 완료됐습니다.');
      //인증확인번호 입력상자 사용불가 disabled=true
      //인증확인 버튼 사용불가 disabled=true
      setField(
        {...field, isDisabledHpInput: true, isDisabledHpBtn: true, isClassHp1: true, isClassHp2: true, 인증확인번호: '', isShowHpSpan: false,}
      );
    }
    else {
      //alert('인증번호를 다시 확인하십시오.');
      modalOpenFn('인증번호를 다시 확인하십시오.');
    }
  }

  
  //주소
  //1. 주소버튼 클릭 이벤트 상태관리
  const onClickAddress=(e)=>{
    e.preventDefault();
    setField({...field, isShowAddress: true});
  }
  //2. 주소입력상자 onChange 이벤트 
  //주소입력상자1 onChangeAddress1
  const onChangeAddress1=(e)=>{
    setField({...field, 주소1: e.target.value});
  }
  //주소입력상자2 onChangeAddress2
  const onChangeAddress2=(e)=>{
    setField({...field, 주소2: e.target.value});
  }


  //성별 - 라디오 버튼
  const onChangeGender=(e)=>{
    setField({...field, 성별: e.target.value});
  }


  //생년월일
  const onChangeYear=(e)=>{
    const regExp = /[^0-9]/g;
    let temp = e.target.value.trim().replace(regExp,'');
    setField({...field, 생년: temp});
  }
  const onChangeMonth=(e)=>{
    const regExp = /[^0-9]/g;
    let temp = e.target.value.trim().replace(regExp,'');
    setField({...field, 생월: temp});
  }
  const onChangeDate=(e)=>{
    const regExp = /[^0-9]/g;
    let temp = e.target.value.trim().replace(regExp,'');
    setField({...field, 생일: temp});
  }
  
  // 생년월일 공통 사용하는 함수
  // 년도, 월, 일 규칙 패턴
  // 키보드 포커스 인, 포커스 아웃 이벤트 발생시 호출하는 함수
  const birthdayCheck=()=>{
    //비구조화
    const {생년,생월,생일} = field; 
    const regExpYear = /^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g;
    const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g;
    const regExpDate = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;    

    //현재 년,월,일 날짜 데이터
    const nowYear = new Date().getFullYear(); //년 4자리
    const nowMonth = new Date().getMonth()+1; //월 0~11
    const nowDate = new Date().getDate(); //일
    const today = new Date( nowYear, nowMonth, nowDate );
   

    if(생년==='' && 생월==='' && 생일===''){
      return;
    }
    else {       
      if( regExpYear.test(생년)===false ){ //가이드텍스트 보이기 show() 
        setField({...field, isShowBirthError:true, isShowBirthText:'태어난 년도 4자리를 정확하게 입력해주세요'});
        return; 
      }
      else { 
        //생년이 정상일 시 멤버변수 초기화 후 생월 체크        
        setField({...field, isShowBirthError:false, isShowBirthText:''});
        
        //생월 체크
        if( regExpMonth.test(생월)===false ){ //오류
          setField({...field, isShowBirthError:true, isShowBirthText:'태어난 월을 정확하게 입력해주세요'});
          return;
        }
        else { //정상
          setField({...field, isShowBirthError:false, isShowBirthText:''});

          //생일 체크
          if( regExpDate.test(생일)===false ){ //오류
            setField({...field, isShowBirthError:true, isShowBirthText:'태어난 일을 정확하게 입력해주세요'});
            return;
          }
          else { //정상
            setField({...field, isShowBirthError:false, isShowBirthText:''});
          }
        }
        //입력불가 조건
        //추가 조건 : 14세 이상, 120세 초과, 미래
        const birthDay = new Date(생년,생월,생일);
        const nowYear14 = new Date(nowYear-14, nowMonth, nowDate);
        const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);
        
        //1. 미래
        if(birthDay > today){          
          setField({...field, isShowBirthError:true, isShowBirthText:'존재하지않는 날짜입니다. 다시 입력해주세요.'});
          return;
        }
        else{
          setField({...field, isShowBirthError:false, isShowBirthText:''});
        }         

        //2. 14세 이상
        if(birthDay > nowYear14){
          setField({...field, isShowBirthError:true, isShowBirthText:'만 14세 미만은 가입이 불가합니다.'});          
          return;
        }
        else{
          setField({...field, isShowBirthError:false, isShowBirthText:''});
        }
        
        //3. 120세 초과
        if(birthDay < nowYear120){ //120세 초과 나이 120살이 넘는 분들
          setField({...field, isShowBirthError:true, isShowBirthText:'생년월일을 다시 한 번 확인해주세요.'});
          return;
        }
        else{
          setField({...field, isShowBirthError:false, isShowBirthText:''});
        }
      } 
    }
  }

  //생년 포커스 아웃시 생년월일 체크함수 호출 실행
  const onBlurBirth=()=>{
    birthdayCheck();
  }

  //추가입력사항
  // 라디오버튼 : 추천인, 이벤트
  const onChangeRadioAddInput=(e)=>{    
    setField({...field, isShowAddInput: true, 추가입력사항선택: e.target.value});
  }
  // 추가입력상자 : 추가입력 또는 이벤트 내용 저장
  const onChangeAddInput=(e)=>{    
    setField({...field, 추가입력사항: e.target.value});
  }

  //이용약관동의
  //1. 전체 동의합니다.
  const onChangeServiceAll=(e)=>{
    //체크되면
    if(e.target.checked){
      setField({...field, 이용약관동의: 이용약관 }); //프롭스 이용약과 전체 저장
    }
    else{
      setField({...field, 이용약관동의: [] }); //배열초기화 삭제
    }
  }
  //2. 체크박스 각 항목 체크시 멤버변수 이용약관동의:[...field.이용약관동의,  '데이터값'] 배열에 누적 저장하기
  const onChangeService=(e)=>{
    let temp = [];

    if(e.target.checked){ //체크되면 누적 저장

      if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){ //chk4
        setField({...field, 이용약관동의: [...field.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의','SMS','이메일'] });
      }
      else if(field.이용약관동의.includes('SMS') && e.target.value==='이메일'){
        setField({...field, 이용약관동의: [...field.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의','이메일'] });
      }
      else if(field.이용약관동의.includes('이메일') && e.target.value==='SMS'){
        setField({...field, 이용약관동의: [...field.이용약관동의, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의','SMS'] });
      }
      else{
        setField({...field, 이용약관동의: [...field.이용약관동의, e.target.value] });
      }

    }
    else{ //체크해제시는 배열에 저장된  데이터를 삭제 : 체크해제된 데이터만 filter()
        if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의'){ //chk4
          temp = field.이용약관동의.filter((item)=> item !== e.target.value); //삭제1
          temp = temp.filter((item)=> item !== 'SMS');                       //삭제2    
          temp = temp.filter((item)=> item !== '이메일');                    //삭제3  
          setField({...field, 이용약관동의: temp });
        } 
        else if( field.이용약관동의.includes('SMS') && e.target.value==='이메일' ){
          temp = field.이용약관동의.filter((item)=> item !== '이메일'); //삭제1
          temp = temp.filter((item)=> item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의'); //삭제2
          setField({...field, 이용약관동의: temp });
        } 
        else if( field.이용약관동의.includes('이메일') && e.target.value==='SMS' ){
          temp = field.이용약관동의.filter((item)=> item !== 'SMS'); //삭제1
          temp = temp.filter((item)=> item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의'); //삭제2
          setField({...field, 이용약관동의: temp });
        } 
        else{      
          temp = field.이용약관동의.filter((item)=>item !== e.target.value ); //삭제하고 나머지만 저장
          setField({...field, 이용약관동의: temp });
        }
    }
    
  }

  //Sumbmit 전송 : 전송버튼 클릭 시 동작 onSubmit={}
  // 0. 유효성 검증  
  // 1. 로컬스토레이지에 저장(전송)
  // 2. 닷홈 비동기 전송방식 : AXIOS 전송 => 서버(PHP, MYSQL)와 정보 송수신(CRUD)하기 위해 사용
  const onSubmitMember=(e)=>{
    e.preventDefault();
    // 빈칸 X(필수입력사항) => 훅 (State 멤버변수)
    const {아이디, 비밀번호, 비밀번호확인, 이름, 이메일, 휴대폰, 주소1, 주소2, 성별, 생년, 생월, 생일, 추가입력사항선택, 추가입력사항, 이용약관동의, 필수이용약관동의, 아이디중복확인, 이메일중복확인, 휴대폰인증번호확인} = field; //State 멤버변수 비구조화 할당
    if(아이디==='' || 비밀번호==='' || 비밀번호확인==='' || 이름==='' || 이메일==='' || 휴대폰==='' || 주소1==='' || 주소2==='' || 아이디중복확인===false || 이메일중복확인===false || 휴대폰인증번호확인===false){
      if(아이디===''){
        modalOpenFn('아이디를 입력해주세요.');
      }
      else if(비밀번호===''){
        modalOpenFn('비밀번호를 입력해주세요.');
      }
      else if(비밀번호확인===''){
        modalOpenFn('비밀번호를 다시 한 번 확인해주세요.');
      }
      else if(이름===''){
        modalOpenFn('이름을 입력해주세요.');
      }
      else if(이메일===''){
        modalOpenFn('이메일을 입력해주세요.');
      }
      else if(휴대폰===''){
        modalOpenFn('휴대폰 번호를 입력해주세요.');
      }
      else if(주소1===''){
        modalOpenFn('주소를 검색해주세요.');
      }
      else if(주소2===''){
        modalOpenFn('상세주소를 입력해주세요.');
      }
      else if(필수이용약관동의 < 3){
        modalOpenFn('필수이용약관동의를 체크해주세요.');
      }
      else if(아이디중복확인===false){
        modalOpenFn('아이디 중복 확인해주세요.');
      }
      else if(이메일중복확인===false){
        modalOpenFn('이메일 중복 확인해주세요.');
      }
      else if(휴대폰인증번호확인===false){
        modalOpenFn('휴대폰 인증번호를 다시 확인해주세요.');
      }
      return;
    }
    else {
      //전송할 데이터를 임시 배열에 저장하고 로컬스토레이지에 임시 배열을 한꺼번에 저장한다
      let cnt = 0;
      이용약관동의.map((item)=>{
        if(item.includes('필수')){
          cnt++;
        }
      });

      if( cnt<3 ){
        modalOpenFn(`이용약관동의 필수 선택을 체크( ${cnt} ) 해주세요.`);
        return;
      }
      else {
        let temp = {
          아이디: 아이디,
          비밀번호: 비밀번호,
          이름: 이름,
          이메일: 이메일,
          휴대폰: 휴대폰,
          주소: `${주소1} ${주소2}`,
          성별: 성별,
          생년월일: `${생년}-${생월}-${생일}`,
          추가입력사항: `${추가입력사항선택}: ${추가입력사항}`,
          이용약관동의: 이용약관동의
        };
        //로컬스토레이지는 데이터저장시 객체 저장할 수 없다. 그래서 문자열로 변환(JSON.stringify()) 저장한다.
        localStorage.setItem(temp.아이디,  JSON.stringify(temp)); 
        
        //저장완료
        modalOpenFn('마켓컬리 회원가입을 진심으로 감사드립니다.');

        //저장완료 후 모든 멤버변수 초기화
        setField({  
          ...field,
          아이디:'',
          아이디중복확인: true, //로컬스토레이지 저장후 false 초기값 수정
          isshowId:false,
          isClassId:'',
          
          비밀번호:'',
          isshowPw:false,
          isClassPw1:'',
          isClassPw2:'',
          isClassPw3:'',
          
          비밀번호확인:'',
          isshowPwRe :false,
          isClassPwRe :'',

          이름: '',

          이메일: '',
          이메일중복확인: true, //로컬스토레이지 저장후 false 초기값 수정

          휴대폰: '',
          휴대폰확인: '',
          isDisabledHp: true,  //버튼사용불가
          isShowHp: false,
          minutes: 2,
          seconds: 59,
          인증번호: '',  //자동 랜덤 생성 번호
          setId: 0,
          인증확인번호: '', //폰으로 전송된 인증번호 입력
          isDisabledHpInput: false,
          isDisabledHpBtn: false,
          isClassHp1: false,
          isClassHp2: false,
          isShowHpSpan: true,

          주소1: '',
          주소2: '',
          isShowAddress: false, //주소검색 API

          //라디오 버튼
          성별: '선택안함', //남자, 여자, 선택안함

          생년: '',
          생월: '',
          생일: '',
          isShowBirthText: '',     //오류난 항목 내용이 입력되어 표시
          isShowBirthError: false, //오류가 발생시 true 변경되어 표시

          추가입력사항선택: '',    //1. 추가입력사항선택 : 라디오버튼 선택 항목
          isShowAddInput:false,   //2. 추가입력사항 박스 show, hide
          추가입력사항:'',        //3. 추가입력사항 : 추천인 또는 참여 이벤트명

          이용약관동의: []        //이용약관 체크박스 선택시 누적 보관 배열
        });
      }
    }
  }



  return (
    <section id="member">
      <div className="container">
        <div className="wrap">
            {/* 타이틀 */}
            <div className="title">
                <h2>회원가입</h2>
            </div>
            {/* 전송할 회원가입폼 */}
            <div className="content">
              <form onSubmit={onSubmitMember} id="member" name="member" method="post" action="response.php">
                <ul id="memberForm">
                  <li>
                    <h3><i>*</i><span>필수입력사항</span></h3>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>아이디</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="text" 
                      id="inputId" 
                      name="inputId" 
                      placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합" 
                      maxLength="20" 
                      onChange={onChangeId}
                      onFocus={onFocusId} 
                      value={field.아이디}
                      />
                      <button onClick={onClickIdModal} className="id-double-btn">중복확인</button>
                      {
                        field.isshowId && (
                          <div className="guide-text guide-id">
                          <p className={field.isClassId==='' ? '' : (field.isClassId ? 'success' : 'error')}>6자 이상의 영문 혹은 영문과 숫자를 조합</p>
                            <p>아이디 중복확인</p>
                          </div>
                        )
                      }
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>비밀번호</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="password" 
                      id="inputPw" 
                      name="inputPw" 
                      placeholder="비밀번호를 입력해주세요" 
                      maxLength="20" 
                      onChange={onChangePw}
                      onFocus={onFocusPw}
                      value={field.비밀번호}
                      />
                      {
                        field.isshowPw && (
                          <div className="guide-text guide-pw">
                            <p className={field.isClassPw1==='' ? '' : (field.isClassPw1 ? 'success' : 'error')}>10자 이상 입력</p>
                            <p className={field.isClassPw2==='' ? '' : (field.isClassPw2 ? 'success' : 'error')}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                            <p className={field.isClassPw3==='' ? '' : (field.isClassPw3 ? 'success' : 'error')}>동일한 숫자 3개 이상 연속 사용 불가</p>
                          </div>
                        )
                      }
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>비밀번호확인</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="password" 
                      id="inputPwConfirm" 
                      name="inputPwConfirm" 
                      placeholder="비밀번호를 한번 더 입력해주세요." 
                      maxLength="20"
                      onChange={onChangePwRe}
                      onFocus={onFocusPwRe}
                      value={field.비밀번호확인}
                      />
                      {
                        field.isshowPwRe && (
                          <div className="guide-text guide-pw-confirm">
                            <p className={field.isClassPwRe==='' ? '' : (field.isClassPwRe ? 'success' : 'error')}>동일한 비밀번호를 입력해주세요.</p>
                          </div>
                        )
                      }                  
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>이름</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="text" 
                      id="inputName" 
                      name="inputName" 
                      placeholder="이름을 입력해주세요."
                      maxLength="30"
                      onChange={onChangeName}
                      value={field.이름}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>이메일</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="email" 
                      id="inputEmail" 
                      className=""
                      name="inputEmail" 
                      placeholder="예: marketkurly@kurly.com" 
                      maxLength="50"
                      onChange={onChangeEmail}
                      value={field.이메일}
                      />
                      <button onClick={onClickEmailModal} className="email-double-btn">중복확인</button>
                    </div>
                  </li>
                  <li>
                    <div className="left">
                      <label><span>휴대폰</span><i>*</i></label>
                    </div>
                    <div className="right">
                      <input 
                      type="text" 
                      id="inputPhone" 
                      name="inputPhone" 
                      placeholder="숫자만 입력해주세요." 
                      maxLength="11"
                      onChange={onChangeHp}
                      value={field.휴대폰}
                      />
                      {/* 기본값은 버튼 사용 불가 : disabled=true(사용 불가) ,disabled=false(사용 가능) -> 버튼 색상도 활성화 */}
                      <button onMouseDown={onMouseDownHp} onClick={onClickHp} disabled={field.isDisabledHp} className={field.isDisabledHp ? "phone-btn" : "phone-btn on"}>인증번호 받기</button> 

                      {
                        field.isShowHp && (
                          <>
                            {/* 휴대폰 인증번호 확인버튼 */}
                            <input onChange={onChangeHpNum} disabled={field.isDisabledHpInput} className={field.isClassHp1 ? "ok" : ""} type="text" id="inputPhoneok" name="inputPhoneok" placeholder="인증번호를 입력해주세요." maxLength="6" value={field.인증확인번호}/>
                            <button onClick={onClickHpConfirm} disabled={field.isDisabledHpBtn} className={field.isClassHp2 ? "phone-btn phone-ok-btn ok" : "phone-btn phone-ok-btn"}>인증번호 확인</button>
                            {
                              field.isShowHpSpan && (
                                /* 카운트 타이머 확인 */
                                <span className="count-timer">{field.minutes} : {field.seconds<10 ? `0${field.seconds}` : field.seconds}</span>
                              )
                            }
                          </>
                        )
                      }

                      {/* 인증 가이드텍스트 */}
                      <p className="phonechk-guidetext">인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)</p>

                    </div>
                  </li>
                  <li className="address">
                    <div className="left">
                      <label><span>주소</span><i>*</i></label>
                    </div>
                    <div className="right">
                      {
                        field.isShowAddress && (
                          <>
                            <input onChange={onChangeAddress1} value={field.주소1} type="text" id="inputAddress1" name="inputAddress1" placeholder="검색주소"/>
                            <input onChange={onChangeAddress2} value={field.주소2} type="text" id="inputAddress2" name="inputAddress2" placeholder="세부주소를 입력하세요."/>
                          </>
                        )
                      }                                            
                      <button onClick={onClickAddress} id="addressBtn" className="address-btn" title="주소검색"><span><img src="./images/ico_search.svg" alt=""/><i className="address-text">주소검색</i></span></button>
                      <div className="guide-text guide-transfer">
                        <h4> </h4>
                      </div>
                      <p className="address-guidetext">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                      {
                         field.isShowAddress && (
                          <div>
                            <PostCode 
                            style={style} 
                            onComplete={onCompletePost}
                            />
                          </div>
                         )                        
                      }
                    </div>
                  </li>

                  <li>
                    <div className="left">
                      <label><span>성별</span></label>
                    </div>
                    <div className="right gender">
                      <label>
                        <input onChange={onChangeGender} checked={field.성별.includes('남자')} type="radio" id="male" name="gendeer" value="남자"/>
                        <span>남자</span>
                      </label>                    
                      <label>
                        <input onChange={onChangeGender} checked={field.성별.includes('여자')} type="radio" id="female" name="gendeer" value="여자"/>
                        <span>여자</span>
                      </label>                    
                      <label>
                        <input onChange={onChangeGender} checked={field.성별.includes('선택안함')} type="radio" id="none" name="gendeer" value="선택안함"/>
                        <span>선택안함</span>
                      </label>                    
                    </div>
                  </li>

                  <li>
                    <div className="left">
                      <label><span>생년월일</span></label>
                    </div>
                    <div className="right">
                      <div className="date-box">
                        <ul>
                          <li>
                            <input 
                            onChange={onChangeYear} 
                            onBlur={onBlurBirth}                             
                            value={field.생년} 
                            type="text" 
                            id="year" 
                            name="year" 
                            placeholder="YYYY" 
                            maxLength="4"
                            />
                            </li>
                          <li><span>/</span></li>
                          <li>
                            <input 
                            onChange={onChangeMonth} 
                            onBlur={onBlurBirth}
                            onFocus={onBlurBirth}                              
                            value={field.생월} 
                            type="text" 
                            id="month" 
                            name="month" 
                            placeholder="MM" 
                            maxLength="2"
                            />
                            </li>
                          <li><span>/</span></li>
                          <li>
                            <input
                            onChange={onChangeDate} 
                            onBlur={onBlurBirth}
                            onFocus={onBlurBirth}                             
                            value={field.생일} 
                            type="text" 
                            id="date" 
                            name="date" 
                            placeholder="DD" 
                            maxLength="2"
                            />
                            </li>
                        </ul>
                      </div>
                      <div className="guide-text guide-birthday-confirm">
                        {
                          field.isShowBirthError && (
                            /* 3가지 가이드 텍스트 내용을 매개변수를 이용 처리한다 */
                            <p className="error">{field.isShowBirthText}</p>
                          )
                        }                                                                                                
                      </div> 
                    </div>
                  </li>

                  <li className="add-input-item">
                    <div className="left">
                      <label><span>추가입력 사항</span></label>
                    </div>
                    <div className="right gender add">
                      <label>
                        <input 
                        type="radio" 
                        id="add1" 
                        name="add" 
                        className="add-radio" 
                        value="추천인 아이디"
                        onChange={onChangeRadioAddInput}
                        checked={field.추가입력사항선택.includes('추천인 아이디')}
                        />
                        <span>추천인 아이디</span>
                      </label>                    
                      <label>
                        <input 
                        type="radio" 
                        id="add2" 
                        name="add" 
                        className="add-radio" 
                        value="참여 이벤트"
                        onChange={onChangeRadioAddInput}
                        checked={field.추가입력사항선택.includes('참여 이벤트')}
                        />
                        <span>참여 이벤트</span>
                      </label>
                      {
                        field.isShowAddInput && (
                          <div className="add-input-box">
                            <input onChange={onChangeAddInput} type="text" id="inputAdd" name="inputAdd" placeholder="추천인 아이디를 입력해주세요."/>
                            <p>
                              추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                              가입 이후, 수정이 불가합니다.<br/>
                              대소문자 및 띄어쓰기에 유의해주세요.
                            </p>
                          </div>  
                        )
                      }                                                                                                                                                          
                    </div>
                  </li>

                  <li>
                    <hr/>
                  </li>
                  
                  {/* 약관동의 : 체크박스 */}
                  <li className="check-box">
                    <div className="left">
                      <label><span>이용약관동의<i>*</i></span></label>
                    </div>
                    <div className="right service">

                      <ol>
                        <li>
                          <label>
                            <input onChange={onChangeServiceAll} checked={field.이용약관동의.length >= 7 ? true : false } type="checkbox" id="chkAll" name="chkAll"  value="전체동의합니다."/>
                            <span>전체동의합니다.</span>
                          </label>
                          <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                        </li>
                        <li className="view-box">
                          <label>
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('이용약관동의(필수)')} type="checkbox" id="chk1" name="chk1" className="chkbox-btn" value="이용약관동의(필수)"/>
                            <span>이용약관동의<i>(필수)</i></span>
                          </label>
                          <span  className="view-btn-box">
                            <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                          </span>
                        </li>
                        <li className="view-box">
                          <label>
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보 수집·이용(필수)')} type="checkbox" id="chk2" name="chk2" className="chkbox-btn" value="개인정보 수집·이용(필수)"/>
                            <span>개인정보 수집·이용<i>(필수)</i></span>
                          </label>
                          <span  className="view-btn-box">
                            <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                          </span>
                        </li>
                        <li className="view-box">
                          <label>
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('개인정보 수집·이용(선택)')} type="checkbox" id="chk3" name="chk3" className="chkbox-btn" value="개인정보 수집·이용(선택)"/>
                            <span>개인정보 수집·이용<i>(선택)</i></span>
                          </label>
                          <span  className="view-btn-box">
                            <a href="#!" className="view-btn" title="약관보기">약관보기<i>&gt;</i></a>
                          </span>
                        </li>
                        <li>
                          <label>
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의')} type="checkbox" id="chk4" name="chk4" className="chkbox-btn" value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의"/>
                            <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의<i>(선택)</i></span>
                          </label>
                          <dl>
                              <dd>
                                <label>
                                  <input onChange={onChangeService} checked={field.이용약관동의.includes('SMS')} type="checkbox" id="chk5" name="chk5" className="chkbox-btn" value="SMS"/>
                                  <span>SMS</span>
                                </label>
                                <label>
                                  <input onChange={onChangeService} checked={field.이용약관동의.includes('이메일')} type="checkbox" id="chk6" name="chk6" className="chkbox-btn" value="이메일"/>
                                  <span>이메일</span>
                                </label>
                              </dd>
                              <dt>
                                  <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                              </dt>
                          </dl>
                        </li>
                        <li>
                          <label>
                            <input onChange={onChangeService} checked={field.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')} type="checkbox" id="chk7" name="chk7" className="chkbox-btn" value="본인은 만 14세 이상입니다.(필수)"/>
                            <span>본인은 만 14세 이상입니다.<i>(필수)</i></span>
                          </label>
                        </li>
                      </ol>                  
                    </div>              
                  </li>
                  <li className="bottom-line">
                    <hr/>
                  </li>                
                  <li className="button-box">
                    {/* submit 섭밋(서브밋) : 폼전송을 해주는 기능 엔터치면 */}
                    {/* <button type="submit" className="submit-btn">가입하기</button> */}
                    <button type="submit" className="submit-btn">가입하기</button>
                  </li>
                </ul>
              </form>
            </div>
        </div>
      </div>
    </section>
  );
};

//프롭스 전달하기
MemberComponent.defaultProps = {
  이용약관: [      
      '이용약관동의(필수)',
      '개인정보 수집·이용(필수)',
      '개인정보 수집·이용(선택)',
      '무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
      'SMS',
      '이메일',
      '본인은 만 14세 이상입니다.(필수)',
  ]
}

export default MemberComponent;