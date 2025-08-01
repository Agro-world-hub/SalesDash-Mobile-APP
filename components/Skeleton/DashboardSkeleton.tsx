import React from "react";
import { View } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const DashboardSkeleton: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      {/* Header Skeleton */}
      <ContentLoader
        speed={1.5}
        width="100%"
        height={80}
        backgroundColor="#e0e0e0"
        foregroundColor="#f5f5f5"
      >
        <Circle cx="30" cy="30" r="20" />
        <Rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
        <Rect x="60" y="35" rx="4" ry="4" width="80" height="10" />
        <Rect x="280" y="15" rx="10" ry="10" width="50" height="20" />
      </ContentLoader>

      {/* Daily Target Skeleton */}
      <ContentLoader
        speed={1.5}
        width="100%"
        height={100}
        backgroundColor="#e0e0e0"
        foregroundColor="#f5f5f5"
        className="mt-4"
      >
        <Rect x="0" y="5" rx="4" ry="4" width="150" height="10" />
        <Rect x="0" y="25" rx="10" ry="10" width="80%" height="40" />
        <Circle cx="90%" cy="43" r="20" />
      </ContentLoader>

      {/* Packages Title Skeleton */}
      <ContentLoader
        speed={1.5}
        width="100%"
        height={30}
        backgroundColor="#e0e0e0"
        foregroundColor="#f5f5f5"
        className="mt-6"
      >
        <Rect x="0" y="5" rx="4" ry="4" width="100" height="15" />
      </ContentLoader>

      {/* Packages Grid Skeleton */}
      <Rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
      <View className="mt-4 flex-row flex-wrap justify-between">
        {[...Array(4)].map((_, index) => (
          <ContentLoader
            key={index}
            speed={1.5}
            width="48%"
            height={210}
            backgroundColor="#e0e0e0"
            foregroundColor="#f5f5f5"
            className="mb-4"
          >
            <Rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
            <Rect x="30" y="110" rx="4" ry="4" width="60%" height="10" />
            <Rect x="35" y="130" rx="4" ry="4" width="50%" height="10" />
            <Rect x="50" y="150" rx="8" ry="8" width="40%" height="25" />
          </ContentLoader>
        ))}
      </View>

   
      <ContentLoader
  speed={1.5}
  width="100%"
  height={50}
  backgroundColor="#e0e0e0"
  foregroundColor="#f5f5f5"
>
  <Circle cx="7%" cy="30" r="15" />
  <Circle cx="35%" cy="30" r="15" />
  <Circle cx="60%" cy="30" r="15" />
  <Circle cx="88%" cy="30" r="15" />
</ContentLoader>

    </View>
  );
};

export default DashboardSkeleton;
