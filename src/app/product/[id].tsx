import { Image, Text, View } from "react-native";
import { useLocalSearchParams } from 'expo-router'

import { Feather } from '@expo/vector-icons'

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Product() {

  const { id } = useLocalSearchParams()
  console.log(id)

  const product = PRODUCTS.filter((item) => item.id === id)[0]
  console.log(product)

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className=" flex-1">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}

        <View className="p-5 pb-8 gap-5">
          <Button>
            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>

            <Button.Text>Adicionar ao pedido</Button.Text>
          </Button>

          <LinkButton title="Voltar ao cardapío" href="/" />
        </View>
      </View>
    </View>
  );
}
