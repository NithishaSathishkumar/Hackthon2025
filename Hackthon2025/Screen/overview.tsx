import React, { useState } from 'react';
import {
  Pressable,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';

export default function Overview() {
  const [hobby, setHobby] = useState('');
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  // Wager state
  const [wagerType, setWagerType] = useState<'money' | 'other' | null>(null);
  const [wagerAmount, setWagerAmount] = useState('');
  const [wagerOther, setWagerOther] = useState('');

  const onChange = (_: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setEndDate(selectedDate);
  };

  const daysDiff = endDate
    ? Math.ceil(
        (endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.form}>
        <Text style={styles.message}>Game Details</Text>

        {/* Hobby to Track */}
        <Text style={styles.subFormTitle}>Hobby to Track</Text>
        <TextInput
          placeholder="e.g. Reading"
          placeholderTextColor="#999"
          style={styles.formInput}
          value={hobby}
          onChangeText={setHobby}
        />

        {/* End Date */}
        <Text style={styles.subFormTitle}>End Date</Text>
        <TouchableOpacity
          style={styles.formInput}
          onPress={() => setShowPicker(true)}
        >
          <Text style={endDate ? styles.dateText : styles.placeholderText}>
            {endDate
              ? endDate.toLocaleDateString()
              : 'Tap to select end date'}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={endDate ?? new Date()}
            mode="date"
            display="calendar"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
        {daysDiff !== null && (
          <Text style={styles.result}>
            {daysDiff} day{daysDiff === 1 ? '' : 's'} from today
          </Text>
        )}

        {/* Wager selector */}
        <Text style={styles.subFormTitle}>Wager</Text>
        <TouchableOpacity
          onPress={() => setWagerType('money')}
          style={[
            styles.formInput,
            wagerType === 'money' && { backgroundColor: 'orange' },
          ]}
        >
          <Text
            style={[
              styles.placeholderText,
              wagerType === 'money' && { color: '#000' },
            ]}
          >
            Money
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setWagerType('other')}
          style={[
            styles.formInput,
            wagerType === 'other' && { backgroundColor: 'orange' },
          ]}
        >
          <Text
            style={[
              styles.placeholderText,
              wagerType === 'other' && { color: '#000' },
            ]}
          >
            Other
          </Text>
        </TouchableOpacity>

        {/* Single conditional input */}
        {wagerType && (
          <TextInput
            style={styles.formInput}
            placeholder={
              wagerType === 'money' ? 'Enter amount' : 'Describe your wager'
            }
            placeholderTextColor="#999"
            keyboardType={wagerType === 'money' ? 'numeric' : 'default'}
            multiline={wagerType === 'other'}
            numberOfLines={wagerType === 'other' ? 4 : 1}
            textAlignVertical={wagerType === 'other' ? 'top' : 'center'}
            value={wagerType === 'money' ? wagerAmount : wagerOther}
            onChangeText={
              wagerType === 'money' ? setWagerAmount : setWagerOther
            }
          />
        )}

        {/* Next & Back row */}
        <View style={styles.actionRow}>
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={() => {
              /* back action */
            }}
          >
            <Text style={styles.actionText}>Back</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
            onPress={() => {
              
            Alert.alert(
                "Disclaimer",
                "PLACE HOLDER NAME is made with the intention of keeping you accountable, currently it's easy to cheat, please only create matches with people you trust. We are not responsible for any loss of money or other consequences that may arise from using this app.",
                [
                    { text: "Deny", onPress: () => console.log("User denied") },
                    { text: "Accept", onPress: () => console.log("User accepted") }, /* next action */
                ]
            );
            }}
          >
            <Text style={styles.actionText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subFormTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 8,
  },
  formInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 12,
    justifyContent: 'center',
    color: 'white',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
  },


  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 0.48,
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonPressed: {
    backgroundColor: 'orange',
  },
  actionText: {
    color: '#fff',
    fontSize: 16
  },
});