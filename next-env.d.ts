/// <reference types="next" />
/// <reference types="next/types/global" />
import * as next from 'next';
import {Session} from "next-iron-session";
declare module 'next'{
    import {Session} from 'next-iron-session'
    interface NextApiRequest{
        session:Session
    }
}