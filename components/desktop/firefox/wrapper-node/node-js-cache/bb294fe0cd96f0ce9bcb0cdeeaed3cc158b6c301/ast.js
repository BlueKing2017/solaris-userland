"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBestMatchExpression = findBestMatchExpression;
exports.containsPosition = containsPosition;
exports.findClosestFunction = findClosestFunction;
exports.findClosestClass = findClosestClass;
function findBestMatchExpression(symbols, tokenPos) {
  if (symbols.loading) {
    return null;
  }

  const { line, column } = tokenPos;
  const { memberExpressions, identifiers, literals } = symbols;
  const members = memberExpressions.filter(({ computed }) => !computed);

  return [].concat(identifiers, members, literals).reduce((found, expression) => {
    const overlaps = expression.location.start.line == line && expression.location.start.column <= column && expression.location.end.column >= column;

    if (overlaps) {
      return expression;
    }

    return found;
  }, null);
} /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

function containsPosition(a, b) {
  const startsBefore = a.start.line < b.line || a.start.line === b.line && a.start.column <= b.column;
  const endsAfter = a.end.line > b.line || a.end.line === b.line && a.end.column >= b.column;

  return startsBefore && endsAfter;
}

function findClosestofSymbol(declarations, location) {
  if (!declarations) {
    return null;
  }

  return declarations.reduce((found, currNode) => {
    if (currNode.name === "anonymous" || !containsPosition(currNode.location, {
      line: location.line,
      column: location.column || 0
    })) {
      return found;
    }

    if (!found) {
      return currNode;
    }

    if (found.location.start.line > currNode.location.start.line) {
      return found;
    }
    if (found.location.start.line === currNode.location.start.line && found.location.start.column > currNode.location.start.column) {
      return found;
    }

    return currNode;
  }, null);
}

function findClosestFunction(symbols, location) {
  if (!symbols || symbols.loading) {
    return null;
  }

  return findClosestofSymbol(symbols.functions, location);
}

function findClosestClass(symbols, location) {
  if (!symbols || symbols.loading) {
    return null;
  }

  return findClosestofSymbol(symbols.classes, location);
}