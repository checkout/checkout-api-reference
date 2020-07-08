#!/usr/bin/env node
'use strict';
var request = require('request');
var YAML = require('yamljs');
var fs = require('fs');
require('shelljs/global');
set('-e');
set('-v');

var syncPaymentSources = function()
{
  syncPaymentRequest('Giropay', 'http://sb-gateway-internal.cko.lon/giropay-internal/giropay/relations/gw/pay');
  syncPaymentResponse('Giropay', 'http://sb-gateway-internal.cko.lon/giropay-internal/giropay/relations/gw/payment');
  syncPaymentRequest('Eps', 'http://sb-gateway-internal.cko.lon/giropay-internal/eps/relations/gw/pay');
  syncPaymentResponse('Eps', 'http://sb-gateway-internal.cko.lon/giropay-internal/eps/relations/gw/payment');
  syncPaymentRequest('Ideal', 'http://sb-gateway-internal.cko.lon/ideal-internal-api/relations/gw/pay');
  syncPaymentResponse('Ideal', 'http://sb-gateway-internal.cko.lon/ideal-internal-api/relations/gw/payment');
  syncPaymentRequest('Klarna', 'http://sb-gateway-internal.cko.lon/klarna-internal/relations/gw/pay');
  syncPaymentResponse('Klarna', 'http://sb-gateway-internal.cko.lon/klarna-internal/relations/gw/payment');
  syncPaymentRequest('Knet', 'http://sb-gateway-internal.cko.lon/knet-internal/relations/gw/pay');
  syncPaymentResponse('Knet', 'http://sb-gateway-internal.cko.lon/knet-internal/relations/gw/payment');
  syncPaymentRequest('Bancontact', 'http://sb-gateway-internal.cko.lon/ppro-internal/bancontact/relations/gw/pay');
  syncPaymentResponse('Bancontact', 'http://sb-gateway-internal.cko.lon/ppro-internal/bancontact/relations/gw/payment');
  syncPaymentRequest('Fawry', 'http://sb-gateway-internal.cko.lon/fawry-internal/relations/gw/pay');
  syncPaymentResponse('Fawry', 'http://sb-gateway-internal.cko.lon/fawry-internal/relations/gw/payment');
  syncPaymentRequest('QPay', 'http://sb-gateway-internal.cko.lon/qpay-internal/relations/gw/pay');
  syncPaymentResponse('QPay', 'http://sb-gateway-internal.cko.lon/qpay-internal/relations/gw/payment');
  syncPaymentRequest('P24', 'http://sb-gateway-internal.cko.lon/ppro-internal/p24/relations/gw/pay');
  syncPaymentResponse('P24', 'http://sb-gateway-internal.cko.lon/ppro-internal/p24/relations/gw/payment');
  syncPaymentRequest('Multibanco', 'http://sb-gateway-internal.cko.lon/ppro-internal/multibanco/relations/gw/pay');
  syncPaymentResponse('Multibanco', 'http://sb-gateway-internal.cko.lon/ppro-internal/multibanco/relations/gw/payment');
  syncPaymentRequest('BenefitPay', 'http://sb-gateway-internal.cko.lon/benefitpay-internal/relations/gw/pay');
  syncPaymentResponse('BenefitPay', 'http://sb-gateway-internal.cko.lon/benefitpay-internal/relations/gw/payment');
  syncPaymentRequest('OXXO', 'http://sb-gateway-internal.cko.lon/dlocal-internal/oxxo/relations/gw/pay');
  syncPaymentResponse('OXXO', 'http://sb-gateway-internal.cko.lon/dlocal-internal/oxxo/relations/gw/payment');
  syncPaymentRequest('Boleto', 'http://sb-gateway-internal.cko.lon/dlocal-internal/boleto/relations/gw/pay');
  syncPaymentResponse('Boleto', 'http://sb-gateway-internal.cko.lon/dlocal-internal/boleto/relations/gw/payment');
  syncPaymentRequest('PagoFacil', 'http://sb-gateway-internal.cko.lon/dlocal-internal/pagofacil/relations/gw/pay');
  syncPaymentResponse('PagoFacil', 'http://sb-gateway-internal.cko.lon/dlocal-internal/pagofacil/relations/gw/payment');
  syncPaymentRequest('RapiPago', 'http://sb-gateway-internal.cko.lon/dlocal-internal/rapipago/relations/gw/pay');
  syncPaymentResponse('RapiPago', 'http://sb-gateway-internal.cko.lon/dlocal-internal/rapipago/relations/gw/payment');
  syncPaymentRequest('Baloto', 'http://sb-gateway-internal.cko.lon/dlocal-internal/baloto/relations/gw/pay');
  syncPaymentResponse('Baloto', 'http://sb-gateway-internal.cko.lon/dlocal-internal/baloto/relations/gw/payment');
}

var syncPaymentRequest = function(paymentSourceName, paymentSpecUrl) {
  var outputFilename =  'PaymentRequest' + paymentSourceName + 'Source.yaml'
  var outputFilePath = 'spec/components/schemas/Payments/RequestSources/' + outputFilename;
  var buildPaymentRequestFunction = getFunctionToBuildPaymentRequest(paymentSourceName);
  sync(paymentSpecUrl, buildPaymentRequestFunction, outputFilePath);
};

