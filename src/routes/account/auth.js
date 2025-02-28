import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStatus } from '~data/selectors/user'
import { refresh } from '~data/actions/user'
import isURL from 'validator/es/lib/isURL'
import sessionStorage from '~modules/sessionStorage'

import { Redirect, withRouter } from 'react-router-dom'

function Auth({ location: { search } }) {
    const dispatch = useDispatch()
    const { authorized } = useSelector(state=>userStatus(state))

    //refresh user state
    useEffect(()=>{
        dispatch(refresh())
    }, [])

    //save redirect link when is specified
    if (search) {
        const { redirect } = Object.fromEntries(new URLSearchParams(search))||{}

        if (redirect && 
            isURL(redirect, {
                require_host: false, 
                host_whitelist: ['raindrop.io', /\.raindrop\.io$/]
            })
        )
            sessionStorage.setItem('redirect', new URL(redirect, location.href).toString())
    }

    //redirect when authorized
    if (authorized == 'yes'){
        //use redirect link saved previously
        const redirect = sessionStorage.getItem('redirect')
        if (typeof redirect == 'string'){
            sessionStorage.removeItem('redirect')

            //redirect inside of an app
            if (redirect.startsWith(window.location.origin))
                return <Redirect to={redirect.replace(window.location.origin, '')} />

            //redirect outside
            location.href = redirect
            return null
        }

        //default redirect to homepage
        return <Redirect to='/' />
    }

    return null
}

export default withRouter(Auth)