import React, {useLayoutEffect} from 'react';
import EditStoreView from './EditStore.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './EditStore.constants';
import {getString} from 'utils/i18n';

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
 // ACTION.HANDLER,
]);

export default function EditStoreContainer({navigation}) {
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  return (
    <EditStoreView isLoading={isLoading} />
  );
}
