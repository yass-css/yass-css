export interface Config {
  rules: {
    namespace?: string;
    separator?: string;
  }
  stylesheet: {
    buildPath?: string;
    filename?: string;
    include: {
      baseClasses?: boolean;
      tokenClasses?: boolean;
      themeClasses?: boolean;
    }
  },
  types: {
    buildPath?: string;
    filename?: string;
  },
}

export const getConfig = (userConfig: Partial<Config>): Config => {
  const config: Config = {
    rules: {
      namespace: userConfig?.rules?.namespace || '',
      separator: userConfig?.rules?.separator || '\\:',
    },
    stylesheet: {
      buildPath:  userConfig?.stylesheet?.buildPath || 'styles/yass/',
      filename: userConfig?.stylesheet?.filename || 'yass.css',
      include: {
        baseClasses: userConfig?.stylesheet?.include?.baseClasses !== undefined ? userConfig?.stylesheet?.include.baseClasses : true,
        themeClasses: userConfig?.stylesheet?.include?.themeClasses !== undefined ? userConfig?.stylesheet?.include.themeClasses : true,
        tokenClasses: userConfig?.stylesheet?.include?.tokenClasses !== undefined ? userConfig?.stylesheet?.include.tokenClasses : true,
      }
    },
    types: {
      buildPath: userConfig?.types?.buildPath || 'types/',
      filename: userConfig?.types?.filename || 'yass.ts',
    },
  }

  return config
}