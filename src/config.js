const envVars = process.env;

const configurations = Object.freeze({
  graphQLUri: `${envVars.REACT_APP_GRAPHQL_URI}/graphql`
})

export default configurations;