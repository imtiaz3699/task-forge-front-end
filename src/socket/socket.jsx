import {io} from 'socket.io-client'
import { BASE_URL_TWO } from '../utils/config'

const socket = io(`${BASE_URL_TWO}`,{
    transports:['websocket']
})

export default socket;

