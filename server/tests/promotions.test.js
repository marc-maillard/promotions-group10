import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { } from 'chai';
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
    promotionCode: '4789h#€%',
    tags: ['TV', 'Sony', '43 inches'],
    discount: 10
  };

  describe('# POST /promotions', () => {
    it('should return OK', (done) => {
      request(app)
                .post('/api/promotions')
                .send(promotion)
                .expect(httpStatus.OK)
                .then(() => {
                  done();
                })
                .catch(done);
    });
  });
});
