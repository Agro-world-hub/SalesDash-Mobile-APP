// import React from "react";
// import { View, FlatList } from "react-native";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import ContentLoader, { Circle, Rect } from "react-content-loader/native";

// const CustomersScreenSkeleton: React.FC = () => {
//   return (
//     <View className="flex-1 bg-white">
//       {/* Header Skeleton */}
//       <ContentLoader speed={1.5} width={wp(90)} height={hp(7)} backgroundColor="#e0e0e0" foregroundColor="#f5f5f5">
        
//         <Rect x="100" y="20" rx="6" ry="6" width={wp(40)} height={hp(2)} />
//       </ContentLoader>

//       {/* Skeleton for Search Bar */}
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           backgroundColor: "white",
//           borderRadius: wp(10),
//           padding: wp(3),
//           marginBottom: hp(2),
//           shadowColor: "#0000001A",
//           shadowOpacity: 0.2,
//           shadowOffset: { width: 0, height: 2 },
//           shadowRadius: 5,
//           elevation: 5,
//         }}
//       >
//         <ContentLoader speed={1.5} width={wp(70)} height={hp(4)} backgroundColor="white" foregroundColor="#f5f5f5">
//           <Rect x="10" y="8" rx="20" ry="20" width={wp(70)} height={hp(5)} />
//         </ContentLoader>
//         <Circle cx={wp(85)} cy={hp(4)} r={hp(2)} />
//       </View>


//       {/* Customer List Skeleton */}
//       <FlatList
//         data={[...Array(7)]}
//         keyExtractor={(_, index) => index.toString()}
//         contentContainerStyle={{ paddingBottom: 120 }}
//         renderItem={() => (
//           <View className="bg-white shadow-md p-4 mb-3 mx-8 rounded-lg border border-gray-200">
//             <ContentLoader speed={1.5} width={wp(90)} height={50} backgroundColor="#e0e0e0" foregroundColor="#f5f5f5">
//               <Rect x="0" y="10" rx="4" ry="4" width="40%" height="10" />
//               <Rect x="0" y="35" rx="4" ry="4" width="35%" height="10" />
//               <Rect x="78%" y="20" rx="4" ry="4" width="4%" height="20" />
//             </ContentLoader>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default CustomersScreenSkeleton;

import React from "react";
import { View, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useTheme } from '../../ThemeContext';

const CustomersScreenSkeleton: React.FC = () => {
  const { isDarkMode } = useTheme();

  // Color variables for dark/light mode
  const backgroundColor = isDarkMode ? "#1F2937" : "#FFFFFF";
  const skeletonBaseColor = isDarkMode ? "#374151" : "#e0e0e0";
  const skeletonHighlightColor = isDarkMode ? "#4B5563" : "#f5f5f5";
  const cardBackground = isDarkMode ? "#111827" : "#FFFFFF";
  const cardBorderColor = isDarkMode ? "#374151" : "#EAEAEA";
  const shadowColor = isDarkMode ? "#000000" : "#0000001A";

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor 
    }}>
      {/* Header Skeleton */}
      <ContentLoader 
        speed={1.5} 
        width={wp(90)} 
        height={hp(7)} 
        backgroundColor={skeletonBaseColor}
        foregroundColor={skeletonHighlightColor}
      >
        <Rect x="100" y="20" rx="6" ry="6" width={wp(40)} height={hp(2)} />
      </ContentLoader>

      {/* Skeleton for Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: cardBackground,
          borderRadius: wp(10),
          padding: wp(3),
          marginBottom: hp(2),
          marginHorizontal: wp(5),
          shadowColor,
          shadowOpacity: isDarkMode ? 0.1 : 0.2,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
          elevation: 5,
          borderWidth: isDarkMode ? 1 : 0,
          borderColor: cardBorderColor
        }}
      >
        <ContentLoader 
          speed={1.5} 
          width={wp(70)} 
          height={hp(4)} 
          backgroundColor={skeletonBaseColor}
          foregroundColor={skeletonHighlightColor}
        >
          <Rect x="10" y="8" rx="20" ry="20" width={wp(70)} height={hp(5)} />
        </ContentLoader>
        <ContentLoader
          speed={1.5}
          width={hp(4)}
          height={hp(4)}
          backgroundColor={skeletonBaseColor}
          foregroundColor={skeletonHighlightColor}
        >
          <Circle cx={hp(2)} cy={hp(2)} r={hp(2)} />
        </ContentLoader>
      </View>

      {/* Customer List Skeleton */}
      <FlatList
        data={[...Array(7)]}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ 
          paddingBottom: 120,
          paddingHorizontal: wp(2)
        }}
        renderItem={() => (
          <View style={{
            backgroundColor: cardBackground,
            shadowColor,
            shadowOpacity: isDarkMode ? 0.1 : 0.2,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 3,
            elevation: 4,
            padding: 16,
            marginBottom: 12,
            marginHorizontal: wp(4),
            borderRadius: 8,
            borderWidth: 1,
            borderColor: cardBorderColor
          }}>
            <ContentLoader 
              speed={1.5} 
              width={wp(90)} 
              height={50} 
              backgroundColor={skeletonBaseColor}
              foregroundColor={skeletonHighlightColor}
            >
              <Rect x="0" y="10" rx="4" ry="4" width="40%" height="10" />
              <Rect x="0" y="35" rx="4" ry="4" width="35%" height="10" />
              <Rect x="78%" y="20" rx="4" ry="4" width="4%" height="20" />
            </ContentLoader>
          </View>
        )}
      />
    </View>
  );
};

export default CustomersScreenSkeleton;
