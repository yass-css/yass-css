import { AtomicClassTransformer } from "./atomic-class"
import { getConfig } from "../config";
import { AtomicClass } from "../ast";

import type { DesignToken } from "../types";
import type { Config } from "../config";

describe("AtomicClassTransformer", () => {
  describe('transform()', () => {
    it("transforms a token into an atomic class", () => {
      const userConfig: Partial<Config> = {}
      const config: Config = getConfig(userConfig)
      const tokens: DesignToken[] = [
        {
          key: 'blue-500',
          value: '#0063bd',
          properties: ['color']
        },
      ]
      
      const result = AtomicClassTransformer.transform(tokens, config)
        .map((atomicClass: AtomicClass) => 
          atomicClass.toString())
    
      expect(result).toEqual([
        '.color\\:blue-500 { color: var(--blue-500); }'
      ])
    })

    it("transforms an alias token into a atomic class", () => {
      const userConfig: Partial<Config> = {}
      const config: Config = getConfig(userConfig)
      const tokens: DesignToken[] = [
        {
          key: 'blue-500',
          value: '#0063bd',
          properties: ['color']
        },
        {
          key: 'brand-primary',
          value: '{blue-500}',
          properties: ['color']
        },      
      ]
  
      const result = AtomicClassTransformer.transform(tokens, config)
        .map((atomicClass: AtomicClass) => 
          atomicClass.toString())
    
      expect(result).toEqual([
        '.color\\:blue-500 { color: var(--blue-500); }',
        '.color\\:brand-primary { color: var(--brand-primary); }' // Expected, since `--brand-primary: var(--blue-500)`
      ])
    });
  
      
    it("handles empty array", () => {
      const userConfig: Partial<Config> = {}
      const config: Config = getConfig(userConfig)
      const tokens: DesignToken[] = []
  
      const result = AtomicClassTransformer.transform(tokens, config)
            
      expect(result).toEqual([])
    })
    
    it("doesn't throw an error when property doesn't is not a CSS property", () => { // TODO: Discuss whether this is intended
      const userConfig: Partial<Config> = {}
      const config: Config = getConfig(userConfig)
      const tokens: DesignToken[] = [
        {
          key: 'blue-500',
          value: '#0063bd',
          properties: ['boop']
        },
      ]
      
      const result = AtomicClassTransformer.transform(tokens, config)
        .map((atomicClass: AtomicClass) => 
          atomicClass.toString())
    
      expect(result).toEqual([
        '.boop\\:blue-500 { boop: var(--blue-500); }',
      ])
    })
  
  
    describe('className()', () => {
      it('constructs a class name', () => {
        const token: DesignToken = {
          key: '400',
          value: '8px',
        }
  
        const userConfig: Partial<Config> = {}
        const config: Config = getConfig(userConfig)
        const property = 'width'
        const variable = AtomicClassTransformer.className(property, token, config)
  
        expect(variable).toBe('width\\:400')
      })

      it('uses separator provided in config ', () => {
        const token: DesignToken = {
          key: '400',
          value: '8px',
        }
  
        const userConfig: Partial<Config> = {
          rules: {
            separator: '-'
          }
        }
        const config: Config = getConfig(userConfig)
        const property = 'width'
        const variable = AtomicClassTransformer.className(property, token, config)
  
        expect(variable).toBe('width-400')
      })

      it('uses namespace provided in config ', () => {
        const token: DesignToken = {
          key: '400',
          value: '8px',
        }
  
        const userConfig: Partial<Config> = {
          rules: {
            namespace: 'ds-'
          }
        }
        const config: Config = getConfig(userConfig)
        const property = 'width'
        const variable = AtomicClassTransformer.className(property, token, config)
  
        expect(variable).toBe('ds-width\\:400')
      })

      it('prefers token.name over token.key ', () => {
        const token: DesignToken = {
          key: 'space.400',
          value: '8px',
          name: 'small'
        }
  
        const config: Config = getConfig({})
        const property = 'width'
        const variable = AtomicClassTransformer.className(property, token, config)
  
        expect(variable).toBe('width\\:small')
      })        
    })  
  })
})
