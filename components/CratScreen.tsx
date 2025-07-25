import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView,Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import BackButton from '../components/BackButton'; 
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  CratScreen: undefined;

};

type CratScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CratScreen"
>;

// interface CratScreenProps {
//   navigation: CratScreenNavigationProp;
//   route: {
//     params: {
//       customerId: any;
//       fullTotal: any;
//       paymentMethod: any;
//       selectedTimeSlot: any;
//       timeDisplay: any;
//       selectedDate: any;
//       id:string
//       isCustomPackage:string;
//        isSelectPackage:string;
//       selectedProducts: Array<{
//         id: number;
//         name: string;
//         price: number;
//         normalPrice: number;
//         discountedPrice: number;
//         quantity: number;
//         selected: boolean;
//         unitType: string;
//         startValue: number;
//         changeby: number;
//       }>;
      
//     };
//   };
// }

interface CartItem {
  id: number;
  name: string;
  price: number;
  normalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  selected: boolean;
  unitType: string;
  startValue: number;
  changeby: number;
}

// Add this interface at the top of your file if it doesn't exist, or update the existing one
interface CratScreenProps {
  navigation: any;
  route: {
    params?: {
      id?: string;
      customerId?: any;
      isPackage?: number | string;

      selectedProducts?: any[];
      items?: any[];
      fromOrderSummary?: boolean;
      subtotal?: number;
      discount?: number;
      total?: number;
      fullTotal?: number;
      selectedDate?: string;
      timeDisplay?: string;
      selectedTimeSlot?: string;
      paymentMethod?: string;
    };
  };
}

// Add this interface at the top of your file if it doesn't exist, or update the existing one
interface CratScreenProps {
  navigation: any;
  route: {
    params?: {
      id?: string;
      customerId?: any;
      isPackage?: number | string;
   
      selectedProducts?: any[];
      items?: any[];
      fromOrderSummary?: boolean;
      subtotal?: number;
      discount?: number;
      total?: number;
      fullTotal?: number;
      selectedDate?: string;
      timeDisplay?: string;
      selectedTimeSlot?: string;
      paymentMethod?: string;
    };
  };
}

