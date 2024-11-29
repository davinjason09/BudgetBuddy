import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

type LineGraphProps = {
  data: { value: number }[];
  width: number;
};

const LineGraph = (props: LineGraphProps) => {
  return (
    <View>
      <LineChart
        width={props.width}
        yAxisLabelWidth={0}
        stepHeight={15}
        data={props.data}
        thickness={3}
        areaChart
        isAnimated={true}
        animationDuration={1000}
        hideAxesAndRules
        hideDataPoints
        adjustToWidth
        // animateOnDataChange
        curved
        curveType={1}
        scrollAnimation={false}
        disableScroll
        initialSpacing={0}
        color1={Colors.violet100}
        startFillColor={Colors.violet60}
        startOpacity={0.7}
        endFillColor={Colors.violet40}
        endOpacity={0.3}
      />
    </View>
  );
};

export default LineGraph;
