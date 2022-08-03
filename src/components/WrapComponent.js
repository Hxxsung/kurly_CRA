import React, { useState } from 'react';
import HeaderComponet from './HeaderComponet.js';
import MainComponent from './MainComponent.js';
import FooterComponet from './FooterComponet.js';
import ModalComponent from './ModalComponent.js';

const WrapComponent = () => {

  //모달 상태관리
  const [modal, setModal] = useState({isShow: false, title:''});

  const modalCloseFn=()=>{
    setModal({...modal, isShow: false});
  }
  
  const modalOpenFn=(z)=>{
    setModal({...modal, isShow: true, title: z});
  }

  return (
    <div id="wrap">
      <HeaderComponet />
      <MainComponent modalOpenFn={modalOpenFn} />
      <FooterComponet />
      <ModalComponent modal={modal} modalCloseFn={modalCloseFn}/>
    </div>
  );
};

export default WrapComponent;