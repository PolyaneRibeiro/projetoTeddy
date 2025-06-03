// export default {
//   preset: 'jest-expo',
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
//   transformIgnorePatterns: [
//     'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|expo-modules-core)',
//   ],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//   },
// };

export default {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|expo-modules-core)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true, // habilita cobertura por padrão
  collectCoverageFrom: [
    '**/*.{ts,tsx}', // quais arquivos quer coletar coverage
    '!**/node_modules/**',
    '!**/vendor/**',
    '!jest.config.ts',
    '!**/*.d.ts',
  ],
  coverageReporters: ['text', 'lcov'], // formatos de relatório
};

