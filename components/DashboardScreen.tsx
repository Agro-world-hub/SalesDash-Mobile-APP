import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
  RefreshControl
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack"; 
import { RootStackParamList } from "./types"; 
import { Bar } from 'react-native-progress';
import { LinearGradient } from "expo-linear-gradient";
import DashboardSkeleton from "../components/Skeleton/DashboardSkeleton"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import environment from "@/environment/environment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useTheme } from '../ThemeContext';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, "DashboardScreen">;

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

interface Package {
  id: number;
  displayName: string;
  image: string;
  price: string;
  name: string;
  total: string;
  description: string;
  portion: number;
  period: number;
}

interface AgentStats {
  daily: {
    target: number;
    completed: number;
    numOfStars: number;
    progress: number;
  };
  monthly: {
    totalStars: number;
  };
}


const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({ firstName: "" });
  const [packages, setPackages] = useState<Package[]>([]);
  const [agentStats, setAgentStats] = useState<AgentStats>({
    daily: {
      target: 10,
      completed: 0,
      numOfStars: 0,
      progress: 0
    },
    monthly: {
      totalStars: 0
    }
  });

  useEffect(() => {
    // Handle hardware back button (Android)
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Return true to prevent default behavior (going back)
      return true;
    });
  
    return () => backHandler.remove();
  }, []);
  
  const refreshData = async () => {
    setIsLoading(true);
    await Promise.all([getUserProfile(), fetchPackages(), fetchAgentStats()]);
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshData();
    });
    
    return unsubscribe;
  }, [navigation]);

  const getUserProfile = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (!storedToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
        return;
      }
      setToken(storedToken);

      const response = await axios.get(`${environment.API_BASE_URL}api/auth/user/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setFormData(response.data.data);
    } catch (error) {
      console.error("Profile fetch error:", error);

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await AsyncStorage.removeItem("authToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
        return;
      }
      Alert.alert("Error", "Failed to fetch user profile");
    }
  };

  const fetchPackages = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (!storedToken) return;

      setToken(storedToken);

      const response = await axios.get<{ data: Package[] }>(
        `${environment.API_BASE_URL}api/packages/get-packages`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setPackages(response.data.data);
    } catch (error) {
      console.error("Package fetch error:", error);
    }
  };

  const fetchAgentStats = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (!storedToken) return;

      const response = await axios.get<{ data: AgentStats }>(
        `${environment.API_BASE_URL}api/orders/sales-agent`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setAgentStats(response.data.data);
    } catch (error) {
      console.error("Failed to fetch agent stats:", error);
    }
  };

 

  const renderPackage = ({ item }: { item: Package }) => (
    <View
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl m-3 p-3 w-[45%] items-center mb-6`}
      style={{
        shadowColor: isDarkMode ? "#fff" : "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDarkMode ? 0.3 : 0.2,
        shadowRadius: 8,
        elevation: 10,
      }}
    >
      <Image source={{ uri: item.image }} className="w-20 h-20 mb-3" resizeMode="contain" />
      <Text className={`font-bold ${isDarkMode ? 'text-[#a67dff]' : 'text-[#6A3AD0]'}`}>
        {item.displayName}
      </Text>
      <Text className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
        Rs. {item.total}
      </Text>
    
      <LinearGradient
        colors={isDarkMode ? ["#a67dff", "#854BDA"] : ["#854BDA", "#6E3DD1"]}
        style={{
          marginTop: 12,
          borderRadius: 16,
          paddingVertical: 6,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => 
            navigation.navigate("ViewScreen", {
              selectedPackageId: item.id,
              selectedPackageName: item.displayName,
              selectedPackageImage: item.image,
              selectedPackageTotal: item.total,
              selectedPackageDescription: item.description,
              selectedPackageportion: item.portion,
              selectedPackageperiod: item.period
            })
          }
          className="items-center"
        >
          <Text className="text-white font-bold text-sm">View</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled 
      className="flex-1"
    >
      <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        
        <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md p-5 rounded-b-3xl`}>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate("SidebarScreen")}>
                <Image source={require("../assets/images/profile.png")} className="w-12 h-12 rounded-full" />
              </TouchableOpacity>
              <Text className={`ml-3 text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Hello, {formData.firstName}
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              {/* Dark Mode Toggle */}
              {/* <TouchableOpacity 
                onPress={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
              >
                <Image 
                  source={
                    isDarkMode 
                      ? require("../assets/images/bell.png") 
                      : require("../assets/images/Clock.png")
                  } 
                  className="w-5 h-5" 
                  resizeMode="contain"
                />
              </TouchableOpacity> */}

              <View className={`flex-row items-center ${isDarkMode ? 'bg-gray-700' : 'bg-[#E6DBF766]'} py-1 px-3 rounded-full`}>
                <Image source={require("../assets/images/star.png")} className="w-6 h-6" resizeMode="contain" />
                <Text className={`ml-2 font-bold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                  {agentStats.monthly.totalStars}
                </Text>
              </View>
            </View>
          </View>

          
          <Text className={`text-lg ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} mt-5 font-bold`}>
            Your Daily Target
          </Text>
          <View className={`flex-row ${isDarkMode ? 'bg-[#4a3b7d]' : 'bg-[#824AD933]'} h-14 rounded-xl items-center mt-3 px-6`}>
            <Text
              className={`absolute ${isDarkMode ? 'text-purple-300' : 'text-purple-600'} text-sm font-bold`}
              style={{
                top: 2,
                left: "50%", 
                transform: [{ translateX: -12 }], 
              }}
            >
              {agentStats.daily.completed}/{agentStats.daily.target || '0'}
            </Text>
            <Bar
              progress={agentStats.daily.progress}
              width={200}
              color={isDarkMode ? "#a67dff" : "#854BDA"}
              unfilledColor={isDarkMode ? "#333" : "#FFFFFF"}
              borderWidth={0}
              height={10}
            />

            <Image
              source={require("../assets/images/star.png")} 
              className="w-8 h-8 ml-5"
              resizeMode="contain"
            />
          </View>
        </View>

       
        <ScrollView 
          className="flex-1"
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshData}
              colors={[isDarkMode ? "#a67dff" : "#854BDA"]}
              tintColor={isDarkMode ? "#a67dff" : "#854BDA"}
            />
          }
        >
          <Text className={`text-xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-[#874CDB]'} mt-6 ml-6 mb-2`}>
            Packages
          </Text>
          <FlatList
            data={packages}
            renderItem={renderPackage}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={{ 
              paddingHorizontal: 10, 
              paddingLeft: 2,
              paddingBottom: 60
            }}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DashboardScreen;