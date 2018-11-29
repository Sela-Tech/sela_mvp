// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import supertest from 'supertest';
// import app from '../server/app';
// import db from '.././server/models'
// import {
//   insertUserSeed,
//   user1token,
    
//   user2token,
//   insertContactSeed,
//   validContact,
//   contactWithNoContactName,
//   contactWithNoPhone
  
// } from './helpers/mockData';

// const expect = chai.expect;
// const request = supertest(app);
// let token = '';
// let token1 = '';

// chai.use(chaiHttp);

// describe('Contact Controller', () => {
//   before((done) => {
    
//         insertUserSeed();
//         insertContactSeed();
      

//         token = user1token;
//         token1 = user2token;
//         done();
//   });

//   describe('Create New contact POST: /api/contact', () => {
//     it('should successfully create a new contact', (done) => {
//       request
//         .post('/api/contact')
//         .set({ authorization: token })
//         .send(validContact)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(201)
//           expect(res.body.contact.id).to.equal(3);
//           done();
//         });
//     });
//   });

//   describe('Create New contact Validation POST:/api/contact', () => {
//     it('should return a 400 error with no contact name', (done) => {
//       request
//         .post('/api/contact')
//         .set({ authorization: token })
//         .send(contactWithNoContactName)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(400)
//           expect(res.body.message[0].msg)
//             .to
//             .equal(
//             'contact name can\'t be empty.'
//             );
//           done();
//         });
//     });
//     it('should return a 400 error with no contact phone', (done) => {
//       request
//         .post('/api/contact')
//         .set({ authorization: token })
//         .send(contactWithNoPhone)
//         .end((err, res) => {
//           if (err) return done(err);
//           expect(res.status).to.equal(400)
//           expect(res.body.message[0].msg)
//             .to
//             .equal(
//             'Phone number cannot be empty.'
//             );
//           done();
//         });
//     });
   

//   });
 






// //   //  user contact test suite

// describe('Gets contacts added by the Authenticated user Get: /api/v1/groove/users/:id/events', ()=>{
    
//     it('should return contacts of the current user', (done) => {
//           request
//             .get(`/api/contact/`)
//             .set({ authorization: token })
//             .expect(200)
//             .end((err, res) => {
//               if (err) return done(err);
//               expect(res.body.contacts.length).to.equal(3);
//               done();
//             });
//         });

// });


 
//   // // Delete recipes test suite

// //   describe('Delete Recipes Suite DELETE: /api/v1/recipes', () => {
// //     describe('Delete User Recipe', () => {
// //       it('should successfully delete a recipe added by the authenticated use',
// //         (done) => {
// //           request
// //             .delete(`/api/v1/recipes/1`)
// //             .set({ authorization: token })
// //             .expect(200)
// //             .end((err, res) => {
// //               if (err) return done(err);
// //               expect(res.body.message).to.equal('Recipe deleted');
// //               done();
// //             });
// //         });
// //     });
// //     describe('Delete User Recipe Validation DELETE: /api/v1/recipes/:id',
// //       () => {
// //         it(`should return a 403 error on 
// //         deleting a recipe added by another user`,
// //           (done) => {
// //             request
// //               .delete(`/api/v1/recipes/3`)
// //               .set({ authorization: token })
// //               .expect(403)
// //               .end((err, res) => {
// //                 if (err) return done(err);
// //                 expect(res.body.message)
// //                   .to
// //                   .equal('You don\'t have permision to delete this recipe');
// //                 done();
// //               });
// //           });
// //       });
// //     it('should retuen a 404 error if no recipe with the ID supplied',
// //       (done) => {
// //         request
// //           .delete(`/api/v1/recipes/${99}`)
// //           .set({ authorization: token })
// //           .expect(404)
// //           .end((err, res) => {
// //             if (res) return done(err);
// //             expect(res.body.message)
// //               .to
// //               .equal('Not found');
// //             done();
// //           });
// //       });
// //   });

// });