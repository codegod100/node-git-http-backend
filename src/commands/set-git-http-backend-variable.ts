import ProcessEnv = NodeJS.ProcessEnv
import { GitHttpBackendVariable } from '../model/git-http-backend-variable.ts'

export function setGitHttpBackendVariable(
    variables: ProcessEnv,
    name: GitHttpBackendVariable,
    value: string
): void {
    variables[name] = value
}
