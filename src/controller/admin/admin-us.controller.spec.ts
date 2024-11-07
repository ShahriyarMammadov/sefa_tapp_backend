// import { Test, TestingModule } from '@nestjs/testing';
// import { AdminController } from './admin-us.controller';
// import { AdminService } from '../../services/admin/admin.service';

// describe('MemberShipController', () => {
//   let controller: AdminController;
//   let service: AdminService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [],
//       providers: [
//         {
//           provide: AdminService,
//           useValue: {
//             createAdmin: jest.fn(),
//             getAllAdmin: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<AdminController>(AdminController);
//     service = module.get<AdminService>(AdminService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
