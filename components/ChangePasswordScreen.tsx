import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
  BackHandler,
  Keyboard,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import environment from '@/environment/environment';
import { useFocusEffect } from 'expo-router';


type ChangePasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChangePasswordScreen'
>;

interface ChangePasswordScreenProps {
  navigation: ChangePasswordScreenNavigationProp;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);




  const validatePassword = () => {
  // Check if all fields are filled
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    Alert.alert('Error', 'All fields are required');
    return false;
  }

  // Check if new password meets format requirements
  if (newPassword.length < 8) {
    Alert.alert('Error', 'Your password must contain a minimum of 8 characters with 1 Uppercase, Numbers & Special characters.');
    return false;
  }

  // Check for at least 1 uppercase letter
  if (!/[A-Z]/.test(newPassword)) {
    Alert.alert('Error', 'Your password must contain a minimum of 8 characters with 1 Uppercase, Numbers & Special characters.');
    return false;
  }

  // Check for at least 1 number
  if (!/[0-9]/.test(newPassword)) {
    Alert.alert('Error', 'Your password must contain a minimum of 8 characters with 1 Uppercase, Numbers & Special characters.');
    return false;
  }

  // Check for at least 1 special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
    Alert.alert('Error', 'Your password must contain a minimum of 8 characters with 1 Uppercase, Numbers & Special characters.');
    return false;
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmNewPassword) {
    Alert.alert('Error', 'New password and confirm password do not match');
    return false;
  }

  return true;
};

  

 const handleChangePassword = async () => {
  Keyboard.dismiss()
  // Validate inputs before proceeding
  if (!validatePassword()) {
    return;
  }

  setLoading(true);

  try {
    const token = await AsyncStorage.getItem('authToken');
    
    if (!token) {
      Alert.alert('Error', 'Unauthorized access, please login again');
      navigation.replace('LoginScreen');
      return;
    }

    const response = await axios.put(
      `${environment.API_BASE_URL}api/auth/user/update-password`,
      { oldPassword: currentPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const url = `${environment.API_BASE_URL}api/auth/user/update-password`
   // console.log(url)

    if (response.status === 200) {
      Alert.alert('Success', 'Password updated successfully', [
        { text: 'OK', onPress: () => navigation.replace('LoginScreen') },
      ]);
       await AsyncStorage.multiRemove([
      "authToken",
      "tokenStoredTime",
      "tokenExpirationTime",
    ]);
    }
  } catch (error) {
    // Check for password mismatch error specifically
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      // Check if backend error message contains password match error
      const errorMsg = error.response.data.error;
      if (typeof errorMsg === 'string' && 
          (errorMsg.includes('Current Password does not match') || 
           errorMsg.toLowerCase().includes('password') && 
           errorMsg.toLowerCase().includes('match'))) {
        Alert.alert('Error', 'Current Password does not match. Please Re-enter');
      } else {
        Alert.alert('Error', errorMsg);
      }
    } else {
      Alert.alert('Error', 'Failed to update password. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

 useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled 
      className="flex-1"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Section with Background Vector Image */}
        <ImageBackground
          source={require('../assets/images/g16.webp')}
          className="h-64 items-center"
          resizeMode="cover"
        >
          <Image
            source={require('../assets/images/updatepsw.webp')}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </ImageBackground>
  
        {/* Form Section */}
        <View className="flex-1">
          <LinearGradient colors={['#854BDA', '#6E3DD1']} className="flex-1 rounded-t-3xl px-7 pt-6 pb-14">
            <Text className="text-white text-lg font-bold text-center mb-6 mt-[12%]">
              Change Your Password
            </Text>
  
            {/* Current Password */}
            <View className="bg-[#FFFFFF66] rounded-full flex-row items-center px-4 mb-4">
              <TextInput
                placeholder="Current Password"
                placeholderTextColor="#E5E5E5"
                className="flex-1 text-white py-3"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Icon name={showCurrentPassword ? 'eye-off' : 'eye'} size={20} color="#E5E5E5" />
              </TouchableOpacity>
            </View>
  
            {/* New Password */}
            <View className="bg-[#FFFFFF66] rounded-full flex-row items-center px-4 mb-4">
              <TextInput
                placeholder="New Password"
                placeholderTextColor="#E5E5E5"
                className="flex-1 text-white py-3"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Icon name={showNewPassword ? 'eye-off' : 'eye'} size={20} color="#E5E5E5" />
              </TouchableOpacity>
            </View>
  
            {/* Confirm New Password */}
            <View className="bg-[#FFFFFF66] rounded-full flex-row items-center px-4 mb-6">
              <TextInput
                placeholder="Confirm New Password"
                placeholderTextColor="#E5E5E5"
                className="flex-1 text-white py-3"
                secureTextEntry={!showConfirmPassword}
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#E5E5E5" />
              </TouchableOpacity>
            </View>
  
            {/* Update Button */}
            <TouchableOpacity
              className="bg-white rounded-full py-3 px-10 self-center"
              onPress={handleChangePassword}
              disabled={loading}
            >
              <Text className="text-purple-600 font-bold text-lg">
                {loading ? 'Updating...' : 'Update'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  
};

export default ChangePasswordScreen;