var syncPaymentResponse = function(paymentSourceName, paymentSpecUrl) {
  var outputFilename =  'PaymentResponse' + paymentSourceName + 'Source.yaml'
  var outputFilePath = 'spec/components/schemas/Payments/ResponseSources/' + outputFilename;
  var buildPaymentResponseFunction = getFunctionToBuildPaymentResponse(paymentSourceName);
  sync(paymentSpecUrl, buildPaymentResponseFunction, outputFilePath);
};

var sync = function(paymentSpecUrl, buildPaymentResponseFunction, outputFilePath) {
  console.log('Requesting payment spec from: ' + paymentSpecUrl + ', to output: ' + outputFilePath);
  var buildOutputFunction = getFunctionToBuildYaml(buildPaymentResponseFunction);
  request({ url: paymentSpecUrl, json: true}, thenBuildOutputAndWrite(buildOutputFunction, outputFilePath));
};

// Copy properties that should be included in the merchant-facing API specification
var copyRelevantProperties = function(outputSchema, inputSchema) {
  if (!inputSchema)
    return;

  outputSchema.type = 'object';

  if (inputSchema.required) {
    outputSchema.required = inputSchema.required;
  }
  
  if (inputSchema.properties) {
    outputSchema.properties = inputSchema.properties;
    if (outputSchema.properties.type) {
      delete outputSchema.properties.type;
    }
  }

  if (inputSchema.allOf) {
    outputSchema.allOf = inputSchema.allOf;
    if (outputSchema.allOf.properties && outputSchema.allOf.properties.type) {
      delete outputSchema.allOf.properties.type;
    }
  }

  if (inputSchema.anyOf) {
    outputSchema.anyOf = inputSchema.anyOf;
    if (outputSchema.anyOf.properties && outputSchema.anyOf.properties.type) {
      delete outputSchema.anyOf.properties.type;
    }
  }

  if (inputSchema.oneOf) {
    outputSchema.oneOf = properties.response_data.oneOf;
    if (outputSchema.oneOf.properties && outputSchema.oneOf.properties.type) {
      delete outputSchema.oneOf.properties.type;
    }
  }

  return outputSchema;
}

var getFunctionToBuildPaymentRequest = function(paymentSourceName) {
  return function(responseBody) {
    var properties = responseBody.put.requestBody.content['application/json'].schema.properties;
    var requestData = {};
    if (properties) {
      copyRelevantProperties(requestData, properties.request_data);
    }
    addDescriptionToKlarnaPassthroughObjects(requestData, paymentSourceName);
    return {
      type: 'object',
      description: paymentSourceName + ' Source',
      allOf: [{
          $ref: '#/components/schemas/PaymentRequestSource',
        }, 
        requestData
      ]
    };
  };
};

var addDescriptionToKlarnaPassthroughObjects = function(requestData, paymentSourceName) {
  Object.keys(requestData.properties).forEach(propertyName => {
    var property = requestData.properties[propertyName];
    if (property['x-cko-passthrough'] === true && property['x-klarna-docs']) {
      var apmPropertyName = property['x-klarna-name'] || propertyName;
      var apmPropertyDocs = property['x-klarna-docs'];
      property.description += '  \nThis object is passed directly to ' + paymentSourceName + ' as `' + apmPropertyName + '`, ' +
                                '\nso for the object definition use the [' + paymentSourceName + ' documentation](' + apmPropertyDocs + ').';
    }
  });
};

var getFunctionToBuildPaymentResponse = function(paymentSourceName) {
  return function(responseBody) {
    var properties = responseBody.get.responses[200].content['application/json'].schema.properties;
    var responseData = {};
    if (properties) {
      copyRelevantProperties(responseData, properties.response_data);
    }
    return {
      type: 'object',
      description: paymentSourceName + ' Source',
      allOf: [{
          $ref: '#/components/schemas/PaymentResponseSource',
        }, 
        responseData
      ]
    };
  };
};

var getFunctionToBuildYaml = function(buildOutputFunction) {
  return function(responseBody) {
    var builtOutput = buildOutputFunction(responseBody);
    var generatedFileWarningComment = '###\n# Warning: this file was auto generated from OpenAPI specs using \'npm run sync-generated-specs\'. Do not manually edit. \n###\n';
    return generatedFileWarningComment + YAML.stringify(builtOutput, 20, 2);
  };
};

var thenBuildOutputAndWrite = function(buildOutputFunction, outputFilePath) {
  return function(error, response, responseBody) {
    if (error || response.statusCode !== 200) {
      handleRequestError(error, response);
    } else {
      console.log('Response from url received.');
      var builtOutput = buildOutputFunction(responseBody);
      fs.writeFile(outputFilePath, builtOutput, thenHandleFileWrite(outputFilePath));
    }
  }
};

var handleRequestError = function(error, response) {
  console.log('Invalid response from url. Error = ' + error);
  if (response) {
    console.log('response.statusCode = ' + response.statusCode);
  }
};

var thenHandleFileWrite = function(outputFilePath) {
  return function (error) {
    if (error) {
      console.log('File write error received: ' + error);
    } else {
      console.log('File written to ' + outputFilePath);
    }
  }
}; 

syncPaymentSources();