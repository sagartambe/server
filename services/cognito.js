require('cross-fetch/polyfill');
require('jsonwebtoken');
require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const Verifier = require('verify-cognito-token');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
  UserPoolId: 'us-east-1_oxXinXbs4',
  ClientId: '5f8htobi0sf0aaggpf54223i0i'
};
const poolRegion = 'us-east-1';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
  register: (email, password, name) => {
    return new Promise((resolve, reject) => {
      const attributeList = [];

      const dataEmail = {
        Name: 'email',
        Value: email
      };

      const dataName = {
        Name: 'name',
        Value: name
      };

      const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
      const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

      attributeList.push(attributeEmail);
      attributeList.push(attributePhoneNumber);

      userPool.signUp(email, password, attributeList, null, (err, result) => {
        console.log('inside');
        if (err) {
          reject(err);
        }
        else {
          cognitoUser = result.user;
          resolve(cognitoUser)
        }
      });
    });
  },
  signIn: (email, password) => {
    return new Promise((resolve, reject) => {
      const authenticationData = {
        Username: email,
        Password: password,
      };
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );
      const userData = {
        Username: email,
        Pool: userPool,
      };

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
          const accessToken = result.getAccessToken().getJwtToken();
          resolve({token: accessToken});
        },
        onFailure: function(err) {
          reject(err);
        }
      });
    });
  },
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization
    const params = {
      region: poolRegion,
      userPoolId: poolData.UserPoolId
    }

    const verifier = new Verifier(params);

    return verifier.verify(token)
      .then(response => {
        console.log(response);
        if (response) {
          next();
        }
        else {
          res.status(401).send({error: 'Unauthorize user'});
        }
      })
      .catch(err => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(401).send({error: 'Unauthorize user'});
      });
  }
}