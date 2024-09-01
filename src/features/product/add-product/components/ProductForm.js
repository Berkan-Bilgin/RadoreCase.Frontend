import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProductApi } from '../../../../app/api/productsApi';

const ProductForm = () => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const initialValues = {
    categoryId: '1',
    hoverImg: 'string',
    title: '',
    price: '',
    description: '',
    stars: 0,
    reviews: 0,
    colorOptions: [{ color: '', img: '', quantity: 0 }],
    img: null,
  };

  const validationSchema = Yup.object({
    categoryId: Yup.string().required('Kategori seçimi zorunludur'),
    title: Yup.string().required('Başlık zorunludur'),
    price: Yup.number().required('Fiyat zorunludur').positive('Fiyat pozitif olmalıdır'),
    description: Yup.string().required('Açıklama zorunludur'),
    img: Yup.mixed().required('Resim yüklenmesi zorunludur'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();

    formData.append('categoryId', values.categoryId);
    formData.append('hoverImg', values.hoverImg);
    formData.append('title', values.title);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('stars', values.stars);
    formData.append('reviews', values.reviews);
    formData.append('colorOptions', JSON.stringify(values.colorOptions));

    if (values.img) {
      formData.append('img', values.img);
    }

    try {
      const data = await createProductApi(formData);
      console.log('Ürün başarıyla eklendi:', data);
      resetForm();
      setPreviewUrl(null);
    } catch (error) {
      console.error('Hata:', error);
    }

    setSubmitting(false);
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue('img', file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-10 mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="p-4 bg-light border rounded">
              <h3 className="mb-4 text-center">Ürün Ekle</h3>

              <div className="mb-3">
                <label htmlFor="categoryId">Kategori</label>
                <Field as="select" name="categoryId" className="form-control">
                  <option value="1">Fashion</option>
                  <option value="2">Technology</option>
                  <option value="5">Books</option>
                </Field>
                <ErrorMessage name="categoryId" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="title">Başlık</label>
                <Field name="title" type="text" className="form-control" />
                <ErrorMessage name="title" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="price">Fiyat</label>
                <Field name="price" type="number" className="form-control" />
                <ErrorMessage name="price" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="description">Açıklama</label>
                <Field name="description" as="textarea" className="form-control" />
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="img" className="form-label">
                  Resim Yükle
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="form-control"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                <ErrorMessage name="img" component="div" className="text-danger" />
              </div>

              {previewUrl && (
                <div className="mb-3">
                  <img
                    src={previewUrl}
                    alt="Önizleme"
                    className="img-thumbnail"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                {isSubmitting ? 'Ekleniyor...' : 'Ürünü Ekle'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductForm;
