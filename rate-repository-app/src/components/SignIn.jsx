import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contrast,
    padding: 20,
    gap: 20,
  },
  input: {
    borderColor: theme.colors.accent,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  invalidInput: {
    borderColor: theme.colors.danger,
  },
  error: {
    color: theme.colors.danger,
    marginTop: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    color: theme.colors.contrast,
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object().shape({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: () => {
      const { username, password } = formik.values;
      alert(`Hello, ${username}:${password}!`);
      formik.resetForm();
    },
  });

  const usernameError = formik.touched.username && formik.errors.username;
  const passwordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={[styles.input, usernameError && styles.invalidInput]}
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      </View>
      <View>
        <TextInput
          secureTextEntry
          style={[styles.input, passwordError && styles.invalidInput]}
          placeholder='Password'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
        />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
