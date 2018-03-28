import axios from 'axios';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { default as axiosDriver } from 'redux-saga-requests-axios';

export default function* rootSaga() {

    // @ts-ignore: TS Does not support it
    yield createRequestInstance(axios, { driver: axiosDriver });
    yield watchRequests();

}