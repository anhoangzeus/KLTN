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
import ReactNativeNumberFormat from 'components/NumberFormat';
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
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
// import {NAMESPACE} from './Statistic.constants';

function StatisticView(props) {
  const {timeline, revenue, order, loading, orderCount, revenueCount} = props;
  console.log('revenue: ', revenue);

  if (loading) {
    return <View style={styles.container} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.con}>
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
                <Text style={styles.txtTitle}>
                  {I18n.t(`${NAMESPACE}.revenue`)}
                </Text>
              </View>
            </View>
            {/* <View style={styles.line} /> */}
          </View>
          <View style={styles.boxView}>
            <View style={styles.boxContainer}>
              <Text style={styles.perText}>
                <ReactNativeNumberFormat value={revenueCount.toString()} />đ
              </Text>

              <View>
                <Text> {I18n.t(`${NAMESPACE}.thisrevenue`)} </Text>
              </View>
            </View>
            <View style={styles.boxContainer}>
              <Text style={styles.perText}>{orderCount}</Text>
              <View>
                <Text>{I18n.t(`${NAMESPACE}.thisorder`)}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}> {I18n.t(`${NAMESPACE}.revenue`)}</Text>
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
            yAxisLabel="đ"
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
                borderRadius: 0,
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
              style: {marginBottom: 15},
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            verticalLabelRotation={30}
            style={styles.chartMain}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(StatisticView);
