import * as React from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import styles from './Statistic.styles';
// import AppText from 'components/AppText';
import {
  LineChart,
  BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart,
} from 'react-native-chart-kit';
import {Icon} from 'react-native-elements';
import NavigationServices from 'utils/navigationServices';
// import {NAMESPACE} from './Statistic.constants';

function StatisticView(props) {
  const {timeline, revenue, order, loading} = props;
  console.log('revenue: ', revenue);

  if (loading) {
    return <View style={styles.container} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.vHeader}>
            <TouchableOpacity
              style={styles.vBack}
              onPress={() => NavigationServices.goBack()}>
              <Icon
                type="font-awesome"
                name="angle-left"
                size={30}
                color={'black'}
              />
            </TouchableOpacity>

            <View style={styles.vTitleContainer}>
              <Text style={styles.txtTitle}>Revenue</Text>
            </View>
          </View>
          {/* <View style={styles.line} /> */}
        </View>
        <Text style={styles.title}>Doanh thu</Text>
        <LineChart
          data={{
            labels: timeline,
            datasets: [
              {
                data: revenue,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chartMain}
        />
        <Text style={styles.title}>Thống kê đơn hàng</Text>
        <BarChart
          //style={graphStyle}
          data={{
            labels: timeline,
            datasets: [
              {
                data: order,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#15B9FF',
            backgroundGradientFrom: '#39A6D4',
            backgroundGradientTo: '#39A6D4',
            showBarTops: true,
            showValuesOnTopOfBars: true,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          verticalLabelRotation={30}
          style={styles.chartMain}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(StatisticView);
