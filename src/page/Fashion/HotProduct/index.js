import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Heading from '../Heading';
import ProductCard from '../../../components/Common/Product/ProductCard';
import { fetchProducts } from '../../../app/thunks/productThunks';
import Pagination from '../../../components/Common/Pagination';

const HotProduct = () => {
  const dispatch = useDispatch();
  const TumUrunler = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = TumUrunler.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section id="hot-Product_area" className="ptb-100">
        <div className="container">
          <Heading
            baslik="Yeni Ürünler"
            altBaslik="Herkesin BT Shop tan Alışveriş Yaptığını Görün"
          />
          <div className="row">
            <div className="col-lg-12">
              <div className="tabs_center_button">
                <ul className="nav nav-tabs">
                  <li>
                    <a data-toggle="tab" href="#new_arrival" className="active">
                      Yeni Gelen Ürünler
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#trending">
                      Trend
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#best_sellers">
                      En Çok Satanlar
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#featured">
                      Öne Çıkanlar
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#on_sall">
                      Satışta
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs_el_wrapper">
                <div className="tab-content">
                  <div id="new_arrival" className="tab-pane fade show in active">
                    <div className="row">
                      {currentProducts.map((urun, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                          <ProductCard data={urun} />
                        </div>
                      ))}
                    </div>
                    <Pagination
                      productsPerPage={productsPerPage}
                      totalProducts={TumUrunler.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                  <div id="trending" className="tab-pane fade">
                    <div className="row">
                      {TumUrunler.slice(3, 5).map((urun, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                          <ProductCard data={urun} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="best_sellers" className="tab-pane fade">
                    <div className="row">
                      {TumUrunler.slice(4, 7).map((urun, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                          <ProductCard data={urun} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="featured" className="tab-pane fade">
                    <div className="row">
                      {TumUrunler.slice(5, 9).map((urun, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                          <ProductCard data={urun} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div id="on_sall" className="tab-pane fade">
                    <div className="row">
                      {TumUrunler.slice(2, 7).map((urun, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={index}>
                          <ProductCard data={urun} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HotProduct;
