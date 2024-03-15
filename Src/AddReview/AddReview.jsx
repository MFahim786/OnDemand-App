import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';
import { addReview } from '../../services/addReview';
import { useRoute } from '@react-navigation/core';
const AddReview = () => {
    const route= useRoute();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false); // State variable for loading indicator
  const { id } = route.params;
  // Function to render stars for rating selection
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.star}>
          <Ionicons name={i <= rating ? 'star' : 'star-outline'} size={24} color={i <= rating ? 'gold' : 'gray'} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // Function to handle review submission
  const handleSubmitReview = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }
    if (description.trim() === '') {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }
    setLoading(true); // Set loading to true while submitting review
    try {
      console.log('Rating:', rating);
      console.log('Description:', description);
      const response = await addReview({ rating, description,id });
      // Process response or perform further actions if needed
      console.log('Review submitted successfully:', response);
      Alert.alert('Success', 'Review submitted successfully.');
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false after review submission
      setRating(0); // Reset rating
      setDescription(''); // Clear description input
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rating:</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionLabel}>Description:</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Write your description..."
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="white" /> // Show loading indicator if loading is true
        ) : (
          <Text style={styles.submitButtonText}>Submit Review</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 18,
    marginRight: 10,
    color:colors.font1
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    fontSize: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: colors.ServiceProvider_buttonBackground,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    color:colors.font1
  },
});

export default AddReview;
