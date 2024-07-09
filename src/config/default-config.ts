import {
    IncomingHttpHeaders,
    IncomingMessage
} from 'http'
import { setGitHttpBackendVariable } from '../commands/set-git-http-backend-variable.ts'
import { mapHeadersToEnv } from '../mapper/map-headers-to-env.ts'
import { gitHttpBackendVariableNames } from '../model/git-http-backend-variable-names.ts'
import { GitHttpBackendConfig } from './model/config.ts'


export default function defaultConfig(gitBackendPath: string,
    projectRoot: string
) {
    return function (req: IncomingMessage): GitHttpBackendConfig {

        const url = new URL(req.url, "http:localhost:3333")


        const env = mapHeadersToEnv(
            req.headers as IncomingHttpHeaders,
            gitHttpBackendVariableNames
        )

        setGitHttpBackendVariable(
            env,
            'GIT_PROJECT_ROOT',
            projectRoot
        )

        setGitHttpBackendVariable(
            env,
            'PATH_TRANSLATED',
            projectRoot + url.pathname
        )

        setGitHttpBackendVariable(
            env,
            'PATH_INFO',
            url.pathname
        )


        setGitHttpBackendVariable(
            env,
            'REQUEST_METHOD',
            req.method
        )


        setGitHttpBackendVariable(
            env,
            'GIT_HTTP_EXPORT_ALL',
            '1'
        )

        setGitHttpBackendVariable(
            env,
            'QUERY_STRING',
            url.query
        )

        return {
            env,
            gitBackendPath
        }
    }
}
