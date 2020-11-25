// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

// default imports
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const {metricScope, Unit} = require("aws-embedded-metrics")
const DDB = new AWS.DynamoDB({apiVersion: "2012-10-08"})

// environment variables
const {TABLE_NAME, ENDPOINT_OVERRIDE, REGION} = process.env
const options = {region: REGION}
AWS.config.update({region: REGION})

if (ENDPOINT_OVERRIDE !== "") {
    options.endpoint = ENDPOINT_OVERRIDE
}

const docClient = new AWS.DynamoDB.DocumentClient(options)
// response helper
const response = (statusCode, body, additionalHeaders) => ({
    statusCode,
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...additionalHeaders},
})

// Retrieve all the items by cognito-username
function getRecords(email) {
    let params = {
        TableName: TABLE_NAME,
        FilterExpression: "contains(#email, :email)",
        ExpressionAttributeNames: {
            "#email": "email",
        },
        ExpressionAttributeValues: {
            ":email": email,
        }       
    };

    return docClient.scan(params)
}

// Lambda Handler
exports.searchConstituents =
    metricScope(metrics =>
        async (event, context, callback) => {
            metrics.setNamespace('Constituents')
            metrics.putDimensions({Service: "searchConstituents"})
            metrics.setProperty("RequestId", context.requestId)

            try {
                let data = await getRecords(event.pathParameters.email).promise()
                metrics.putMetric("Success", 1, Unit.Count)
                return response(200, data)

            } catch (err) {
                metrics.putMetric("Error", 1, Unit.Count)
                console.error(err.message);
                return response(400, {message: err.message})
            }
        }
    )
