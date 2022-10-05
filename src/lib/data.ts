// @ts-ignore
let passworder = window.passworder

async function decryptData(password, data): Promise<Object> {
  return await passworder.decrypt(password, data)
}

async function encryptData(password, data): Promise<string> {
  return await passworder.encrypt(password, data)
}

export async function getRemoteData(token, password, PIN) {
  const recievedData = await fetch(
    'https://totp-app.blobbybilb.workers.dev/get/' + token
  )

  const data = await decryptData(password, await recievedData.text())
  setLocalData(PIN, data)
}

export async function setRemoteData(token, password, PIN) { // TODO exists check
  const data = await getLocalData(PIN)
  const encryptedData = await encryptData(password, data)
  await fetch('https://totp-app.blobbybilb.workers.dev/set/' + token, {
    method: 'POST',
    body: encryptedData,
  })
  return "success"
}

export async function getLocalData(PIN) {
  const data = localStorage.getItem('data')
  return await decryptData(PIN, data)
}

export async function setLocalData(PIN, data) {
  const encryptedData = await encryptData(PIN, data)
  console.log(encryptedData)
  localStorage.setItem('data', encryptedData)
}

export async function addAccount(PIN, name, secret) {
  const data = await getLocalData(PIN)
  data.push({ name: name, key: secret })
  setLocalData(PIN, data)
  
}

export const tokenData = [
  {
    name: 'beep',
    key: 'JBSWY3DPEHPK3PXP',
  },
  {
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },{
    name: 'blip',
    key: 'blap',
  },
]
