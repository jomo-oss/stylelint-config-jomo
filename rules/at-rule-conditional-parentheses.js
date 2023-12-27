const stylelint = require("stylelint");

const ruleName = "crisp/at-rule-conditional-parentheses";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected parentheses in \"@if\" and \"@else-if\" statements",
});

const ruleFunction = (primaryOption, secondaryOptions, context) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) {
      return;
    }

    root.walkAtRules((rule) => {
      if (rule.name === "if" || rule.name === "else-if") {
        if (!rule.params.startsWith("(") || !rule.params.endsWith(")")) {
          stylelint.utils.report({
            ruleName,
            result,
            node: rule,
            message: messages.expected,
          });
        }
      }
    });
  };
};

module.exports = stylelint.createPlugin(ruleName, ruleFunction);