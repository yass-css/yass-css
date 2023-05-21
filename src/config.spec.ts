import { getConfig } from "./config"


describe('getConfig()', () => {
  it('generates a default config', () => {
    const config = getConfig({})
    
    expect(config).toEqual({
      rules: {
        namespace: '',
        separator: '\\:',
      },
      stylesheet: {
        buildPath:  'styles/yass/',
        filename: 'yass.css',
        include: {
          baseClasses: true,
          themeClasses: true,
          tokenClasses: true,
        }
      },
      types: {
        buildPath: 'types/',
        filename: 'yass.ts',
      },      
    })
  })

  it('accepts overrides', () => {
    const config = getConfig({
      rules: {
        namespace: 'ds-',
        separator: '-',
      },
      stylesheet: {
        buildPath:  'styles/',
        filename: 'styles.css',
        include: {
          baseClasses: false,
          themeClasses: false,
          tokenClasses: false,
        }
      },
      types: {
        buildPath: 'types/yass/',
        filename: 'types.ts',
      },
    })
    
    expect(config).toEqual({
      rules: {
        namespace: 'ds-',
        separator: '-',
      },
      stylesheet: {
        buildPath:  'styles/',
        filename: 'styles.css',
        include: {
          baseClasses: false,
          themeClasses: false,
          tokenClasses: false,
        }
      },
      types: {
        buildPath: 'types/yass/',
        filename: 'types.ts',
      },
    })    
  })

it('accepts partial override', () => {
    const config = getConfig({
      stylesheet: {
        include: {
          themeClasses: false,
        }
      },
    })
    
    expect(config).toEqual({
      rules: {
        namespace: '',
        separator: '\\:',
      },
      stylesheet: {
        buildPath:  'styles/yass/',
        filename: 'yass.css',
        include: {
          baseClasses: true,
          themeClasses: false,
          tokenClasses: true,
        }
      },
      types: {
        buildPath: 'types/',
        filename: 'yass.ts',
      },   
    })    
  })  
})