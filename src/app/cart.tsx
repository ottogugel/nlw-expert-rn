import { View, Text, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import  { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from 'expo-router'

import { Header } from "@/components/header";
import { Product } from "@/components/product";

import { ProductsCartProps, useCartStore } from "@/stores/card-store";

import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

// const PHONE_NUMBER = "insira-seu-telefone-aqui"


export default function Cart() {
  const navigation = useNavigation()
  const [address, setAddress] = useState("");

  const cartStore = useCartStore();

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductsCartProps) {
    Alert.alert("Delete", `Do you want to remove ${product.title} from the cart?`, [
        {
          text: "Cancel"
        },
        {
          text: "Remove",
          onPress: () => cartStore.remove(product.id)
        },
      ])
  }

  function handleOrder() {
    if(address.trim().length === 0) {
      return Alert.alert("Order", "Enter Delivery Details")
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

    console.log(products);

    const message = `
    🍔 NEW ORDER
    \n Deliver to: ${address}

    ${products}

    \n Total value: ${total}`;

    console.log(message)

    // Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cartStore.clear()
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Your cart" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Your cart is empty.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>

              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input placeholder="Enter the delivery address with street, neighborhood, zip code, number and complement..."
            onChangeText={setAddress}
            blurOnSubmit={true}
            onSubmitEditing={handleOrder}
            returnKeyType="next"
          />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Send order</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Back to menu" href="/" />
      </View>
    </View>
  );
}
