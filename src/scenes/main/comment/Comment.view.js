/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import styles from './Comment.styles';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import StarRating from 'components/StarRating';
import CommentItem from 'components/CommentItem';
import {ScrollView} from 'react-native-gesture-handler';
// import {NAMESPACE} from './Comment.constants';
const {height, width} = Dimensions.get('screen');
function CommentView(props) {
  const {listComments, bough, rating, sao1, sao2, sao3, sao4, sao5, isloading} =
    props;
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headconteiner}>
        {isloading ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
              // refreshing={refreshing}
              // onRefresh={this._onRefresh}
              />
            }>
            <View style={{backgroundColor: '#fff', height: height / 3.2}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <Text
                  bold
                  size={12}
                  style={{
                    marginLeft: width / 40,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Khách Hàng Nhận Xét{' '}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginHorizontal: width / 6,
                    marginVertical: height / 30,
                  }}>
                  <Text style={{fontSize: 50, color: '#000'}}>
                    {rating.toFixed(1)}
                  </Text>
                  <StarRating rating={rating} size={10} />
                  <Text style={{fontSize: 15, color: 'green', marginTop: 5}}>
                    {bough} nhận xét
                  </Text>
                </View>
                <View style={{width: 1, backgroundColor: '#DDDDDD'}} />
                <View style={{marginLeft: 5}}>
                  <View style={styles.star}>
                    <StarRating rating={5} size={17} />
                    <Text style={styles.numstar}>{sao5}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={4} size={17} />
                    <Text style={styles.numstar}>{sao4}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={3} size={17} />
                    <Text style={styles.numstar}>{sao3}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={2} size={17} />
                    <Text style={styles.numstar}>{sao2}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={1} size={17} />
                    <Text style={styles.numstar}>{sao1}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: 5}} />
            <FlatList
              data={listComments}
              showsVerticalScrollIndicator={false}
              pagingEnabled={true}
              renderItem={({item}) => {
                return <CommentItem item={item} />;
              }}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

export default React.memo(CommentView);
