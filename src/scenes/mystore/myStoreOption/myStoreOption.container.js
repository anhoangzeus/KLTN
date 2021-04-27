import React from 'react';
import MyStoreOption from './mystoreOption.view';

import { getParams } from 'utils/navigationServices';



export default function MyStoreOptionContainer({ navigation, route }) {
    const { Avatar, FullName } = getParams(route);
    return (
        <MyStoreOption
            Avatar={Avatar}
            FullName={FullName}
        />
    );
}

