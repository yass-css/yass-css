import fs from 'fs'
import path from 'path'
import spawn from 'spawndamnit'

describe('yass', () => {

  it('works as expected with default config',  async () => {
    const testsDir = __dirname
    const testProjectDir = path.join(testsDir, 'fixtures/projects/1-no-config')

    await spawn('../../../../build/index.js', [], { cwd: testProjectDir })

    await expect(fs.existsSync(path.join(testProjectDir, '/styles/yass/yass.css'))).toBe(true)

    await spawn('rm', ['-rf', path.join(testProjectDir, 'styles')], { cwd: testProjectDir })
  })
})
