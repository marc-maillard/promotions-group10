import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Promotions APIs', () => {
  const promotion = {
    isPublic: true,
    promotionCode: '',
    tags: ['TV', 'Sony', '43 inches'],
    discount: 0.1
  };

  describe('# POST /promotions', () => {
    it('should return OK', (done) => {
      request(app)
                .post('/promotions')
                .send(promotion)
                .expect(httpStatus.OK)
                .then((res) => {
                  expect(res.body.isPublic).to.equal(promotion.isPublic);
                  expect(res.body.promotionCode).to.equal(promotion.promotionCode);
                  expect(res.body.tags).to.eql(promotion.tags);
                  expect(res.body.discount).to.equal(promotion.discount);
                  done();
                })
                .catch(done);
    });
  });

  const promotionPublicWithCode = {
    isPublic: true,
    promotionCode: '4789h#€%',
    tags: ['TV', 'Sony', '43 inches'],
    discount: 0.1
  };

  describe('# POST /promotions', () => {
    it('should return BAD REQUEST when public and has code', (done) => {
      request(app)
                .post('/promotions')
                .send(promotionPublicWithCode)
                .expect(httpStatus.BAD_REQUEST)
                .then(() => {
                  done();
                })
                .catch(done);
    });
  });

  const promotionPrivateWithoutCode = {
    isPublic: false,
    promotionCode: '',
    tags: ['TV', 'Sony', '43 inches'],
    discount: 0.1
  };

  describe('# POST /promotions', () => {
    it('should return BAD REQUEST when private and has no code', (done) => {
      request(app)
                .post('/promotions')
                .send(promotionPrivateWithoutCode)
                .expect(httpStatus.BAD_REQUEST)
                .then(() => {
                  done();
                })
                .catch(done);
    });
  });

  /*
  const simpleProducts = [{
    articleId: '1',
    price: 6400,
    tags: ['TV', 'Sony', '43 inches']
  }];
  const promotionCode = 'promotionCode1';
  const discount = {
    price: 640
  };


  describe('# POST /promotions/{promotionCode}', () => {
    it('should return OK', (done) => {
      request(app)
                .post(`/promotions/${promotionCode}`)
                .send(simpleProducts)
                .expect(httpStatus.OK)
                .then((res) => {
                  expect(res.body.price).to.equal(discount.price);
                  done();
                })
                .catch(done);
    });
  });
  */
});
