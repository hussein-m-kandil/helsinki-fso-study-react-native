import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import { describe, it, expect, jest } from '@jest/globals';

import SignInContainer from './SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const values = { username: 'elina', password: 'password' };
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const signInButton = screen.getByText('Sign in');

      fireEvent.changeText(usernameInput, values.username);
      fireEvent.changeText(passwordInput, values.password);
      fireEvent.press(signInButton);

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
      expect(onSubmit.mock.calls[0][0]).toStrictEqual(values);
    });
  });
});
