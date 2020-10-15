import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserModule } from './../src/user/user.module';
import { CreateUserDTO } from './../src/user/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('User CRUD', async done => {
    const server = request(app.getHttpServer());

    const currentGetAllRequest = await server.get('/user/getUsers').expect(200);
    const currentSize = currentGetAllRequest.body.length;

    const newUser: CreateUserDTO = {
      userName: 'juli65',
      passsword: '123',
      name: 'Julian Leonardo',
      lastname: 'Cardozo',
      nationality: 1,
      imgProfile:
        'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
      isActive: true,
      lastLogin: new Date('2020-09-30T11:35:35.415Z'),
      createAt: new Date('2020-09-30T11:35:35.415Z'),
    };

    const userToDelete: CreateUserDTO = {
      userName: 'juli65',
      passsword: '123',
      name: 'Julian Leonardo',
      lastname: 'Cardozo',
      nationality: 1,
      imgProfile:
        'https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
      isActive: false,
      lastLogin: new Date('2020-09-30T11:35:35.415Z'),
      createAt: new Date('2020-09-30T11:35:35.415Z'),
    };

    const newUserRequest = await server
      .post('/user/createUser')
      .type('form')
      .send(newUser)
      .expect(201);

    expect(newUserRequest.body.user.name).toBe(newUser.name);

    const postNewRequest = await server.get('/user/getUsers').expect(200);
    const postNewSize = postNewRequest.body.length;
    expect(postNewSize).toBe(currentSize + 1);

    const id = newUserRequest.body.user._id;
    const getUserByIdRequest = await server.get(`/user/getUsersById/${id}`);
    expect(getUserByIdRequest.body._id).toBe(id);
    expect(getUserByIdRequest.body.isActive).toBe(true);

    const userLogcalDeletion = await server
      .delete('/user/logicDeleteUser')
      .type('form')
      .send({
        user: userToDelete,
        deletionReason: {
          idUser: id,
          reason: 'Prueba End to End',
          userName: 'endToEndTest',
        },
      })
      .expect(200);
    expect(userLogcalDeletion.body.user.isActive).toBe(false);

    const userDeleted = await server
      .delete('/user/deletionUser')
      .type('form')
      .send({
        idUser: id,
        reason: 'Prueba End to End',
        userName: 'endToEndTest',
      })
      .expect(200);
    expect(userDeleted.body.message).toBe('User Successfully Deleted');

    done();
  });
});