const CratScreen: React.FC<CratScreenProps> = ({ navigation, route }) => {
  const { id, isPackage } = route.params || {};
  const fromOrderSummary = (route.params as any)?.fromOrderSummary;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  console.log("============",isPackage)

  useEffect(() => {
  if (route.params?.selectedProducts) {
    const initializedItems = route.params.selectedProducts.map(item => {
      // Parse startValue as number for increment/decrement operations
      const startValueNum = typeof item.startValue === 'string' 
        ? parseFloat(item.startValue) 
        : item.startValue || 0.5;
        
      // Make sure unitType is lowercase to match component state
      const unitType = item.unitType?.toLowerCase() === 'g' ? 'g' : 'kg';
      
      // Use the actual quantity from the item
      const currentQuantity = typeof item.quantity === 'string' 
        ? parseFloat(item.quantity) 
        : item.quantity || startValueNum;

        const currentQuantity1 = typeof item.changeby === 'string' 
        ? parseFloat(item.changeby) 
        : item.changeby || startValueNum;
      
      // Calculate initial changeby value based on unitType
      let initialChangeby;
      if (fromOrderSummary) {
        // Use the actual quantity passed from order summary
        initialChangeby = unitType === 'g' 
          ? currentQuantity * 1000  // If in grams, convert from kg
          : currentQuantity;        // If in kg, use as is
      } else {
        // For new items, use startValue
        initialChangeby = unitType === 'g' 
          ? startValueNum * 1000  // If in grams, convert from kg
          : startValueNum;        // If in kg, use as is
      }

      // Calculate price per kg from the total price and quantity
      const pricePerKg = currentQuantity > 0 ? item.discountedPrice / currentQuantity : 0;
      const normalPricePerKg = currentQuantity > 0 ? item.normalPrice / currentQuantity : 0;
      
      // FIXED: Calculate discount per kg from the original discount value
      const discountPerKg = currentQuantity > 0 ? item.discount / currentQuantity : 0;
      
      return {
        ...item,
        // Fix name display - use name or fallback to a proper display name
        name: item.name || `Product ${item.id}`,
        // Store per-kg prices for calculations
        pricePerKg: pricePerKg,
        normalPricePerKg: normalPricePerKg,
        discountPerKg: discountPerKg, // Now correctly calculated
        // Use discountedPrice as the per-kg price for display
        price: pricePerKg,
        normalPrice: normalPricePerKg,
        discountedPrice: pricePerKg,
        // IMPORTANT: Keep the original discount value
        discount: discountPerKg, // This should be per kg discount
        selected: fromOrderSummary ? false : (item.selected || false),
        changeby: initialChangeby, 
        quantity: initialChangeby,
        unitType: unitType,
        startValue: currentQuantity1
      };
    });
    
    setCartItems(initializedItems);
  }
}, [route.params, fromOrderSummary]);

  useEffect(() => {
    const hasSelectedItems = cartItems.some(item => item.selected);
    setIsSelectionMode(hasSelectedItems);
  }, [cartItems]);

  const toggleItemSelection = (id: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id 
          ? { ...item, selected: !item.selected } 
          : item
      )
    );
  };

  const deleteSelectedItems = () => {
    // First, delete the selected items
    setCartItems(cartItems.filter(item => !item.selected));
    
    // Automatically clear selection mode after deletion
    setIsSelectionMode(false);
  };

  const calculateItemTotal = (item: CartItem) => {
    if (item.unitType === 'kg') {
      return (item.discountedPrice * item.changeby).toFixed(2);
    } else {
      return ((item.discountedPrice / 1000) * item.changeby).toFixed(2);
    }
  };

 
  
  const calculateItemNormalTotal = (item: CartItem) => {
    if (item.unitType === 'kg') {
      console.log("-----------",item.discount)
      return (item.normalPrice * item.changeby).toFixed(2);
    } else {
      return ((item.normalPrice / 1000) * item.changeby).toFixed(2);
    }
  };

  const changeUnit = (id: number, newUnit: 'kg' | 'g') => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id && item.unitType !== newUnit) {
          // Convert the value based on unit change
          let newValue;
          if (newUnit === 'kg') {
            // Converting from g to kg
            newValue = item.changeby / 1000;
          } else {
            // Converting from kg to g
            newValue = item.changeby * 1000;
          }
          
          return { 
            ...item, 
            unitType: newUnit,
            changeby: newValue,
            quantity: newValue
          };
        }
        return item;
      })
    );
  };
  

  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          // Get base startValue in kg

          console.log("dcwhkvbsju",item.changeby)
          const baseIncrementAmount = typeof item.changeby === 'string' 
            ? parseFloat(item.changeby) 
            : item.startValue;
          
          // Adjust increment based on current unit type
          let incrementAmount = baseIncrementAmount;
          if (item.unitType === 'g') {
            // If in grams, the increment should be the kg value * 1000
            incrementAmount = baseIncrementAmount * 1000;
          }
            
          // Current quantity value
          const currentQuantity = typeof item.changeby === 'string' 
            ? parseFloat(item.changeby) 
            : item.changeby;
            
          // Add the adjusted increment to the current quantity
          const newValue = currentQuantity + incrementAmount;
          
          return { 
            ...item, 
            changeby: newValue, // Update the display value
            quantity: newValue  // Also update quantity
          };
        }
        return item;
      })
    );
  };
  
  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          // Get base startValue in kg
          const baseDecrementAmount = typeof item.startValue === 'string' 
            ? parseFloat(item.startValue) 
            : item.startValue;
          
          // Adjust decrement based on current unit type
          let decrementAmount = baseDecrementAmount;
          if (item.unitType === 'g') {
            // If in grams, the decrement should be the kg value * 1000
            decrementAmount = baseDecrementAmount * 1000;
          }
            
          // Current quantity value
          const currentQuantity = typeof item.changeby === 'string' 
            ? parseFloat(item.changeby) 
            : item.changeby;
          
          // Minimum value is adjusted based on unit type
          let minValue = baseDecrementAmount;
          if (item.unitType === 'g') {
            minValue = baseDecrementAmount * 1000;
          }
            
          // Subtract the adjusted decrement from current quantity, but not below minimum
          const newValue = Math.max(minValue, currentQuantity - decrementAmount);
          
          return { 
            ...item, 
            changeby: newValue, // Update the display value
            quantity: newValue  // Also update quantity 
          };
        }
        return item;
      })
    );
  };


  
  // Calculate totals including ALL items, regardless of selection state
  const currentSubtotal = cartItems.reduce((total, item) => {
    // Include all items in totals, even if selected
    return total + parseFloat(calculateItemNormalTotal(item));
  }, 0);
  
 const currentTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(calculateItemTotal(item));
}, 0) + 180;

  const discount = currentSubtotal - (currentTotal - 180);

  const handleConfirm = () => {
    const nonSelectedItems = cartItems.filter(item => !item.selected);
    
    if (nonSelectedItems.length > 0) {
      const itemsToPass = nonSelectedItems.map(item => {
        // Always convert to kg for consistent data passing
        const weightInKg = item.unitType === 'g' ? item.changeby / 1000 : item.changeby;
        
        return {
          id: item.id,
          name: item.name,
          price: item.discountedPrice * weightInKg ,
          discount:item.discount * weightInKg,
         // normalPrice: item.normalPrice,
         // discountedPrice: item.discountedPrice,
          qty: weightInKg,  // Always pass quantity in kg
          unitType: 'kg',        // Always pass unitType as kg
         // startValue: item.startValue,
         // changeby: weightInKg,  // Always pass changeby in kg
          isPackage: isPackage,
      
        };
      });

      // Determine where to navigate based on the navigation params
      const navigationTarget = (route.params as any)?.returnTo || (fromOrderSummary ? 'OrderSummaryScreen' : 'ScheduleScreen');
      
      if (navigationTarget === 'ScheduleScreen') {
        
        navigation.navigate('ScheduleScreen' as any, {
          items: itemsToPass,
          total: currentTotal,
          subtotal: currentSubtotal,
          discount: discount,
          id: id,
          isPackage: isPackage,
      
          // Pass through any existing order summary data
          selectedDate: route.params?.selectedDate,
          timeDisplay: route.params?.timeDisplay,
          selectedTimeSlot: route.params?.selectedTimeSlot,
          paymentMethod: route.params?.paymentMethod,
          fullTotal: route.params?.fullTotal,
          customerId: route.params?.customerId
        });
      } else if (navigationTarget === 'ScheduleScreen') {
        navigation.navigate('ScheduleScreen' as any, {
          items: itemsToPass,
          total: currentTotal,
          subtotal: currentSubtotal,
          discount: discount,
          id: id,
          isPackage: isPackage,
   
          // Pass through scheduling data if available
          selectedDate: route.params?.selectedDate,
          timeDisplay: route.params?.timeDisplay,
          selectedTimeSlot: route.params?.selectedTimeSlot
        });
      } else {
        // Default fallback - normal flow to schedule screen
        navigation.navigate('ScheduleScreen' as any, {
          items: itemsToPass,
          total: currentTotal,
          subtotal: currentSubtotal,
          discount: discount,
          id: id,
          isPackage: isPackage
       
        });
      }
    } else {
      alert("Please add at least one item to your cart");
    }
  };

  const formatQuantity = (item: CartItem) => {
    if (item.unitType === 'kg') {
      return item.changeby % 1 === 0 ? item.changeby.toFixed(0) : item.changeby.toFixed(1);
    }
    return item.changeby.toFixed(0);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        <View className="flex-row items-center">
          <BackButton navigation={navigation} />
          <Text className="text-lg font-medium text-[#6C3CD1] flex-1 text-center mr-10">
            {fromOrderSummary ? 'Edit Cart' : 'Custom Cart'}
          </Text>
          {isSelectionMode && (
            <TouchableOpacity 
              onPress={deleteSelectedItems}
              className="absolute right-0"
            >
              <Ionicons name="trash-outline" size={24} color="#FF2C2C" />
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
          {cartItems.map((item) => (
            <View key={item.id} className="flex-row items-center py-4 border-b border-gray-200">
              <TouchableOpacity 
                onPress={() => toggleItemSelection(item.id)}
                className="mr-4"
              >
                <View className={`w-5 h-5 rounded-sm border ${
                  item.selected ? 'bg-black border-black' : 'border-gray-400'
                } justify-center items-center`}>
                  {item.selected && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-800">{item.name}</Text>
                <Text className="text-sm text-gray-600">
                  Rs.{item.price.toFixed(2)} per kg
                </Text>
              </View>
              
              <View className="flex-row items-center mt-[-5%]">
                <View className="flex-row mr-2 item-center justify-center">
                  {/* KG Button */}
                  <TouchableOpacity
                    className={`w-8 h-8 rounded-md border shadow-xl items-center justify-center ${
                      item.unitType === 'kg' 
                        ? 'bg-purple-100 border-[#3E206D]' 
                        : 'bg-white border-[#A3A3A3]'
                    }`}
                    style={{
                      shadowColor: "#000",
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      elevation: 10,
                    }}
                    onPress={() => changeUnit(item.id, 'kg')}
                  >
                    <Text 
                      className={`text-base mt-[-3] ${
                        item.unitType === 'kg' ? 'text-purple-600' : 'text-gray-600'
                      }`}
                    >
                      kg
                    </Text>
                  </TouchableOpacity>
                  
                  {/* G Button */}
                  <TouchableOpacity
                    className={`w-8 h-8 rounded-md border ml-2 shadow-xl items-center justify-center ${
                      item.unitType === 'g' 
                        ? 'bg-purple-100 border-[#3E206D]' 
                        : 'bg-white border-[#A3A3A3]'
                    }`}
                    style={{
                      shadowColor: "#000",
                      shadowOpacity: 0.5,
                      shadowRadius: 10,
                      elevation: 10,
                    }}
                    onPress={() => changeUnit(item.id, 'g')}
                  >
                    <Text 
                      className={`text-base mt-[-5] ${
                        item.unitType === 'g' ? 'text-purple-600' : 'text-gray-600'
                      }`}
                    >
                      g
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    className="bg-gray-200 w-6 h-6 rounded-full justify-center items-center"
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <Image
                      source={require("../assets/images/minns.webp")}
                      className="w-7 h-7"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  
                  <Text className="mx-2 text-base w-12 text-center">
                    {formatQuantity(item)}
                  </Text>
                  
                  <TouchableOpacity 
                    className="bg-gray-200 w-6 h-6 rounded-full justify-center items-center"
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Image
                      source={require("../assets/images/adddd.webp")}
                      className="w-7 h-7"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          
          <View className="py-4 border-t border-gray-200">
            <View className="flex-row justify-between py-2">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="font-medium">Rs.
                {currentSubtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
            
            <View className="flex-row justify-between py-2">
              <Text className="text-gray-500">Discount</Text>
              <Text className="font-medium text-[#686868]">Rs.{discount.toFixed(2)}</Text>
            </View>

             <View className="flex-row justify-between py-2">
              <Text className="text-gray-500">Service Fee</Text>
              <Text className="font-medium text-[#686868]">Rs.180.00</Text>
            </View>
            
            <View className="flex-row justify-between py-2">
              <Text className="font-semibold">Total</Text>
              <Text className="font-bold">Rs.
                {currentTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          <View className="py-4 border-t border-gray-200"></View>
        </ScrollView>
       
        <View className="py-4 px-6">
          <TouchableOpacity onPress={handleConfirm}>
            <LinearGradient
              colors={["#6839CF", "#874DDB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-3 rounded-full items-center"
            >
              <Text className="text-white font-medium text-base">
                {fromOrderSummary ? 'Update Cart' : 'Confirm'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CratScreen;