case 'Open-Closed':
  return (
    <View style={styles.timingContainer}>
      <View style={styles.leftColumn}>
        { serviceData.about.Timings.length>0 && serviceData.about.Timings? (
          serviceData.about.Timings.map(day => (
            <Text key={day._id} style={styles.dayText}>
              {day.day}
            </Text>
          ))
        ) : (
          <Text style={styles.dayText}>Timing is not available</Text>
        )}
      </View>
      <View style={styles.rightColumn}>
        {serviceData && serviceData.about && serviceData.about.Timings ? (
          serviceData.about.Timings.map(day => (
            <Text key={day._id} style={styles.timingText}>
              {day.isOpen ? `${day.openTime} - ${day.closeTime}` : 'Closed'}
            </Text>
          ))
        ) : null}
      </View>
    </View>
  );
