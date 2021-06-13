import React, {useLayoutEffect} from 'react';
import RegisterStoreView from './RegisterStore.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './RegisterStore.constants';
import {getString} from 'utils/i18n';

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
 // ACTION.HANDLER,
]);

export default function RegisterStoreContainer({navigation}) {
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  return (
    <RegisterStoreView isLoading={isLoading} />
  );
}
