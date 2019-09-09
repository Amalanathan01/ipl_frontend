import Home from './component/Home';
import MatchDetails from './component/MatchDetails'

const routes = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/matches/:id', exact: true, name: 'Delivery', component: MatchDetails}
];

export default routes;
