import React, {useCallback} from 'react';
import HomeView from './Home.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {AUTH} from 'appRedux/actionsType';
import {useActions} from 'hooks/useActions';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
import withForceUpdate from 'components/HOC/withForceUpdate';
import database from '@react-native-firebase/database';
// import {NAMESPACE} from './Home.constants';
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  AUTH.GET_USER_INFO.HANDLER,
]);
const reference = database().ref('/Users');
function HomeContainer({navigation}) {
  const actions = useActions({getUserInfoSubmit});
  const isFetchingTest = useSelectorShallow(loadingSelector);
  const onPressTestApi = useCallback(() => {
    actions.getUserInfoSubmit({showLoading: false});
  }, [actions]);

  reference.once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
  }); 
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: I18n.t(`${NAMESPACE}.title`),
  //   });
  // }, [navigation]);

  return (
    <HomeView isLoading={isFetchingTest} onPressTestApi={onPressTestApi} />
  );
}

export default withForceUpdate(HomeContainer);
