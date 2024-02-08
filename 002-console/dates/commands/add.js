const { measuresBuilderTemplate, cmdCalculated } = require("../utils/math");

module.exports.command = "add";
module.exports.describe = "Print increased date and time";
module.exports.builder = measuresBuilderTemplate;
module.exports.handler = (argv) => cmdCalculated(argv, 1);
