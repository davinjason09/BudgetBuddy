import { PieChart } from "react-native-gifted-charts";
import { Text } from "react-native";
import { defaultStyles } from "@/constants/Styles";

type DonutChartProps = {
  data: { value: number; color?: string }[];
};

const DonutChart = (props: DonutChartProps) => {
  const total = props.data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <PieChart
      data={props.data}
      donut
      radius={90}
      innerRadius={75}
      centerLabelComponent={() => (
        <Text style={defaultStyles.textTitle1}>${total}</Text>
      )}
    />
  );
};

export default DonutChart;
