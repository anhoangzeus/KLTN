import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2B4F8C',
  },
  imgAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  authText1: {
    color: '#2B4F8C',
    fontSize: 18,
    fontWeight: '500',
  },
  welcomeText: {
    color: 'black',
  },
  authText: {
    color: '#828282',
    fontWeight: '500',
    marginTop: 2,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  divider: {
    height: 10,
  },
  divider1: {
    height: 1,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2B4F8C',
    marginHorizontal: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    justifyContent: 'space-between',
    paddingBottom: 12,

  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
  },
  cartIcon: {
    width: 24,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    alignItems: 'center',
  },
});
