import React, { useState, useEffect } from 'react'

import SignalWifi0BarIcon from '@material-ui/icons/SignalWifi0Bar';
import SignalWifi1BarIcon from '@material-ui/icons/SignalWifi1Bar';
import SignalWifi2BarIcon from '@material-ui/icons/SignalWifi2Bar';
import SignalWifi3BarIcon from '@material-ui/icons/SignalWifi3Bar';
import SignalWifi4BarIcon from '@material-ui/icons/SignalWifi4Bar';

import { wait } from '../utils/wait'

const PokeIconTimer = () => {
    const [ index, setIndex ] = useState(0)

    const icons = [
        SignalWifi0BarIcon,
        SignalWifi1BarIcon,
        SignalWifi2BarIcon,
        SignalWifi3BarIcon,
        SignalWifi4BarIcon,
        SignalWifi3BarIcon,
        SignalWifi2BarIcon,
        SignalWifi1BarIcon
    ]

    const increaseIndex = (index, max) =>
        index === max
            ?   0
            :   index + 1

    useEffect(() => {
        let shouldRun = true
        wait(500).then(() => {
            if (shouldRun) {
                const newIndex = increaseIndex(index, icons.length - 1)
                setIndex(newIndex)
            }
        })
        
        return () => {
            shouldRun = false
        }
    })

    const ComponentToRender = icons[index]

    return <ComponentToRender />
}

export { PokeIconTimer }