import { TPluginConfig } from './TPluginConfig.ts';

export type TConfig = {
    plugin: { [pluginName: string]: boolean | TPluginConfig };
    [key: string]: any;
}
