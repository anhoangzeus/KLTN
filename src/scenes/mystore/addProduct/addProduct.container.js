/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react';
import AddProductView from './addProduct.view';
import useSelectorShallow, {
    selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import { getIsFetchingByActionsTypeSelector } from 'appRedux/selectors/loadingSelector';
import { AUTH } from 'appRedux/actionsType';
import { useActions } from 'hooks/useActions';
import { getUserInfoSubmit } from 'appRedux/actions/authActions';
import withForceUpdate from 'components/HOC/withForceUpdate';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NavigationServices, { getParams } from 'utils/navigationServices';

const functionsCounter = new Set();

export default function AddProductContainer({ navigation }) {
    return (
        <AddProductView
        />
    );
}
