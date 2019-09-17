import Home from './component/Home';
import MatchDetails from './component/MatchDetails';
import Login from './component/Login';
import Register from './component/Register';
import HighestScore from './component/HighestScore'
import MostHundreds from './component/MostHundreds'
import MostFifties from './component/MostFifties'
import MostNineties from './component/MostNineties'
import MostSixes from './component/MostSixes'
import MostFours from './component/MostFours'
import TeamCompare from './component/TeamCompare'
import ManageScore from './component/ManageScore'

const routes = [
    { path: '/', exact: true, component: Home },
    { path: '/matches/:id', exact: true, component: MatchDetails },
    { path: '/login', exact: true, component: Login },
    { path: '/register', exact: true, component: Register },
    { path: '/batsmanscore/highest', exact: true, component: HighestScore },
    { path: '/batsman/hundreds', exact: true, component: MostHundreds },
    { path: '/batsman/fifties', exact: true, component: MostFifties },
    { path: '/batsman/nineties', exact: true, component: MostNineties },
    { path: '/batsman/sixes', exact: true, component: MostSixes },
    { path: '/batsman/fours', exact: true, component: MostFours },
    { path: '/teamcompare', exact: true, component: TeamCompare },
    { path: '/managescore', exact: true, component: ManageScore }
];

export default routes;
