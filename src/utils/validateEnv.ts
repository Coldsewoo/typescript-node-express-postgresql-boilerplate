import { cleanEnv, str, port } from 'envalid'

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    MAINTAINER_NAME: str(),
  })
}

export default validateEnv
