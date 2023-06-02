import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export function HabitEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito{" "}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500 transition-colors"
        onPress={() => navigate("new")}
      >
        comece cadastrando um.
      </Text>
    </Text>
  );
}
