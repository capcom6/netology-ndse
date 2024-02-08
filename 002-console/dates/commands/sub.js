const { measuresBuilderTemplate, cmdCalculated } = require("../utils/math");

module.exports.command = "sub";
module.exports.describe = "Print decreased date and time";
module.exports.builder = measuresBuilderTemplate;
module.exports.handler = (argv) => cmdCalculated(argv, -1);
