import React from 'react';
import FastImage from 'react-native-fast-image';
import {PropsImages} from '../model/models';

const FastImageLoad = (props: PropsImages) => (
  <FastImage
    style={props.style}
    source={{
      uri: props.uri,
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
    onError={() => require('../assets/images/no_image_placeholder.png')}
  />
);

export default FastImageLoad;
