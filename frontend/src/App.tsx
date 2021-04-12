import React, { FC } from 'react';
import { Header } from '@/components/layout';
import AppContainer from '@/components/AppContainer';
import style from '@/App.module.css';
import { Plugins } from './types';

const App: FC<{ plugins: Plugins }> = (props) => (
    <div className={style.app}>
        <Header></Header>
        <div className={style['content-container']}>
            <AppContainer plugins={ props.plugins }></AppContainer>
        </div>
    </div>
);

export default App;