import React from 'react';

const HeaderComponet = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="wrap">
          <div className="popup">
              <div className="popup-container">
                {/*팝업전체링크*/}
                <a href="#!">
                  <span>
                    지금 가입하고 인기상품 100원 에 받아가세요!
                    <i>
                      <img src="./images/ico_arrow_fff_84x84.webp" alt=""/>
                    </i>
                  </span>
                </a>
                {/*닫기버튼*/}
                <span>
                  <button className="popup-close-btn" title="닫기">
                    <img src="./images/ico_close_fff_42x42.webp" alt=""/>
                  </button>
                </span>
              </div>
          </div>
          <h1><a href="#!" className="logo" title="logo"><img src="./images/logo_x2.png" alt="logo"/></a></h1>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponet;