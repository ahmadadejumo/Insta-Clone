import { NavigationContainer } from "@react-navigation/native";
import BottomTabNav from "./src/navigation/BottomTabNav";
import { FeedProvider } from "./context/FeedContext";

export default function App() {
  return (
    <FeedProvider>
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>
    </FeedProvider>
  );
}
