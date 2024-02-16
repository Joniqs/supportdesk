import authReducer, {
  register,
  login,
  logout,
} from '../features/auth/authSlice';

import authService from '../features/auth/authService'; // Import authService

// Mock authService methods
jest.mock('../features/auth/authService', () => ({
  register: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
}));

describe('auth slice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    const nextState = authReducer(undefined, {});
    expect(nextState).toEqual({
      user: null,
      isLoading: false,
    });
  });

  describe('register thunk', () => {
    it('should handle successful registration', async () => {
      const mockUser = { email: 'test@gmail.com', password: 'test123' };
      const mockedReturnValue = {
        id: '659f97d9b655a636c487c16a',
        name: 'test',
      }; // Adjust as needed
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      authService.register.mockResolvedValueOnce(mockedReturnValue);

      await register(mockUser)(mockDispatch, mockGetState, undefined);

      expect(authService.register).toHaveBeenCalledWith(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(
        register.fulfilled(mockedReturnValue)
      );
    });

    it('should handle registration failure', async () => {
      const mockUser = { email: 'test@gmail.com', password: 'test123' };
      const mockError = new Error('Registration failed');
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      authService.register.mockRejectedValueOnce(mockError);

      await register(mockUser)(mockDispatch, mockGetState, undefined);

      expect(authService.register).toHaveBeenCalledWith(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(
        register.rejected(mockError.message)
      );
    });
  });

  // Similar tests can be written for the login thunk

  describe('logout action', () => {
    it('should handle logout', () => {
      const mockDispatch = jest.fn();

      // Dispatch logout action
      logout(mockDispatch);

      expect(authService.logout).toHaveBeenCalled();
      // Check if logout action is dispatched with the correct payload and type
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'auth/logout',
        payload: {},
      });
    });
  });
});
