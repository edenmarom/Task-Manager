import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { TaskManagerState } from '../state/reducers/task-manager-state';
import { User, UserAuthData } from '../interfaces/user.model';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let mockStore: any;
  const mockAuthData: UserAuthData = { userId: '123', token: 'fake-token' };
  const mockUser: User = { id: '123', name: 'Test User', email: 'test@example.com', phone: '123456', dob: '2000-01-01', imgUrl: '' };

  beforeEach(() => {
    mockStore = { select: jest.fn().mockReturnValue(of(mockAuthData)) };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: Store<TaskManagerState>, useValue: mockStore },
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data when authenticated', (done) => {
    service.getUserData().subscribe((user) => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/user/getUserById/123`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('fake-token');

    req.flush(mockUser);
  });

  it('should not fetch user data when unauthenticated', (done) => {
    mockStore.select.mockReturnValue(of(null));

    service.getUserData().subscribe((user) => {
      expect(user).toBeNull();
      done();
    });

    httpMock.expectNone(`http://localhost:3000/user/getUserById/123`);
  });

  it('should update user data when authenticated', (done) => {
    const updatedUser: Partial<User> = { name: 'Updated Name' };

    service.updateUser(updatedUser).subscribe((user) => {
      expect(user).toEqual({ ...mockUser, ...updatedUser });
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/user/updateUser/123`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('fake-token');
    
    req.flush({ ...mockUser, ...updatedUser });
  });

  it('should throw an error when updating while unauthenticated', (done) => {
    mockStore.select.mockReturnValue(of(null));

    service.updateUser({ name: 'New Name' }).subscribe({
      error: (err) => {
        expect(err.message).toBe('User is not authenticated');
        done();
      }
    });

    httpMock.expectNone(`http://localhost:3000/user/updateUser/123`);
  });
});
