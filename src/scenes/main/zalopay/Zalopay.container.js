import React, {useLayoutEffect} from 'react';
import ZalopayView from './Zalopay.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './Zalopay.constants';
import {getString} from 'utils/i18n';

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
 // ACTION.HANDLER,
]);

export default function ZalopayContainer({navigation}) {
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  return (
    <ZalopayView isLoading={isLoading} />
  );
}
