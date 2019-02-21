import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '@bnq/component-ui/Loading';

export default class RouterHome {
    static getRouters() {
        return (
            <Route
                exact
                path="/"
                component={Loadable({
                    loader: () => { return import('../pages/Index'); },
                    loading: Loading,
                })}
            />
        );
    }
}
