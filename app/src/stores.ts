import { readable, writable } from 'svelte/store'

import { DefaultStorage } from './lib/storage'
import { DefaultRemote } from '../../core/remotes'
import { DefaultSync } from '../../core/syncs'

const theStorage = new DefaultStorage()

export const storage = readable(theStorage)

export const sync = readable(new DefaultSync(new DefaultRemote(), new DefaultStorage()))

export const currentName = writable('')
