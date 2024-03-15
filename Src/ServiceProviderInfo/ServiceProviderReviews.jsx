import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../theme';
import { useRoute } from '@react-navigation/native';
import { beautaionReview } from '../../services/beautationData';

const ServiceProviderReviews = () => {
  const [reviewData, setReviewData] = useState(null);
  const route = useRoute();
  const { beauticianId } = route.params;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await beautaionReview(beauticianId);
        setReviewData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!reviewData) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  const calculateTimeAgo = (reviewDate) => {
    const now = new Date();
    const reviewDateTime = new Date(reviewDate);
    const diffTime = Math.abs(now - reviewDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  const reviews = reviewData.Reviews.map(review => ({
    id: review._id,
    name: `${review.UserFirstName} ${review.UserLastName}`,
    rating: parseFloat(review.Rating),
    time: calculateTimeAgo(review.Date),
    review: review.Description,
  }));

  return (
    <View style={styles.container}>
      {reviews.map(review => (
        <View key={review.id} style={styles.reviewContainer}>
          <Image source={require('../../assets/profile.png')} style={styles.image} />
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{review.name}</Text>
            <View style={styles.starContainer}>
              {Array.from({ length: review.rating }, (_, index) => (
                <Text key={index} style={styles.star}>
                  ⭐
                </Text>
              ))}
            </View>
            <Text style={styles.reviewText}>{review.review}</Text>
          </View>
          <Text style={styles.time}>{review.time}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    color: colors.font1,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    color: '#F4C01E',
    fontSize: 16,
    marginRight: 4,
  },
  reviewText: {
    color: colors.font1,
    fontSize: 14,
  },
  time: {
    color: '#B5B5B5',
    fontSize: 12,
  },
});

export default ServiceProviderReviews;
