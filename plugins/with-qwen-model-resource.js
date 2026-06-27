const fs = require('fs');
const path = require('path');
const { withXcodeProject } = require('@expo/config-plugins');

const MODEL_RELATIVE_PATH = 'assets/models/Qwen3-0.6B-Q8_0.gguf';

module.exports = function withQwenModelResource(config) {
  return withXcodeProject(config, (config) => {
    const projectRoot = config.modRequest.projectRoot;
    const modelPath = path.join(projectRoot, MODEL_RELATIVE_PATH);

    if (!fs.existsSync(modelPath)) {
      throw new Error(`Qwen model file is missing: ${MODEL_RELATIVE_PATH}`);
    }

    const project = config.modResults;
    const resourcesGroup = project.pbxGroupByName('Resources');
    const groupKey = resourcesGroup ? resourcesGroup.uuid : undefined;

    if (!project.hasFile(MODEL_RELATIVE_PATH)) {
      project.addResourceFile(MODEL_RELATIVE_PATH, { lastKnownFileType: 'file' }, groupKey);
    }

    return config;
  });
};
