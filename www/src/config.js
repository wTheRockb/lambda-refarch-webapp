// You can obtain these values by running:
// aws cloudformation describe-stacks --stack-name <YOUR STACK NAME> --query "Stacks[0].Outputs[]"

const config = {
  "aws_user_pools_web_client_id": "23k8f3lsestshn35klokok8gbn",     // CognitoClientID
  "api_base_url": "https://97m2qtdlf5.execute-api.us-west-2.amazonaws.com/prod",                                     // TodoFunctionApi
  "cognito_hosted_domain": "mytodoappdemo-woody-serverless.auth.us-west-2.amazoncognito.com",                   // CognitoDomainName
  "redirect_url": "https://master.d1uby1me92zf6a.amplifyapp.com"                                      // AmplifyURL
};

export default config;
