/*
 * 环境运行时配置
 */

const currentEnv: "dev" | "prod" = (window as any).env || "dev";

export interface IEnvConfig {
  env?: "prod" | "dev";
  apiHost?: string;
  tokenName?: string;
}

export interface IEnv {
  dev: IEnvConfig;
  prod: IEnvConfig;
}

// api 地址切换
const getApiHost = () => (currentEnv === "dev" ? "/admin" : "/");

const common: IEnvConfig = {
  env: currentEnv,
  apiHost: getApiHost(),
  tokenName: "Authorization",
};

export default common;
