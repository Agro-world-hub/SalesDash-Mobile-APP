// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
//   Keyboard,
//   Animated,
// } from "react-native";
// import { useTranslation } from "react-i18next";
// import AsyncStorage from "@react-native-async-storage/async-storage"; 
// import { useFocusEffect } from "@react-navigation/native"; 
// import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";


// const DashboardIcon = require("../assets/images/Home1.png");
// const DashboardIconFocus = require("../assets/images/hut1.png");
// const ViewOrdersIcon= require("../assets/images/Bullet List1.png");
// const ViewOrdersIconFocus= require("../assets/images/list-items.png");
// const ReminderIcon = require("../assets/images/Notification1.png");
// const ReminderIconFocus = require("../assets/images/bell.png");
// const CustomersIcon = require("../assets/images/user.png");
// const CustomersIconFocus = require("../assets/images/user1.png");

// const NavigationBar = ({
//   navigation,
//   state,
// }: {
//   navigation: any;
//   state: any;
// }) => {
//   let tabs = [
//     { name: "DashboardScreen", icon: DashboardIcon, focusedIcon: DashboardIconFocus, tabName: "Home" },
//     { name: "ViewOrdersScreen", icon: ViewOrdersIcon, focusedIcon: ViewOrdersIconFocus, tabName: "Orders" },
//     { name: "ReminderScreen", icon: ReminderIcon, focusedIcon: ReminderIconFocus , tabName: "Reminders"},
//     { name: "CustomersScreen", icon: CustomersIcon, focusedIcon: CustomersIconFocus, tabName: "Customers" },
//   ];
 
//   const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
//   const [activeTab, setActiveTab] = useState<string>("DashboardScreen");
//   const { t } = useTranslation();
//   const [scales] = useState(() => tabs.map(() => new Animated.Value(1)));

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       "keyboardDidShow",
//       () => {
//         setKeyboardVisible(true);
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       "keyboardDidHide",
//       () => {
//         setKeyboardVisible(false);
//       }
//     );

//     return () => {
//       keyboardDidShowListener.remove();
//       keyboardDidHideListener.remove();
//     };
//   }, []);

//   let currentTabName = state?.routes?.[state.index]?.name || "DashboardScreen";
 

//   useEffect(() => {
//     const loadActiveTab = async () => {
//       const storedTab = await AsyncStorage.getItem("activeTab");
//       const currentRoute =
//         navigation.getState().routes[navigation.getState().index].name;

//       if (!storedTab || storedTab !== currentRoute) {
//         setActiveTab(currentRoute);
//         await AsyncStorage.setItem("activeTab", currentRoute); 
//       } else {
//         setActiveTab(storedTab); 
//       }
//     };
//     loadActiveTab();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       const loadActiveTab = async () => {
//         const currentRoute =
//           navigation.getState().routes[navigation.getState().index].name;
//         setActiveTab(currentRoute);
//         await AsyncStorage.setItem("activeTab", currentRoute); 
//       };
//       loadActiveTab();
//     }, [])
//   );


//   const handleTabPress = async (tabName: string, index: number) => {
//     Animated.spring(scales[index], {
//       toValue: 1.1,
//       useNativeDriver: true,
//     }).start(() => {
//       Animated.spring(scales[index], {
//         toValue: 1,
//         useNativeDriver: true,
//       }).start();
//     });

//     navigation.navigate(tabName);
//     console.log("tabName", tabName);
//   };


//   const tabPositionX = useSharedValue(0);
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: tabPositionX.value }],
//     };
//   }
//   );
//   if (isKeyboardVisible) return null;
//   return (
//     <View className="absolute bottom-0 flex-row justify-between items-center bg-white w-full p-4 rounded-t-3xl shadow-lg shadow-black/10" >

//    {tabs.map((tab, index) => {
//   const isFocused = currentTabName === tab.name;
//   console.log("isFocused", isFocused);
//   return (
//     <Animated.View
//       style={{
//         transform: [{ scale: scales[index] }],
//         alignItems: "center",
//         justifyContent: "center",
//         height: 40,
//       }}
   
//       key={index} 
//     >
//       <TouchableOpacity
//         onPress={() => handleTabPress(tab.name, index)}
   
//         style={{
//           backgroundColor: isFocused ? "#854BDA" : "#FFFFFF", 
//           padding: 8, 
//           borderRadius: 9999, 
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <View>
          
//         </View>
//         <Image
//              className={`${
//               isFocused
//                 ? " bg-[#854BDA] rounded-full   "
//                 : "items-center justify-center"
//             }`}
//           source={isFocused ? tab.icon :tab.focusedIcon}
//           style={{ width: 20, height: 20}}
//         />

