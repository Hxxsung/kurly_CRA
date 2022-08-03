import React from 'react';

const ModalComponet = ({modal, modalCloseFn}) => {
  
  const onClickClose=()=>{
    //부모 컴포넌트의 isShow = false를 변환하기위해서
    //부모 컴포넌트에서 변환하는 함수를 내려 보낸다.
    modalCloseFn(); //함수 호출 실행 닫기실행
  }

  return (
    modal.isShow && (
      <div id="modal">
        <div className="container">
          <ul>
            <li>
              <h2>알림메시지</h2>
              <button onClick={onClickClose} className="close-btn modal-close"><img src="./images/icon-close-button.webp" alt="close"/></button>
            </li>
            <li>
              <p className="modal-message">{modal.title}</p>
            </li>
          </ul>
          <div className='button-box'>
            <button onClick={onClickClose} className="ok-btn modal-close">확인</button>
          </div>
        </div> 
      </div>
    )
  );
};

export default ModalComponet;