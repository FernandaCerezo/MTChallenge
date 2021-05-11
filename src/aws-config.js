import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

export function configureAmplify() {
  Amplify.configure(aws_exports);
}
