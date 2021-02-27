import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Beranda from './Beranda';
import List from './List';
import Cart from './Cart';

const Utama = () => (
    <Switch>
        <Route exact path="/"   component={Beranda} />
        <Route path="/list"     component={List} />
        <Route path="/cart"     component={Cart} />
    </Switch>
)

export default Utama;