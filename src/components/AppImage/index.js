import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMG_NO_IMAGE} from 'assets/path';
import styles from './styles';
import {Spinner} from 'native-base';
import {COLOR_PRIMARY} from 'constants/colors';

function AppImage({style, source, url, ...rest}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);
  const sour = useMemo(() => source || {uri: url}, [source, url]);
  const onError = useCallback(() => {
    setIsError(true);
  }, []);

  useEffect(() => {
    setIsError(false);
    sour?.uri &&
      Image.prefetch(sour.uri).catch(() => {
        setIsError(true);
      });
  }, [sour]);

  const onLoadStart = useCallback(() => {
    setIsError(false);
    setIsLoading(true);
  }, []);

  if (isError) {
    return (
      <Image
        {...rest}
        style={[styles.container, styles.image, style]}
        source={IMG_NO_IMAGE}
      />
    );
  }

  return (
    <>
      <FastImage
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        {...rest}
        style={[styles.container, style]}
        source={sour}>
        {isLoading && (
          <View style={[styles.container, style, styles.overlay]}>
            <Spinner color={COLOR_PRIMARY} />
          </View>
        )}
      </FastImage>
    </>
  );
}

export default React.memo(AppImage);
