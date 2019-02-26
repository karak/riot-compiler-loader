"use strict";
const { Module } = require("module");
const vm = require('vm');
const babel = require("@babel/core");

function transform(code) {
  return babel.transform(code, {
    plugins: ["@babel/plugin-transform-modules-commonjs"]
  }).code;
}

function evalModule(code) {
  code = transform(code);
  const module = new Module();
  const context = vm.createContext(module);
  vm.runInNewContext(code, context);
  return module.exports.default;
}

module.exports = evalModule;