//       </TouchableOpacity>
//       <Text
//     className={`${
//       isFocused? "text-purple-600" : "text-gray-600"
//     } text-sm font-medium`}
//   >
//    {tab.tabName}
//   </Text>
//     </Animated.View>
//   );
// })}

//     </View>
  
//   );
// };

// export default NavigationBar;

import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useFocusEffect } from "@react-navigation/native"; 
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useTheme } from "@/ThemeContext"; // Import your theme context

const DashboardIcon = require("../assets/images/Home1.png");
const DashboardIconFocus = require("../assets/images/hut1.png");
const ViewOrdersIcon= require("../assets/images/Bullet List1.png");
const ViewOrdersIconFocus= require("../assets/images/list-items.png");
const ReminderIcon = require("../assets/images/Notification1.png");
const ReminderIconFocus = require("../assets/images/bell.png");
const CustomersIcon = require("../assets/images/user.png");
const CustomersIconFocus = require("../assets/images/user1.png");

const NavigationBar = ({
  navigation,
  state,
}: {
  navigation: any;
  state: any;
}) => {
  const { isDarkMode } = useTheme(); // Get dark mode state
  let tabs = [
    { name: "DashboardScreen", icon: DashboardIcon, focusedIcon: DashboardIconFocus, tabName: "Home" },
    { name: "ViewOrdersScreen", icon: ViewOrdersIcon, focusedIcon: ViewOrdersIconFocus, tabName: "Orders" },
    { name: "ReminderScreen", icon: ReminderIcon, focusedIcon: ReminderIconFocus , tabName: "Reminders"},
    { name: "CustomersScreen", icon: CustomersIcon, focusedIcon: CustomersIconFocus, tabName: "Customers" },
  ];
 
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("DashboardScreen");
  const { t } = useTranslation();
  const [scales] = useState(() => tabs.map(() => new Animated.Value(1)));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  let currentTabName = state?.routes?.[state.index]?.name || "DashboardScreen";
 

  useEffect(() => {
    const loadActiveTab = async () => {
      const storedTab = await AsyncStorage.getItem("activeTab");
      const currentRoute =
        navigation.getState().routes[navigation.getState().index].name;

      if (!storedTab || storedTab !== currentRoute) {
        setActiveTab(currentRoute);
        await AsyncStorage.setItem("activeTab", currentRoute); 
      } else {
        setActiveTab(storedTab); 
      }
    };
    loadActiveTab();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadActiveTab = async () => {
        const currentRoute =
          navigation.getState().routes[navigation.getState().index].name;
        setActiveTab(currentRoute);
        await AsyncStorage.setItem("activeTab", currentRoute); 
      };
      loadActiveTab();
    }, [])
  );


  const handleTabPress = async (tabName: string, index: number) => {
    Animated.spring(scales[index], {
      toValue: 1.1,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scales[index], {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });

    navigation.navigate(tabName);
    console.log("tabName", tabName);
  };


  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  }
  );
  if (isKeyboardVisible) return null;
  return (
    <View className={`absolute bottom-0 flex-row justify-between items-center w-full p-4 rounded-t-3xl shadow-lg ${
      isDarkMode 
        ? 'bg-gray-800 shadow-black/30' 
        : 'bg-white shadow-black/10'
    }`}>

   {tabs.map((tab, index) => {
  const isFocused = currentTabName === tab.name;
  return (
    <Animated.View
      style={{
        transform: [{ scale: scales[index] }],
        alignItems: "center",
        justifyContent: "center",
        height: 40,
      }}
      key={index} 
    >
      <TouchableOpacity
        onPress={() => handleTabPress(tab.name, index)}
        style={{
          backgroundColor: isFocused 
            ? (isDarkMode ? '#6A3AD0' : '#854BDA') 
            : 'transparent', 
          padding: 8, 
          borderRadius: 9999, 
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          className={`${
            isFocused
              ? "bg-transparent rounded-full"
              : "items-center justify-center"
          }`}
          source={isFocused ? tab.focusedIcon : tab.icon}
          style={{ 
            width: 20, 
            height: 20,
            tintColor: isFocused 
              ? (isDarkMode ? '#ffffff' : '#ffffff')
              : (isDarkMode ? '#9CA3AF' : '#6B7280')
          }}
        />
      </TouchableOpacity>
      <Text
        className={`text-sm font-medium ${
          isFocused
            ? (isDarkMode ? 'text-purple-300' : 'text-purple-600')
            : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
        }`}
      >
        {tab.tabName}
      </Text>
    </Animated.View>
  );
})}

    </View>
  );
};

export default NavigationBar;
