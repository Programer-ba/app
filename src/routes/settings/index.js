import s from './index.module.styl'
import React from 'react'
import t from '~t'
import { target } from '~target'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Protected from '~co/screen/protected'
import SplitView from '~co/screen/splitview'
import Main from '~co/screen/splitview/main'
import Sidebar from './_sidebar'

import Extension from './extension'
import App from './app'
import Pro from './pro'
import Account from './account'
import Import from './import'
import Backups from './backups'
import Integrations from './integrations'

export default (props)=>{
    const hideFrame = navigator.userAgent.includes('RaindropMobile')

    return (
        <Protected redirect>
            <SplitView>
                <Helmet><title>{t.s('settings')}</title></Helmet>
    
                {!hideFrame && (
                    <Sidebar {...props} />
                )}
    
                <Main className={s.main}>
                    <div className={s.content}>
                        <Switch>
                            <Route path={`${props.match.path}/extension`} component={Extension} />
                            <Route path={`${props.match.path}/app`} component={App} />
                            <Route path={`${props.match.path}/account`} component={Account} />
                            <Route path={`${props.match.path}/pro`} component={Pro} />
                            <Route path={`${props.match.path}/import`} component={Import} />
                            <Route path={`${props.match.path}/backups`} component={Backups} />
                            <Route path={`${props.match.path}/integrations`} component={Integrations} />

                            {/* Default route */}
                            <Route><Redirect to={`${props.match.path}/${target=='extension'?'extension':'app'}`} /></Route>
                        </Switch>
                    </div>
                </Main>
            </SplitView>
        </Protected>
    )
}