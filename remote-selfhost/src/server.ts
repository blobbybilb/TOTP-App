import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { Level } from 'level';
import { RemoteStatus } from '../../core/types';

const db = new Level('./db');
const app = new Koa();
const router = new Router();

const READ_TIMEOUT = 5;
const WRITE_TIMEOUT = 30;

const recentIPsRead = new Set<string>();
const recentIPsWrite = new Set<string>();
let readReset = Math.floor(Date.now() / 1000);
let writeReset = Math.floor(Date.now() / 1000);

const getSeconds = () => Math.floor(Date.now() / 1000);

