import * as React from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './Statistic.styles';
// import AppText from 'components/AppText';
import {
  LineChart,
  // BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart,
} from 'react-native-chart-kit';
import {Icon} from 'react-native-elements';
import NavigationServices from 'utils/navigationServices';
// import {NAMESPACE} from './Statistic.constants';

function StatisticView(props) {
  const {timeline, revenue, loading} = props;
  console.log('revenue: ', revenue);
  if (loading) {
    return <View style={styles.container} />;
  }
  return (
    <SafeAreaView>
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
            <Text style={styles.txtTitle}>Report</Text>
          </View>
        </View>
        {/* <View style={styles.line} /> */}
      </View>
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
        yAxisSuffix="đ"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
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
        // style={{
        //   marginVertical: 8,
        //   borderRadius: 16,
        // }}
      />
    </SafeAreaView>
  );
}

export default React.memo(StatisticView);
