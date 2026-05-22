import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CREATE_REVIEW } from '../../graphql/mutations';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../../theme';
import Text from '../Text';

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

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer('Rating must be a whole number')
    .min(0, 'Rating cannot be below 0')
    .max(100, 'Rating cannot be more than 100'),
  text: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();

  const [mutation, { error }] = useMutation(CREATE_REVIEW, {
    onCompleted: (data) => navigate(`/${data.createReview.repositoryId}`),
  });

  const handleSubmit = (values) => {
    mutation({ variables: { review: validationSchema.cast(values) } });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const ownerNameError = formik.touched.ownerName && formik.errors.ownerName;
  const repositoryNameError =
    formik.touched.repositoryName && formik.errors.repositoryName;
  const ratingError = formik.touched.rating && formik.errors.rating;
  const textError = formik.touched.text && formik.errors.text;

  return (
    <ScrollView>
      <View style={styles.container}>
        {error && <Text style={styles.error}>{error.message}</Text>}
        <View>
          <TextInput
            style={[styles.input, ownerNameError && styles.invalidInput]}
            placeholder='Repository owner name'
            value={formik.values.ownerName}
            onChangeText={formik.handleChange('ownerName')}
            onBlur={formik.handleBlur('ownerName')}
          />
          {ownerNameError && (
            <Text style={styles.error}>{ownerNameError}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={[styles.input, repositoryNameError && styles.invalidInput]}
            placeholder='Repository name'
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange('repositoryName')}
            onBlur={formik.handleBlur('repositoryName')}
          />
          {repositoryNameError && (
            <Text style={styles.error}>{repositoryNameError}</Text>
          )}
        </View>
        <View>
          <TextInput
            keyboardType='numeric'
            style={[styles.input, ratingError && styles.invalidInput]}
            placeholder='Rating between 0 and 100'
            value={`${formik.values.rating}`}
            onChangeText={formik.handleChange('rating')}
            onBlur={formik.handleBlur('rating')}
          />
          {ratingError && <Text style={styles.error}>{ratingError}</Text>}
        </View>
        <View>
          <TextInput
            multiline
            style={[styles.input, textError && styles.invalidInput]}
            placeholder='Review'
            value={formik.values.text}
            onChangeText={formik.handleChange('text')}
            onBlur={formik.handleBlur('text')}
          />
          {textError && <Text style={styles.error}>{textError}</Text>}
        </View>
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Create a review</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CreateReview;
