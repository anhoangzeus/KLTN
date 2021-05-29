// import * as React from 'react';
// import {
//   SafeAreaView,
//   Text,
//   StatusBar,
//   Dimensions,
//   TextInput,
//   View,
//   RefreshControl,
//   ActivityIndicator,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import ProductItem from 'components/ProductItem';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import NavigationServices from 'utils/navigationServices';
// import styles from './Search.styles';
// // import {NAMESPACE} from './Search.constants';

// function SearchView() {
//   return (
//     <SafeAreaView style={styles.screenContainersafe}>
//       <View style={styles.screenContainer}>
//         <StatusBar
//           backgroundColor="#a2459a"
//           barStyle="light-content"
//           translucent={false}
//         />
//         <View style={styles.headerContainer}>
//           <View style={styles.inputContainer}>
//             <FontAwesome name="search" size={24} color="#969696" />
//             <TextInput
//               style={styles.inputText}
//               placeholder="Bạn tìm gì hôm nay?"
//               autoFocus={true}
//               // onChangeText={(text) =>
//               //   this.setState({searchText: text, loading: true})
//               // }
//               // onSubmitEditing={() => this.searchDictionary()}
//             />
//           </View>
//           <TouchableOpacity
//             style={styles.cartContainer}
//             onPress={() => NavigationServices.navigation.navigate('Cart')}>
//             <FontAwesome name="shopping-cart" size={24} color="#fff" />
//             {this.renderNofiCart()}
//           </TouchableOpacity>
//         </View>
//         <View style={styles.bodyContainer}>
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Kết quả tìm kiếm</Text>
//             <SafeAreaView>
//               <View style={styles.listItemContainer}>
//                 {this.state.listcate[0] == null ? (
//                   <View>
//                     <Text style={{color: '#000'}}>this.state.textNoti</Text>
//                   </View>
//                 ) : null}
//                 {null ? (
//                   <View
//                     style={{
//                       flex: 1,
//                       backgroundColor: '#fff',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                     }}>
//                     <ActivityIndicator size="large" color="'#a2459a" />
//                   </View>
//                 ) : (
//                   <FlatList
//                     refreshControl={
//                       <RefreshControl
//                       // refreshing={this.state.refreshing}
//                       // onRefresh={this._onRefresh}
//                       />
//                     }
//                     horizontal={false}
//                     numColumns={2}
//                     showsHorizontalScrollIndicator={false}
//                     //data={this.state.listcate}
//                     renderItem={({item}) => (
//                       <TouchableOpacity>
//                         <ProductItem
//                           name={item.title}
//                           image={item.image}
//                           price={item.price}
//                           rating={item.rating}
//                           bough={item.bough}
//                           PromotionPrice={item.PromotionPrice}
//                         />
//                       </TouchableOpacity>
//                     )}
//                   />
//                 )}
//               </View>
//               <View style={{height: 100}} />
//             </SafeAreaView>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// export default React.memo(SearchView);
