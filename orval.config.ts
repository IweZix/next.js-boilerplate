// eslint-disable-next-line import/no-anonymous-default-export
export default {
  api: {
    input: './openapi.json', // chemin vers le fichier OpenAPI généré
    output: {
      mode: 'tags-split',
      target: './src/api/generated.ts',
      schemas: './src/api/model',
      client: 'react-query', // ou 'axios', 'vue-query' etc.
      override: {
        mutator: {
          path: './src/utils/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
};
