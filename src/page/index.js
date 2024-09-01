// eslint-disable-next-line no-unused-vars
import React from 'react';
import TopHeader from '../components/Common/Header/TopHeader';
import Header from '../components/Common/Header';
import FashionBanner from './Fashion/Banner';
import BannerBottom from './Fashion/BannerBottom';
import HotProduct from './Fashion/HotProduct';
import Footer from '../components/Common/Footer';
import LiveChatUser from '../features/live-chat/LiveChatUser';

const Fashion = () => {
  return (
    <div>
      <TopHeader />
      <Header />
      {/* <FashionBanner /> */}
      {/* <BannerBottom /> */}
      <HotProduct />
      <Footer />
      <LiveChatUser />
    </div>
  );
};
export default Fashion;
