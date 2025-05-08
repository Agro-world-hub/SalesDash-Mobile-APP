import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import BackButton from "./BackButton";
import { useTheme } from "@/ThemeContext";


type SelectOrderTypeNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SelectOrderType"
>;

interface SelectOrderTypeProps {
  navigation: SelectOrderTypeNavigationProp;
  route: {
    params: {
      id: string; 
      isCustomPackage:string;
      isSelectPackage:string;
    };
  };
}

const SelectOrderType: React.FC<SelectOrderTypeProps> = ({ navigation, route }) => {
   const { isDarkMode, toggleTheme } = useTheme();

  const { id } = route.params || {};

  const handleCreateCustomPackage = () => {
    navigation.navigate("CreateCustomPackage" as any, { 
      id, 
      isCustomPackage: 1,
      isSelectPackage: 0 
    });
  };


  const handleSelectPackage = () => {
    navigation.navigate("OrderScreen" as any, { 
      id, 
      isCustomPackage: 0,
      isSelectPackage: 1 
    });
  };

  console.log("----------",id)

// return (
//   <View className="flex-1 bg-white">
//     <View className="flex-row items-center h-16 shadow-md px-4 bg-white">
//       <BackButton navigation={navigation} />
//       <Text className="text-lg font-bold text-[#6C3CD1] flex-grow text-center mr-7">
//         Select Order Type
//       </Text>
//     </View>
    
//     <ScrollView>
//       <View className="flex-1 items-center justify-center relative">
//         <Image
//           source={require("../assets/images/cart.webp")}
//           className="w-[70%] h-40 mt-[20%]"
//           resizeMode="contain"
//         />
        
      
//         <TouchableOpacity
// style={{
//   width: '70%',
//   borderWidth: 1,
//   borderColor: '#F2F4F7',
//   paddingVertical: 20,
//   borderRadius: 16,
//   marginVertical: 8,
//   alignItems: 'center',
//   marginTop: 50,
//   backgroundColor: '#FFFFFF',
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.1,
//   shadowRadius: 40,
//   elevation: 5, // for Android shadow
// }}
// onPress={handleCreateCustomPackage}
// >
// <Text style={{
//   fontSize: 18,
//   fontWeight: '600',
//   color: '#6839CF',
//   textAlign: 'center'
// }}>
//   Create{"\n"}Custom Package
// </Text>
// </TouchableOpacity>

// <TouchableOpacity
// style={{
//   width: '70%',
//   borderWidth: 1,
//   borderColor: '#F2F4F7',
//   paddingVertical: 20,
//   borderRadius: 16,
//   marginVertical: 8,
//   alignItems: 'center',
//   marginTop: 30,
//   backgroundColor: '#FFFFFF',
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: 4 },
//   shadowOpacity: 0.1,
//   shadowRadius: 40,
//   elevation: 5, // for Android shadow
// }}
// onPress={handleSelectPackage}
// >
// <Text style={{
//   fontSize: 18,
//   fontWeight: '600',
//   color: '#6839CF',
//   textAlign: 'center'
// }}>
//   Select{"\n"}Package
// </Text>
// </TouchableOpacity>

//       </View>
//     </ScrollView>
//   </View>
// );

return (
  <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
    <View className={`flex-row items-center h-16 shadow-md px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <BackButton navigation={navigation} />
      <Text className={`text-lg font-bold flex-grow text-center mr-7 ${isDarkMode ? 'text-purple-300' : 'text-[#6C3CD1]'}`}>
        Select Order Type
      </Text>
    </View>
    
    <ScrollView>
      <View className="flex-1 items-center justify-center relative">
        <Image
          source={isDarkMode 
            ? require("../assets/images/cart.webp") 
            : require("../assets/images/cart.webp")}
          className="w-[70%] h-40 mt-[20%]"
          resizeMode="contain"
        />
        
        <TouchableOpacity
          style={{
            width: '70%',
            borderWidth: 1,
            borderColor: isDarkMode ? '#374151' : '#F2F4F7',
            paddingVertical: 20,
            borderRadius: 16,
            marginVertical: 8,
            alignItems: 'center',
            marginTop: 50,
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 40,
            elevation: 5,
          }}
          onPress={handleCreateCustomPackage}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: isDarkMode ? '#A78BFA' : '#6839CF',
            textAlign: 'center'
          }}>
            Create{"\n"}Custom Package
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '70%',
            borderWidth: 1,
            borderColor: isDarkMode ? '#374151' : '#F2F4F7',
            paddingVertical: 20,
            borderRadius: 16,
            marginVertical: 8,
            alignItems: 'center',
            marginTop: 30,
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 40,
            elevation: 5,
          }}
          onPress={handleSelectPackage}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: isDarkMode ? '#A78BFA' : '#6839CF',
            textAlign: 'center'
          }}>
            Select{"\n"}Package
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
);
};

export default SelectOrderType;